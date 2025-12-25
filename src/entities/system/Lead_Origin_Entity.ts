import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { LeadEntity } from "../Lead_Entity.js";

@Entity()
export class LeadOriginEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @OneToMany(()=>LeadEntity,(leadEntity)=>leadEntity.leadOrigin)
    leads!:LeadEntity[];

    @Column({type:"varchar",length:50})
    name!:string;

    @Column({type:"text"})
    description!:string;

    @CreateDateColumn({type:"timestamptz"})
    createdAt!:Date;

    @UpdateDateColumn({type:"timestamptz"})
    updatedAt!:Date;

    
}