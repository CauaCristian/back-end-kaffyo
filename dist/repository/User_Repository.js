import { dataSource } from "../source/Data_Source";
import { UserEntity } from "../entities/User_Entity";
export class UserRepository {
    repo;
    constructor() {
        this.repo = dataSource.getRepository(UserEntity);
    }
    async findById(userId, tenantId) {
        return this.repo.findOne({
            where: {
                id: userId,
                tenant: { id: tenantId },
            }
        });
    }
}
//# sourceMappingURL=User_Repository.js.map