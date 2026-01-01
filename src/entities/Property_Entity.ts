import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TenantEntity } from "./Tenant_Entity";
import { LeadEntity } from "./Lead_Entity";
import { PropertyTypeEntity } from "./system/Property_Type_Entity";
import { PropertyObjective } from "../enum/Property_Objective";
import { PropertyStatus } from "../enum/Property_Status";

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

    @CreateDateColumn({type:"timestamptz"})
    createdAt!: Date;

    @UpdateDateColumn({type:"timestamptz",nullable:true})
    updatedAt!: Date;
    
}