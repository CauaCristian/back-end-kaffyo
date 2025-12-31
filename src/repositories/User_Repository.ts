import { Repository } from "typeorm";
import { UserEntity } from "../entities/User_Entity";
import { PaginatedResponse } from "../interfaces/Paginated_Response";

export class UserRepository extends Repository<UserEntity>{
    
    async findAll(page:number,limit:number):Promise<PaginatedResponse<UserEntity>>{

        const result = await this.findAndCount({
            skip:(page -1 )* limit,
            take:limit
        });
        return {
            data:result[0],
            meta:{
                page:page,
                limit:limit,
                total:result[1],
            }
        };

    }

    async findAllByTenant(page:number,limit:number,tenantId:string):Promise<PaginatedResponse<UserEntity>>{
        
        const result = await this.findAndCount({
            where:{
                tenant:{
                    id:tenantId
                }
            },
            skip:(page-1)* limit,
            take:limit,
        });
        
        return {
            data:result[0],
            meta:{
                page:page,
                limit:limit,
                total:result[1],
            }
        };

    }

    async findByIdAndTenant(userId:string,tenantId:string):Promise<UserEntity | null>{
        
        return await this.findOne({
            where:{
                id:userId,
                tenant:{
                    id:tenantId
                }
            }
        });

    }

    async findById(userId:string):Promise<UserEntity | null>{
        
        return await this.findOne({
            where:{
                id:userId,
            }
        });

    }


    async findByEmail(email:string):Promise<UserEntity | null>{
        
        return this.findOne({
            where:{
                email:email
            }
        });

    }
    async findByDocument(document:string):Promise<UserEntity | null>{

        return this.findOne({
            where:{
                document:document
            }
        });
        
    }

    async createUser(data: Partial<UserEntity>): Promise<UserEntity | null> {
        
        await this.insert(data);
        return await this.findOneBy({ email: data.email });

    }

    async updateUser(data:Partial<UserEntity>):Promise<UserEntity | null>{

        const user = await this.findOne({
            where:{
                id:data.id
            }
        });
        if(!user){
            return null;
        }
        Object.assign(user,data);
        return await this.save(user);

    }

    async updateUserByTenant(data:Partial<UserEntity>,tenantId:string):Promise<UserEntity | null>{

        const user = await this.findOne({
            where:{
                tenant:{
                    id:tenantId
                },
                id:data.id
            }
        });
        if(!user){
            return null;
        }
        Object.assign(user,data);
        return await this.save(user);

    }

    async deleteUserByTenant(userId:string,tenantId:string):Promise<UserEntity | null>{
        
        const user = await this.findOne({
            where:{
                tenant:{
                    id:tenantId
                },
                id:userId
            }
        });
        if(!user){
            return null;
        }
        return this.remove(user);

    }
    
}