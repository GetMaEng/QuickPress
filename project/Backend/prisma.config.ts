import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// .env.local is written by `vercel env pull` and holds the Neon credentials,
// so it takes precedence over any values left in .env. On Vercel neither file
// exists and the platform supplies these directly.
dotenv.config({ path: [".env.local", ".env"], quiet: true });

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    // Only the Prisma CLI reads this - the running app builds its own
    // connection in src/lib/prisma.ts. Migrations take advisory locks, so
    // prefer Neon's direct connection over the pooled one where available.
    url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL,
  },
});
