/// <reference types="Cypress" />

describe('My first test Suite', function()
{
it('My first test case', function()
{
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
    cy.get('.search-keyword').type('ca')
    cy.wait(2000)
    cy.get('.product:visible').should('have.length', 4)

    // Parent child chaining
    cy.get('.products').as('productsLocator')
    cy.get('@productsLocator').find('.product').should('have.length', 4)
    cy.get('@productsLocator').find('.product').eq(2).contains('ADD TO CART').click().then(function()
    {
        console.log("Test")
    }
    )

    cy.get('@productsLocator').find('.product').each(($el, index, $list) => {
        const titolo_prodotto = $el.find('h4.product-name').text()
        if (titolo_prodotto.includes('Cashews')) {
            cy.wrap($el).find("button[type='button']").click()
        }
    })

    // assert if logo text is correctly displayed
    cy.get('.brand.greenLogo').should('have.text','GREENKART')

    // this is to print in logs
    cy.get('.brand.greenLogo').then(function(logo) {
        cy.log(logo.text())
    })

}
)

}
)