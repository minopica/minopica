/// <reference types="Cypress" />
import LoginPage from '../../support/pageObjects/LoginPage.js'


describe('PWA test - Test API', function()
{
    const loginPage = new LoginPage()
    const credenziali_bs = require('../../fixtures/credenziali_login_bs.json')
    var arrayContracts = ''

    before(() => {
        // runs once before all tests
        cy.fixture('example.json').then(function(data)
        {
            this.data = data
        }
        )

      })

    credenziali_bs.forEach((credenziali) => {

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
                    url: 'https://apigw.bs.windtre.it/api/v1/strong-auth/credentials',
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
                        url: 'https://apigw.bs.windtre.it/api/v1/strong-auth/otp/generate',
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
                var challengeToken = ''
                var token = ''
                var codice_cliente = ''
                var lineId = ''
                var contractId = ''

                cy.task('loadChallengeToken').then((jwt) => {
                    console.log('token jwt: ' + jwt)
                    challengeToken = jwt

                    cy.request({
                        method: 'POST',
                        url: 'https://apigw.bs.windtre.it/api/v1/strong-auth/otp/verify',
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
                        cy.task('saveCodiceCliente', codice_cliente)
                        cy.task('saveLineId', lineId)
                        cy.task('saveContractId', contractId)
                        cy.task('saveArrayContracts', arrayContracts)
                        cy.writeFile('cypress/downloads/arrayContracts.txt',arrayContracts)
                        Cypress.env('arrayContracts', arrayContracts)

                        })

                })

            })

            it('api/ob/v2/contract/lineunfolded', function()
            {
                var token = ''
                var codice_cliente = ''
                var lineId = ''
                var contractId = ''

                cy.task('loadToken').then((jwt) => {
                    console.log('token jwt: ' + jwt)
                    token = jwt
                    // cy.task('loadCodiceCliente').then((code) => {
                    //     console.log('codice_cliente caricato: ' + code)
                    //     codice_cliente = code
                    // })
                    // cy.task('loadLineId').then((linea) => {
                    //     console.log('lineId caricato: ' + linea)
                    //     lineId = linea
                    //     console.log(lineId)
                    // })
                    // cy.task('loadContractId').then((contratto) => {
                    //     console.log('contractId caricato: ' + contratto)
                    //     contractId = contratto
                       
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
                                url: 'https://apigw.bs.windtre.it/api/ob/v2/contract/lineunfolded',
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
                                // redirect status code is 302
                                expect(resp.status).to.eq(200)
                                expect(resp.body.status).to.be.equal('OK')
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
                        expect(resp.body.tokenValue).includes('ya29')
                        })

                })

            })


    })


}
)