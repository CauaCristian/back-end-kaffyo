import { dataSource } from "../source/Data_Source";
import { UserEntity } from "../entities/User_Entity";

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

    async createUser(userEntity:UserEntity){
        return this.repo.create(userEntity);
    }

}