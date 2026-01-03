import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { dataSource } from "../sources/Data_Source";
import { UserEntity } from "../entities/User_Entity";
import { UserRepository } from "../repositories/User_Repository";
import { TokenService } from "../services/Token_Service";
import { RefreshTokenEntity } from "../entities/system/Refresh_Token_Entity";
import { RefreshTokenRepository } from "../repositories/Refresh_Token_Repository";
import { LogRepository } from "../repositories/Log_Repository";
import { LogEntity } from "../entities/system/Log_Entity";
import { LogType } from "../enum/Log_Type";
import pino from "pino";
import { redisSource } from "../sources/Redis_Source";

const refreshTokenRepository = dataSource.getRepository(RefreshTokenEntity).extend(RefreshTokenRepository.prototype);
const logRepository = dataSource.getRepository(LogEntity).extend(LogRepository.prototype);
const logger = pino()
const redis = redisSource;

export const checkAuth: RequestHandler = async (req, res, next) => {
  try {

    const authHeader = req.get("authorization");
    if (!authHeader) throw createHttpError(401, "Access-Token não informado");
    if (!authHeader.startsWith("Bearer ")) {
      throw createHttpError(401, "Formato de Authorization inválido");
    }
    const accessToken = authHeader.replace("Bearer ","").trim();

    const csrfToken = req.get("x-csrf-token");

    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken) {
      throw createHttpError(401, "Refresh-Token não informado");
    }

    const payload = new TokenService().verifyToken(accessToken);

    if (!payload?.sub) {
      throw createHttpError(401, "Token inválido ou expirado");
    }

    const userRepository = dataSource.getRepository(UserEntity).extend(UserRepository.prototype);

    const user = await userRepository.findById(payload.sub);

    if (!user) throw createHttpError(401, "Usuário não encontrado");

    const refreshTokenEntity = await refreshTokenRepository.findByRefreshToken(refreshToken);

    if(!refreshTokenEntity){

      const logEntity = logRepository.create({
        ipAddress:req.ip,
        userAgent:req.get("user-agent"),
        user:user,
        type:LogType.REFRESH_TOKEN_INVALID,
        statusCode:401,
        message:"Refresh-Token inválido"
      });

      await logRepository.save(logEntity);
      logger.error(`Refresh-Token inválido ip: ${req.ip} userAgent: ${req.get("user-agent")}`);

      throw createHttpError(401,"Refresh-Token inválido");
    }

    if(refreshTokenEntity.revokedAt){

      const logEntity = logRepository.create({
        ipAddress:req.ip,
        userAgent:req.get("user-agent"),
        user:user,
        type:LogType.REFRESH_TOKEN_REVOKED,
        statusCode:401,
        message:"Refresh-Token revogado"
      });

      await logRepository.save(logEntity);
      logger.error(`Refresh-Token revogado ip: ${req.ip} userAgent: ${req.get("user-agent")}`);

      throw createHttpError(401,"Refresh-Token revogado");
    }

    const csrfTokenCached = await redis.get(`x-csrf-token:${user.id}:${refreshTokenEntity.id}`);

    if(!csrfTokenCached || !csrfToken || csrfToken !== csrfTokenCached){

      const logEntity = logRepository.create({
        ipAddress:req.ip,
        userAgent:req.get("user-agent"),
        user:user,
        type:LogType.CSRF_TOKEN_INVALID,
        statusCode:401,
        message:"X-CSRF-Token inválido"
      });

      await logRepository.save(logEntity);
      logger.error(`X-CSRF-Token inválido ip: ${req.ip} userAgent: ${req.get("user-agent")}`);

      throw createHttpError(401,"X-CSRF-Token inválido");
    }

    req.refreshToken = refreshTokenEntity;
    req.accessToken = accessToken;
    req.csrfToken = csrfToken;
    req.user = user;
    next();

  } catch (error) {

    next(error);

  }
};
