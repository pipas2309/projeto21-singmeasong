import { faker } from "@faker-js/faker";
import { RecommendationScore } from "../factories/recommendationFactory";
import { e2eRepository } from "../repositories/e2eRepository";

async function insert(quantity: number = 15) {
    const data: RecommendationScore[] = [];
    for(let i = 0; i < quantity; i++) {
        data.push(await {
            name: faker.company.name(),
            youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            score: faker.datatype.number({ min: -5, max: 42, precision: 1 })
        });
    }
    e2eRepository.create(data);
}

async function deleteData() {
    return await e2eRepository.deleteAll();
}

export const e2eService = {
    insert,
    deleteData
  };
  