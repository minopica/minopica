/// <reference types="Cypress" />

describe('My seventh test Suite', function()
{
it('My seventh test case', function()
{
    cy.visit(Cypress.env("url")+"/AutomationPractice/")
    // extract href url
    cy.get('#opentab').then(function(el)
    {
        const url = el.prop('href')
        cy.log(url)
        cy.visit(url)
    }
    )

    
   
}
)

}
)