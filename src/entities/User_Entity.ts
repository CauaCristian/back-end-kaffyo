import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm"
import { TenantEntity } from "./Tenant_Entity";
import { LeadEntity } from "./Lead_Entity";
import { UserRole } from "../enum/User_Role";
import { DocumentType } from "../enum/Document_Type";

@Entity()
export class UserEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>TenantEntity)
    tenant!:TenantEntity;

    @OneToMany(()=>LeadEntity,(leadEntity)=>leadEntity.broker)
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
    document!:DocumentType;

    @Column({type:"enum",enum:UserRole})
    role!:UserRole;

    @Column({ type: "json", nullable: true })
    settings!: Record<string, any>;

    @CreateDateColumn({type:"timestamptz"})
    createdAt!: Date;

    @UpdateDateColumn({type:"timestamptz"})
    updatedAt!: Date;

}