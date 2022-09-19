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

import LoginPage from '../support/pageObjects/LoginPage.js'
import SiaPage from '../support/pageObjects/SiaPage.js'

const loginPage = new LoginPage()
const siaPage = new SiaPage()

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

Cypress.Commands.add('login_credenziali', (username,password) => {
    cy.log(`*** LOGIN ${username} ***`)
    cy.log('click su pulsante ENTRA')
    loginPage.getEntraButton().click()
    cy.log('click su TextField email/num di tel e inserisci username')
    loginPage.getUsernameTextField().type(username)
    cy.log('click su CONTINUA')
    loginPage.getContinuaButton().click()
    cy.log('click su TextField password e inserisci pwd')
    loginPage.getPasswordTextField().type(password)
    cy.log('click su ACCEDI')
    loginPage.getAccediButton().click()
})

Cypress.Commands.add('esegui_ricaricaCDC_sia', (intestatario,cdc,exp_mm,exp_aa,cvv) => {
    cy.log(`*** RICARICA IN WEBVIEW SIA CON CDC: ${cdc} ***`)
    cy.log('click su inserisci nome cognme intestatario cdc')
    siaPage.get_nome_cognome_cdc().type(intestatario)
            
    cy.log('inserisci numero CDC')
    siaPage.get_numero_cdc().type(cdc)

    cy.log('inserisci scadenza mese')
    siaPage.get_expire_mm().type(exp_mm)

    cy.log('inserisci scadenza anno')
    siaPage.get_expire_aa().type(exp_aa)

    cy.log('inserisci cvv')
    siaPage.get_cvv().type(cvv)

    cy.log('spunta informativa privacy')
    siaPage.get_privacy_checkbox().click()

    cy.log('click su Conferma')
    siaPage.get_conferma().click() 
})


