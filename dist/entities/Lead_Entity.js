var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./User_Entity";
import { FunnelStageEntity } from "./system/Funnel_Stage_Entity";
import { LeadOriginEntity } from "./system/Lead_Origin_Entity";
import { LeadInterest } from "../enum/Lead_Interest";
import { TenantEntity } from "./Tenant_Entity";
let LeadEntity = class LeadEntity {
    id;
    tenant;
    broker;
    leadOrigin;
    currentFunnelStage;
    name;
    email;
    phone;
    whatsapp;
    interest;
    lastContact;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], LeadEntity.prototype, "id", void 0);
__decorate([
    ManyToOne(() => TenantEntity),
    __metadata("design:type", TenantEntity)
], LeadEntity.prototype, "tenant", void 0);
__decorate([
    ManyToOne(() => UserEntity, (userEntity) => userEntity.leads),
    __metadata("design:type", UserEntity)
], LeadEntity.prototype, "broker", void 0);
__decorate([
    ManyToOne(() => LeadOriginEntity, (leadOriginEntity) => leadOriginEntity.leads),
    __metadata("design:type", LeadOriginEntity)
], LeadEntity.prototype, "leadOrigin", void 0);
__decorate([
    ManyToOne(() => FunnelStageEntity),
    __metadata("design:type", FunnelStageEntity)
], LeadEntity.prototype, "currentFunnelStage", void 0);
__decorate([
    Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], LeadEntity.prototype, "name", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], LeadEntity.prototype, "email", void 0);
__decorate([
    Column({ type: "varchar", length: 14 }),
    __metadata("design:type", String)
], LeadEntity.prototype, "phone", void 0);
__decorate([
    Column({ type: "varchar", length: 14 }),
    __metadata("design:type", String)
], LeadEntity.prototype, "whatsapp", void 0);
__decorate([
    Column({ type: "enum", enum: LeadInterest }),
    __metadata("design:type", String)
], LeadEntity.prototype, "interest", void 0);
__decorate([
    Column({ type: "timestamptz" }),
    __metadata("design:type", Date)
], LeadEntity.prototype, "lastContact", void 0);
__decorate([
    CreateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], LeadEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], LeadEntity.prototype, "updatedAt", void 0);
LeadEntity = __decorate([
    Entity()
], LeadEntity);
export { LeadEntity };
//# sourceMappingURL=Lead_Entity.js.map