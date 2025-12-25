import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LeadEntity } from "../Lead_Entity";
import { PropertyEntity } from "../Property_Entity";
import { UserEntity } from "../User_Entity";

@Entity()
export class LeadPropertyVisitEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>LeadEntity)
    lead!:LeadEntity;

    @ManyToOne(()=>PropertyEntity)
    property!:PropertyEntity;

    @ManyToOne(()=>UserEntity)
    broker!:UserEntity;

    @Column({type:"timestamptz"})
    visitDate!:Date;

}