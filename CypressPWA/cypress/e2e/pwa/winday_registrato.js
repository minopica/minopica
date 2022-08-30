/// <reference types="Cypress" />
/// <reference types="Cypress-iframe" />
import 'cypress-iframe'
import LoginPage from '../../support/pageObjects/LoginPage.js'

describe('PWA test - Winday', function()
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

it('Winday linea registrata', function()
{
    Cypress.config('defaultCommandTimeout', 10000)
    cy.visit(Cypress.env("url_bs"))
    loginPage.getEntraButton().click()
    loginPage.getUsernameTextField().type("3931113321@example.com")
    loginPage.getContinuaButton().click()
    loginPage.getPasswordTextField().type('12345678')
    loginPage.getAccediButton().click()
    cy.get("img[alt='winday']").click()
    // switch to iframe
    cy.frameLoaded('iframe[title="Windtre"]')
    cy.iframe('iframe[title="Windtre"]').contains('GIOCA ORA').click()
}
)


}
)