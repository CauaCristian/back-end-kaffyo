import { UserEntity } from "../entities/User_Entity";
import { PaginatedResponse } from "../interfaces/Paginated_Response";
import { dataSource } from "../sources/Data_Source";

export const userRepository = dataSource.getRepository(UserEntity).extend({
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

    },

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

    },

    async findByIdAndTenant(userId:string,tenantId:string):Promise<UserEntity | null>{
        
        return await this.findOne({
            where:{
                id:userId,
                tenant:{
                    id:tenantId
                }
            }
        });

    },

    async findById(userId:string):Promise<UserEntity | null>{
        
        return await this.findOne({
            where:{
                id:userId,
            }
        });

    },

    async findByEmail(email:string) : Promise<UserEntity | null>{
        
        return await this.findOne({
            where:{
                email:email
            },
            relations:["tenant"]
        });

    },
    
    async findByDocument(document:string):Promise<UserEntity | null>{

        return await this.findOne({
            where:{
                document:document
            }
        });
        
    },

    async createUser(data: Partial<UserEntity>): Promise<UserEntity | null> {
        
        const user = this.create(data);
        return await this.save(user);

    },

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

    },

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

    },

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
        return await this.remove(user);

    }
});