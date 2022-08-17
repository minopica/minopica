/// <reference types="Cypress" />
/// <reference types="Cypress-iframe" />
import 'cypress-iframe'

describe('Frames test Suite', function()
{
it('My Frame test case', function()
{
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    // switch to iframe
    cy.frameLoaded('#courses-iframe')
    cy.iframe().find('a[href="mentorship"]').eq(0).click()
    cy.wait(4000)
    cy.iframe().find('h1[class*="pricing-title"]').should('have.length',2)
    
   
}
)

}
)