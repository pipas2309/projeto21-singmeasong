import app from '../../src/app';
import supertest from 'supertest';
import { deleteTable, disconnect } from '../factories/scenarioFactory';
import __createRecommendation, { __newRecommendation } from '../factories/recommendationFactory';

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
});
describe("Teste em GET /recommendations", () => {

});