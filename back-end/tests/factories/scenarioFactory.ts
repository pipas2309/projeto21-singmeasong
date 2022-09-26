import { prisma } from "../../src/database";
import { __newRecommendationDownvote } from "./recommendationFactory";

export async function deleteTable() {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}

export async function disconnect() {
    await prisma.$disconnect();
}

export async function createDownvoteData() {
    const data = await __newRecommendationDownvote();
    await prisma.recommendation.create({ data });
}