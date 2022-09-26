import app from '../../src/app';
import supertest from 'supertest';
import { deleteTable, disconnect } from '../factories/scenarioFactory';

const server = supertest(app);

beforeEach(async () => {
    await deleteTable();
});

afterAll(async () => {
    await disconnect();
});

describe("Teste em POST /recommendations", () => {

});
describe("Teste em GET /recommendations", () => {

});