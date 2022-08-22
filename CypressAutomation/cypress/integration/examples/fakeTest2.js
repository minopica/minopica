/// <reference types="Cypress" />

describe('My first test Suite', function()
{
it('My first test case', function()
{
    cy.visit('https://rahulshettyacademy.com/angularAppdemo/')

    cy.intercept('GET','https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
        (req)=>
        {
            //modify request
            req.url="https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"

            req.continue((res)=>
            {
                //verify response
                expect(res.statusCode).to.equal(404)

            })
        }

    ).as('dammyurl')

    // occorre PRIMA cliccare sul pulsante per richiamare l'API e dopo eseguire cy.wait.
    cy.get('.btn.btn-primary').click()

    cy.wait('@dammyurl')
    
}
)

}
)