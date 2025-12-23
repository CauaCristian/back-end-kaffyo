import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InterestType } from "../enum/InterestType.js";
import { UserEntity } from "./UserEntity.js";
import { FunnelStageEntity } from "./FunnelStageEntity.js";
import { LeadOriginEntity } from "./LeadOriginEntity.js";

@Entity()
export class LeadEntity {

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.businessLeads)
    business!:UserEntity;

    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.brokerLeads)
    broker!:UserEntity;

    @Column({length:100})
    name!:string;

    @Column()
    email!:string;

    @Column({length:14})
    phone!:string;

    @Column({length:14})
    whatsapp!:string;

    @Column({type:"enum",enum:InterestType})
    interest!:InterestType;

    @ManyToOne(()=>LeadOriginEntity)
    leadOrigin!:LeadOriginEntity;

    @ManyToOne(()=>FunnelStageEntity,(funnelStageEntity)=>funnelStageEntity.leads)
    currentFunnelStage!:FunnelStageEntity;

    @Column()
    lastContact!:Date;

    @Column({default:Date.now()})
    createdAt!:Date;

    @Column()
    updatedAt!:Date;

}