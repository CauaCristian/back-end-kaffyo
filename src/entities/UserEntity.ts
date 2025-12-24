import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm"
import { PlanEntity } from "./PlanEntity.js";
import { DocumentType } from "../enum/DocumentType.js";
import { UserRole } from "../enum/UserRole.js";
import { LeadEntity } from "./LeadEntity.js";
import { PropertyEntity } from "./PropertyEntity.js";

@Entity()
export class UserEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=> UserEntity,(userEntity)=>userEntity.brokers,{nullable:true,onDelete:"CASCADE"})
    business!:UserEntity;

    @OneToMany(()=>UserEntity,(UserEntity)=>UserEntity.business)
    brokers!:UserEntity[];

    @ManyToOne(()=>PlanEntity,(planEntity)=>planEntity.users)
    plan!:PlanEntity;

    @OneToMany(()=>LeadEntity,(leadEntity)=>leadEntity.business)
    businessLeads!:LeadEntity[];

    @OneToMany(()=>LeadEntity,(leadEntity)=>leadEntity.broker)
    brokerLeads!:LeadEntity[];

    @OneToMany(()=>PropertyEntity,(propertyEntity)=>propertyEntity.business)
    businessProperties!:PropertyEntity[];

    @OneToMany(()=>PropertyEntity,(propertyEntity)=>propertyEntity.broker)
    brokerProperties!:PropertyEntity[];

    @Column({type:"varchar",unique:true})
    email!:string;

    @Column({type:"varchar"})
    password!:string;

    @Column({type:"varchar",length:50})
    name!:string;

    @Column({type:"varchar",length:50})
    surname!:string;

    @Column({type:"enum",enum:DocumentType})
    document!:DocumentType;

    @Column({type:"enum",enum:UserRole})
    role!:UserRole;

    @CreateDateColumn({type:"timestamptz"})
    createdAt!: Date;

    @UpdateDateColumn({type:"timestamptz"})
    updatedAt!: Date;

}