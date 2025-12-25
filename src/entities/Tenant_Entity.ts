import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PlanEntity } from "./system/Plan_Entity";
import { TenantType } from "../enum/Tenant_Type";

@Entity()
export class TenantEntity{
    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @Column({type:"varchar", length:50})
    name!:string;

    @Column({type:"varchar"})
    slug!:string;

    @ManyToOne(()=>PlanEntity,(planEntity)=>planEntity.tenants)
    plan!:PlanEntity;

    @Column({ type: "enum", enum:TenantType})
    type!: TenantType;

    @Column({type:"int"})
    maxUsers!: number;

    @Column({ type: "json", nullable: true })
    settings!: Record<string, any>;

    @CreateDateColumn({type:"timestamptz"})
    createdAt!: Date;
    
    @UpdateDateColumn({type:"timestamptz"})
    updatedAt!: Date;

    @DeleteDateColumn({type:"timestamptz"})
    deletedAt!:Date;
}