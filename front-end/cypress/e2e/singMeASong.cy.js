/*eslint-disable no-undef */
import { faker } from '@faker-js/faker';

beforeEach(async () => {
    await cy.setDatabase();
});

describe("Testes para criar e curtir uma recomendação", () => {

    const name = faker.name.fullName();
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
    
    it("Criando uma recomendação repetida", () => {
        cy.visit("http://localhost:3000");
        cy.intercept("GET", "/recommendations").as("getSongs");
        cy.get("input[data-cy=Name]").type(name);
        cy.get("input[data-cy=Link]").type(youtubeLink);
        cy.get("button[data-cy=Submit").click();
        cy.wait("@getSongs");
        //repete
        cy.get("input[data-cy=Name]").type(name);
        cy.get("input[data-cy=Link]").type(youtubeLink);
        cy.get("button[data-cy=Submit").click();
        cy.on("window:alert", error => {
            expect(error).to.contains("Error creating recommendation!")
        })
    });

    it("Criando uma recomendação com link errado", () => {
        cy.visit("http://localhost:3000");
        cy.intercept("GET", "/recommendations").as("getSongs");
        cy.get("input[data-cy=Name]").type(name);
        cy.get("input[data-cy=Link]").type('https://www.google.com');
        cy.get("button[data-cy=Submit").click();
        cy.wait("@getSongs");
        cy.on("window:alert", error => {
            expect(error).to.contains("Error creating recommendation!")
        })
    });
    
    it("Curtindo uma recomendação", () => {
        cy.visit("http://localhost:3000");
        cy.intercept("GET", "/recommendations").as("getSongs");
        cy.get("input[data-cy=Name]").type(name);
        cy.get("input[data-cy=Link]").type(youtubeLink);
        cy.get("button[data-cy=Submit").click();
        cy.wait("@getSongs");
        cy.intercept("POST", "/recommendations").as("like");
        cy.get("svg[data-cy=Like").first().click();
        cy.wait("@getSongs");
        cy.get("div[data-cy=Score]").first().should("have.text", 1);
        
    });

    it("Descurtindo uma recomendação", () => {
        cy.visit("http://localhost:3000");
        cy.intercept("GET", "/recommendations").as("getSongs");
        cy.get("input[data-cy=Name]").type(name);
        cy.get("input[data-cy=Link]").type(youtubeLink);
        cy.get("button[data-cy=Submit").click();
        cy.wait("@getSongs");
        cy.intercept("POST", "/recommendations").as("dislike");
        cy.get("svg[data-cy=Dislike").first().click();
        cy.wait("@getSongs");
        cy.get("div[data-cy=Score]").first().should("have.text", -1);
    
    });

    it("Descurtindo uma recomendação até sumir (-6)", () => {
        let dislike = 0;
        cy.visit("http://localhost:3000");
        cy.intercept("GET", "/recommendations").as("getSongs");
        cy.get("input[data-cy=Name]").type(name);
        cy.get("input[data-cy=Link]").type(youtubeLink);
        cy.get("button[data-cy=Submit").click();
        cy.wait("@getSongs");
        cy.intercept("POST", "/recommendations").as("dislike");
        do {
            cy.get("svg[data-cy=Dislike").first().click();
            dislike--;
            cy.wait("@getSongs");
        } while (dislike !== -5);
        cy.get("div[data-cy=Score]").first().should("have.text", dislike);
        cy.get("svg[data-cy=Dislike").first().click();
        cy.contains(`div[data-cy=YT-${name}]`).should("not.exist");
    });
})

describe("Testes para navegar para a aba RANDOM e conferir o resultado", () => {

    it("Indo para aba Random", () => {
        cy.get("svg[data-cy=Random]").click();
        cy.url().should("eq", "http://localhost:3000/random");
    });

    it("Conferindo o resultado do random", () => {
        cy.get("div[data-cy=Recommendation]").should("be.visible")
    });
});

describe("Testes para navegar para a aba TOP e conferir o score", () => {

    let score = Number.POSITIVE_INFINITY;

    it("Indo para aba TOP", () => {
        cy.get("svg[data-cy=Top]").click();
        cy.url().should("eq", "http://localhost:3000/top");
    });

    it("Conferindo os resultados da ordem do score", () => {
        cy.get("body").find("article").should("have.length", 5)
    });
    
    it("Conferindo os scores", () => {
        cy.get("div[data-cy=Score]").each((el) => {
            const text = Number(el.text());
            expect(text).to.be.at.most(score)
            score = text;
        })
    });

});

describe("Testes para navegar para a aba HOME e conferir o body", () => {

    it("Indo para aba HOME", () => {
        cy.get("svg[data-cy=Home]").click();
        cy.url().should("eq", "http://localhost:3000/");
    });

    it("Conferindo os resultados da ordem do score", () => {
        cy.get("body").find("article").should("have.length", 5)
    });
    
});