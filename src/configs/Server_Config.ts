import createHttpError from "http-errors";
import pino from "pino";
import { dataSource } from "../sources/Data_Source";
import { LogEntity } from "../entities/system/Log_Entity";
import { LogRepository } from "../repositories/Log_Repository";
import { LogType } from "../enum/Log_Type";

export const serverConfig = (async()=>{
    const serverPort = process.env.PORT;
    if(!serverPort) {
        const logger = pino();
        const logRepository = dataSource.getRepository(LogEntity).extend(LogRepository.prototype);
        logger.error("Configuração de server invalida");
        const logEntity = logRepository.create({
            type:LogType.INTERNAL_SERVER_ERROR,
            message:"Configuração de server invalida",
            statusCode:500
        });
        await logRepository.save(logEntity);
        throw createHttpError("Configuração de server invalida")
    };
    return {
        serverPort
    }
})();