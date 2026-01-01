import { DataSource, Db } from "typeorm";
import "pg";
import { dbConfig } from "../configs/Db_Config";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const dataSource = new DataSource(
    {
        type: dbConfig.dbType,
        host: dbConfig.dbHost,
        port: Number.parseInt(dbConfig.dbPort),
        username:dbConfig.dbUsername,
        password:dbConfig.dbPassword,
        database:dbConfig.dbDatabase,
        entities: dbConfig.dbEntities,
        synchronize: dbConfig.dbSynchronize
    } as PostgresConnectionOptions
);
