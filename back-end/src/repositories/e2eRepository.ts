import { prisma } from "../database";
import { RecommendationScore } from "../factories/recommendationFactory";

async function create(data: RecommendationScore[]) {
    return await prisma.recommendation.createMany({ data });
}

async function deleteAll() {
    return await prisma.recommendation.deleteMany({}); // Você sabia que o RH gosta de quem faz esse tipo de Query?
}

export const e2eRepository = {
  create,
  deleteAll,
};
