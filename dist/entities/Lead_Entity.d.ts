import { UserEntity } from "./User_Entity";
import { FunnelStageEntity } from "./system/Funnel_Stage_Entity";
import { LeadOriginEntity } from "./system/Lead_Origin_Entity";
import { LeadInterest } from "../enum/Lead_Interest";
import { TenantEntity } from "./Tenant_Entity";
export declare class LeadEntity {
    id: string;
    tenant: TenantEntity;
    broker: UserEntity;
    leadOrigin: LeadOriginEntity;
    currentFunnelStage: FunnelStageEntity;
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    interest: LeadInterest;
    lastContact: Date;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=Lead_Entity.d.ts.map