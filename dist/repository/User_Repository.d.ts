import { UserEntity } from "../entities/User_Entity";
export declare class UserRepository {
    private readonly repo;
    constructor();
    findById(userId: string, tenantId: string): Promise<UserEntity | null>;
}
//# sourceMappingURL=User_Repository.d.ts.map