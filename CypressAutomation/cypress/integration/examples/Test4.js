/// <reference types="Cypress" />

describe('My fourth test Suite', function()
{
it('My fourth test case', function()
{
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    
    // check popup / alert
    cy.get('#alertbtn').click()
    cy.get('#confirmbtn').click()
    // window:alert
    cy.on('window:alert',(str) =>
    {
        //Mocha
        expect(str).to.equal("Hello , share this practice page and share your knowledge")
    }
    )

    cy.on('window:confirm',(str) =>
    {
        //Mocha
        expect(str).to.equal("Hello , Are you sure you want to confirm?")
    }
    )

    // how to handle child window in browser -> remove attribute "Target" (inovke comand to launch jquery function)
    cy.get('#opentab').invoke('removeAttr','target').click()

    // cypress check URL
    cy.url().should('include','www.rahulshettyacademy.com')
    // cypress navigation commands
    cy.go('back')
   
}
)

}
)