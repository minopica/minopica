/// <reference types="Cypress" />
const neatCSV = require('neat-csv')
let productName
let orderId

describe('My first test Suite', function()
{
it('TestJWT', async function()
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
    //Cypress.config('defaultCommandTimeout', 10000)
    cy.get(".card-body b").eq(1).then(function(element) {
        productName = element.text()
    })
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
    //grab numero ordine nella thanyou page
    cy.get("table tbody tr td label").eq(1).then(function(element) {
        orderId = element.text().replaceAll('|','').trim()
    })
    cy.wait(2000)
    cy.get(".order-summary button").click()

// convert csv file in text format
// Cypress.config("fileServerFolder") -> ritorna path progetto cypress.
cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_minopica.csv").then(async function(text) 
{
    // neatCSV expect input in text format
    const csv = await neatCSV(text)
    console.log(csv)
    //csv[0].ProductName (in caso di property senza spazio nel nome)
    const actualProductCSV = csv[0]["Product Name"]
    const actualOrderIdCSV = csv[0]["Invoice Number"]
    expect (productName).to.equal(actualProductCSV)
    expect (orderId).to.equal(actualOrderIdCSV)
})


}
)

}
)