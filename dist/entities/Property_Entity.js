var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TenantEntity } from "./Tenant_Entity";
import { LeadEntity } from "./Lead_Entity";
import { PropertyTypeEntity } from "./system/Property_Type_Entity";
import { PropertyObjective } from "../enum/Property_Objective";
import { PropertyStatus } from "../enum/Property_Status";
let PropertyEntity = class PropertyEntity {
    id;
    tenant;
    owner;
    type;
    objective;
    price;
    address;
    description;
    imagePath;
    propertyStatus;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], PropertyEntity.prototype, "id", void 0);
__decorate([
    ManyToOne(() => TenantEntity),
    __metadata("design:type", TenantEntity)
], PropertyEntity.prototype, "tenant", void 0);
__decorate([
    ManyToOne(() => LeadEntity),
    __metadata("design:type", LeadEntity)
], PropertyEntity.prototype, "owner", void 0);
__decorate([
    ManyToOne(() => PropertyTypeEntity, (propertyTypeEntity) => propertyTypeEntity.properties),
    __metadata("design:type", PropertyTypeEntity)
], PropertyEntity.prototype, "type", void 0);
__decorate([
    Column({ type: "enum", enum: PropertyObjective }),
    __metadata("design:type", String)
], PropertyEntity.prototype, "objective", void 0);
__decorate([
    Column({ type: "numeric", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], PropertyEntity.prototype, "price", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], PropertyEntity.prototype, "address", void 0);
__decorate([
    Column({ type: "text" }),
    __metadata("design:type", String)
], PropertyEntity.prototype, "description", void 0);
__decorate([
    Column("text", { array: true }),
    __metadata("design:type", Array)
], PropertyEntity.prototype, "imagePath", void 0);
__decorate([
    Column({ type: "enum", enum: PropertyStatus }),
    __metadata("design:type", String)
], PropertyEntity.prototype, "propertyStatus", void 0);
PropertyEntity = __decorate([
    Entity()
], PropertyEntity);
export { PropertyEntity };
//# sourceMappingURL=Property_Entity.js.map