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
import { LeadEntity } from "../Lead_Entity";
import { PropertyEntity } from "../Property_Entity";
import { UserEntity } from "../User_Entity";
let LeadPropertyVisitEntity = class LeadPropertyVisitEntity {
    id;
    lead;
    property;
    broker;
    visitDate;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], LeadPropertyVisitEntity.prototype, "id", void 0);
__decorate([
    ManyToOne(() => LeadEntity),
    __metadata("design:type", LeadEntity)
], LeadPropertyVisitEntity.prototype, "lead", void 0);
__decorate([
    ManyToOne(() => PropertyEntity),
    __metadata("design:type", PropertyEntity)
], LeadPropertyVisitEntity.prototype, "property", void 0);
__decorate([
    ManyToOne(() => UserEntity),
    __metadata("design:type", UserEntity)
], LeadPropertyVisitEntity.prototype, "broker", void 0);
__decorate([
    Column({ type: "timestamptz" }),
    __metadata("design:type", Date)
], LeadPropertyVisitEntity.prototype, "visitDate", void 0);
LeadPropertyVisitEntity = __decorate([
    Entity()
], LeadPropertyVisitEntity);
export { LeadPropertyVisitEntity };
//# sourceMappingURL=Lead_Property_Visit_Entity.js.map