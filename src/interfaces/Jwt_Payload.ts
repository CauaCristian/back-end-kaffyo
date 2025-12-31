import { UserRole } from "../enum/User_Role";

export interface JwtPayload{
    sub:string;
    email:string;
    role:UserRole;
    tenant:{
        id:string;
        name:string;
    }
    iat?: number;
    exp?: number;
}