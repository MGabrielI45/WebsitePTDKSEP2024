import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | undefined;

const client = globalThis.prisma || new PrismaClient()

export default client