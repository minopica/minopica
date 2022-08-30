/// <reference types="Cypress" />

describe('PWA test - Ricarica', function()
{
it('Ricarica senza cdc memorizzata no remember - env test', function()
{
    Cypress.config('defaultCommandTimeout', 10000)
    cy.visit("http://pwa.dev.windtre.it/oa/auth/login")
    cy.get('#login_entra').click()
    cy.log("Questo è un log cy: click su inserisci email/num di test")
    console.log("Questo è un console log: click su inserisci email/num di test")
    //click su inserisci email/num di tel
    cy.get('#firstInput').type("107935_10f1@test.it")
    cy.get('#login_continua').click()
    cy.get("input[formcontrolname='password']").type('12345678')
    cy.get('#accedi').click()
    cy.wait(10000)
    cy.get('#credit_banner_ricarica').click()
    cy.wait(10000)
    // seleziona taglio da 11€
    cy.get('.standard-row > :nth-child(2)').click()
    // seleziona aggiungi altro MDP
    cy.contains('aggiungi altro metodo di pagamento').click()
    // spunta Ricorda il mio metodo di pagamento
    cy.contains("Ricorda il mio metodo di pagamento").click()
    cy.contains("Carta di credito").click()

    cy.get('.execute-submit').click()
    cy.get('input[placeholder="Nome e cognome intestatario"]').type("Antimo")
    cy.get('#input-card-number').type('5255000260000014')
    cy.get('#input-expiration-date-month').type('12')
    cy.get('#input-expiration-date-year').type('23')
    cy.get('#input-card-cvv').type('123')
    cy.get('.checkbox-inner-text').click()
    
    // click su Conferma
    cy.get('#confirm-payment-button').click() 

    // assert su thankyou page
    cy.wait(15000)
    cy.get("h2[class$='section-title-w-des']").should("have.text","GRAZIE!")

}
)

}
)