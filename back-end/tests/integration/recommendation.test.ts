import app from '../../src/app';
import supertest from 'supertest';
import { createDownvoteData, createManyData, deleteTable, disconnect } from '../factories/scenarioFactory';
import __createRecommendation, { __getRandomVideo, __newRecommendation, __newRecommendationDownvote } from '../factories/recommendationFactory';

const server = supertest(app);

beforeEach(async () => {
    await deleteTable();
});

afterAll(async () => {
    await disconnect();
});

describe("Teste em POST /recommendations", () => {
    it("Teste de criar a roda de criação de recomendação com sucesso", async () => {
        const recommendation = await __newRecommendation(); 

        const result = await server.post('/recommendations').send(recommendation);

        expect(result.status).toBe(201)
    });

    it("Teste de criar a roda de criação de recomendação com body errado", async () => {
        const aux = await __createRecommendation(); 
        const recommendation = {name: aux.name, youtubeLink: aux.youtubeLink};

        const result = await server.post('/recommendations').send(recommendation);

        expect(result.status).toBe(422)
    });

    it("Teste de criar a roda de criação de recomendação duplicado", async () => {
        const recommendation = await __newRecommendation(); 

        await server.post('/recommendations').send(recommendation);

        const result = await server.post('/recommendations').send(recommendation);

        expect(result.status).toBe(409)
    });

    it("Teste de upvote com sucesso", async () => {
        const recommendation = await __newRecommendation(); 

        await server.post('/recommendations').send(recommendation);
        const data = await __getRandomVideo();

        const result = await server.post(`/recommendations/${data.id}/upvote`);
        expect(result.status).toBe(200);
    });
    it("Teste de upvote com falha", async () => {
        const recommendation = await __newRecommendation(); 

        await server.post('/recommendations').send(recommendation);
        const data = await __getRandomVideo();

        const result = await server.post(`/recommendations/${data.id + 42}/upvote`);
        expect(result.status).toBe(404);
    });

    it("Teste de downvote com sucesso", async () => {
        const recommendation = await __newRecommendation(); 

        await server.post('/recommendations').send(recommendation);
        const data = await __getRandomVideo();

        const result = await server.post(`/recommendations/${data.id}/downvote`);
        expect(result.status).toBe(200);
    });

    it("Teste de downvote com sucesso e removendo", async () => {
        await createDownvoteData();

        const data = await __getRandomVideo();

        const result = await server.post(`/recommendations/${data.id}/downvote`);
        const resultRemoved = await __getRandomVideo();
        const resultStatus = await server.post(`/recommendations/${data.id}/downvote`);

        expect(result.status).toBe(200);
        expect(resultRemoved).toMatchObject({});
        expect(resultStatus.status).toBe(404);
    });

    it("Teste de downvote com falha", async () => {
        const result = await server.post(`/recommendations/-1/downvote`);
        expect(result.status).toBe(404);
    });
});
describe("Teste em GET /recommendations", () => {
    it("Teste de pegar as ultimas recomendações", async () => {
        const recommendation = await __newRecommendation(); 

        await server.post('/recommendations').send(recommendation);

        const result = await server.get('/recommendations');

        expect(result.status).toBe(200);
    });

    it("Teste de pegar as ultimas recomendações, vazia", async () => {
        const result = await server.get('/recommendations');

        expect(result.status).toBe(200);
        expect(result.body).toStrictEqual([]);
    });

    it("Teste de pegar recomendação por Id", async () => {
        const recommendation = await __newRecommendation(); 

        await server.post('/recommendations').send(recommendation);

        const aux = await __getRandomVideo();
        
        const result = await server.get(`/recommendations/${aux.id}`);

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("Teste de pegar recomendação por Id sem existir", async () => {
        const result = await server.get('/recommendations/-1');

        expect(result.status).toBe(404);

    });

    it("Teste de pegar recomendação aleatóriamente", async () => {
        await createManyData();
        
        const all = await server.get('/recommendations');
               
        const result = await server.get('/recommendations/random');

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
        expect(all.body).toContainEqual(result.body);
    });

    it("Teste de pegar recomendação aleatóriamente, vazio", async () => {
        const result = await server.get('/recommendations/random');

        expect(result.status).toBe(404);
    });

    it("Teste de pegar recomendação por score", async () => {
        await createManyData(5);
                       
        const result = await server.get('/recommendations/top/3');

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
        expect(result.body).toHaveLength(3);
        expect(result.body[0].score).toBeGreaterThanOrEqual(result.body[1].score);
        expect(result.body[1].score).toBeGreaterThanOrEqual(result.body[2].score);
    });
});