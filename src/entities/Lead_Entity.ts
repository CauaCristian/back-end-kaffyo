import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./User_Entity.js";
import { FunnelStageEntity } from "./system/Funnel_Stage_Entity.js";
import { LeadOriginEntity } from "./system/Lead_Origin_Entity.js";
import { LeadInterest } from "../enum/Lead_Interest.js";
import { PropertyEntity } from "./Property_Entity.js";
import { TenantEntity } from "./Tenant_Entity.js";

@Entity()
export class LeadEntity {

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>TenantEntity)
    tenant!:TenantEntity;

    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.leads)
    broker!:UserEntity;

    @ManyToOne(()=>LeadOriginEntity,(leadOriginEntity)=>leadOriginEntity.leads)
    leadOrigin!:LeadOriginEntity;

    @ManyToOne(()=>FunnelStageEntity)
    currentFunnelStage!:FunnelStageEntity;

    @Column({type:"varchar",length:100})
    name!:string;

    @Column({type:"varchar"})
    email!:string;

    @Column({type:"varchar",length:14})
    phone!:string;

    @Column({type:"varchar",length:14})
    whatsapp!:string;

    @Column({type:"enum",enum:LeadInterest})
    interest!:LeadInterest;

    @Column({type:"timestamptz"})
    lastContact!:Date;

    @CreateDateColumn({type:"timestamptz"})
    createdAt!:Date;

    @UpdateDateColumn({type:"timestamptz"})
    updatedAt!:Date;

}