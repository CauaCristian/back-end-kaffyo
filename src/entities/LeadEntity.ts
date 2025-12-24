import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./UserEntity.js";
import { FunnelStageEntity } from "./FunnelStageEntity.js";
import { LeadOriginEntity } from "./LeadOriginEntity.js";
import { LeadInterest } from "../enum/LeadInterest.js";
import { PropertyEntity } from "./PropertyEntity.js";

@Entity()
export class LeadEntity {

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.businessLeads)
    business!:UserEntity;

    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.brokerLeads)
    broker!:UserEntity;

    @ManyToOne(()=>LeadOriginEntity,(leadOriginEntity)=>leadOriginEntity.leads)
    leadOrigin!:LeadOriginEntity;

    @ManyToOne(()=>FunnelStageEntity,(funnelStageEntity)=>funnelStageEntity.leads)
    currentFunnelStage!:FunnelStageEntity;

    @OneToMany(()=>PropertyEntity,(propertyEntity)=>propertyEntity.owner)
    properties!:PropertyEntity[];

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