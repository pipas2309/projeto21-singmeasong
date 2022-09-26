import { prisma } from '../../src/database';
import { jest } from "@jest/globals";

import { recommendationRepository } from '../../src/repositories/recommendationRepository';
import { recommendationService } from '../../src/services/recommendationsService';

import recommendationFactory from '../factories/recommendationFactory';

describe('Testes unitários do recommendation Service', () => {

    beforeEach(async()=>{
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('Testa a função insert com sucesso', async () => {      
      const recommendation = await recommendationFactory();

      //Retorna vazil
      jest
        .spyOn(recommendationRepository, "findByName")
        .mockImplementationOnce((): any => { null });
      jest
        .spyOn(recommendationRepository, "create")
        .mockImplementationOnce((): any => {});

      await expect(recommendationService.insert(recommendation)).resolves.not.toThrow();
      expect(recommendationRepository.findByName).toBeCalled();
    });

    it('Testa a função insert com nome duplicado', async () => {     
      const recommendation = await recommendationFactory();

      //Retorna vazil
      jest
        .spyOn(recommendationRepository, "findByName")
        .mockImplementationOnce((): any => { return recommendation });

      const result = recommendationService.insert(recommendation);

      await expect(result).rejects.toEqual({ type: "conflict", message: "Recommendations names must be unique" });
      expect(recommendationRepository.create).not.toBeCalled();

    });

    it('Testa a função upvote', async () => {
      const recommendation = await recommendationFactory();

      jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValueOnce(recommendation);

      jest
        .spyOn(recommendationRepository, "updateScore")
        .mockResolvedValueOnce({ ...recommendation, score: recommendation.score + 1 });

      
      const result = await recommendationService.upvote(recommendation.id)

      expect(recommendationRepository.find).toBeCalled();
      expect(recommendationRepository.updateScore).toBeCalled();
      expect(result).toBe(undefined);
    });

    it('Testa a função downvote', async () => {
      const recommendation = await recommendationFactory();

      jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValueOnce(recommendation);

      jest
        .spyOn(recommendationRepository, "updateScore")
        .mockResolvedValueOnce({ ...recommendation, score: recommendation.score - 1 })
      
      jest
        .spyOn(recommendationRepository, "remove")
        .mockResolvedValueOnce();
      
      const result = await recommendationService.downvote(recommendation.id)

      expect(recommendationRepository.find).toBeCalled();
      expect(recommendationRepository.updateScore).toBeCalled();
      expect(recommendationRepository.remove).not.toBeCalled();
      expect(result).toBe(undefined);
    });

    it('Testa a função downvote com score -5', async () => {
      const recommendation = await recommendationFactory();

      jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValueOnce(recommendation);

      jest
        .spyOn(recommendationRepository, "updateScore")
        .mockResolvedValueOnce({ ...recommendation, score: -10 })
      
      jest
        .spyOn(recommendationRepository, "remove")
        .mockResolvedValueOnce();
      
      const result = await recommendationService.downvote(recommendation.id);

      expect(recommendationRepository.find).toBeCalled();
      expect(recommendationRepository.updateScore).toBeCalled();
      expect(recommendationRepository.remove).toBeCalled();
      expect(result).toBe(undefined);
    });

    it('Testa a função getByIdOrFail com sucesso', async () => {
      const recommendation = await recommendationFactory();

      jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValueOnce(recommendation);

      const result = await recommendationService.getById(recommendation.id);

      expect(recommendationRepository.find).toBeCalled();
      expect(result).toBe(recommendation);
    });

    it('Testa a função getByIdOrFail não encontrando o item', async () => {
      const recommendation = await recommendationFactory();

      jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValueOnce(null);

      const result = recommendationService.getById(recommendation.id);

      await expect(result).rejects.toEqual({ type: "not_found", message: "" })
    });

    it('Testa a função get', async () => {
      const recommendation = await recommendationFactory();

      jest
        .spyOn(recommendationRepository, "findAll")
        .mockResolvedValueOnce([recommendation]);

      const result = await recommendationService.get();

      expect(recommendationRepository.findAll).toBeCalled();
      expect(result).toBeInstanceOf(Array);
    });

    it('Testa a função getTop', async () => {
      const recommendation = await recommendationFactory();

      jest
        .spyOn(recommendationRepository, "getAmountByScore")
        .mockResolvedValueOnce([recommendation]);

      const result = await recommendationService.get();

      expect(recommendationRepository.findAll).toBeCalled();
      expect(result).toBeInstanceOf(Array);
    });

    it('Testa a função getRandom com sucesso', async () => {
    });

    it('Testa a função getRandom não encontrando nada', async () => {
    });

    it('Testa a função getByScore com itens', async () => {
    });

    it('Testa a função getByScore vazia', async () => {
    });

    it('Testa a função getScoreFilter acima de 70%', async () => {
    });

    it('Testa a função getScoreFilter abaixo de 70%', async () => {
    });
    
  });