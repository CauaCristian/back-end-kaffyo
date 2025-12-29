import { IsObject, IsString, MaxLength } from "class-validator";

export class UserUpdateDTO{

    @IsString() 
    @MaxLength(50) 
    name!:string;
    
    @IsString() 
    @MaxLength(50) 
    surname!:string;

    @IsObject()
    settings!: Record<string, any>;
}