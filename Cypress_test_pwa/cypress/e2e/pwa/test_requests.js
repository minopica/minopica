/// <reference types="Cypress" />
import LoginPage from '../../support/pageObjects/LoginPage.js'

describe('PWA test - Test API', function()
{
    const loginPage = new LoginPage()

    before(() => {
        // runs once before all tests
        cy.fixture('example.json').then(function(data)
        {
            this.data = data
        }
        )

      })

it('Login - estrazione token, codice cliente', function()
{
    var token = ''
    var codice_cliente = ''
    //const loginPage = new LoginPage()
    Cypress.config('defaultCommandTimeout', 20000)
    cy.visit(Cypress.env("url_bs"))
    loginPage.getEntraButton().click()
    loginPage.getUsernameTextField().type("minopica@gmail.com")
    loginPage.getContinuaButton().click()
    loginPage.getPasswordTextField().type('a12345678B')
    

    cy.intercept({
        method : "POST",
        path: "/api/v5/login/credentials"
    }
    ).as('responseLogin')


    //cy.get('#accedi').click()
    loginPage.getAccediButton().click()
    cy.wait('@responseLogin').then((intercept)=>{
        console.log(intercept); //will log a cy object containing the response
        console.log(intercept.response.body.status); //will log what you need
        expect(intercept.response.statusCode).to.be.eq(200); //should work
        token = intercept.response.headers['x-w3-token']
        codice_cliente = intercept.response.body.data.summary.contracts[0].code
        console.log('token JWT: ' + token)
        console.log('codice cliente: ' + codice_cliente)
        cy.task('saveToken', token)
        cy.task('saveCodiceCliente', codice_cliente)
    })

}
)


it('api/ob/v2/contract/lineunfolded', function()
{
    var token = ''
    var codice_cliente = ''

    cy.task('loadToken').then((jwt) => {
        console.log('token jwt: ' + jwt)
        token = jwt
        cy.task('loadCodiceCliente').then((code) => {
            console.log('codice_cliente caricato: ' + code)
            codice_cliente = code
        })

        cy.request({
            method: 'GET',
            url: 'https://apigw.bs.windtre.it/api/ob/v2/contract/lineunfolded',
            qs: {
                contractId: 1378403976115,
                lineId: 3273448807,
              },
            headers: {
                Authorization: 'Bearer ' + token,
                'X-Wind-Client': 'web',
                'X-Brand': 'ONEBRAND',
                //'Customer-Id': 542648434
                'Customer-Id': codice_cliente
            }
    
          }).then((resp) => {
            // redirect status code is 302
            expect(resp.status).to.eq(200)
          })

    })
    


}
)


it('/api/v1/app/analytics/token', function()
{
    var token = ''
    var codice_cliente = ''

    cy.task('loadToken').then((jwt) => {
        console.log('token jwt: ' + jwt)
        token = jwt
        cy.task('loadCodiceCliente').then((code) => {
            console.log('codice_cliente caricato: ' + code)
            codice_cliente = code
        })

        cy.request({
            method: 'GET',
            url: 'https://apigw.bs.windtre.it/api/v1/app/analytics/token',
            headers: {
                Authorization: 'Bearer ' + token,
                'X-Wind-Client': 'web',
                'X-Brand': 'ONEBRAND',
                'Customer-Id': codice_cliente
            }
    
          }).then((resp) => {
            // redirect status code is 302
            expect(resp.status).to.eq(200)
          })

    })
    


}
)


}
)