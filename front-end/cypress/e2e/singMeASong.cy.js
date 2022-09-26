/*eslint-disable no-undef */
import { faker } from '@faker-js/faker';

beforeEach(async () => {
    await cy.clearDatabase();
    await cy.seedDatabase();
});

describe("Testes para criar e acessar a página", () => {

    const name = faker.name.jobTitle();
    const youtubeLink = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    it("Criando uma recomendação", () => {
        cy.visit("http://localhost:3000");
        cy.intercept("GET", "/recommendations").as("likes");
        cy.get("input[data-cy=NameInput]").type(name);
        cy.get("input[data-cy=LinkInput]").type(youtubeLink);
        cy.get("button[data-cy=CreateButton").click();
        cy.wait("@likes");
        cy.contains(name).should("be.visible");
    })
    
})