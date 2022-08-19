/// <reference types="Cypress" />
/// <reference types="Cypress-iframe" />
import 'cypress-iframe'
import HomePage from '../../support/pageObjects/HomePage'
import ProductsPage from '../../support/pageObjects/ProductsPage'
import CheckoutPage from '../../support/pageObjects/CheckoutPage'

describe('Framework test Suite', function()
{
    before(() => {
        // runs once before all tests
        cy.fixture('example.json').then(function(data)
        {
            this.data = data
        }
        )

      })

it('My Framework test case', function()
{
    const homePage = new HomePage()
    const productsPage = new ProductsPage()
    const checkoutPage = new CheckoutPage()

    cy.visit(Cypress.env("url")+"/angularpractice/")
    //cy.get('input[name="name"]').eq(0).type("Bob")
    homePage.getEditBox().type(this.data.name)
    homePage.getGender().select(this.data.gender)
    homePage.getTwoWayDataBinding().should('have.value',this.data.name)
    homePage.getEditBox().should('have.attr','minlength','2')
    homePage.getEnterpreneur().should('be.disabled')
    homePage.getShopTab().click()
    
    // for debugging
    // cy.pause()
    
    this.data.productName.forEach(element => 
        cy.selectProduct(element)
        )
    
    productsPage.getCheckout().click()
    var sum=0
    checkoutPage.getProductValues().each(($el, index, $list) => {
        const valoreProdotto = $el.text()
        var res = valoreProdotto.split(" ")
        res = res[1].trim()
        sum = Number(sum)+Number(res)
    }).then(function() {
        cy.log(sum)
    })
    checkoutPage.getTotalValue().then(function(element) {
        const valoreTotale = element.text()
        var tot = valoreTotale.split(" ")
        tot = Number(tot[1].trim())
        expect(sum).to.equal(tot)
    })


    checkoutPage.getCheckout().click()
    checkoutPage.getDeliveryLocation().type('India')
    // set command timeout only for this specific test
    Cypress.config('defaultCommandTimeout', 8000)
    //cy.wait(5000)
    checkoutPage.getDeliveryLocationSuggestion().click()
    // force click on an element covered by another one
    checkoutPage.clickCheckBox().click({force:true})
    checkoutPage.clickPurchase().click()
    checkoutPage.thankYouMessage().then(function(element)
    {
        const actualText = element.text()
        expect(actualText.includes('Success')).to.be.true
    })


}
)

}
)