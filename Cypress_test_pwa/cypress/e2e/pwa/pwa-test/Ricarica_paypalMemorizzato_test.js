/// <reference types="Cypress" />

describe('PWA test - Ricarica', function()
{
it('Ricarica con paypal memorizzato - env test', function()
{
    Cypress.config('defaultCommandTimeout', 10000)
    cy.visit("http://pwa.dev.windtre.it/oa/auth/login")
    cy.get('#login_entra').click()
    cy.log("Questo è un log cy: click su inserisci email/num di test")
    console.log("Questo è un console log: click su inserisci email/num di test")
    //click su inserisci email/num di tel
    cy.get('#firstInput').type("cambio@test.it")
    cy.get('#login_continua').click()
    cy.get("input[formcontrolname='password']").type('12345678')
    cy.get('#accedi').click()
    cy.wait(10000)
    cy.get('#credit_banner_ricarica').click()
    cy.wait(10000)
    // seleziona taglio da 6€
    cy.get('.standard-row > :nth-child(1)').click()
    // click su Ricarica 
    cy.get('.single-button-container button').click()
    // assert su thankyou page
    cy.get("h2[class$='section-title-w-des']").should("have.text","GRAZIE!")

}
)

}
)