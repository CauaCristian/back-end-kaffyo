import createHttpError from "http-errors";
import * as jwt from "jsonwebtoken"
import { dataSource } from "../sources/Data_Source";
import pino from "pino";
import { LogType } from "../enum/Log_Type";
import { LogRepository } from "../repositories/Log_Repository";
import { LogEntity } from "../entities/system/Log_Entity";

export const jwtConfig = (async ()=>{
    const secret = process.env.JWT_SECRET;
    const algorithm = process.env.JWT_ALGORITHM as jwt.Algorithm;
    const expiresIn = process.env.JWT_EXPIRATION as jwt.SignOptions["expiresIn"]; 

    if (!secret || !algorithm || !expiresIn) {
      const logger = pino();
      const logRepository = dataSource.getRepository(LogEntity).extend(LogRepository.prototype);
      logger.error("Configuração de autenticação inválida");
      const logEntity = logRepository.create({
            type:LogType.INTERNAL_SERVER_ERROR,
            message:"Configuração de autenticação inválida",
            statusCode:500
      });
      await logRepository.save(logEntity);
      throw createHttpError(500,"Configuração de autenticação inválida");
    }

    return {
      secret,
      algorithm,
      expiresIn
    };
})();