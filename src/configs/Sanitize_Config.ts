import createHttpError from "http-errors";
import { LogType } from "../enum/Log_Type";
import { dataSource } from "../sources/Data_Source";
import pino from "pino";
import { LogEntity } from "../entities/system/Log_Entity";
import { LogRepository } from "../repositories/Log_Repository";

export const sanitizeConfig = (async ()=>{

    const max_depth = process.env.MAX_DEPTH;
    const max_array_length = process.env.MAX_ARRAY_LENGTH;
    const max_nodes = process.env.MAX_NODES;
    const body_limit = process.env.BODY_LIMIT;

    if(!max_depth || !max_array_length || !max_nodes || !body_limit) {
        const logger = pino();
        const logRepository = dataSource.getRepository(LogEntity).extend(LogRepository.prototype);
        logger.error("Configuração de sanitização invalida");
        const logEntity = logRepository.create({
            type:LogType.INTERNAL_SERVER_ERROR,
            message:"Configuração de sanitização invalida",
            statusCode:500
        });
        await logRepository.save(logEntity);
        throw createHttpError(500,"Configuração de sanitização invalida")
    };

    return {
        max_depth:Number.parseInt(max_depth),
        max_array_length:Number.parseInt(max_array_length),
        max_nodes:Number.parseInt(max_nodes),
        body_limit:body_limit
    }
    
})();