import { UserRole } from "../enum/User_Role";

export interface AccessTokenPayload{
    sub:string;
    email:string;
    role:UserRole;
    tenant:{
        id:string;
        name:string;
    }
}