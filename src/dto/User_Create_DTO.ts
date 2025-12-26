import { IsString, MaxLength } from "class-validator";

export class UserCreateDTO{ 
    @IsString() 
    @MaxLength(50) 
    name!:string 
}