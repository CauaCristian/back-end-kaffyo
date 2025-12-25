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
import { LeadEntity } from "../Lead_Entity";
let LeadOriginEntity = class LeadOriginEntity {
    id;
    leads;
    name;
    description;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], LeadOriginEntity.prototype, "id", void 0);
__decorate([
    OneToMany(() => LeadEntity, (leadEntity) => leadEntity.leadOrigin),
    __metadata("design:type", Array)
], LeadOriginEntity.prototype, "leads", void 0);
__decorate([
    Column({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], LeadOriginEntity.prototype, "name", void 0);
__decorate([
    Column({ type: "text" }),
    __metadata("design:type", String)
], LeadOriginEntity.prototype, "description", void 0);
__decorate([
    CreateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], LeadOriginEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], LeadOriginEntity.prototype, "updatedAt", void 0);
LeadOriginEntity = __decorate([
    Entity()
], LeadOriginEntity);
export { LeadOriginEntity };
//# sourceMappingURL=Lead_Origin_Entity.js.map