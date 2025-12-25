import { TenantEntity } from "./Tenant_Entity";
import { LeadEntity } from "./Lead_Entity";
import { UserRole } from "../enum/User_Role";
import { DocumentType } from "../enum/Document_Type";
export declare class UserEntity {
    id: string;
    tenant: TenantEntity;
    leads: LeadEntity[];
    email: string;
    password: string;
    name: string;
    surname: string;
    document: DocumentType;
    role: UserRole;
    settings: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=User_Entity.d.ts.map