import { Column, Entity, ManyToOne,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { FunnelEntity } from "./FunnelEntity.js";
import { LeadEntity } from "./LeadEntity.js";

@Entity()
export class FunnelStageEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @Column({length:50})
    name!:string;

    @Column()
    position!:number;

    @Column()
    isFinal!:boolean;

    @Column()
    isLost!:boolean;

    @ManyToOne(()=>FunnelEntity,(FunnelEntity)=>FunnelEntity.stages)
    funnel!:FunnelEntity;

    @OneToMany(()=>LeadEntity,(LeadEntity)=>LeadEntity.currentFunnelStage)
    leads!:LeadEntity[];

    @Column({default:Date.now()})
    createdAt!:Date;

    @Column()
    updatedAt!:Date;

}