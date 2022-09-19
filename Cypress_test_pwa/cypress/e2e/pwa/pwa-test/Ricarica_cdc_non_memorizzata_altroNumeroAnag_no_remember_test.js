/// <reference types="Cypress" />
import HomePage from '../../../support/pageObjects/HomePage.js'
import RicaricaPage from '../../../support/pageObjects/RicaricaPage.js'
import SiaPage from '../../../support/pageObjects/SiaPage.js'


describe('PWA test - Ricarica', function()
{
    const homePage = new HomePage()
    const ricaricaPage = new RicaricaPage()
    const siaPage = new SiaPage()

    it('Ricarica senza cdc memorizzata no remember - env test', function()
    {
        Cypress.config('defaultCommandTimeout', 10000)
        //cy.visit("http://pwa.dev.windtre.it/oa/auth/login")
        cy.visit(Cypress.env("url_test"))
        cy.login_credenziali('107935_10f1@test.it','12345678')
        cy.wait(10000)
        
        homePage.getRicaricaButton().click()        
        // cy.get('#credit_banner_ricarica').click()
        cy.wait(10000)

        // click su icona Rubrica
        ricaricaPage.get_iconaRubrica().click()

        // click su primo numero in rubrica
        ricaricaPage.get_lineaDaRicaricareAnag().click()

        // seleziona taglio da 11€
        ricaricaPage.get_taglio_11euro().click()
        
        // seleziona aggiungi altro MDP
        ricaricaPage.get_aggiungiMDP().click()
        
        // rimuovi spunta Ricorda il mio metodo di pagamento
        ricaricaPage.get_ricordaMDP().click()
        
        // seleziona MDP Carta di Credito
        ricaricaPage.get_selezionaCDC().click()

        // click su CONTINUA Salva indirizzo email
        ricaricaPage.get_continuaSalvaEmail().click()

        cy.esegui_ricaricaCDC_sia('Antimo','5255000260000014','12','23','123')

        // assert su thankyou page
        cy.wait(20000)
        ricaricaPage.get_thankyouPage().should("have.text","GRAZIE!")

    }
    )

}
)