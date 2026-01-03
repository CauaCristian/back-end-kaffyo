import { Repository } from "typeorm";
import { LogEntity } from "../entities/system/Log_Entity";
import { PaginatedResponse } from "../interfaces/Paginated_Response";
import { LogType } from "../enum/Log_Type";

export class LogRepository extends Repository<LogEntity>{
    
    async findAll(page:number,limit:number):Promise<PaginatedResponse<LogEntity>>{
        const result = await this.findAndCount({
            skip:(page-1) * limit,
            take:limit
        })
        return {
            data:result[0],
            meta:{
                page:page,
                limit:limit,
                total:result[1]
            }
        };
    };

    async findByType(page:number,limit:number,type:LogType){
        const result = await this.findAndCount({
            where:{
                type:type
            },
            skip:(page-1) * limit,
            take:limit
        })
        return {
            data:result[0],
            meta:{
                page:page,
                limit:limit,
                total:result[1]
            }
        };
    };

}