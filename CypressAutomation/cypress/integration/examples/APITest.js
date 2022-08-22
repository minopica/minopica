/// <reference types="Cypress" />

describe('My first test Suite', function()
{
it('My first test case', function()
{
    cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', {
        "name": "Learn Appium XXXX",
        "aisle": "23s7",
        "isbn": "SPY40",
        "author": "Antimo P"
    }).then(function(response){
        expect(response.body).to.have.property("Msg","successfully added")
        expect(response.status).to.eq(200)
    })
    

}
)

}
)