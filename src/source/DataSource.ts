import { DataSource } from "typeorm";
import "reflect-metadata"
import "pg"

export const dataSource = new DataSource(
    {
        type:"postgres",
        host: process.env.DB_HOST || "",
        port: Number.parseInt(process.env.DB_PORT || ""),
        username:process.env.DB_USERNAME||"",
        password:process.env.DB_PASSWORD||"",
        database:process.env.DB_DATABASE||"",
        entities:["../entities/*.ts"],
    }
);
