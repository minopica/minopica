/// <reference types="Cypress" />
import LoginPage from '../../support/pageObjects/LoginPage.js'


describe('1B DEV - Test API', function()
{
    const loginPage = new LoginPage()
    const credenziali_test = require('../../fixtures/credenziali_login_test.json')
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

        it(`/api/v1/strong-auth/credentials ${credenziali.username} estrazione challenge-token`, function()
            {
                var token = ''
                var codice_cliente = ''
                var lineId = ''
                var contractId = ''
                var challenge_token = ""
                //const loginPage = new LoginPage()
                Cypress.config('defaultCommandTimeout', 20000)
                cy.request({
                    method: 'POST',
                    url: 'https://pre.windtre.it/ob/int/gw/api/v1/strong-auth/credentials',
                    headers: {
                        'X-Wind-Client': 'web',
                        'X-Brand': 'ONEBRAND',
                        'Customer-Id': codice_cliente
                    },
                    body: {
                            "rememberMe": true,
                            "username": credenziali.username,
                            "password": credenziali.password
                    }
                    }).then((resp) => {
                        expect(resp.status).to.eq(200)
                        challenge_token = resp.headers['x-w3-challenge-token']
                        console.log('challenge token: '+ challenge_token)
                        cy.task('saveChallengeToken', challenge_token)
                    })
            }
            )
        

        it('/api/v1/strong-auth/otp/generate', function()
            {
                var challengeToken = ''

                cy.task('loadChallengeToken').then((jwt) => {
                    console.log('token jwt: ' + jwt)
                    challengeToken = jwt
                    
                    cy.request({
                        method: 'POST',
                        url: 'https://pre.windtre.it/ob/int/gw/api/v1/strong-auth/otp/generate',
                        headers: {
                            "X-W3-Challenge-Token": challengeToken,
                            'X-Wind-Client': 'app-ios',
                            'X-Brand': 'ONEBRAND',
                        },
                        body: {
                            "email": credenziali.username
                        }
                
                    }).then((resp) => {
                        // redirect status code is 302
                        expect(resp.status).to.eq(200)
                        expect(resp.body.status).to.be.equal('OK')
                    })
                
                    })
                    
            }
            )
        let SKIP_E2E_TESTS = ""
        it('/api/v1/strong-auth/otp/verify', function()
            {
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
                    // imoosto variabile skip test a true per skippare le successive chiamate in caso di fallimento login.
                    console.log("*****Imposto skip e2e test a true*****")
                    Cypress.env("SKIP_E2E_TESTS",true)
                    console.log("*****Impostato skip e2e test a true*****")

                    cy.request({
                        method: 'POST',
                        url: 'https://pre.windtre.it/ob/int/gw/api/v1/strong-auth/otp/verify',
                        headers: {
                            "X-W3-Challenge-Token": challengeToken,
                            'X-Wind-Client': 'app-ios',
                            'X-Brand': 'ONEBRAND',
                        },
                        body: {
                            "email": credenziali.username,
                            "otp": "123456"
                        }
                
                        }).then((resp) => {
                        expect(resp.status).to.eq(200)
                        expect(resp.body.status).to.be.equal('OK')

                        token = resp.headers['x-w3-token']
                        codice_cliente = resp.body.data.summary.contracts[0].code
                        lineId = resp.body.data.contracts[0].lines[0].id
                        arrayContracts = resp.body.data.contracts
                        contractId = resp.body.data.contracts[0].lines[0].contractId
                        console.log('token JWT: ' + token)
                        console.log('codice cliente: ' + codice_cliente)
                        console.log('lineId: ' + lineId)
                        console.log('contractId: ' + contractId)
                        console.log('array contratti: '+ arrayContracts)
                        cy.task('saveToken', token)
                        
                        // imoosto variabile skip test a false perchè la login è passata
                        Cypress.env("SKIP_E2E_TESTS",false)
                        SKIP_E2E_TESTS = false
                        console.log("*****Impostato skip e2e test a false*****")

                        cy.task('saveCodiceCliente', codice_cliente)
                        cy.task('saveLineId', lineId)
                        cy.task('saveContractId', contractId)
                        cy.task('saveArrayContracts', arrayContracts)
                        cy.writeFile('cypress/downloads/arrayContracts.txt',arrayContracts)
                        Cypress.env('arrayContracts', arrayContracts)
                        console.log('Valore variabile ambiente SKIP_E2E_TESTS: '+ Cypress.env("SKIP_E2E_TESTS"))

                        })
                })

            })

            console.log('Valore variabile ambiente SKIP_E2E_TESTS prima del blocco it(): '+ Cypress.env("SKIP_E2E_TESTS"))
            console.log('Valore variabile SKIP_E2E_TESTS prima del blocco it(): '+ SKIP_E2E_TESTS)
            if (!SKIP_E2E_TESTS) {
                it('api/ob/v2/contract/lineunfolded', function()
                {
                    var token = ''
                    var codice_cliente = ''
                    var lineId = ''
                    var contractId = ''
    
                    cy.task('loadToken').then((jwt) => {
                        console.log('token jwt: ' + jwt)
                        token = jwt
                        cy.task('loadArrayContracts').then((contratti)=> {
                            console.log('array Contratti caricato: ' + contratti)
                            //console.log('lineId caricato da arrayContratti: '+ contratti[0].lines[0].id)
                            console.log('numero contratti: '+ contratti.length)
                            for (let i=0;i<contratti.length;i++) {
                                console.log(`lineId n.${i}: ` + contratti[i].lines[0].id)
                                lineId = contratti[i].lines[0].id
                                console.log(`contractId n.${i}: ` + contratti[i].lines[0].contractId)
                                contractId = contratti[i].lines[0].contractId
                                console.log(`codice cliente linea n.${i}: ` + contratti[i].lines[0].customerId)
                                codice_cliente = contratti[i].lines[0].customerId
                                cy.request({
                                    method: 'GET',
                                    url: 'https://pre.windtre.it/ob/int/gw/api/ob/v2/contract/lineunfolded',
                                    qs: {
                                        "contractId": contractId,
                                        "lineId": lineId,
                                    },
                                    headers: {
                                        Authorization: 'Bearer ' + token,
                                        'X-Wind-Client': 'web',
                                        'X-Brand': 'ONEBRAND',
                                        'Customer-Id': codice_cliente
                                    }
                            
                                }).then((resp) => {
                                    expect(resp.status).to.eq(200)
                                    expect(resp.body.status).to.be.equal('OK')
                                    expect(resp.body.data.lines[0].id).to.be.equal(contratti[i].lines[0].id)
                                })
                            }
    
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
                        cy.task('loadArrayContracts').then((contratti)=> {
                            console.log('array Contratti caricato: ' + contratti)
                            //console.log('lineId caricato da arrayContratti: '+ contratti[0].lines[0].id)
                            console.log('numero contratti: '+ contratti.length)
                            for (let i=0;i<contratti.length;i++) {
                                console.log(`codice cliente linea n.${i}: ` + contratti[i].lines[0].customerId)
                                codice_cliente = contratti[i].lines[0].customerId
                                cy.request({
                                    method: 'GET',
                                    url: 'https://pre.windtre.it/ob/int/gw/api/v1/app/analytics/token',
                                    headers: {
                                        Authorization: 'Bearer ' + token,
                                        'X-Wind-Client': 'web',
                                        'X-Brand': 'ONEBRAND',
                                        'Customer-Id': codice_cliente
                                    }
                            
                                    }).then((resp) => {
                                    // redirect status code is 302
                                    expect(resp.status).to.eq(200)
                                    expect(resp.body.tokenValue).includes('ya29')
                                    })
                            }
    
                        })
                    
                        })
                        
                    }
                    )
              }

 

            })
    })