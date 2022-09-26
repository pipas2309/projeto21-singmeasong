import { prisma } from '../../src/database';
import { jest } from "@jest/globals";

import { Recommendation } from '@prisma/client';

import * as recommendationRepository from '../../src/repositories/recommendationRepository';
import * as recommendationService from '../../src/services/recommendationsService';

describe('Testes unitários do recommendation Service', () => {
    it.todo('Testa a função insert com sucesso', async () => {      
    });

    it.todo('Testa a função insert com nome duplicado', async () => {      
    });

    it.todo('Testa a função upvote', async () => {
    });

    it.todo('Testa a função downvote', async () => {
    });

    it.todo('Testa a função downvote com score -5', async () => {
    });

    it.todo('Testa a função getByIdOrFail com sucesso', async () => {
    });

    it.todo('Testa a função getByIdOrFail não encontrando o item', async () => {
    });

    it.todo('Testa a função get', async () => {
    });

    it.todo('Testa a função getTop', async () => {
    });

    it.todo('Testa a função getRandom com sucesso', async () => {
    });

    it.todo('Testa a função getRandom não encontrando nada', async () => {
    });

    it.todo('Testa a função getByScore com itens', async () => {
    });

    it.todo('Testa a função getByScore vazia', async () => {
    });

    it.todo('Testa a função getScoreFilter acima de 70%', async () => {
    });

    it.todo('Testa a função getScoreFilter abaixo de 70%', async () => {
    });
    
  });