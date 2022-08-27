/// <reference types="Cypress" />

describe('PWA test - Ricarica', function()
{
it('Ricarica - controllo chiamata cancel in webview SIA al back da inserimento CDC - env BS', function()
{
    Cypress.config('defaultCommandTimeout', 10000)
    cy.visit("https://priv:P3rz0nal!@pwa.bs.windtre.it/oa/auth/login")
    cy.get('#login_entra').click()
    //click su inserisci email/num di tel
    cy.get('#firstInput').type("3931113321@example.com")
    cy.get('#login_continua').click()
    cy.get("input[formcontrolname='password']").type('12345678')
    cy.get('#accedi').click()
    cy.get('#credit_banner_ricarica').click()
    cy.contains('aggiungi altro metodo di pagamento').click()
    cy.contains("Carta di credito").click()
    cy.get('.execute-submit').click()
    cy.get('input[placeholder="Nome e cognome intestatario"]').type("Antimo")
    
    cy.intercept({
        method : "POST",
        path: "/api/v1/ch-payment-gw/topup/CREDIT_CARD/cancel"
    }
    ).as('requestCancel')

    cy.get('#back-button').click()
    cy.wait('@requestCancel').should(({request,response}) =>
    {
        expect(response.statusCode).to.equal(200)
    })
 

}
)

}
)