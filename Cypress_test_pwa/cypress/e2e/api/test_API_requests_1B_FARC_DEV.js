/// <reference types="Cypress" />
require('@cypress/skip-test/support')
import LoginPage from '../../support/pageObjects/LoginPage.js'


describe('1B FARC API - DEV - Test API', function()
{
    const loginPage = new LoginPage()
    const credenziali_test = require('../../fixtures/credenziali_login_farc_test.json')
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
                    console.log("*****Imposto skip e2e test a true*****")
                    throw new Error("test fails here")
                  })

                Cypress.config('defaultCommandTimeout', 20000)
        
                // cy.intercept({
                //     method : "POST",
                //     path: "/ob/int/gw/api/v1/strong-auth/credentials"
                // }, (req) => {
                //     cy.log(req.headers)
                //     cy.log(req.body)

                //     req.continue((res) => {
                //         cy.log(res.headers)
                //         cy.log(res.body)
                //       })
                //   })


                cy.log(` method: 'POST', url: 'https://pre.windtre.it/ob/int/gw/api/v1/strong-auth/credentials', headers: {'X-Wind-Client': 'web','X-Brand': 'ONEBRAND','Customer-Id': ${codice_cliente}, body: {'rememberMe': true,'username': ${credenziali.username},'password': ${credenziali.password}}`)
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
                        expect(resp.body.status).to.be.equal('OK')
                        cy.log("*** RESPONSE ***")
                        cy.log(JSON.stringify(resp.headers))
                        cy.log(JSON.stringify(resp.body))
                        challenge_token = resp.headers['x-w3-challenge-token']
                        cy.log('challenge token: '+ challenge_token)
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

        it('/api/v1/strong-auth/otp/verify', function()
            {
                //skip esecuzione test se il flag SKIP_E2E_TESTS è a true.
                cy.onlyOn(!Cypress.env("SKIP_E2E_TESTS"))
                
                cy.on('fail', (e, runnable) => {
                    console.log('error', e)
                    console.log('runnable', runnable)
                    Cypress.env("SKIP_E2E_TESTS",true)
                    console.log("*****Imposto skip e2e test a true*****")
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
                    // imoosto variabile skip test a true per skippare le successive chiamate in caso di fallimento login.
                    // console.log("*****Imposto skip e2e test a true*****")
                    // Cypress.env("SKIP_E2E_TESTS",true)


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
                        arrayContracts = resp.body.data.contracts
                        console.log('token JWT: ' + token)
                        console.log('array contratti: '+ arrayContracts)
                        cy.task('saveToken', token)
                        
                        // imoosto variabile skip test a false perchè la login è passata
                        Cypress.env("SKIP_E2E_TESTS",false)
                        console.log("*****Impostato skip e2e test a false*****")

                        cy.task('saveArrayContracts', arrayContracts)
                        cy.writeFile('cypress/downloads/arrayContracts.txt',arrayContracts)
                        Cypress.env('arrayContracts', arrayContracts)
                        console.log('Valore variabile ambiente SKIP_E2E_TESTS: '+ Cypress.env("SKIP_E2E_TESTS"))

                        })
                })

            })
            
            it('api/ob/v2/contract/lineunfolded', function()
            {
                console.log('Valore variabile ambiente SKIP_E2E_TESTS dentro blocco it() lineUnfolded: '+ Cypress.env("SKIP_E2E_TESTS"))
                //skip esecuzione test se il flag SKIP_E2E_TESTS è a true.
                cy.onlyOn(!Cypress.env("SKIP_E2E_TESTS"))
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


                it('api/v1/ch/payment/bills', function()
                {
                    console.log('Valore variabile ambiente SKIP_E2E_TESTS dentro blocco it() lineUnfolded: '+ Cypress.env("SKIP_E2E_TESTS"))
                    //skip esecuzione test se il flag SKIP_E2E_TESTS è a true.
                    cy.onlyOn(!Cypress.env("SKIP_E2E_TESTS"))
                    var token = ''
                    var codice_cliente = ''
                    var lineId = ''
                    var contractId = ''
                    var flagFarc = ''
                    var paymentType = ''
                    var cdf = ''
                    var contractStatus = ''
                    var wasTied = ''
                    var bodyRequest_bills = ''
    
                    cy.task('loadToken').then((jwt) => {
                        console.log('token jwt: ' + jwt)
                        token = jwt
                        cy.task('loadArrayContracts').then((contratti)=> {
                            bodyRequest_bills = {"cdfList":[],"customerId":""}
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
                                flagFarc = contratti[i].lines[0].flagFarc
                                console.log(`flagFarc linea n.${i}: ` + flagFarc)
                                cdf = contratti[i].lines[0].idBillingAccount
                                console.log(`CDF linea n.${i}: ` + cdf)
                                wasTied = contratti[i].lines[0].wasTied
                                console.log(`wasTied linea n.${i}: ` + wasTied)
                                paymentType = contratti[i].lines[0].paymentType
                                console.log(`paymentType linea n.${i}: ` + paymentType)
                                contractStatus = contratti[i].status
                                console.log(`contractStatus linea n.${i}: ` + contractStatus)
                                bodyRequest_bills.cdfList[i] = {"cdf":cdf, "lines":[{"paymentType":paymentType,"id":lineId,"contractStatus":contractStatus,"wasTied":wasTied,"current": false}]}
                                bodyRequest_bills.customerId = codice_cliente
                                bodyRequest_bills.cdfList[0].lines[0].current = true
                                console.log('stampo oggetto bodyRequest_bills', bodyRequest_bills)
                                

                                cy.request({
                                    method: 'POST',
                                    url: 'https://pre.windtre.it/ob/int/gw/api/v1/ch/payment/bills',
                                    headers: {
                                        Authorization: 'Bearer ' + token,
                                        'X-Wind-Client': 'app-ios',
                                        'X-Brand': 'ONEBRAND',
                                        'Customer-Id': codice_cliente
                                    },
                                    body: bodyRequest_bills
                                    
                            
                            
                                }).then((resp) => {
                                    expect(resp.status).to.eq(200)
                                    expect(resp.body.status).to.be.equal('OK')
                                    //expect(resp.body.data.lines[0].id).to.be.equal(contratti[i].lines[0].id)
                                })
                            }
    
                        })
                    
                        })
                        
                    }
                    )


            })
    })