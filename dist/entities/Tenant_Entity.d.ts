import { PlanEntity } from "./system/Plan_Entity";
import { TenantType } from "../enum/Tenant_Type";
export declare class TenantEntity {
    id: string;
    name: string;
    slug: string;
    plan: PlanEntity;
    type: TenantType;
    maxUsers: number;
    settings: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
//# sourceMappingURL=Tenant_Entity.d.ts.map