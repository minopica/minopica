/// <reference types="Cypress" />
import LoginPage from '../../support/pageObjects/LoginPage.js'

describe('PWA test - Gestione Errori Login', function()
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

it('Login - errore HTTP 404', function()
{
    //const loginPage = new LoginPage()
    Cypress.config('defaultCommandTimeout', 10000)
    cy.visit("https://priv:P3rz0nal!@pwa.bs.windtre.it/oa/auth/login")
    //cy.get('#login_entra').click()
    loginPage.getEntraButton().click()
    //click su inserisci email/num di tel
    //cy.get('#firstInput').type("3931113321@example.com")
    loginPage.getUsernameTextField().type("3931113321@example.com")
    //cy.get('#login_continua').click()
    loginPage.getContinuaButton().click()
    //cy.get("input[formcontrolname='password']").type('12345678')
    loginPage.getPasswordTextField().type('12345678')
    

    cy.intercept({
        method : "POST",
        path: "/api/v5/login/credentials"
    },
    {
        statusCode : 404,
        body : [{
            "book_name": "null",
            "isbn": "SPY40",
            "aisle": "2529857"
        }]
    }
    ).as('responseLogin')


    //cy.get('#accedi').click()
    loginPage.getAccediButton().click()
    cy.wait('@responseLogin')

    cy.get('.error-type').should("have.text","Ops, si è verificato un problema")
}
)

it('Login - errore HTTP 401', function()
{
    Cypress.config('defaultCommandTimeout', 10000)
    cy.visit("https://priv:P3rz0nal!@pwa.bs.windtre.it/oa/auth/login")
    cy.get('#login_entra').click()
    //click su inserisci email/num di tel
    cy.get('#firstInput').type("3931113321@example.com")
    cy.get('#login_continua').click()
    cy.get("input[formcontrolname='password']").type('12345678')
    

    cy.intercept({
        method : "POST",
        path: "/api/v5/login/credentials"
    },
    {
        statusCode : 401,
        body : {"timestamp":"2022-08-26T14:01:49.564+00:00","path":"/api/v5/login/credentials","status":401,"error":"Unauthorized","message":"External authentication by credentials service error - Wrong Credentials","requestId":"6d4a4fb3-22254"}
    }
    ).as('responseLogin')


    cy.get('#accedi').click()
    cy.wait('@responseLogin')

    cy.get('.error-type').should("have.text","Ops, si è verificato un problema")
}
)


it('Login - errore dentro HTTP 200 - credenziali errate', function()
{
    Cypress.config('defaultCommandTimeout', 10000)
    cy.visit("https://priv:P3rz0nal!@pwa.bs.windtre.it/oa/auth/login")
    cy.get('#login_entra').click()
    //click su inserisci email/num di tel
    cy.get('#firstInput').type("3931113321@example.com")
    cy.get('#login_continua').click()
    cy.get("input[formcontrolname='password']").type('12345678')
    

    cy.intercept({
        method : "POST",
        path: "/api/v5/login/credentials"
    },
    {
        statusCode : 200,
        body : {"errorCodes":["ERR-AUTH-01"],"messages":[{"message":"Invalid credentials","type":"BSN"}],"status":"FAIL","data":null}
    }
    ).as('responseLogin')


    cy.get('#accedi').click()
    cy.wait('@responseLogin')

    cy.get('.error-type').should("have.text","Non ti abbiamo riconosciuto")
}
)


}
)