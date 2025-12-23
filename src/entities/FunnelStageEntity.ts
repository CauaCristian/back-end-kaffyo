import { Column, ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { FunnelEntity } from "./FunnelEntity.js";

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

    @Column({default:Date.now()})
    createdAt!:Date;

    @Column()
    updatedAt!:Date;

}