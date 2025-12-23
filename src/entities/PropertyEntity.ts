import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyTypeEntity } from "./PropertyTypeEntity.js";
import { Objective } from "../enum/Objective.js";
import { PropertyStatus } from "../enum/PropertyStatus.js";
import { PropertyOwnerEntity } from "./PropertyOwnerEntity.js";
import { UserEntity } from "./UserEntity.js";

@Entity()
export class PropertyEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>PropertyOwnerEntity)
    owner!:PropertyOwnerEntity;

    @ManyToOne(()=>UserEntity)
    business!:UserEntity;
    
    @ManyToOne(()=>UserEntity)
    broker!:UserEntity;

    @ManyToOne(()=>PropertyTypeEntity)
    type!:PropertyTypeEntity;

    @Column({type:"enum",enum:Objective})
    objective!:Objective;

    @Column({type:"float", precision:2})
    price!:number;

    @Column()
    address!:string;

    @Column({type:"text"})
    description!:string;

    @Column("text", { array: true })
    imagePath!: string[];

    @Column({type:"enum",enum:PropertyStatus})
    propertyStatus!:PropertyStatus;

}