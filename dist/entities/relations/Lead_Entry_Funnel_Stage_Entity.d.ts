import { FunnelStageEntity } from "../system/Funnel_Stage_Entity";
import { UserEntity } from "../User_Entity";
import { LeadEntity } from "../Lead_Entity";
export declare class LeadEntryFunnelStageEntity {
    id: string;
    lead: LeadEntity;
    funnelStage: FunnelStageEntity;
    movedBy: UserEntity;
    enteredAt: Date;
    exitedAt: Date;
}
//# sourceMappingURL=Lead_Entry_Funnel_Stage_Entity.d.ts.map