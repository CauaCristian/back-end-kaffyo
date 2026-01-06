import createHttpError from "http-errors";
import { LoginDTO } from "../dto/Login_DTO";
import { userRepository } from "../repositories/User_Repository";
import { dataSource } from "../sources/Data_Source";
import * as bcrypt from "bcryptjs";
import { TokenService } from "./Token_Service";
import { AccessTokenPayload } from "../interfaces/Access_Token_Payload";
import { LoginResponse } from "../interfaces/Login_Response";
import { RefreshTokenEntity } from "../entities/system/Refresh_Token_Entity";
import { refreshTokenRepository } from "../repositories/Refresh_Token_Repository";
import { redisSource } from "../sources/Redis_Source";
import { LogType } from "../enum/Log_Type";
import pino from "pino";
import { LogService } from "./Log_Service";
import { RefreshResponse } from "../interfaces/Refresh_Response";

export class AuthService{

    private userRepository = userRepository;
    private refreshTokenRepository = refreshTokenRepository;
    private tokenService = new TokenService();
    private redis = redisSource;
    private logger = pino();
    private logService = new LogService();

    async login (loginDTO:LoginDTO,userAgent:string | undefined,ipAddress:string | undefined) : Promise<LoginResponse>{

        const user = await this.userRepository.findByEmail(loginDTO.email);

        if (!user) {
            throw createHttpError(401, "Email incorreto");
        };

        const isCorrectPassword = await bcrypt.compare(loginDTO.password,user.password);

        if (!isCorrectPassword) {
            throw createHttpError(401, "Senha incorreta");
        };

        const oldRefreshToken =await this.refreshTokenRepository.findByUserIdAndUserAgent(user.id,userAgent);

        if (oldRefreshToken) {
            oldRefreshToken.revokedAt = new Date();
            await Promise.all([
                this.refreshTokenRepository.save(oldRefreshToken),
                this.redis.del(`x-csrf-token:${user.id}:${oldRefreshToken.id}`)
            ]);
            await this.logService.actionLog(ipAddress,userAgent,user.id,LogType.REFRESH_TOKEN_REVOKED,"Refresh-Token revogado",200);
        }

        const newRefreshToken = this.tokenService.generateRefreshToken();

        const newCsrfToken = this.tokenService.generateCsrfToken();

        const refreshTokenEntity = this.refreshTokenRepository.create(
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

        const newRefreshTokenEntity = await this.refreshTokenRepository.save(refreshTokenEntity);
        
        const payload: AccessTokenPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            tenant: {
                id: user.tenant.id,
                name: user.tenant.name,
            },
            session:{
                refreshTokenId:newRefreshTokenEntity.id
            }
        };

        const newAccessToken = this.tokenService.generateAccessToken(payload);

        await Promise.all([
            this.logService.actionLog(ipAddress,userAgent,payload.sub,LogType.ACCESS_GRANTED,"Login efetuado",200),
            this.logService.actionLog(ipAddress,userAgent,payload.sub,LogType.REFRESH_TOKEN_ISSUED,"Refresh-Token criado",201),
            this.logService.actionLog(ipAddress,userAgent,payload.sub,LogType.CSRF_TOKEN_CREATED,"X-CSRF-Token criado",201),
            this.redis.set(`x-csrf-token:${user.id}:${newRefreshTokenEntity.id}`, newCsrfToken, {expiration:{type:"EX",value:86400 * 7,}})
        ]);

        this.logger.info(`Login efetuado ip: ${ipAddress}`);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            csrfToken: newCsrfToken,
        };

    };

    async refresh(userAgent:string | undefined,ipAddress:string | undefined,refreshTokenHash:string): Promise<RefreshResponse>{

        const oldRefreshToken = await this.refreshTokenRepository.findByRefreshToken(refreshTokenHash);

        if(!oldRefreshToken){
            throw createHttpError(401,"Refresh-Token informado é inválido");
        }

        if(oldRefreshToken.revokedAt){
            await this.refreshTokenRepository.revokeAllByUser(oldRefreshToken.user.id);
            await this.logService.actionLog(ipAddress,userAgent,oldRefreshToken.user.id,LogType.REFRESH_TOKEN_REVOKED,"Refresh-Token informado já foi revogado",401);
            throw createHttpError(401,"Refresh-Token informado é inválido");
        }
        if (oldRefreshToken.refreshTokenExpiresAt < new Date()) {
            await this.logService.actionLog(ipAddress,userAgent,oldRefreshToken.user.id,LogType.REFRESH_TOKEN_INVALID,"Refresh-Token informado está expirado",401);
            throw createHttpError(401, "Refresh-Token expirado");
        }
        

        oldRefreshToken.revokedAt = new Date();

        await Promise.all([
            this.refreshTokenRepository.save(oldRefreshToken),
            this.redis.del(`x-csrf-token:${oldRefreshToken.user.id}:${oldRefreshToken.id}`)
        ]);

        await this.logService.actionLog(ipAddress,userAgent,oldRefreshToken.id,LogType.REFRESH_TOKEN_REVOKED,"Refresh-Token revogado",200);

        const newRefreshToken = this.tokenService.generateRefreshToken();

        const newCsrfToken = this.tokenService.generateCsrfToken();

        const refreshTokenEntity =this.refreshTokenRepository.create(
            {
                user:oldRefreshToken.user,
                userAgent,
                ipAddress,
                refreshToken: newRefreshToken,
                refreshTokenExpiresAt: new Date(
                    Date.now() + 7 * 24 * 60 * 60 * 1000
                ),
            }
        );
        await this.refreshTokenRepository.save(refreshTokenEntity);

        const payload: AccessTokenPayload = {
            sub: oldRefreshToken.user.id,
            email: oldRefreshToken.user.email,
            role: oldRefreshToken.user.role,
            tenant: {
                id: oldRefreshToken.user.tenant.id,
                name: oldRefreshToken.user.tenant.name,
            },
            session:{
                refreshTokenId:refreshTokenEntity.id
            }
        };

        const newAccessToken = this.tokenService.generateAccessToken(payload);

        await Promise.all([
            this.logService.actionLog(ipAddress,userAgent,refreshTokenEntity.user.id,LogType.REFRESH_TOKEN_ISSUED,"Refresh-Token criado",201),
            this.logService.actionLog(ipAddress,userAgent,refreshTokenEntity.user.id,LogType.CSRF_TOKEN_CREATED,"X-CSRF-Token criado",201),
            this.redis.set(`x-csrf-token:${refreshTokenEntity.user.id}:${refreshTokenEntity.id}`, newCsrfToken, {expiration:{type:"EX",value:86400 * 7,}})
        ]);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            csrfToken: newCsrfToken,
        };

    }

    async logout(accessToken:string,ipAddress:string | undefined,userAgent:string | undefined,user:AccessTokenPayload,refreshTokenEntity:RefreshTokenEntity) : Promise<void> {
        refreshTokenEntity.revokedAt =  new Date();
        await Promise.all([
            this.refreshTokenRepository.save(refreshTokenEntity),
            this.redis.del(`x-csrf-token:${user.sub}:${refreshTokenEntity.id}`),
            this.redis.set(`blacklist:access-Token:${accessToken}`,"true", {expiration:{type:"EX",value: 60 * 15,}})
        ]);
        await this.logService.actionLog(ipAddress,userAgent,user.sub,LogType.REFRESH_TOKEN_REVOKED,"Refresh-Token revogado",200),
        await this.logService.actionLog(ipAddress,userAgent,user.sub,LogType.TOKEN_BLACKLISTED,"Access-Token em lista negra",200),
        await this.logService.actionLog(ipAddress,userAgent,user.sub,LogType.CSRF_TOKEN_INVALIDED,"x-csrf-token deletado do cache",200),
        this.logger.info(`Logout efetuado ip: ${ipAddress}`);
    };

}