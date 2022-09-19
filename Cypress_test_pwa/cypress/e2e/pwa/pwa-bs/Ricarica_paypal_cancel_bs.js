/// <reference types="Cypress" />

describe('PWA test - Ricarica', function()
{
it('Ricarica - controllo chiamata cancel in webview PAYPAL al back da inserimento Paypal - env BS', function()
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
    cy.contains("PayPal").click()
    cy.get('#email').clear().type("mino@gmail.com")
    
    cy.intercept({
        method : "POST",
        path: "/api/v1/ch-payment-gw/topup/PAYPAL/cancel"
    }
    ).as('requestCancel')

    cy.contains('Annulla e torna al sito Wind Tre S.p.A.').click()

    // cy.wait('@requestCancel').then(({request,response}) =>
    // {
    //     expect(response.statusCode).to.equal(200)
    // })

    cy.wait('@requestCancel').then((intercept)=>{
        console.log(intercept); //will log a cy object containing the response
        console.log(intercept.response.body.status); //will log what you need
        expect(intercept.response.statusCode).to.be.eq(200); //should work
        expect(intercept.response.body.status).to.be.eq("OK"); //should work
    })
 

}
)

}
)