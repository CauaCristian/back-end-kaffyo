import { UserEntity } from "../entities/User_Entity";
import { UserRole } from "../enum/User_Role";
import { PaginatedResponse } from "../interface/Paginated_Response";
import { UserRepository } from "../repositories/User_Repository";
import { dataSource } from "../source/Data_Source";
import createHttpError from "http-errors";
import { UserCreateDTO } from "../dto/User_Create_DTO";
import bcrypt from "bcryptjs";
import { DocumentType } from "../enum/Document_Type";
import { UserUpdateDTO } from "../dto/User_Update_DTO";

export class UserService{

    private userRepository = dataSource.getRepository(UserEntity).extend(UserRepository.prototype);

    async findAll(page:number,limit:number,user:UserEntity):Promise<PaginatedResponse<UserEntity>>{
        if(user.role !== UserRole.ADMIN) throw createHttpError(401,"Usuário não autorizado a utilizar este recurso");
        return await this.userRepository.findAll(page,limit);
    }
    async findAllByTenant(page:number,limit:number,tenantId:string,user:UserEntity):Promise<PaginatedResponse<UserEntity>>{
        if(user.tenant.id !== tenantId && user.role !== UserRole.ADMIN) throw createHttpError(401,"Usuario nao tem autorização para acessar entidades deste tenant");
        return await this.userRepository.findAllByTenant(page,limit,tenantId);
    }
    async findById(userId:string,tenantId:string,user:UserEntity):Promise<UserEntity | null>{
        if(user.tenant.id !== tenantId && user.role !== UserRole.ADMIN) throw createHttpError(401,"Usuario não tem autorização para acessar entidades deste tenant");
        return await this.userRepository.findById(userId,tenantId);
    }
    async createUser(userCreateDTO:UserCreateDTO):Promise<UserEntity | null>{
        const [emailExists, documentExists] = await Promise.all([
            this.userRepository.findByEmail(userCreateDTO.email),
            this.userRepository.findByDocument(userCreateDTO.document),
        ]);
        if(!emailExists) throw createHttpError(409,"Usuario com este e-mail já cadastrado na base de dados");
        if(!documentExists) throw createHttpError(409,`Usuario com este ${userCreateDTO.documentType} já cadastrado na base de dados`);
        userCreateDTO.document = userCreateDTO.document.replace(/\D/g, "");
        if(userCreateDTO.document.length == 14 && userCreateDTO.documentType === DocumentType.CPF) throw createHttpError(406,"Tipo de documento invalido");
        if(userCreateDTO.document.length == 11 && userCreateDTO.documentType === DocumentType.CNPJ) throw createHttpError(406,"Tipo de docuemnto invalido");
        const hashPassword = await bcrypt.hash(userCreateDTO.password,Number.parseInt(process.env.PASSWORD_SALT || "10"));
        userCreateDTO.password = hashPassword;
        return await this.userRepository.createUser(userCreateDTO);
    }
    async updateUser(userUpdateDTO:UserUpdateDTO):Promise<UserEntity | null>{
        return this.userRepository.updateUser(userUpdateDTO);
    }

}