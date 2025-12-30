import { IsObject, IsString, IsUUID, MaxLength } from "class-validator";

export class UserUpdateDTO{

    @IsUUID()
    id!:string;

    @IsString() 
    @MaxLength(50) 
    name!:string;
    
    @IsString() 
    @MaxLength(50) 
    surname!:string;

    @IsObject()
    settings!: Record<string, any>;
}