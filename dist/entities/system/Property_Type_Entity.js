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
import { PropertyEntity } from "../Property_Entity";
let PropertyTypeEntity = class PropertyTypeEntity {
    id;
    properties;
    name;
    description;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], PropertyTypeEntity.prototype, "id", void 0);
__decorate([
    OneToMany(() => PropertyEntity, (propertyEntity) => propertyEntity.type),
    __metadata("design:type", Array)
], PropertyTypeEntity.prototype, "properties", void 0);
__decorate([
    Column({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], PropertyTypeEntity.prototype, "name", void 0);
__decorate([
    Column({ type: "text" }),
    __metadata("design:type", String)
], PropertyTypeEntity.prototype, "description", void 0);
__decorate([
    CreateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], PropertyTypeEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], PropertyTypeEntity.prototype, "updatedAt", void 0);
PropertyTypeEntity = __decorate([
    Entity()
], PropertyTypeEntity);
export { PropertyTypeEntity };
//# sourceMappingURL=Property_Type_Entity.js.map