/// <reference types="Cypress" />

describe('My fifth test Suite', function()
{
it('My fifth test case', function()
{
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    //extract text from table cell and from sibling element
    cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
        const text = $el.text()
        if (text.includes('Python')) {
            cy.get('tr td:nth-child(2)').eq(index).next().then(function(price)
            {
                const priceText = price.text()
                expect(priceText).to.equal('25')
            }
            )
        }
    })

   
}
)

}
)