import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyTypeEntity } from "./system/Property_Type_Entity.js";
import { PropertyObjective } from "../enum/Property_Objective.js";
import { PropertyStatus } from "../enum/Property_Status.js";
import { UserEntity } from "./User_Entity.js";
import { LeadEntity } from "./Lead_Entity.js";
import { TenantEntity } from "./Tenant_Entity.js";

@Entity()
export class PropertyEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>TenantEntity)
    tenant!:TenantEntity;

    @ManyToOne(()=>LeadEntity)
    owner!:LeadEntity;

    @ManyToOne(()=>PropertyTypeEntity,(propertyTypeEntity)=>propertyTypeEntity.properties)
    type!:PropertyTypeEntity;

    @Column({type:"enum",enum:PropertyObjective})
    objective!:PropertyObjective;

    @Column({type:"numeric", precision:10,scale:2})
    price!:number;

    @Column({type:"varchar"})
    address!:string;

    @Column({type:"text"})
    description!:string;

    @Column("text", { array: true })
    imagePath!: string[];

    @Column({type:"enum",enum:PropertyStatus})
    propertyStatus!:PropertyStatus;

}