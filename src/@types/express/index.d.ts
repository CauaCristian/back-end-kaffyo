import { RefreshTokenEntity } from "../../entities/system/Refresh_Token_Entity";
import { UserEntity } from "../../entities/User_Entity";
import { AccessTokenPayload } from "../../interfaces/Access_Token_Payload";

declare global{
    namespace Express{
        interface Request{
            refreshToken:RefreshTokenEntity,
            accessToken:string;
            csrfToken:string;
            user:AccessTokenPayload;
            page:number;
            limit:number;
        }
    }
}