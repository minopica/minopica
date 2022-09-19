/// <reference types="Cypress" />
import LoginPage from '../../../support/pageObjects/LoginPage.js'


describe('PWA test - Ricarica', function()
{
    const loginPage = new LoginPage()

    before(() => {
        // runs once before all tests
        cy.fixture('example.json').then(function(data)
        {
            this.data = data
        }
        )

      })

it.skip('Ricarica senza cdc memorizzata no remember - env test', function()
{
    Cypress.config('defaultCommandTimeout', 10000)
    cy.visit(Cypress.env("url_test"))
    loginPage.getEntraButton().click()
    loginPage.getUsernameTextField().type("107935_10f1@test.it")
    loginPage.getContinuaButton().click()
    loginPage.getPasswordTextField().type('12345678')
    loginPage.getAccediButton().click()
    cy.wait(10000)
    cy.get('#credit_banner_ricarica').click()
    cy.wait(10000)
    // seleziona taglio da 11€
    cy.get('.standard-row > :nth-child(2)').click()
    // seleziona aggiungi altro MDP
    cy.contains('aggiungi altro metodo di pagamento').click()
    // togli spunta Ricorda il mio metodo di pagamento
    cy.contains("Ricorda il mio metodo di pagamento").click()
    cy.contains("PayPal").click()

    cy.get('#email').clear().type("patrizio.tagliani@windtre.it")
    cy.get('#password').type("patrizio!")
    //cy.pause()
    // click su Accedi
    cy.get('#btnLogin').click().debug()

    // click su Continua
    console.log("Clicco su Continua")

    cy.get('#payment-submit-btn').click()

    // assert su thankyou page
    console.log("Aspetto thankyou page")
    cy.wait(10000)
    cy.get("h2[class$='section-title-w-des']").should("have.text","GRAZIE!")

}
)

}
)