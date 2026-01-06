import { RefreshTokenEntity } from "../../entities/system/Refresh_Token_Entity";
import { UserEntity } from "../../entities/User_Entity";
import { AccessTokenPayload } from "../../interfaces/Access_Token_Payload";

declare global{
    namespace Express{
        interface Request{
            accessToken:string;
            user:AccessTokenPayload;
        }
    }
}
export{}