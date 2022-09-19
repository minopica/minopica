class RicaricaPage
{
    
     // seleziona taglio da 11€
    
    get_taglio_11euro()
    {
        return cy.contains('11 €')
    }

    get_aggiungiMDP()
    {
        return cy.contains('aggiungi altro metodo di pagamento')
    }

    get_ricordaMDP()
    {
        return cy.contains("Ricorda il mio metodo di pagamento")
    }

    get_selezionaCDC()
    {
        return cy.contains("Carta di credito")
    }

    get_continuaSalvaEmail()
    {
        return  cy.get('.execute-submit')
    }

    // titolo thankyou page
    get_thankyouPage()
    {
        return cy.get("h2[class$='section-title-w-des']")
    }

    //TextField numero da ricaricare
    get_numeroDaRicaricare()
    {
        return cy.get('input[data-placeholder="Numero da ricaricare"]')
    }

    //Icona rubrica numero da ricaricare
    get_iconaRubrica()
    {
        return cy.get('svg')
    }

    //recupera prima linea da ricaricare in Anagrafica
    get_lineaDaRicaricareAnag()
    {
        return cy.get('.lines-list').find('div').eq(1)
    }


}

export default RicaricaPage