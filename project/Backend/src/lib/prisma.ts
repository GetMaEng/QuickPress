import Database from "better-sqlite3";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

// 2. Instantiate the Prisma driver adapter
const adapter = new PrismaBetterSqlite3({ url: String(process.env.DATABASE_URL) });

// 3. Pass the adapter to PrismaClient
export const prisma = new PrismaClient({ adapter });