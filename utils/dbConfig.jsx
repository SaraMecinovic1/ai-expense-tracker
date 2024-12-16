import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const NEXT_PUBLIC_DATABASE_URL =
  "postgresql://finansmart_owner:DMcLr19CxiyW@ep-patient-tooth-a2wcx1re.eu-central-1.aws.neon.tech/test%20database?sslmode=require";

const sql = neon(NEXT_PUBLIC_DATABASE_URL);

export const db = drizzle(sql, { schema });
