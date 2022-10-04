const {test, expect} = require('@playwright/test')
const {POManager} = require('../pageObjects/POManager')

test('Page Playwright test', async ({page})=>
{
    const poManager = new POManager(page)
    const products = page.locator('.card-body')
    const productName = "adidas original"
    const username = "minopica@gmail.com"
    const password = "Minone@h3g"

    const loginPage = poManager.getLoginPage()

    await loginPage.goTo()
    await loginPage.validLogin(username,password)

    const homePage = poManager.getHomePage()
    await homePage.searchProductAddCart(productName)
    //entrare nel carrello e controllare il prodotto nella lista
    await homePage.navigateToCart()

    const cartPage = poManager.getCartPage()
    await cartPage.checkAdidasProduct()

    // click su Checkout
    await cartPage.checkout_click()

    //controllo nel blocco Shipping information selezione paese nella dropdown dinamica
    // occorre digirare i caratteri lentamente altrimenti non appare tendina suggerimenti -> usare opzione delay nel type
    const checkoutPage = poManager.getCheckoutPage()
    await checkoutPage.selectCountryFunc('India')

    // assert sul testo contenuto nell'input textField
    await checkoutPage.checkUsername(username)

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