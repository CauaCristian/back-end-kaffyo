import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../User_Entity";

@Entity()
export class RefreshTokenEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.refreshTokens)
    user!:UserEntity;

    @Column({type:"varchar"})
    userAgent!:string

    @Column({type:"varchar"})
    ipAddress!:string;

    @Column({type:"varchar"})
    refreshToken!:string;
    
    @Column({type:"timestamptz"})
    refreshTokenExpiresAt!:Date;

    @Column({ type: "timestamptz", nullable: true })
    revokedAt!: Date | null;

    @CreateDateColumn({type:"timestamptz"})
    createdAt!:Date;

}