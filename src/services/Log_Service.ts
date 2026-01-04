import pino from "pino";
import { LogEntity } from "../entities/system/Log_Entity";
import { UserEntity } from "../entities/User_Entity";
import { LogType } from "../enum/Log_Type";
import { LogRepository } from "../repositories/Log_Repository";
import { dataSource } from "../sources/Data_Source";

export class LogService{
    private logRepository = dataSource.getRepository(LogEntity).extend(LogRepository.prototype);
    private logger = pino();

    async routeLog(logType:LogType,message:string,route:string){

        const logEntity = this.logRepository.create({
                route:route,
                statusCode:500,
                type:logType,
                message:message
        });
        await this.logRepository.save(logEntity);
        this.logger.error(`status: 500; message: ${message}; route: ${route}`);

    }

    async systemLog(logType:LogType,message:string){

        const logEntity = this.logRepository.create({
                statusCode:500,
                type:logType,
                message:message
        });
        await this.logRepository.save(logEntity);
        this.logger.error(`status: 500; message: ${message};`);

    }

    async actionLog(ipAddress:string | undefined,userAgent:string | undefined,user:UserEntity | undefined,logType:LogType,message:string,statusCode:number){

        const logEntity = this.logRepository.create({
                ipAddress:ipAddress,
                userAgent:userAgent,
                user:user,
                statusCode:statusCode,
                type:logType,
                message:message
        });
        await this.logRepository.save(logEntity);
        this.logger.error(`status: ${statusCode}; message: ${message}; ip: ${ipAddress}; userAgent: ${userAgent};`);

    }

}