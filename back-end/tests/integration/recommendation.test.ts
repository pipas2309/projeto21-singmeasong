import app from '../../src/app';
import supertest from 'supertest';
import { deleteTable, disconnect } from '../factories/scenarioFactory';
import { __newRecommendation } from '../factories/recommendationFactory';

const server = supertest(app);

beforeEach(async () => {
    await deleteTable();
});

afterAll(async () => {
    await disconnect();
});

describe("Teste em POST /recommendations", () => {
    it("Teste de criar a roda de criação de recomendação", async () => {
        const recommendation = await __newRecommendation(); 

        const result = await server.post('/recommendations').send(recommendation);

        expect(result.status).toBe(201)
    });
});
describe("Teste em GET /recommendations", () => {

});