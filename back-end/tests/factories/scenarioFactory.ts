import { prisma } from "../../src/database";

export async function deleteTable() {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}

export async function disconnect() {
    await prisma.$disconnect();
}
