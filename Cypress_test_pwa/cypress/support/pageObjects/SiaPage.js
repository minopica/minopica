class SiaPage
{
    
    // inserisci nome cognome intestatario CDC
    get_nome_cognome_cdc()
    {
        return cy.get('input[placeholder="Nome e cognome intestatario"]')
    }
    
    // inserisci numero CDC
    get_numero_cdc()
    {
        return cy.get('#input-card-number')
    }
    
    // inserisci mese scadenza
    get_expire_mm()
    {
        return cy.get('#input-expiration-date-month')
    }
    
    // inserisci anno scadenza
    get_expire_aa()
    {
        return cy.get('#input-expiration-date-year')
    }
    
    // inserisci cvv
    get_cvv()
    {
        return cy.get('#input-card-cvv')
    }

    // spunta informativa privacy
    get_privacy_checkbox()
    {
        return  cy.get('.checkbox-inner-text')
    }

    // click su CONFERMA
    get_conferma()
    {
        return  cy.get('#confirm-payment-button')
    }


}

export default SiaPage