/// <reference types="Cypress" />
/// <reference types="Cypress-iframe" />
import 'cypress-iframe'
import LoginPage from '../../support/pageObjects/LoginPage.js'

describe('PWA test - Chatbot', function()
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

it('Chatbot - scrivi ad un operatore', function()
{
    cy.clearLocalStorage()
    cy.clearCookies()
    Cypress.config('defaultCommandTimeout', 10000)
    cy.visit(Cypress.env("url_bs"))
    loginPage.getEntraButton().click()
    loginPage.getUsernameTextField().type("minopica@gmail.com")
    loginPage.getContinuaButton().click()
    loginPage.getPasswordTextField().type('a12345678B')
    loginPage.getAccediButton().click()
    cy.wait(10000)
    cy.get('#will').click()
    // switch to iframe
    cy.wait(5000)
    cy.frameLoaded('#willie')
    
    cy.iframe('#willie').find('input[type="text"]').type('reset password')
    cy.iframe('#willie').find('#btn-send').click()
    cy.iframe('#willie').find('.option.position-relative').then(function(element){
        let tot = element.length
        console.log("numero pulsanti risposta: "+  tot)
        cy.log("numero pulsanti risposta: "+  tot)
        //cy.wrap(element).eq(0).click({force: true})
    })

}
)


}
)