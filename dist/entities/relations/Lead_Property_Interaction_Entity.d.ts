import { LeadEntity } from "../Lead_Entity";
import { PropertyEntity } from "../Property_Entity";
import { LeadPropertyInteractionStatus } from "../../enum/Lead_Property_Interaction_Status";
export declare class LeadPropertyInteractionEntity {
    id: string;
    lead: LeadEntity;
    property: PropertyEntity;
    status: LeadPropertyInteractionStatus;
    refusalReason: string;
    createdAt: Date;
}
//# sourceMappingURL=Lead_Property_Interaction_Entity.d.ts.map