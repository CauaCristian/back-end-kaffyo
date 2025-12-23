import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { LeadEntity } from "./LeadEntity.js";
import { FunnelStageEntity } from "./FunnelStageEntity.js";
import { UserEntity } from "./UserEntity.js";

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

    @CreateDateColumn()
    enteredAt!:Date;

    @Column({nullable:true})
    exitedAt!:Date;

}