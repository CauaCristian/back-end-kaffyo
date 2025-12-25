var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TenantEntity } from "../Tenant_Entity";
let PlanEntity = class PlanEntity {
    id;
    tenants;
    name;
    description;
    price;
    isActive;
    isPublic;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], PlanEntity.prototype, "id", void 0);
__decorate([
    OneToMany(() => TenantEntity, (tenantEntity) => tenantEntity.plan),
    __metadata("design:type", Array)
], PlanEntity.prototype, "tenants", void 0);
__decorate([
    Column({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], PlanEntity.prototype, "name", void 0);
__decorate([
    Column({ type: "text" }),
    __metadata("design:type", String)
], PlanEntity.prototype, "description", void 0);
__decorate([
    Column({ type: "numeric", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], PlanEntity.prototype, "price", void 0);
__decorate([
    Column({ type: "boolean" }),
    __metadata("design:type", Boolean)
], PlanEntity.prototype, "isActive", void 0);
__decorate([
    Column({ type: "boolean" }),
    __metadata("design:type", Boolean)
], PlanEntity.prototype, "isPublic", void 0);
__decorate([
    CreateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], PlanEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], PlanEntity.prototype, "updatedAt", void 0);
PlanEntity = __decorate([
    Entity()
], PlanEntity);
export { PlanEntity };
//# sourceMappingURL=Plan_Entity.js.map