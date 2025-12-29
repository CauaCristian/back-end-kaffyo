import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn} from "typeorm"
import { TenantEntity } from "./Tenant_Entity";
import { LeadEntity } from "./Lead_Entity";
import { UserRole } from "../enum/User_Role";
import { DocumentType } from "../enum/Document_Type";

@Entity()
export class UserEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>TenantEntity,{nullable:true})
    tenant!:TenantEntity;

    @OneToMany(()=>LeadEntity,(leadEntity)=>leadEntity.broker,{nullable:true})
    leads!:LeadEntity[];

    @Column({type:"varchar",unique:true})
    email!:string;

    @Column({type:"varchar"})
    password!:string;

    @Column({type:"varchar",length:50})
    name!:string;

    @Column({type:"varchar",length:50})
    surname!:string;

    @Column({type:"enum",enum:DocumentType})
    documentType!:DocumentType;

    @Column({nullable:false,type:"varchar",unique:true,length:14})
    document!:string;

    @Column({type:"enum",enum:UserRole,nullable:true})
    role!:UserRole;

    @Column({ type: "json", nullable: true})
    settings!: Record<string, any>;

    @CreateDateColumn({type:"timestamptz"})
    createdAt!: Date;

    @UpdateDateColumn({type:"timestamptz"})
    updatedAt!: Date;

}