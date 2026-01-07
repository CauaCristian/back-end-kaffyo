import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PlanEntity } from "./system/Plan_Entity";
import { TenantType } from "../enum/Tenant_Type";

@Entity()
export class TenantEntity{
    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @Column({type:"varchar", length:50,unique:true})
    name!:string;

    @Column({type:"varchar",unique:true})
    slug!:string;

    @ManyToOne(()=>PlanEntity,(planEntity)=>planEntity.tenants,{nullable: true})
    plan!:PlanEntity;

    @Column({ type: "enum", enum:TenantType, nullable: true})
    type!: TenantType;

    @Column({type:"int",nullable: true})
    maxUsers!: number;

    @Column({ type: "json", nullable: true})
    settings!: Record<string, any>;

    @CreateDateColumn({type:"timestamptz"})
    createdAt!: Date;
    
    @UpdateDateColumn({type:"timestamptz",nullable:true})
    updatedAt!: Date;

}