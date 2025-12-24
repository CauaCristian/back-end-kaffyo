import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LeadEntity } from "../LeadEntity.js";
import { PropertyEntity } from "../PropertyEntity.js";
import { LeadPropertyInteractionStatus } from "../../enum/LeadPropertyInteractionStatus.js";
@Entity()
export class LeadPropertyInteractionEntity{
    
    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>LeadEntity)
    lead!:LeadEntity;

    @ManyToOne(()=>PropertyEntity)
    property!:PropertyEntity;

    @Column({type:"enum",enum:LeadPropertyInteractionStatus})
    status!:LeadPropertyInteractionStatus;

    @Column({type:"varchar",nullable:true})
    refusalReason!:string;

    @CreateDateColumn({type:"timestamptz"})
    createdAt!: Date;

}