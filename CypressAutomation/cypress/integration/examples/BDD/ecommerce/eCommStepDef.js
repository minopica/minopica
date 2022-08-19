import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import HomePage from '../../../../support/pageObjects/HomePage'
import ProductsPage from '../../../../support/pageObjects/ProductsPage'
import CheckoutPage from '../../../../support/pageObjects/CheckoutPage'

// npx cypress run --spec /Users/antimopica/git_minopica/CypressAutomation/cypress/integration/examples/BDD/*.feature --browser chrome --headed
// npx cypress-tags run -e TAGS="@Smoke" --spec /Users/antimopica/git_minopica/CypressAutomation/cypress/integration/examples/BDD/ecommerce.feature --browser chrome --headed
// add cucumber report options in package.json
// use html report plugin /create js file (pass the details of output.json)
// run js file (with node <nomefile.js>)

const homePage = new HomePage()
const productsPage = new ProductsPage()
const checkoutPage = new CheckoutPage()
let name

Given('I open Ecommerce page',()=>
{
    cy.visit(Cypress.env("url")+"/angularpractice/")
}
)

When('I add items to Cart',function()
{
    homePage.getShopTab().click()
    
    // for debugging
    // cy.pause()
    
    this.data.productName.forEach(element => 
        cy.selectProduct(element)
        )
    
    productsPage.getCheckout().click()
}
)

And('Validate the total prices',()=>
{
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
}
)

Then('Select the country submit and verify thankyou message',()=>
{
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

When('I fill the form details',function(dataTable)
{
    name = dataTable.rawTable[1][0]
    //homePage.getEditBox().type(this.data.name)
    homePage.getEditBox().type(dataTable.rawTable[1][0])
    //homePage.getGender().select(this.data.gender)
    homePage.getGender().select(dataTable.rawTable[1][1])
}
)

Then('Validate the form behaviour',function()
{
    //homePage.getTwoWayDataBinding().should('have.value',this.data.name)
    homePage.getTwoWayDataBinding().should('have.value',name)
    homePage.getEditBox().should('have.attr','minlength','2')
    homePage.getEnterpreneur().should('be.disabled')
}
)

And('Select the Shop page',function()
{
    homePage.getShopTab().click()
}
)