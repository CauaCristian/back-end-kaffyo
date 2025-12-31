import { UserEntity } from "../../entities/User_Entity";

declare global{
    namespace Express{
        interface Request{
            user?:UserEntity;
            cookieValue?:string;
        }
    }
}