import { neon } from "@neondatabase/serverless"
import dotenv from "dotenv";

dotenv.config();

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

//this creates a connection pool to the database
export const sql = neon(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`);
//this sql function we are exporting is used as a tagged template literal, which allows us to write SQL queries safely

