import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyTypeEntity } from "./PropertyTypeEntity.js";
import { PropertyObjective } from "../enum/PropertyObjective.js";
import { PropertyStatus } from "../enum/PropertyStatus.js";
import { UserEntity } from "./UserEntity.js";
import { LeadEntity } from "./LeadEntity.js";

@Entity()
export class PropertyEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>LeadEntity,(leadEntity)=>leadEntity.properties)
    owner!:LeadEntity;

    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.businessProperties)
    business!:UserEntity;
    
    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.brokerProperties)
    broker!:UserEntity;

    @ManyToOne(()=>PropertyTypeEntity,(propertyTypeEntity)=>propertyTypeEntity.properties)
    type!:PropertyTypeEntity;

    @Column({type:"enum",enum:PropertyObjective})
    objective!:PropertyObjective;

    @Column({type:"numeric", precision:10,scale:2})
    price!:number;

    @Column({type:"varchar"})
    address!:string;

    @Column({type:"text"})
    description!:string;

    @Column("text", { array: true })
    imagePath!: string[];

    @Column({type:"enum",enum:PropertyStatus})
    propertyStatus!:PropertyStatus;

}