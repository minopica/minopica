class CheckoutPage
{

getCheckout()
{
    return cy.contains('Checkout')
}

getDeliveryLocation()
{
    return cy.get('input[id="country"]')
}

getDeliveryLocationSuggestion()
{
    return cy.get('.suggestions').contains('India')
}

clickCheckBox()
{
    //return cy.get('label[for="checkbox2"]')
    return cy.get('#checkbox2')
}

clickPurchase()
{
    return cy.get('input[type="submit"]')
}

thankYouMessage()
{
    //return cy.contains('Thank you! Your order will be delivered in next few weeks :-).')
    return cy.get('.alert')
}

getProductValues()
{
    return cy.get('tr td:nth-child(4) strong')
}

getTotalValue()
{
    return cy.get('tr td:nth-child(5) strong')
}

}

export default CheckoutPage;