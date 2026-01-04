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
import { LogType } from "../enum/Log_Type";
import { LogService } from "./Log_Service";

export class UserService{

    private userRepository = dataSource.getRepository(UserEntity).extend(UserRepository.prototype);
    private logService = new LogService();

    async findAll(page:string| undefined,limit:string| undefined,user:UserEntity):Promise<PaginatedResponse<UserEntity>>{
        if(!page || !limit) throw createHttpError(400,"page e limit é Obrigatorio");
        if(user.role !== UserRole.ADMIN) throw createHttpError(403,"Usuário não autorizado a utilizar este recurso");
        return await this.userRepository.findAll(Number.parseInt(page),Number.parseInt(limit));
    }
    async findAllByTenant(page:string| undefined,limit:string| undefined,tenantId:string,user:UserEntity) : Promise<PaginatedResponse<UserEntity>>{

        if(!page || !limit) throw createHttpError(400,"page e limit é Obrigatorio");

        const targetUser = await this.userRepository.findById(user.id);

        if (!targetUser) throw createHttpError(404, "Usuário não encontrado");

        const effectiveTenantId =
            user.role === UserRole.ADMIN
            ? tenantId
            : user.tenant.id;

        return await this.userRepository.findAllByTenant(Number.parseInt(page),Number.parseInt(limit),effectiveTenantId);

    }
    async createUser(userCreateDTO:UserCreateDTO,ipAddress:string|undefined,userAgent:string|undefined):Promise<UserEntity | null>{

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
        const user = await this.userRepository.createUser(userCreateDTO);
        if(!user) throw createHttpError(400,"Erro ao criar usuário");
        await this.logService.actionLog(ipAddress,userAgent,user,LogType.CREATE_ENTITY,"Usuário criado",201);
        return user;

    }
    async updateUser(userUpdateDTO:UserUpdateDTO,user:UserEntity,ipAddress:string|undefined,userAgent:string|undefined):Promise<UserEntity | null>{

        if(user.id !== userUpdateDTO.id && !(user.role === UserRole.ADMIN)) {
            await this.logService.actionLog(ipAddress,userAgent,user,LogType.ROLE_VIOLATION,"Usuário não tem permissão de alterar os dados de outro usuário",403);
            throw createHttpError(403,"Usuário não tem permissão de alterar os dados de outro usuário");
        };
        await this.logService.actionLog(ipAddress,userAgent,user,LogType.UPDATE_ENTITY,"Usuário editado",200);
        return await this.userRepository.updateUser(userUpdateDTO);

    }
    async updateByTenant(userUpdateDTO: UserUpdateDTO,tenantId:string,user: UserEntity,ipAddress:string|undefined,userAgent:string|undefined) : Promise<UserEntity | null>{

        const targetUser = await this.userRepository.findById(userUpdateDTO.id);

        if (!targetUser) throw createHttpError(404, "Usuário não encontrado");
        
        const canUpdate = user.id === targetUser.id ||user.role === UserRole.ADMIN ||(user.role === UserRole.OWNER && user.tenant.id === targetUser.tenant.id);

        if (!canUpdate) {
            await this.logService.actionLog(ipAddress,userAgent,user,LogType.ROLE_VIOLATION,"Usuário não tem permissão de alterar os dados de outro usuário",403);
            throw createHttpError(403, "Usuário não tem permissão de alterar os dados de outro usuário");
        };

        const effectiveTenantId =
            user.role === UserRole.ADMIN
            ? tenantId
            : user.tenant.id;
        await this.logService.actionLog(ipAddress,userAgent,user,LogType.UPDATE_ENTITY,"Usuário editado",200);
        return await this.userRepository.updateUserByTenant(userUpdateDTO, effectiveTenantId);

    }

    async deleteByTenant(user:UserEntity,userId:string,tenantId:string,ipAddress:string|undefined,userAgent:string|undefined) : Promise<UserEntity | null> {

        const targetUser = await this.userRepository.findById(user.id);

        if(!targetUser) throw createHttpError(403,"Usuário não encontrado");

        const canDelete = user.id === targetUser.id ||user.role === UserRole.ADMIN ||(user.role === UserRole.OWNER && user.tenant.id === targetUser.tenant.id);
        
        if (!canDelete) {
            await this.logService.actionLog(ipAddress,userAgent,user,LogType.ROLE_VIOLATION,"Usuário não tem permissão de excluir outro usuário",403);
            throw createHttpError(403, "Usuário não tem permissão de excluir outro usuário");
        };

        const effectiveTenantId =
            user.role === UserRole.ADMIN
            ? tenantId
            : user.tenant.id;

        const effectiveUserId =
            user.role === UserRole.ADMIN
            ? userId
            : user.tenant.id;
        await this.logService.actionLog(ipAddress,userAgent,user,LogType.DELETE_ENTITY,"Usuário deletado",200);
        return await this.userRepository.deleteUserByTenant(effectiveUserId,effectiveTenantId);

    }

}