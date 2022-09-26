import app from '../../src/app';
import supertest from 'supertest';
import { deleteTable } from '../factories/scenarioFactory';

const server = supertest(app);

beforeEach(async () => {
    await deleteTable();
})

describe("Teste em POST /recommendations", () => {

})
describe("Teste em GET /recommendations", () => {
    
})