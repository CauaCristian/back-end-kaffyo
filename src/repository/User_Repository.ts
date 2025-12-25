import { dataSource } from "../source/Data_Source.js";
import { UserEntity } from "../entities/User_Entity.js";

export class UserRepository{

    private readonly repo;

    constructor() {
        this.repo = dataSource.getRepository(UserEntity);
    }

    async findById(userId:string,tenantId:string):Promise<UserEntity | null>{
        return this.repo.findOne({
            where:{
                id:userId,
                tenant:{id:tenantId},
            }
        });
    }

}