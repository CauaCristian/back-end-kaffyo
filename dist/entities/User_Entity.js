var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { TenantEntity } from "./Tenant_Entity";
import { LeadEntity } from "./Lead_Entity";
import { UserRole } from "../enum/User_Role";
import { DocumentType } from "../enum/Document_Type";
let UserEntity = class UserEntity {
    id;
    tenant;
    leads;
    email;
    password;
    name;
    surname;
    document;
    role;
    settings;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    ManyToOne(() => TenantEntity),
    __metadata("design:type", TenantEntity)
], UserEntity.prototype, "tenant", void 0);
__decorate([
    OneToMany(() => LeadEntity, (leadEntity) => leadEntity.broker),
    __metadata("design:type", Array)
], UserEntity.prototype, "leads", void 0);
__decorate([
    Column({ type: "varchar", unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    Column({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    Column({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], UserEntity.prototype, "surname", void 0);
__decorate([
    Column({ type: "enum", enum: DocumentType }),
    __metadata("design:type", String)
], UserEntity.prototype, "document", void 0);
__decorate([
    Column({ type: "enum", enum: UserRole }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    Column({ type: "json", nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "settings", void 0);
__decorate([
    CreateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
UserEntity = __decorate([
    Entity()
], UserEntity);
export { UserEntity };
//# sourceMappingURL=User_Entity.js.map