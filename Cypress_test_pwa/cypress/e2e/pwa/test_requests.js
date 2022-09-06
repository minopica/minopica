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

it('Login - estrazione token', function()
{
    var token = ''
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
        console.log(token)
        cy.task('saveToken', token)
    })

}
)


it('api/ob/v2/contract/lineunfolded', function()
{
    var token = ''

    cy.task('loadToken').then((jwt) => {
        console.log('token jwt: ' + jwt)
        token = jwt

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
                'Customer-Id': 542648434
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

    cy.task('loadToken').then((jwt) => {
        console.log('token jwt: ' + jwt)
        token = jwt

        cy.request({
            method: 'GET',
            url: 'https://apigw.bs.windtre.it/api/v1/app/analytics/token',
            headers: {
                Authorization: 'Bearer ' + token,
                'X-Wind-Client': 'web',
                'X-Brand': 'ONEBRAND',
                'Customer-Id': 542648434
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