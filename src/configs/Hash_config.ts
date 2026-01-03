import createHttpError from "http-errors";
import pino from "pino";
import { dataSource } from "../sources/Data_Source";
import { LogEntity } from "../entities/system/Log_Entity";
import { LogRepository } from "../repositories/Log_Repository";
import { LogType } from "../enum/Log_Type";

export const hashConfig = (async ()=>{
    const salt = process.env.HASH_SALT;
    if(!salt) {
        const logger = pino();
        const logRepository = dataSource.getRepository(LogEntity).extend(LogRepository.prototype);
        logger.error("Configuração de hash incorreta");
        const logEntity = logRepository.create({
            type:LogType.INTERNAL_SERVER_ERROR,
            message:"Configuração de hash incorreta",
            statusCode:500
        });
        await logRepository.save(logEntity);
        throw createHttpError("Configuração de hash incorreta")
    };
    return {
        salt:salt
    }
})();