import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PropertyEntity } from "../Property_Entity.js";

@Entity()
export class PropertyTypeEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @OneToMany(()=>PropertyEntity,(propertyEntity)=>propertyEntity.type)
    properties!:PropertyEntity[];

    @Column({type:"varchar",length:50})
    name!:string;

    @Column({type:"text"})
    description!:string;

    @CreateDateColumn({type:"timestamptz"})
    createdAt!:Date;

    @UpdateDateColumn({type:"timestamptz"})
    updatedAt!:Date;
    
}