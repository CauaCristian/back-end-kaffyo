import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FunnelStageEntity } from "./FunnelStageEntity.js";

@Entity()
export class FunnelEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @Column({length:50})
    name!:string;

    @Column({default:true})
    isActive!:boolean;

    @OneToMany(()=>FunnelStageEntity,(funnelStageEntity)=>funnelStageEntity.funnel)
    stages!:FunnelStageEntity[];

    @Column({default:Date.now()})
    createdAt!:Date;

    @Column()
    updatedAt!:Date;

}