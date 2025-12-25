var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FunnelStageEntity } from "../system/Funnel_Stage_Entity";
import { UserEntity } from "../User_Entity";
import { LeadEntity } from "../Lead_Entity";
let LeadEntryFunnelStageEntity = class LeadEntryFunnelStageEntity {
    id;
    lead;
    funnelStage;
    movedBy;
    enteredAt;
    exitedAt;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], LeadEntryFunnelStageEntity.prototype, "id", void 0);
__decorate([
    ManyToOne(() => LeadEntity),
    __metadata("design:type", LeadEntity)
], LeadEntryFunnelStageEntity.prototype, "lead", void 0);
__decorate([
    ManyToOne(() => FunnelStageEntity),
    __metadata("design:type", FunnelStageEntity)
], LeadEntryFunnelStageEntity.prototype, "funnelStage", void 0);
__decorate([
    ManyToOne(() => UserEntity),
    __metadata("design:type", UserEntity)
], LeadEntryFunnelStageEntity.prototype, "movedBy", void 0);
__decorate([
    CreateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], LeadEntryFunnelStageEntity.prototype, "enteredAt", void 0);
__decorate([
    Column({ type: "timestamptz", nullable: true }),
    __metadata("design:type", Date)
], LeadEntryFunnelStageEntity.prototype, "exitedAt", void 0);
LeadEntryFunnelStageEntity = __decorate([
    Entity()
], LeadEntryFunnelStageEntity);
export { LeadEntryFunnelStageEntity };
//# sourceMappingURL=Lead_Entry_Funnel_Stage_Entity.js.map