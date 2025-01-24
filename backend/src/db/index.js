import knex from "knex";
import { DB_NAME } from "../constant.js";

// Create and export the Knex instance
const connectDB = async () => {
    try {
        const db = knex({
            client: "pg", // PostgreSQL client
            connection: {
                host: process.env.PG_HOST || "127.0.0.1", // Default to localhost
                user: process.env.PG_USER || "postgres", // Default user
                password: process.env.PG_PASSWORD || "123", // Default password
                database: DB_NAME, // Database name from constants
            },
        });

        // Test the connection
        await db.raw("SELECT 1+1 AS result");
        console.log(`PostgreSQL connected to database: ${DB_NAME}`);

        // Return the database instance for usage
        return db;
    } catch (error) {
        console.error("ERROR:", error.message || error);
        throw error;
    }
};

export default connectDB;
