import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { TokenService } from "../services/Token_Service";
import { LogType } from "../enum/Log_Type";
import { redisSource } from "../sources/Redis_Source";
import { LogService } from "../services/Log_Service";

const redis = redisSource;
const logService = new LogService();

export const checkAuth: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.get("authorization");
    if (!authHeader) throw createHttpError(401, "Access-Token não informado");
    if (!authHeader.startsWith("Bearer ")) {
      throw createHttpError(401, "Formato de Authorization inválido");
    }
    const accessToken = authHeader.replace("Bearer ","").trim();

    const payload = new TokenService().verifyToken(accessToken);

    if (!payload.sub) {
      throw createHttpError(401, "Token inválido ou expirado");
    }

    const inBlackList = await redis.get(`blacklist:access-Token:${accessToken}`);

    if(inBlackList) {
      await logService.actionLog(req.ip,req.get("user-agent"),payload.sub,LogType.TOKEN_BLACKLISTED,"Utilização de Refresh-Token Access-Token em lista negra",401);
      throw createHttpError(401,"Utilização de Refresh-Token Access-Token em lista negra");
    }
    req.accessToken = accessToken;
    req.user = payload;
    next();

  } catch (error) {
    next(error);
  }
};
