import { Column, CreateDateColumn, Entity, ManyToOne,OneToMany,PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FunnelEntity } from "./Funnel_Entity";

@Entity()
export class FunnelStageEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>FunnelEntity)
    funnel!:FunnelEntity;

    @Column({type:"varchar",length:50})
    name!:string;

    @Column({type:"int"})
    position!:number;

    @Column({type:"boolean"})
    isFinal!:boolean;

    @Column({type:"boolean"})
    isLost!:boolean;

    @CreateDateColumn({type:"timestamptz"})
    createdAt!:Date;

    @UpdateDateColumn({type:"timestamptz"})
    updatedAt!:Date;

}