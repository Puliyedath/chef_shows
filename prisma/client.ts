import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis as unknown as { chefShowsDBClient: PrismaClient };
export const chefShowsDBClient = globalForPrisma.chefShowsDBClient || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.chefShowsDBClient = chefShowsDBClient;

export default chefShowsDBClient;
