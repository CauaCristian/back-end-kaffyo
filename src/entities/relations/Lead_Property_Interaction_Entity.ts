import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LeadEntity } from "../Lead_Entity";
import { PropertyEntity } from "../Property_Entity";
import { LeadPropertyInteractionStatus } from "../../enum/Lead_Property_Interaction_Status";

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