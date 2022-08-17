/// <reference types="Cypress" />

describe('My third test Suite', function()
{
it('My third test case', function()
{
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    
    // check boxex
    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
    cy.get('input[type="checkbox"]').check(['option2','option3'])

    // static dropdown
    cy.get('select').select('option2').should('have.value','option2')

    // Dynamic dropdown
    cy.get('#autocomplete').type('ind')
    cy.get('.ui-menu-item div').each(($el, index, $list) => {
        const paese = $el.text()
        if (paese === 'India') {
            cy.wrap($el).click()        }
    })
    cy.get('#autocomplete').should('have.value','India')

    // visible invisible
    cy.get('#displayed-text').should('be.visible')
    cy.get('#hide-textbox').click()
    cy.get('#displayed-text').should('not.be.visible')
    cy.get('#show-textbox').click()    
    cy.get('#displayed-text').should('be.visible')

    // radio button
    cy.get('[value="radio2"]').check().should('be.checked')

}
)

}
)