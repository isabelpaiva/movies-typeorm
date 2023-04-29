import "dotenv/config";
import { DataSource } from "typeorm";
import path from "path";

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: [path.join(__dirname, "./entities/*.{js,ts}")],
      }
    : {
        type: "postgres",
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT!),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        synchronize: false,
        entities: [path.join(__dirname, "./entities/*.{js,ts}")],
        migrations: [path.join(__dirname, "./migrations/*.{js,ts}")],
      }
);
