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
                    let url = Cypress.env("base_url_test") +'/api/v1/strong-auth/credentials'
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
                        url: Cypress.env("base_url_test") + '/api/v1/strong-auth/otp/generate',
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

                    const requestObj = {
                        method: 'POST',
                        url: Cypress.env("base_url_test") + '/api/v1/strong-auth/otp/verify',
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
                        console.log("*****Impostato skip e2e test a false*****")

                        cy.task('saveArrayContracts', arrayContracts)
                        // cy.writeFile('cypress/downloads/arrayContracts.txt',arrayContracts)
                        // Cypress.env('arrayContracts', arrayContracts)
                        console.log('Valore variabile ambiente SKIP_E2E_TESTS: '+ Cypress.env("SKIP_E2E_TESTS"))

                        })
                })

        })
            
        it.skip('api/ob/v2/contract/lineunfolded', function()
        {
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
                    //console.log('array Contratti caricato: ' + JSON.stringify(contratti))
                    //console.log('lineId caricato da arrayContratti: '+ contratti[0].lines[0].id)
                    console.log('numero contratti: '+ contratti.length)
                    for (let i=0;i<contratti.length;i++) {
                        console.log(`lineId n.${i}: ` + contratti[i].lines[0].id)
                        lineId = contratti[i].lines[0].id
                        console.log(`contractId n.${i}: ` + contratti[i].lines[0].contractId)
                        contractId = contratti[i].lines[0].contractId
                        console.log(`codice cliente linea n.${i}: ` + contratti[i].lines[0].customerId)
                        codice_cliente = contratti[i].lines[0].customerId
                        
                        const requestObj = {
                            method: 'GET',
                            url: Cypress.env("base_url_test") + '/api/ob/v2/contract/lineunfolded',
                            qs: {
                                "contractId": `${contractId}`,
                                "lineId": `${lineId}`,
                            },
                            headers: {
                                Authorization: 'Bearer ' + `${token}`,
                                'Customer-Id': `${codice_cliente}`,
                                'X-Wind-Client': 'app-ios',
                                'X-Brand': 'ONEBRAND',
                            }
                        }
                        cy.requestAndLog(requestObj).then((resp) => {
                            expect(resp.status).to.eq(200)
                            expect(resp.body.status).to.be.equal('OK')
                            expect(resp.body.data.lines[0].id).to.be.equal(contratti[i].lines[0].id)
                            cy.logResponse(resp,requestObj.url)
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
            var indice = ''

            cy.task('loadToken').then((jwt) => {
                console.log('token jwt: ' + jwt)
                token = jwt
                cy.task('loadArrayContracts').then((contratti)=> {
                    bodyRequest_bills = {"cdfList":[],"customerId":""}
                    console.log('array Contratti caricato: ' + contratti)
                    //console.log('lineId caricato da arrayContratti: '+ contratti[0].lines[0].id)
                    console.log('numero contratti: '+ contratti.length)
                    for (let i=0;i<contratti.length;i++) {
                        flagFarc = contratti[i].lines[0].flagFarc
                        console.log(`flagFarc linea n.${i}: ` + flagFarc)
                        if (flagFarc=='N') continue
                        console.log(`lineId n.${i}: ` + contratti[i].lines[0].id)
                        lineId = contratti[i].lines[0].id
                        console.log(`contractId n.${i}: ` + contratti[i].lines[0].contractId)
                        contractId = contratti[i].lines[0].contractId
                        console.log(`codice cliente linea n.${i}: ` + contratti[i].lines[0].customerId)
                        codice_cliente = contratti[i].lines[0].customerId
                        cdf = contratti[i].lines[0].idBillingAccount
                        console.log(`CDF linea n.${i}: ` + cdf)
                        wasTied = contratti[i].lines[0].wasTied
                        console.log(`wasTied linea n.${i}: ` + wasTied)
                        paymentType = contratti[i].lines[0].paymentType
                        console.log(`paymentType linea n.${i}: ` + paymentType)
                        contractStatus = contratti[i].status
                        console.log(`contractStatus linea n.${i}: ` + contractStatus)

                        
                        if (bodyRequest_bills.cdfList.find((el) => el.cdf==cdf)) {
                            indice = bodyRequest_bills.cdfList.findIndex((el) => el.cdf==cdf)
                            console.log('*************** indice elemento cdf:'+ indice)
                            bodyRequest_bills.cdfList[indice].lines.push({"paymentType":paymentType,"id":lineId,"contractStatus":contractStatus,"wasTied":wasTied,"current": false})
                        }
                        else {
                            bodyRequest_bills.cdfList.push({"cdf":cdf, "lines":[{"paymentType":paymentType,"id":lineId,"contractStatus":contractStatus,"wasTied":wasTied,"current": false}]})
                        }
                        console.log('stampo oggetto bodyRequest_bills dentro ciclo', bodyRequest_bills)
                    }
                    console.log('lunghezza array cdfList: ' + bodyRequest_bills.cdfList.length)
                    if (bodyRequest_bills.cdfList.length == 0) {
                        //nessuna linea ha flagFarc a Y
                        console.log('*****entro nella condizione per skippare test*****')
                        return cy.onlyOn(false)
                    }

                    for (let i=0;i<bodyRequest_bills.cdfList.length;i++) {
                        bodyRequest_bills.customerId = codice_cliente
                        for (let y=0;y<bodyRequest_bills.cdfList[i].lines.length;y++) {
                            bodyRequest_bills.cdfList[i].lines[y].current = true
                            const requestObj = {
                                method: 'POST',
                                url: Cypress.env("base_url_test") + '/api/v1/ch/payment/bills',
                                headers: {
                                    Authorization: 'Bearer ' + `${token}`,
                                    'Customer-Id': `${codice_cliente}`,
                                    'X-Wind-Client': 'app-ios',
                                    'X-Brand': 'ONEBRAND',
                                    'Content-Type': 'application/json'
                                },
                                body: `${JSON.stringify(bodyRequest_bills)}`
                            }
                            cy.requestAndLog(requestObj).then((resp) => {
                                expect(resp.status).to.eq(200)
                                expect(resp.body.status).to.be.equal('OK')
                                cy.logResponse(resp,requestObj.url)
                            })
                            // reset current sulla linea appena richiamata a false
                            bodyRequest_bills.cdfList[i].lines[y].current = false
                        }
                    }



                })
            
                })
                
            }
        )

        it('api/v1/ch/payment/bills/events', function()
        {
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
            var indice = ''

            cy.task('loadToken').then((jwt) => {
                console.log('token jwt: ' + jwt)
                token = jwt
                cy.task('loadArrayContracts').then((contratti)=> {
                    bodyRequest_bills = {"cdfList":[],"customerId":""}
                    console.log('array Contratti caricato: ' + contratti)
                    //console.log('lineId caricato da arrayContratti: '+ contratti[0].lines[0].id)
                    console.log('numero contratti: '+ contratti.length)
                    for (let i=0;i<contratti.length;i++) {
                        flagFarc = contratti[i].lines[0].flagFarc
                        console.log(`flagFarc linea n.${i}: ` + flagFarc)
                        if (flagFarc=='N') continue
                        console.log(`lineId n.${i}: ` + contratti[i].lines[0].id)
                        lineId = contratti[i].lines[0].id
                        console.log(`contractId n.${i}: ` + contratti[i].lines[0].contractId)
                        contractId = contratti[i].lines[0].contractId
                        console.log(`codice cliente linea n.${i}: ` + contratti[i].lines[0].customerId)
                        codice_cliente = contratti[i].lines[0].customerId
                        cdf = contratti[i].lines[0].idBillingAccount
                        console.log(`CDF linea n.${i}: ` + cdf)
                        wasTied = contratti[i].lines[0].wasTied
                        console.log(`wasTied linea n.${i}: ` + wasTied)
                        paymentType = contratti[i].lines[0].paymentType
                        console.log(`paymentType linea n.${i}: ` + paymentType)
                        contractStatus = contratti[i].status
                        console.log(`contractStatus linea n.${i}: ` + contractStatus)

                        
                        if (bodyRequest_bills.cdfList.find((el) => el.cdf==cdf)) {
                            indice = bodyRequest_bills.cdfList.findIndex((el) => el.cdf==cdf)
                            console.log('*************** indice elemento cdf:'+ indice)
                            bodyRequest_bills.cdfList[indice].lines.push({"paymentType":paymentType,"id":lineId,"contractStatus":contractStatus,"wasTied":wasTied,"current": false})
                        }
                        else {
                            bodyRequest_bills.cdfList.push({"cdf":cdf, "lines":[{"paymentType":paymentType,"id":lineId,"contractStatus":contractStatus,"wasTied":wasTied,"current": false}]})
                        }
                        console.log('stampo oggetto bodyRequest_bills dentro ciclo', bodyRequest_bills)
                    }
                    console.log('lunghezza array cdfList: ' + bodyRequest_bills.cdfList.length)
                    if (bodyRequest_bills.cdfList.length == 0) {
                        //nessuna linea ha flagFarc a Y
                        console.log('*****entro nella condizione per skippare test*****')
                        return cy.onlyOn(false)
                    }
                    for (let i=0;i<bodyRequest_bills.cdfList.length;i++) {
                        bodyRequest_bills.customerId = codice_cliente
                        for (let y=0;y<bodyRequest_bills.cdfList[i].lines.length;y++) {
                            bodyRequest_bills.cdfList[i].lines[y].current = true
                            const requestObj = {
                                method: 'POST',
                                url: Cypress.env("base_url_test") + '/api/v1/ch/payment/bills/events',
                                headers: {
                                    Authorization: 'Bearer ' + `${token}`,
                                    'Customer-Id': `${codice_cliente}`,
                                    'X-Wind-Client': 'app-ios',
                                    'X-Brand': 'ONEBRAND',
                                    'Content-Type': 'application/json'
                                },
                                body: `${JSON.stringify(bodyRequest_bills)}`
                            }
                            cy.requestAndLog(requestObj).then((resp) => {
                                expect(resp.status).to.eq(200)
                                expect(resp.body.status).to.be.equal('OK')
                                cy.logResponse(resp,requestObj.url)
                            })
                            // reset current sulla linea appena richiamata a false
                            bodyRequest_bills.cdfList[i].lines[y].current = false
                        }
                    }



                })
            
                })
                
            }
        )

        it('api/v1/ch/payment/mdp/history', function()
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
                var indice = ''

                cy.task('loadToken').then((jwt) => {
                    console.log('token jwt: ' + jwt)
                    token = jwt
                    cy.task('loadArrayContracts').then((contratti)=> {
                        bodyRequest_bills = {"cdfList":[],"customerId":""}
                        console.log('array Contratti caricato: ' + contratti)
                        //console.log('lineId caricato da arrayContratti: '+ contratti[0].lines[0].id)
                        console.log('numero contratti: '+ contratti.length)
                        for (let i=0;i<contratti.length;i++) {
                            flagFarc = contratti[i].lines[0].flagFarc
                            console.log(`flagFarc linea n.${i}: ` + flagFarc)
                            if (flagFarc=='N') continue
                            console.log(`lineId n.${i}: ` + contratti[i].lines[0].id)
                            lineId = contratti[i].lines[0].id
                            console.log(`contractId n.${i}: ` + contratti[i].lines[0].contractId)
                            contractId = contratti[i].lines[0].contractId
                            console.log(`codice cliente linea n.${i}: ` + contratti[i].lines[0].customerId)
                            codice_cliente = contratti[i].lines[0].customerId
                            cdf = contratti[i].lines[0].idBillingAccount
                            console.log(`CDF linea n.${i}: ` + cdf)
                            wasTied = contratti[i].lines[0].wasTied
                            console.log(`wasTied linea n.${i}: ` + wasTied)
                            paymentType = contratti[i].lines[0].paymentType
                            console.log(`paymentType linea n.${i}: ` + paymentType)
                            contractStatus = contratti[i].status
                            console.log(`contractStatus linea n.${i}: ` + contractStatus)

                            
                            if (bodyRequest_bills.cdfList.find((el) => el.cdf==cdf)) {
                                indice = bodyRequest_bills.cdfList.findIndex((el) => el.cdf==cdf)
                                console.log('*************** indice elemento cdf:'+ indice)
                                bodyRequest_bills.cdfList[indice].lines.push({"paymentType":paymentType,"id":lineId,"contractStatus":contractStatus,"wasTied":wasTied,"current": false})
                            }
                            else {
                                bodyRequest_bills.cdfList.push({"cdf":cdf, "lines":[{"paymentType":paymentType,"id":lineId,"contractStatus":contractStatus,"wasTied":wasTied,"current": false}]})
                            }
                            console.log('stampo oggetto bodyRequest_bills dentro ciclo', bodyRequest_bills)
                        }
                        console.log('lunghezza array cdfList: ' + bodyRequest_bills.cdfList.length)
                        if (bodyRequest_bills.cdfList.length == 0) {
                            //nessuna linea ha flagFarc a Y
                            console.log('*****entro nella condizione per skippare test*****')
                            return cy.onlyOn(false)
                        }
                        for (let i=0;i<bodyRequest_bills.cdfList.length;i++) {
                            bodyRequest_bills.customerId = codice_cliente
                            for (let y=0;y<bodyRequest_bills.cdfList[i].lines.length;y++) {
                                bodyRequest_bills.cdfList[i].lines[y].current = true
                                const requestObj = {
                                    method: 'POST',
                                    url: Cypress.env("base_url_test") + '/api/v1/ch/payment/mdp/history',
                                    headers: {
                                        Authorization: 'Bearer ' + `${token}`,
                                        'Customer-Id': `${codice_cliente}`,
                                        'X-Wind-Client': 'app-ios',
                                        'X-Brand': 'ONEBRAND',
                                        'Content-Type': 'application/json'
                                    },
                                    body: `${JSON.stringify(bodyRequest_bills)}`
                                }
                                cy.requestAndLog(requestObj).then((resp) => {
                                    expect(resp.status).to.eq(200)
                                    expect(resp.body.status).to.be.equal('OK')
                                    cy.logResponse(resp,requestObj.url)
                                })
                                // reset current sulla linea appena richiamata a false
                                bodyRequest_bills.cdfList[i].lines[y].current = false
                            }
                        }


                    })
                
                    })
                    
                }
        )

        it('api/v1/ch/payment/retrieve-mdp', function()
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
            var indice = ''

            cy.task('loadToken').then((jwt) => {
                console.log('token jwt: ' + jwt)
                token = jwt
                cy.task('loadArrayContracts').then((contratti)=> {
                    bodyRequest_bills = {"cdfList":[],"customerId":""}
                    console.log('array Contratti caricato: ' + contratti)
                    //console.log('lineId caricato da arrayContratti: '+ contratti[0].lines[0].id)
                    console.log('numero contratti: '+ contratti.length)
                    for (let i=0;i<contratti.length;i++) {
                        flagFarc = contratti[i].lines[0].flagFarc
                        console.log(`flagFarc linea n.${i}: ` + flagFarc)
                        if (flagFarc=='N') continue
                        console.log(`lineId n.${i}: ` + contratti[i].lines[0].id)
                        lineId = contratti[i].lines[0].id
                        console.log(`contractId n.${i}: ` + contratti[i].lines[0].contractId)
                        contractId = contratti[i].lines[0].contractId
                        console.log(`codice cliente linea n.${i}: ` + contratti[i].lines[0].customerId)
                        codice_cliente = contratti[i].lines[0].customerId
                        cdf = contratti[i].lines[0].idBillingAccount
                        console.log(`CDF linea n.${i}: ` + cdf)
                        wasTied = contratti[i].lines[0].wasTied
                        console.log(`wasTied linea n.${i}: ` + wasTied)
                        paymentType = contratti[i].lines[0].paymentType
                        console.log(`paymentType linea n.${i}: ` + paymentType)
                        contractStatus = contratti[i].status
                        console.log(`contractStatus linea n.${i}: ` + contractStatus)

                        
                        if (bodyRequest_bills.cdfList.find((el) => el.cdf==cdf)) {
                            indice = bodyRequest_bills.cdfList.findIndex((el) => el.cdf==cdf)
                            console.log('*************** indice elemento cdf:'+ indice)
                            bodyRequest_bills.cdfList[indice].lines.push({"paymentType":paymentType,"id":lineId,"contractStatus":contractStatus,"wasTied":wasTied,"current": false})
                        }
                        else {
                            bodyRequest_bills.cdfList.push({"cdf":cdf, "lines":[{"paymentType":paymentType,"id":lineId,"contractStatus":contractStatus,"wasTied":wasTied,"current": false}]})
                        }
                        console.log('stampo oggetto bodyRequest_bills dentro ciclo', bodyRequest_bills)
                    }
                    console.log('lunghezza array cdfList: ' + bodyRequest_bills.cdfList.length)
                    if (bodyRequest_bills.cdfList.length == 0) {
                        //nessuna linea ha flagFarc a Y
                        console.log('*****entro nella condizione per skippare test*****')
                        return cy.onlyOn(false)
                    }
                    for (let i=0;i<bodyRequest_bills.cdfList.length;i++) {
                        bodyRequest_bills.customerId = codice_cliente
                        const requestObj = {
                            method: 'GET',
                            url: Cypress.env("base_url_test") + '/api/v0/ch/payment/retrieve-mdp',
                            headers: {
                                Authorization: 'Bearer ' + `${token}`,
                                'Customer-Id': `${codice_cliente}`,
                                'X-Wind-Client': 'app-ios',
                                'X-Brand': 'ONEBRAND',
                                'Content-Type': 'application/json'
                            },
                            qs: {
                                "cdf": `${cdf}`
                            }
                        }
                        cy.requestAndLog(requestObj).then((resp) => {
                            expect(resp.status).to.eq(200)
                            expect(resp.body.status).to.be.equal('OK')
                            cy.logResponse(resp,requestObj.url)
                        })
                    }


                })
            
                })
                
            }
        )    

    })
})