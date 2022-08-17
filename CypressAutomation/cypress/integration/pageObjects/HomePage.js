class HomePage
{

getEditBox()
{
    return cy.get('input[name="name"]:nth-child(2)')
}

getTwoWayDataBinding()
{
    return cy.get('input[name="name"]:nth-child(1)')
}

getGender()
{
    return cy.get('select')
}

getEnterpreneur()
{
    return cy.get('#inlineRadio3')
}

getShopTab()
{
    return cy.get('a[href="/angularpractice/shop"]')
}

}

export default HomePage;