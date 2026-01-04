import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { dataSource } from "../sources/Data_Source";
import { RefreshTokenEntity } from "../entities/system/Refresh_Token_Entity";
import { RefreshTokenRepository } from "../repositories/Refresh_Token_Repository";
import { LogService } from "../services/Log_Service";
import { UserRepository } from "../repositories/User_Repository";
import { UserEntity } from "../entities/User_Entity";
import { redisSource } from "../sources/Redis_Source";
import { LogType } from "../enum/Log_Type";

const refreshTokenRepository = dataSource.getRepository(RefreshTokenEntity).extend(RefreshTokenRepository.prototype);
const logService = new LogService();
const userRepository = dataSource.getRepository(UserEntity).extend(UserRepository.prototype);
const redis = redisSource;

export const checkCsrf:RequestHandler = async(req,res,next)=>{
    const csrfToken = req.get("x-csrf-token");
    if (!csrfToken) {
        throw createHttpError(401, "Refresh-Token não informado");
    }
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken) {
        throw createHttpError(401, "Refresh-Token não informado");
    }
    const user = await userRepository.findById(req.user.id);
    const refreshTokenEntity = await refreshTokenRepository.findByRefreshToken(refreshToken);
    if (!user) throw createHttpError(401, "Usuário não encontrado");
    
    if(!refreshTokenEntity){
        await logService.actionLog(req.ip,req.get("user-agent"),user,LogType.REFRESH_TOKEN_INVALID,"Utilização de Refresh-Token inválido",401);
        throw createHttpError(401,"Utilização de Refresh-Token inválido");
    }

    if(refreshTokenEntity.revokedAt){
        await logService.actionLog(req.ip,req.get("user-agent"),user,LogType.REFRESH_TOKEN_REVOKED,"Utilização de Refresh-Token revogado",401);
        throw createHttpError(401,"Utilização de Refresh-Token revogado");
    }
    const csrfTokenCached = await redis.get(`x-csrf-token:${user.id}:${refreshTokenEntity.id}`);
    
    if(!csrfTokenCached || !csrfToken || csrfToken !== csrfTokenCached){
        await logService.actionLog(req.ip,req.get("user-agent"),user,LogType.CSRF_TOKEN_INVALID,"Utilização de X-CSRF-Token inválido",401);
        throw createHttpError(401,"Utilização de X-CSRF-Token inválido");
    }
    req.refreshToken = refreshTokenEntity;
    req.csrfToken = csrfToken;
}