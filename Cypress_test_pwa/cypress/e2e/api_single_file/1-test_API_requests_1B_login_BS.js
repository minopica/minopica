/// <reference types="Cypress" />
require('@cypress/skip-test/support')
import LoginPage from '../../support/pageObjects/LoginPage.js'


describe('1B FARC API - DEV - Test API', function()
{
    const loginPage = new LoginPage()
    const credenziali_test = require('../../fixtures/credenziali_login_singleFile_bs.json')
    var arrayContracts = ''

    before(() => {
        // runs once before all tests
        cy.fixture('example.json').then(function(data)
        {
            this.data = data
        }
        )

      })

    //   this.beforeEach(() => {
    //     // runs once before all tests
        

    //   })

    credenziali_test.forEach((credenziali) => {

        it(`/api/v1/strong-auth/credentials ${credenziali.username}`, function()
        {
            var token = ''
            var codice_cliente = ''
            var lineId = ''
            var contractId = ''
            var challenge_token = ""

            cy.on('fail', (e, runnable) => {
                console.log('error', e)
                console.log('runnable', runnable)
                Cypress.env("SKIP_E2E_TESTS",true)
                cy.log("*****Imposto skip e2e test a true*****")
                throw new Error("test fails here")
              })

            Cypress.config('defaultCommandTimeout', 20000)
                let url = Cypress.env("base_url_bs") +'/api/v1/strong-auth/credentials'
                const requestObj = {
                    method: 'POST',
                    url: `${url}`,
                    headers: {
                        'X-Wind-Client': 'web',
                        'X-Brand': 'ONEBRAND',
                        'Customer-Id': `${codice_cliente}`
                    },
                    body: {
                            "rememberMe": true,
                            "username": `${credenziali.username}`,
                            "password": `${credenziali.password}`
                    }
                    }

                cy.requestAndLog(requestObj).then((resp) => {
                    expect(resp.status).to.eq(200)
                    expect(resp.body.status).to.be.equal('OK')
                    cy.logResponse(resp,requestObj.url)
                    challenge_token = resp.headers['x-w3-challenge-token']
                    cy.task('saveChallengeToken', challenge_token)
                     // imoosto variabile skip test a false perchè la login è passata
                     Cypress.env("SKIP_E2E_TESTS",false)
                })


        }
    )
    
    it('/api/v1/strong-auth/otp/generate', function()
        {
            //skip esecuzione test se il flag SKIP_E2E_TESTS è a true.
            cy.onlyOn(!Cypress.env("SKIP_E2E_TESTS"))

            var challengeToken = ''

            cy.task('loadChallengeToken').then((jwt) => {
                console.log('token jwt: ' + jwt)
                challengeToken = jwt

                const requestObj = {
                    method: 'POST',
                    url: Cypress.env("base_url_bs") + '/api/v1/strong-auth/otp/generate',
                    headers: {
                        "X-W3-Challenge-Token": `${challengeToken}`,
                        'X-Wind-Client': 'app-ios',
                        'X-Brand': 'ONEBRAND',
                    },
                    body: {
                        "email": `${credenziali.username}`
                    }

                }
                cy.requestAndLog(requestObj).then((resp) => {
                    expect(resp.status).to.eq(200)
                    expect(resp.body.status).to.be.equal('OK')
                    cy.logResponse(resp,requestObj.url)
                })
            
                })
                
        }
    )

    it('/api/v1/strong-auth/otp/verify', function()
        {
            //skip esecuzione test se il flag SKIP_E2E_TESTS è a true.
            cy.onlyOn(!Cypress.env("SKIP_E2E_TESTS"))
            
            cy.on('fail', (e, runnable) => {
                console.log('error', e)
                console.log('runnable', runnable)
                Cypress.env("SKIP_E2E_TESTS",true)
                cy.log("*****Imposto skip e2e test a true*****")
                throw new Error("test fails here")
              })

            var challengeToken = ''
            var token = ''
            var codice_cliente = ''
            var lineId = ''
            var contractId = ''

            cy.task('loadChallengeToken').then((jwt) => {
                console.log('token jwt: ' + jwt)
                challengeToken = jwt
                
                // sbianco token per evitare che i test successivi utilizzino token vecchio
                cy.task('saveToken', "")

                const requestObj = {
                    method: 'POST',
                    url: Cypress.env("base_url_bs") + '/api/v1/strong-auth/otp/verify',
                    headers: {
                        "X-W3-Challenge-Token": `${challengeToken}`,
                        'X-Wind-Client': 'app-ios',
                        'X-Brand': 'ONEBRAND',
                    },
                    body: {
                        "email": `${credenziali.username}`,
                        "otp": "123456"
                    }

                }
                cy.requestAndLog(requestObj).then((resp) => {
                    expect(resp.status).to.eq(200)
                    expect(resp.body.status).to.be.equal('OK')
                    cy.logResponse(resp,requestObj.url)
                    token = resp.headers['x-w3-token']
                    arrayContracts = resp.body.data.contracts
                    console.log('array contratti: '+ JSON.stringify(arrayContracts))
                    cy.task('saveToken', token)
                    
                    // imoosto variabile skip test a false perchè la login è passata
                    Cypress.env("SKIP_E2E_TESTS",false)
                    cy.log("*****Impostato skip e2e test a false*****")

                    cy.task('saveArrayContracts', arrayContracts)
                    // cy.writeFile('cypress/downloads/arrayContracts.txt',arrayContracts)
                    // Cypress.env('arrayContracts', arrayContracts)
                    console.log('Valore variabile ambiente SKIP_E2E_TESTS: '+ Cypress.env("SKIP_E2E_TESTS"))

                    })
            })

    })

    })
})