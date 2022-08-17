/// <reference types="Cypress" />
/// <reference types="Cypress-iframe" />
import 'cypress-iframe'

describe('Framework test Suite', function()
{
    before(() => {
        // runs once before all tests
        cy.fixture('example.json').then(function(data)
        {
            this.data = data
        }
        )

      })

it('My Framework test case', function()
{
    cy.visit("https://rahulshettyacademy.com/angularpractice/")
    //cy.get('input[name="name"]').eq(0).type("Bob")
    cy.get('input[name="name"]:nth-child(2)').type(this.data.name)
    cy.get('select').select(this.data.gender)
    cy.get('input[name="name"]:nth-child(1)').should('have.value',this.data.name)
    cy.get('input[name="name"]:nth-child(2)').should('have.attr','minlength','2')
    cy.get('#inlineRadio3').should('be.disabled')

    cy.get('a[href="/angularpractice/shop"]').click()
    
    // for debugging
    cy.pause()
    
    this.data.productName.forEach(element => 
        cy.selectProduct(element)
        )
    
}
)

}
)