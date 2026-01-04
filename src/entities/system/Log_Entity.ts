import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LogType } from "../../enum/Log_Type";
import { UserEntity } from "../User_Entity";

@Entity()
export class LogEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>UserEntity,{nullable:true})
    user!:UserEntity;

    @Column({type:"varchar",nullable:true})
    ipAddress!:string;

    @Column({type:"varchar",nullable:true})
    userAgent!:string;

    @Column({type:"varchar",nullable:true})
    route!:string;

    @Column({type:"int",nullable:true})
    statusCode!:number;

    @Column({type:"enum",enum:LogType})
    type!:LogType;

    @Column({type:"varchar"})
    message!:string;

    @CreateDateColumn({type:"timestamptz"})
    createdAt!:Date;
    
}