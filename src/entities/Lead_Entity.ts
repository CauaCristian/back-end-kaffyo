import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./User_Entity.ts";
import { FunnelStageEntity } from "./system/Funnel_Stage_Entity.ts";
import { LeadOriginEntity } from "./system/Lead_Origin_Entity.ts";
import { LeadInterest } from "../enum/Lead_Interest.ts";
import { TenantEntity } from "./Tenant_Entity.ts";

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