// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));

Cypress.Commands.add('requestAndLog', (cyRequestPayload) => {
    //const options = Object.entries(cyRequestPayload).map(([key, val]) => `${key}: ${JSON.stringify(val)}`)
    const options = JSON.stringify(cyRequestPayload,null, "\t")
    cy.log("*** REQUEST ***")
    cy.log(options)
    return cy.request(cyRequestPayload)
})

Cypress.Commands.add('logResponse', (resp,url) => {
    cy.log(`*** RESPONSE ${url} ***`)
    cy.log(JSON.stringify(resp.headers,null, "\t"))
    cy.log(JSON.stringify(resp.body,null, "\t"))
})



