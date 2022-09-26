import { faker } from '@faker-js/faker';
import { prisma, Recommendation } from '@prisma/client';
import supertest from 'supertest';
import app from '../../src/app';

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

interface NewRecommendation extends Omit<Recommendation, "id" | "score"> {};

export async function __newRecommendation(): Promise<NewRecommendation> {
    return await {
        name: faker.company.name(),
        youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
}

export async function __getRandomVideo(): Promise<Recommendation> {
    return await (await supertest(app).get('/recommendations/random')).body
}


export interface RecommendationScore extends Omit<Recommendation, "id"> {};

export async function __newRecommendationDownvote(): Promise<RecommendationScore> {
    return await {
        name: faker.company.name(),
        youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        score: -5
    }
}

export async function __newRecommendationScore(): Promise<RecommendationScore> {
    return await {
        name: faker.company.name(),
        youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        score: faker.datatype.number({ min: 3, max: 10, precision: 1 })
    }
}