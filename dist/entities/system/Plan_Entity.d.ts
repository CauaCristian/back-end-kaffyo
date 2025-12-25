import { TenantEntity } from "../Tenant_Entity";
export declare class PlanEntity {
    id: string;
    tenants: TenantEntity[];
    name: string;
    description: string;
    price: number;
    isActive: boolean;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=Plan_Entity.d.ts.map