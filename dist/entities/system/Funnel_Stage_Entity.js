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
import { FunnelEntity } from "./Funnel_Entity";
let FunnelStageEntity = class FunnelStageEntity {
    id;
    funnel;
    name;
    position;
    isFinal;
    isLost;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], FunnelStageEntity.prototype, "id", void 0);
__decorate([
    ManyToOne(() => FunnelEntity),
    __metadata("design:type", FunnelEntity)
], FunnelStageEntity.prototype, "funnel", void 0);
__decorate([
    Column({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], FunnelStageEntity.prototype, "name", void 0);
__decorate([
    Column({ type: "int" }),
    __metadata("design:type", Number)
], FunnelStageEntity.prototype, "position", void 0);
__decorate([
    Column({ type: "boolean" }),
    __metadata("design:type", Boolean)
], FunnelStageEntity.prototype, "isFinal", void 0);
__decorate([
    Column({ type: "boolean" }),
    __metadata("design:type", Boolean)
], FunnelStageEntity.prototype, "isLost", void 0);
__decorate([
    CreateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], FunnelStageEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ type: "timestamptz" }),
    __metadata("design:type", Date)
], FunnelStageEntity.prototype, "updatedAt", void 0);
FunnelStageEntity = __decorate([
    Entity()
], FunnelStageEntity);
export { FunnelStageEntity };
//# sourceMappingURL=Funnel_Stage_Entity.js.map