import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity.js";

@Entity()
export class PlanEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @Column({length:50})
    name!:string;

    @Column({type:"text"})
    description!:string;

    @Column({type:"float",precision:2})
    price!:number;

    @Column()
    isActive!:boolean;

    @Column()
    isPublic!:boolean;

    @OneToMany(()=>UserEntity,(userEntity)=>userEntity.plan)
    users!:UserEntity[];

    @Column({default:Date.now()})
    createdAt!:Date;
    
    @Column()
    updatedAt!:Date;
    
}