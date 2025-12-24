import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LeadEntity } from "../LeadEntity.js";
import { PropertyEntity } from "../PropertyEntity.js";
import { UserEntity } from "../UserEntity.js";

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