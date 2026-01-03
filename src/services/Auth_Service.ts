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
import { LogEntity } from "../entities/system/Log_Entity";
import { LogRepository } from "../repositories/Log_Repository";
import { LogType } from "../enum/Log_Type";
import pino from "pino";

export class AuthService{

    private userRepository = dataSource.getRepository(UserEntity).extend(UserRepository.prototype);
    private refreshTokenRepository = dataSource.getRepository(RefreshTokenEntity).extend(RefreshTokenRepository.prototype);
    private tokenService = new TokenService();
    private redis = redisSource;
    private logRespository = dataSource.getRepository(LogEntity).extend(LogRepository.prototype);
    private logger = pino();
    async login (loginDTO:LoginDTO,userAgent:string,ipAddress:string) : Promise<LoginResponse>{

        const user = await this.userRepository.findByEmail(loginDTO.email);
        if (!user) throw createHttpError(401, "Email incorreto");

        const isCorrectPassword = await bcrypt.compare(loginDTO.password,user.password);
        if (!isCorrectPassword) throw createHttpError(401, "Senha incorreta");

        const oldRefreshToken =await this.refreshTokenRepository.findByUserIdAndUserAgent(user.id,userAgent);

        if (oldRefreshToken) {
            oldRefreshToken.revokedAt = new Date();
            await Promise.all([
                this.refreshTokenRepository.save(oldRefreshToken),
                this.redis.del(`X-CSRF-Token:${user.id}:${oldRefreshToken.id}`)
            ]);
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
        const logEntity = this.logRespository.create({
            ipAddress:ipAddress,
            userAgent:userAgent,
            user:user,
            route:"/auth/login",
            type:LogType.REFRESH_TOKEN_ISSUED,
            statusCode:201,
            message:"Refresh Token criado"
        });
        
        await Promise.all([
            this.refreshTokenRepository.save(refreshTokenEntity),
            this.logRespository.save(logEntity),
            this.redis.set(`x-csrf-token:${user.id}:${refreshTokenEntity.id}`, newCsrfToken, "EX", 60 * 15)
        ]);

        this.logger.info(`Login efetuado ip: ${ipAddress}`);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            csrfToken: newCsrfToken,
        };

    }

    async logout(userId:string,refreshTokenEntity:RefreshTokenEntity,accessToken:string,ipAddress:string) : Promise<void> {
        refreshTokenEntity.revokedAt =  new Date();
        await Promise.all([
            this.refreshTokenRepository.save(refreshTokenEntity),
            this.redis.del(`x-csrf-token:${userId}:${refreshTokenEntity.id}`),
            this.redis.set(`blacklist:access-Token:${accessToken}`,"true", "EX", 60 * 15)
        ]);
        this.logger.info(`Logout efetuado ip: ${ipAddress}`);
    }

}