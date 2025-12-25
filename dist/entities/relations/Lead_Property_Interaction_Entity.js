var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LeadEntity } from "../Lead_Entity";
import { PropertyEntity } from "../Property_Entity";
import { LeadPropertyInteractionStatus } from "../../enum/Lead_Property_Interaction_Status";
let LeadPropertyInteractionEntity = class LeadPropertyInteractionEntity {
    id;
    lead;
    property;
    status;
    refusalReason;
    createdAt;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], LeadPropertyInteractionEntity.prototype, "id", void 0);
__decorate([
    ManyToOne(() => LeadEntity),
    __metadata("design:type", LeadEntity)
], LeadPropertyInteractionEntity.prototype, "lead", void 0);
__decorate([
    ManyToOne(() => PropertyEntity),
    __metadata("design:type", PropertyEntity)
], LeadPropertyInteractionEntity.prototype, "property", void 0);
__decorate([
    Column({ type: "enum", enum: LeadPropertyInteractionStatus }),
    __metadata("design:type", String)
], LeadPropertyInteractionEntity.prototype, "status", void 0);
__decorate([
    Column({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], LeadPropertyInteractionEntity.prototype, "refusalReason", void 0);
__decorate([
    CreateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], LeadPropertyInteractionEntity.prototype, "createdAt", void 0);
LeadPropertyInteractionEntity = __decorate([
    Entity()
], LeadPropertyInteractionEntity);
export { LeadPropertyInteractionEntity };
//# sourceMappingURL=Lead_Property_Interaction_Entity.js.map