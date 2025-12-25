var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PlanEntity } from "./system/Plan_Entity";
import { TenantType } from "../enum/Tenant_Type";
let TenantEntity = class TenantEntity {
    id;
    name;
    slug;
    plan;
    type;
    maxUsers;
    settings;
    createdAt;
    updatedAt;
    deletedAt;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], TenantEntity.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], TenantEntity.prototype, "name", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], TenantEntity.prototype, "slug", void 0);
__decorate([
    ManyToOne(() => PlanEntity, (planEntity) => planEntity.tenants),
    __metadata("design:type", PlanEntity)
], TenantEntity.prototype, "plan", void 0);
__decorate([
    Column({ type: "enum", enum: TenantType }),
    __metadata("design:type", String)
], TenantEntity.prototype, "type", void 0);
__decorate([
    Column({ type: "int" }),
    __metadata("design:type", Number)
], TenantEntity.prototype, "maxUsers", void 0);
__decorate([
    Column({ type: "json", nullable: true }),
    __metadata("design:type", Object)
], TenantEntity.prototype, "settings", void 0);
__decorate([
    CreateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], TenantEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], TenantEntity.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], TenantEntity.prototype, "deletedAt", void 0);
TenantEntity = __decorate([
    Entity()
], TenantEntity);
export { TenantEntity };
//# sourceMappingURL=Tenant_Entity.js.map