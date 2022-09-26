import { prisma } from "../../src/database";
import { __newRecommendationDownvote, __newRecommendationScore } from "./recommendationFactory";

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

export async function createManyData(quantity: number = 3) {
    for(let i = 0; i < quantity; i++) {
        const data = await __newRecommendationScore();
        await prisma.recommendation.create({ data });
    }
}