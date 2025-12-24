import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FunnelStageEntity } from "./FunnelStageEntity.js";

@Entity()
export class FunnelEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @OneToMany(()=>FunnelStageEntity,(funnelStageEntity)=>funnelStageEntity.funnel)
    stages!:FunnelStageEntity[];

    @Column({type:"varchar",length:50})
    name!:string;

    @Column({type:"boolean",default:true})
    isActive!:boolean;

    @CreateDateColumn({type:"timestamptz"})
    createdAt!:Date;
    
    @UpdateDateColumn({type:"timestamptz"})
    updatedAt!:Date;

}