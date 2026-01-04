import createHttpError from "http-errors";
import { LoginDTO } from "../dto/Login_DTO";
import { UserEntity } from "../entities/User_Entity";
import { UserRepository } from "../repositories/User_Repository";
import { dataSource } from "../sources/Data_Source";
import * as bcrypt from "bcryptjs";
import { TokenService } from "./Token_Service";
import { AccessTokenPayload } from "../interfaces/Jwt_Payload";
import { LoginResponse } from "../interfaces/Login_Response";
import { RefreshTokenEntity } from "../entities/system/Refresh_Token_Entity";
import { RefreshTokenRepository } from "../repositories/Refresh_Token_Repository";
import { redisSource } from "../sources/Redis_Source";
import { LogType } from "../enum/Log_Type";
import pino from "pino";
import { LogService } from "./Log_Service";
import { RefreshResponse } from "../interfaces/Refresh_Response";

export class AuthService{

    private userRepository = dataSource.getRepository(UserEntity).extend(UserRepository.prototype);
    private refreshTokenRepository = dataSource.getRepository(RefreshTokenEntity).extend(RefreshTokenRepository.prototype);
    private tokenService = new TokenService();
    private redis = redisSource;
    private logger = pino();
    private logService = new LogService();

    async login (loginDTO:LoginDTO,userAgent:string | undefined,ipAddress:string | undefined) : Promise<LoginResponse>{

        const user = await this.userRepository.findByEmail(loginDTO.email);
        if (!user) {
            await this.logService.actionLog(ipAddress,userAgent,undefined,LogType.ACCESS_DENIED,"Email incorreto",401);
            throw createHttpError(401, "Email incorreto");
        };

        const isCorrectPassword = await bcrypt.compare(loginDTO.password,user.password);
        if (!isCorrectPassword) {
            await this.logService.actionLog(ipAddress,userAgent,undefined,LogType.ACCESS_DENIED,"Senha incorreta",401);
            throw createHttpError(401, "Senha incorreta");
        };

        const oldRefreshToken =await this.refreshTokenRepository.findByUserIdAndUserAgent(user.id,userAgent);

        if (oldRefreshToken) {
            oldRefreshToken.revokedAt = new Date();
            await Promise.all([
                this.refreshTokenRepository.save(oldRefreshToken),
                this.redis.del(`X-CSRF-Token:${user.id}:${oldRefreshToken.id}`)
            ]);
            await this.logService.actionLog(ipAddress,userAgent,user,LogType.REFRESH_TOKEN_REVOKED,"Refresh-Token revogado",200);
        }

        const payload: AccessTokenPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            tenant: {
                id: user.tenant.id,
                name: user.tenant.name,
            },
        };

        const newAccessToken = this.tokenService.generateAccessToken(payload);

        const newRefreshToken = this.tokenService.generateRefreshToken();

        const newCsrfToken = this.tokenService.generateCsrfToken();

        const refreshTokenEntity =this.refreshTokenRepository.create(
            {
                user,
                userAgent,
                ipAddress,
                refreshToken: newRefreshToken,
                refreshTokenExpiresAt: new Date(
                    Date.now() + 7 * 24 * 60 * 60 * 1000
                ),
            }
        );

        await Promise.all([
            this.logService.actionLog(ipAddress,userAgent,user,LogType.ACCESS_GRANTED,"Login efetuado",200),
            this.logService.actionLog(ipAddress,userAgent,user,LogType.REFRESH_TOKEN_ISSUED,"Refresh-Token criado",201),
            this.logService.actionLog(ipAddress,userAgent,user,LogType.CSRF_TOKEN_CREATED,"X-CSRF-Token criado",201),
            this.refreshTokenRepository.save(refreshTokenEntity),
            this.redis.set(`x-csrf-token:${user.id}:${refreshTokenEntity.id}`, newCsrfToken, "EX", 60 * 15)
        ]);

        this.logger.info(`Login efetuado ip: ${ipAddress}`);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            csrfToken: newCsrfToken,
        };

    };

    async refresh(userAgent:string | undefined,ipAddress:string | undefined,user:UserEntity): Promise<RefreshResponse>{

        const oldRefreshToken =await this.refreshTokenRepository.findByUserIdAndUserAgent(user.id,userAgent);

        if (oldRefreshToken) {
            oldRefreshToken.revokedAt = new Date();
            await Promise.all([
                this.refreshTokenRepository.save(oldRefreshToken),
                this.redis.del(`X-CSRF-Token:${user.id}:${oldRefreshToken.id}`)
            ]);
            await this.logService.actionLog(ipAddress,userAgent,user,LogType.REFRESH_TOKEN_REVOKED,"Refresh-Token revogado",200);
        }

        const payload: AccessTokenPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            tenant: {
                id: user.tenant.id,
                name: user.tenant.name,
            },
        };

        const newAccessToken = this.tokenService.generateAccessToken(payload);

        const newRefreshToken = this.tokenService.generateRefreshToken();

        const newCsrfToken = this.tokenService.generateCsrfToken();

        const refreshTokenEntity =this.refreshTokenRepository.create(
            {
                user,
                userAgent,
                ipAddress,
                refreshToken: newRefreshToken,
                refreshTokenExpiresAt: new Date(
                    Date.now() + 7 * 24 * 60 * 60 * 1000
                ),
            }
        );

        await Promise.all([
            this.logService.actionLog(ipAddress,userAgent,user,LogType.REFRESH_TOKEN_ISSUED,"Refresh-Token criado",201),
            this.logService.actionLog(ipAddress,userAgent,user,LogType.CSRF_TOKEN_CREATED,"X-CSRF-Token criado",201),
            this.refreshTokenRepository.save(refreshTokenEntity),
            this.redis.set(`x-csrf-token:${user.id}:${refreshTokenEntity.id}`, newCsrfToken, "EX", 60 * 15)
        ]);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            csrfToken: newCsrfToken,
        };

    }

    async logout(accessToken:string,ipAddress:string | undefined,userAgent:string | undefined,user:UserEntity,refreshTokenEntity:RefreshTokenEntity) : Promise<void> {
        refreshTokenEntity.revokedAt =  new Date();
        await Promise.all([
            this.refreshTokenRepository.save(refreshTokenEntity),
            this.redis.del(`x-csrf-token:${user.id}:${refreshTokenEntity.id}`),
            this.redis.set(`blacklist:access-Token:${accessToken}`,"true", "EX", 60 * 15)
        ]);
        await this.logService.actionLog(ipAddress,userAgent,user,LogType.REFRESH_TOKEN_REVOKED,"Refresh-Token revogado",200),
        await this.logService.actionLog(ipAddress,userAgent,user,LogType.TOKEN_BLACKLISTED,"Access-Token em lista negra",200),
        await this.logService.actionLog(ipAddress,userAgent,user,LogType.CSRF_TOKEN_INVALIDED,"x-csrf-token deletado do cache",200),
        this.logger.info(`Logout efetuado ip: ${ipAddress}`);
    };

}