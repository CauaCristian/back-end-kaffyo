import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TenantEntity } from "../Tenant_Entity";

@Entity()
export class PlanEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @OneToMany(()=>TenantEntity,(tenantEntity)=>tenantEntity.plan)
    tenants!:TenantEntity[];

    @Column({type:"varchar",length:50})
    name!:string;

    @Column({type:"text"})
    description!:string;

    @Column({type:"numeric",precision:10,scale:2})
    price!:number;

    @Column({type:"boolean"})
    isActive!:boolean;

    @Column({type:"boolean"})
    isPublic!:boolean;

    @CreateDateColumn({type:"timestamptz"})
    createdAt!:Date;
    
    @UpdateDateColumn({type:"timestamptz"})
    updatedAt!:Date;
    
}