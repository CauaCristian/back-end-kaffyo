import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LeadOrigin } from "../enum/LeadOrigin.js";
import { InterestType } from "../enum/InterestType.js";
import { UserEntity } from "./UserEntity.js";
export class LeadEntity {

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.businessLeads)
    business!:UserEntity;

    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.brokerLeads)
    broker!:UserEntity;

    @Column({length:100})
    name!:string;

    @Column()
    email!:string;

    @Column({length:14})
    phone!:string;

    @Column({length:14})
    whatsapp!:string;

    @Column({type:"enum",enum:InterestType})
    interest!:InterestType;

    @Column({type:"enum",enum:LeadOrigin})
    origin!:LeadOrigin;

    @Column()
    lastContact!:Date;

    @Column({default:Date.now()})
    createdAt!:Date;

    @Column()
    updatedAt!:Date;

}