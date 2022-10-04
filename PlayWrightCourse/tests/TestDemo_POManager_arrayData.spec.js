const {test, expect} = require('@playwright/test')
const {POManager} = require('../pageObjects/POManager')
const dataset = JSON.parse(JSON.stringify(require ('../utils/TestDemoTestData.json')))

for (const data of dataset) {

    test(`Test App ${data.username}`, async ({page})=>
    {
        const poManager = new POManager(page)
        const loginPage = poManager.getLoginPage()
    
        await loginPage.goTo()
        await loginPage.validLogin(data.username,data.password)
    
        const homePage = poManager.getHomePage()
        await homePage.searchProductAddCart(data.productName)
        //entrare nel carrello e controllare il prodotto nella lista
        await homePage.navigateToCart()
    
        const cartPage = poManager.getCartPage()
        await cartPage.checkProduct(data.productName)
    
        // click su Checkout
        await cartPage.checkout_click()
    
        //controllo nel blocco Shipping information selezione paese nella dropdown dinamica
        // occorre digirare i caratteri lentamente altrimenti non appare tendina suggerimenti -> usare opzione delay nel type
        const checkoutPage = poManager.getCheckoutPage()
        await checkoutPage.selectCountryFunc('India')
    
        // assert sul testo contenuto nell'input textField
        await checkoutPage.checkUsername(data.username)
    
         // click su PLACE ORDER
        await checkoutPage.placeOrderClick()
    
        // assert su thank you page
        const thankyouPage = poManager.getThankyouPage()
        await thankyouPage.checkMessage()
        const orderId = await thankyouPage.getOrderId()
        console.log(orderId)
    
        // click su order history
        await homePage.navigateToOrders()
    
        // await page.pause()
        // cicla orderId della tabella alla ricerca dell'orderId
        
        const orderPage = poManager.getOrderPage()
        await orderPage.viewOrder(orderId)
        // controllo orderId su pagina dettaglio ordine
        await orderPage.checkOrderId(orderId)
        
    })

}
