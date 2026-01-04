import { RefreshTokenEntity } from "../../entities/system/Refresh_Token_Entity";
import { UserEntity } from "../../entities/User_Entity";

declare global{
    namespace Express{
        interface Request{
            refreshToken:RefreshTokenEntity,
            accessToken:string;
            csrfToken:string;
            user:UserEntity;
            page:number;
            limit:number;
        }
    }
}