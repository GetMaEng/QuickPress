import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

// Cached on globalThis so a dev reload (tsx watch) or a re-evaluated module
// reuses one connection pool instead of opening a new one each time.
const globalForPrisma = globalThis as unknown as {
	prisma?: PrismaClient;
};

const createPrismaClient = () => {
	const connectionString = process.env.DATABASE_URL;
	if (!connectionString) {
		throw new Error("DATABASE_URL is not set");
	}

	const adapter = new PrismaPg({ connectionString });
	return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

globalForPrisma.prisma = prisma;
