/*eslint-disable no-undef */
import { faker } from '@faker-js/faker';

beforeEach(async () => {
    await cy.setDatabase();
});

describe("Testes para criar e acessar a página", () => {

    const name = faker.name.jobTitle();
    const youtubeLink = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    it("Criando uma recomendação", () => {
        cy.visit("http://localhost:3000");
        cy.intercept("GET", "/recommendations").as("getSongs");
        cy.get("input[data-cy=Name]").type(name);
        cy.get("input[data-cy=Link]").type(youtubeLink);
        cy.get("button[data-cy=Submit").click();
        cy.wait("@getSongs");
        cy.contains(name).should("be.visible");
    });
    
})