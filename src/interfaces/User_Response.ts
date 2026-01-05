import { DocumentType } from "../enum/Document_Type";

export interface UserResponse{ 
    id:string;
    name:string;
    surname:string;
    email:string;
    password:string;
    documentType:DocumentType;
    document:string;
    settings: Record<string, any>;
}