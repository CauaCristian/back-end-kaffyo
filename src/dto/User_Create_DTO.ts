import { IsEmail, IsEnum, IsString, IsUUID, Length,MaxLength} from "class-validator";
import { DocumentType } from "../enum/Document_Type";
import { DocumentIsValid } from "../decorators/Document_Is_Valid";

export class UserCreateDTO{ 

    @IsUUID()
    id!:string;

    @IsString() 
    @MaxLength(50) 
    name!:string;

    @IsString() 
    @MaxLength(50) 
    surname!:string;

    @IsEmail()
    email!:string;

    @IsString()
    @Length(6,10)    
    password!:string;
    
    @IsEnum(DocumentType)
    documentType!:DocumentType;

    @DocumentIsValid()
    document!:string;

}