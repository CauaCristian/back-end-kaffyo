import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { LogService } from "../services/Log_Service";
import { redisSource } from "../sources/Redis_Source";
import { LogType } from "../enum/Log_Type";

const logService = new LogService();
const redis = redisSource;

export const checkCsrf:RequestHandler = async(req,res,next)=>{
    const csrfToken = req.get("x-csrf-token");
    if (!csrfToken) {
        throw createHttpError(401, "Refresh-Token não informado");
    }

    const csrfTokenCached = await redis.get(`x-csrf-token:${req.user.sub}:${req.user.session.refreshTokenId}`);
    
    if(!csrfTokenCached || !csrfToken || csrfToken !== csrfTokenCached){
        await logService.actionLog(req.ip,req.get("user-agent"),req.user.sub,LogType.CSRF_TOKEN_INVALID,"Utilização de X-CSRF-Token inválido",401);
        throw createHttpError(401,"Utilização de X-CSRF-Token inválido");
    }
}