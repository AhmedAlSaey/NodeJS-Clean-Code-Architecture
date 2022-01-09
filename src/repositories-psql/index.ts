import { VehicleIdFromSlug } from "./vehicle-id-from-slug";
import { Pool } from "pg"
import { Database, Formatter } from "../models";
var pgFormat = require("pg-format")


let createDatabase: () => Database = () => {
    const env = process.env;
    const config = {
        db: {
            host: env.DB_HOST,
            port: Number(env.DB_PORT),
            user: env.DB_USER,
            password: env.DB_PASSWORD,
            database: env.DB_NAME,
        },
        listPerPage: env.LIST_PER_PAGE || 10,
    };
    const pool = new Pool(config.db);
    return {
        query: async (query: string, ...params: string[]) => {
            const { rows, } = await pool.query(query, params);
            if (rows) {
                return rows;
            }
            return []
        }
    }


}

let createFormatter: () => Formatter = () => {
    return {
        format: (query: string, ...params: string[]) => {
            let newQuery = pgFormat(query, params);
            return newQuery
        }
    }
}



let vehicleIdFromSlugRepository = new VehicleIdFromSlug(createDatabase(), createFormatter())

export {
    vehicleIdFromSlugRepository
}