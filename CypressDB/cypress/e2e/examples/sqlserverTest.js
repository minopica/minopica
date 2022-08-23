/// <reference types="cypress" />

context('Window', () => {
 
    it('Database Interaction', () => {
        cy.sqlServer("SELECT * FROM Persons").then(function(result) {
            console.log(result[0][1])
            console.log(result[0][2])
            console.log(result[1][1])
            console.log(result[1][2])
        })
    })

})