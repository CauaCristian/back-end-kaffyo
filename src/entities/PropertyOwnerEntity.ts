import { Column, CreateDateColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DocumentType } from "../enum/DocumentType.js";
import { UserEntity } from "./UserEntity.js";

export class PropertyOwnerEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>UserEntity)
    business!:UserEntity;

    @ManyToOne(()=>UserEntity)
    broker!:UserEntity;

    @Column({length:50})
    name!:string;
    
    @Column({length:50})
    surname!:string;
    
    @Column({type:"enum",enum:DocumentType})
    document!:DocumentType;

    @CreateDateColumn()
    createdAt!: Date;
    
    @UpdateDateColumn()
    updatedAt!: Date;

}