/// <reference types="Cypress" />
require('@cypress/skip-test/support')
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
            
    it('api/ob/v2/contract/lineunfolded', function()
    {
        cy.log('Valore variabile ambiente SKIP_E2E_TESTS dentro blocco it() lineUnfolded: '+ Cypress.env("SKIP_E2E_TESTS"))
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
                        url: Cypress.env("base_url_bs") + '/api/ob/v2/contract/lineunfolded',
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

})