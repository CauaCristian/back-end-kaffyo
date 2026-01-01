import { UserEntity } from "../entities/User_Entity";
import { UserRole } from "../enum/User_Role";
import { PaginatedResponse } from "../interfaces/Paginated_Response";
import { UserRepository } from "../repositories/User_Repository";
import { dataSource } from "../sources/Data_Source";
import createHttpError from "http-errors";
import { UserCreateDTO } from "../dto/User_Create_DTO";
import bcrypt from "bcryptjs";
import { DocumentType } from "../enum/Document_Type";
import { UserUpdateDTO } from "../dto/User_Update_DTO";
import { hashConfig } from "../configs/Hash_config";

export class UserService{

    private userRepository = dataSource.getRepository(UserEntity).extend(UserRepository.prototype);

    async findAll(page:number,limit:number,user:UserEntity):Promise<PaginatedResponse<UserEntity>>{
        if(user.role !== UserRole.ADMIN) throw createHttpError(403,"Usuário não autorizado a utilizar este recurso");
        return await this.userRepository.findAll(page,limit);
    }
    async findAllByTenant(page:number,limit:number,tenantId:string,user:UserEntity):Promise<PaginatedResponse<UserEntity>>{

        const targetUser = await this.userRepository.findById(user.id);

        if (!targetUser) throw createHttpError(404, "Usuário não encontrado");

        
        const effectiveTenantId =
            user.role === UserRole.ADMIN
            ? tenantId
            : user.tenant.id;

        return await this.userRepository.findAllByTenant(page,limit,effectiveTenantId);

    }
    async createUser(userCreateDTO:UserCreateDTO):Promise<UserEntity | null>{

        const [emailExists, documentExists] = await Promise.all([
            this.userRepository.findByEmail(userCreateDTO.email),
            this.userRepository.findByDocument(userCreateDTO.document),
        ]);

        if(!emailExists) throw createHttpError(409,"Usuário com este e-mail já cadastrado na base de dados");
        if(!documentExists) throw createHttpError(409,`Usuário com este ${userCreateDTO.documentType} já cadastrado na base de dados`);

        userCreateDTO.document = userCreateDTO.document.replace(/\D/g, "");
        if(userCreateDTO.document.length == 14 && userCreateDTO.documentType === DocumentType.CPF) throw createHttpError(406,"Tipo de documento invalido");
        if(userCreateDTO.document.length == 11 && userCreateDTO.documentType === DocumentType.CNPJ) throw createHttpError(406,"Tipo de docuemnto invalido");

        const hashPassword = await bcrypt.hash(userCreateDTO.password,hashConfig.salt);
        userCreateDTO.password = hashPassword;

        return await this.userRepository.createUser(userCreateDTO);

    }
    async updateUser(userUpdateDTO:UserUpdateDTO,user:UserEntity):Promise<UserEntity | null>{

        if(user.id !== userUpdateDTO.id && !(user.role === UserRole.ADMIN)) throw createHttpError(403,"Usuário não tem permissão de alterar os dados de outro usuário");
        return await this.userRepository.updateUser(userUpdateDTO);

    }
    async updateByTenant(userUpdateDTO: UserUpdateDTO,tenantId:string,user: UserEntity) : Promise<UserEntity | null>{
        const targetUser = await this.userRepository.findById(userUpdateDTO.id);

        if (!targetUser) throw createHttpError(404, "Usuário não encontrado");
        

        const canUpdate =
            user.id === targetUser.id ||
            user.role === UserRole.ADMIN ||
            (user.role === UserRole.OWNER &&
            user.tenant.id === targetUser.tenant.id);

        if (!canUpdate) throw createHttpError(403, "Usuário não tem permissão de alterar os dados de outro usuário");


        const effectiveTenantId =
            user.role === UserRole.ADMIN
            ? tenantId
            : user.tenant.id;

        return await this.userRepository.updateUserByTenant(userUpdateDTO, effectiveTenantId);

    }

    async deleteByTenant(user:UserEntity,userId:string,tenantId:string) : Promise<UserEntity | null> {

        const targetUser = await this.userRepository.findById(user.id);

        if(!targetUser) throw createHttpError(403,"Usuário não encontrado");

        const effectiveTenantId =
            user.role === UserRole.ADMIN
            ? tenantId
            : user.tenant.id;

        const effectiveUserId =
            user.role === UserRole.ADMIN
            ? userId
            : user.tenant.id;

        return await this.userRepository.deleteUserByTenant(effectiveUserId,effectiveTenantId);

    }

}