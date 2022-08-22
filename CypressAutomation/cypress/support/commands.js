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
Cypress.Commands.add('selectProduct', (productName) => { 

    cy.get('h4.card-title').each(($el, index, $list) => {
        const titolo = $el.text()
        if (titolo.includes(productName)) {
            cy.get('button.btn.btn-info').eq(index).click()
        }
    })

 })

 // custom command for login in order to extract token

 Cypress.Commands.add('LoginAPI', () => { 

    cy.request("POST","https://rahulshettyacademy.com/api/ecom/auth/login",{"userEmail":"minopica@gmail.com","userPassword":"Minone@h3g"})
    .then(function(response)
    {
        expect(response.status).to.eq(200)
        Cypress.env('token',response.body.token)
    })

 })

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