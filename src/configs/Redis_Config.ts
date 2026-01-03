import createHttpError from "http-errors";
import pino from "pino";
import { dataSource } from "../sources/Data_Source";
import { LogEntity } from "../entities/system/Log_Entity";
import { LogRepository } from "../repositories/Log_Repository";
import { LogType } from "../enum/Log_Type";

export const redisConfig = (async ()=>{

    const redisHost =  process.env.REDIS_HOST;
    const redisPort = process.env.REDIS_PORT;
    const redisPassword = process.env.REDIS_PASSWORD;

    if(!redisHost || !redisPort || !redisPassword) {
        const logger = pino();
        const logRepository = dataSource.getRepository(LogEntity).extend(LogRepository.prototype);
        logger.error("Configuração de cache inválida");
        const logEntity = logRepository.create({
            type:LogType.INTERNAL_SERVER_ERROR,
            message:"Configuração de cache inválida",
            statusCode:500
        });
        await logRepository.save(logEntity);
        throw createHttpError(500,"Configuração de cache inválida")
    };

    return {
        host: redisHost,
        port: Number(redisPort),
        password: redisPassword,
        maxRetriesPerRequest: 5,
        enableReadyCheck: true,
    }

})();