import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PropertyTypeEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @Column({length:50})
    name!:string;

    @Column({type:"text"})
    description!:string;

    @CreateDateColumn()
    createdAt!:Date;

    @UpdateDateColumn()
    updatedAt!:Date;
    
}