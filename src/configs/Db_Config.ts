import createHttpError from "http-errors";
import {pino} from "pino";
import { dataSource } from "../sources/Data_Source";
import { LogEntity } from "../entities/system/Log_Entity";
import { LogRepository } from "../repositories/Log_Repository";
import { LogType } from "../enum/Log_Type";
export const dbConfig = (async ()=>{

    const dbType = process.env.DB_TYPE;
    const dbHost = process.env.DB_HOST;
    const dbPort = process.env.DB_PORT;
    const dbUsername = process.env.DB_USERNAME;
    const dbPassword = process.env.DB_PASSWORD;
    const dbDatabase = process.env.DB_DATABASE;
    const dbEntities = process.env.DB_ENTITIES?.split(",").map(a => a.trim());
    const dbSynchronize = process.env.DB_SYNCHRONIZE;

    if(!dbHost || !dbPort || !dbUsername || !dbPassword || !dbDatabase) {
        const logger = pino();
        const logRepository = dataSource.getRepository(LogEntity).extend(LogRepository.prototype);
        logger.error("Configuração de database inválida");
        const logEntity = logRepository.create({
            type:LogType.INTERNAL_SERVER_ERROR,
            message:"Configuração de database inválida",
            statusCode:500
        });
        await logRepository.save(logEntity);
        throw createHttpError(500,"Configuração de database inválida")
    };

    return {
        dbType,
        dbHost,
        dbPort,
        dbUsername,
        dbPassword,
        dbDatabase,
        dbEntities,
        dbSynchronize
    };

})();