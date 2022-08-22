/// <reference types="Cypress" />

describe('My first test Suite', function()
{
it('TestJWT', function()
{
    cy.LoginAPI().then(function()
    {
        cy.visit("https://rahulshettyacademy.com/client",
        {
            onBeforeLoad :function(window)
            {
                window.localStorage.setItem('token',Cypress.env('token'))
            } 
        })
    })
    Cypress.config('defaultCommandTimeout', 10000)
    cy.get('.card-body button:last-of-type').eq(1).click()
    cy.wait(10000)
    cy.get("[routerlink*='cart']").click()
    cy.contains('Checkout').click()
    cy.get("[placeholder='Select Country']").type("ind")
    cy.get(".ta-results button").each(($el,index,$list)=>
    {
        //cy.log($el.text())
        const paese = $el.text()
        if (paese === ' India') {
            cy.log("Click su India")
            cy.wrap($el).click()        }
    })
    cy.get(".btnn.action__submit").click()
    cy.wait(2000)
    cy.get(".order-summary button").click()
}
)

}
)