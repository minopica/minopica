/// <reference types="Cypress" />

describe('My second test Suite', function()
{
it('My second test case', function()
{
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
    //cy.visit("https://rahulshettyacademy.com/selenXXXXXX")
    cy.get('.search-keyword').type('ca')
    cy.wait(2000)

    // Parent child chaining
    cy.get('.products').as('productsLocator')
    cy.get('@productsLocator').find('.product').each(($el, index, $list) => {
        const titolo_prodotto = $el.find('h4.product-name').text()
        if (titolo_prodotto.includes('Cashews')) {
            cy.wrap($el).find("button[type='button']").click()
        }
    })

    cy.get('.cart-icon > img').click()
    cy.contains('PROCEED TO CHECKOUT').click()
    cy.contains('Place Order').click()
}
)

}
)