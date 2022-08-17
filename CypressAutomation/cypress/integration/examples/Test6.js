/// <reference types="Cypress" />

describe('My fifth test Suite', function()
{
it('My fifth test case', function()
{
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    // mouse over
    cy.get('.mouse-hover-content').invoke('show')
    cy.contains('Top').click()

    cy.go('back')
    
    // force ckick su elementi nascostu
    cy.contains('Top').click({force: true})
    cy.url().should('include','top')
   
}
)

}
)