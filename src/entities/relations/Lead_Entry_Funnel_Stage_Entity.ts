import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { LeadEntity } from "../Lead_Entity.js";
import { FunnelStageEntity } from "../system/Funnel_Stage_Entity.js";
import { UserEntity } from "../User_Entity.js";

@Entity()
export class LeadEntryFunnelStageEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>LeadEntity)
    lead!:LeadEntity;

    @ManyToOne(()=>FunnelStageEntity)
    funnelStage!:FunnelStageEntity;

    @ManyToOne(()=>UserEntity)
    movedBy!:UserEntity;

    @CreateDateColumn({type:"timestamptz"})
    enteredAt!:Date;

    @Column({type:"timestamptz",nullable:true})
    exitedAt!:Date;

}