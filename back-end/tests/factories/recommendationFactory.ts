import { faker } from '@faker-js/faker';
import { Recommendation } from '@prisma/client';

export default async function __createRecommendation(): Promise<Recommendation> {
    return await {
        id: faker.datatype.number(),
        name: faker.company.name(),
        youtubeLink: faker.internet.url(),
        score: faker.datatype.number({ min: 0, max: 10000, precision: 1 })
    }
}

export async function __createOrderedRecommendation(): Promise<Recommendation[]> {
    return await [{
        id: faker.datatype.number(),
        name: faker.company.name(),
        youtubeLink: faker.internet.url(),
        score: faker.datatype.number({ min: 1000, max: 10000, precision: 1 })
    },{
        id: faker.datatype.number(),
        name: faker.company.name(),
        youtubeLink: faker.internet.url(),
        score: faker.datatype.number({ min: 100, max: 999, precision: 1 })
    },{
        id: faker.datatype.number(),
        name: faker.company.name(),
        youtubeLink: faker.internet.url(),
        score: faker.datatype.number({ min: 0, max: 99, precision: 1 })
    }]
}

export async function __createRecommendationForRandom(): Promise<Recommendation[]> {
    return await [{
        id: faker.datatype.number(),
        name: faker.company.name(),
        youtubeLink: faker.internet.url(),
        score: faker.datatype.number({ min: 17, max: 23, precision: 1 })
    },{
        id: faker.datatype.number(),
        name: faker.company.name(),
        youtubeLink: faker.internet.url(),
        score: faker.datatype.number({ min: 11, max: 16, precision: 1 })
    },{
        id: faker.datatype.number(),
        name: faker.company.name(),
        youtubeLink: faker.internet.url(),
        score: faker.datatype.number({ min: 7, max: 10, precision: 1 })
    },{
        id: faker.datatype.number(),
        name: faker.company.name(),
        youtubeLink: faker.internet.url(),
        score: faker.datatype.number({ min: 4, max: 6, precision: 1 })
    },{
        id: faker.datatype.number(),
        name: faker.company.name(),
        youtubeLink: faker.internet.url(),
        score: faker.datatype.number({ min: 0, max: 3, precision: 1 })
    }]
}

export async function __recommendationList(): Promise<Recommendation[]> {
    return await [{
        id: faker.datatype.number(),
        name: faker.company.name(),
        youtubeLink: faker.internet.url(),
        score: faker.datatype.number({ min: 0, max: 100, precision: 1 })
    },{
        id: faker.datatype.number(),
        name: faker.company.name(),
        youtubeLink: faker.internet.url(),
        score: faker.datatype.number({ min: 0, max: 100, precision: 1 })
    },{
        id: faker.datatype.number(),
        name: faker.company.name(),
        youtubeLink: faker.internet.url(),
        score: faker.datatype.number({ min: 0, max: 100, precision: 1 })
    }]
}