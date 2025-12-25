import { TenantEntity } from "./Tenant_Entity";
import { LeadEntity } from "./Lead_Entity";
import { PropertyTypeEntity } from "./system/Property_Type_Entity";
import { PropertyObjective } from "../enum/Property_Objective";
import { PropertyStatus } from "../enum/Property_Status";
export declare class PropertyEntity {
    id: string;
    tenant: TenantEntity;
    owner: LeadEntity;
    type: PropertyTypeEntity;
    objective: PropertyObjective;
    price: number;
    address: string;
    description: string;
    imagePath: string[];
    propertyStatus: PropertyStatus;
}
//# sourceMappingURL=Property_Entity.d.ts.map