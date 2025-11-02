import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE } = process.env;

export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
);
