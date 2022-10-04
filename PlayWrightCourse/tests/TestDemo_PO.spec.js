const {test, expect} = require('@playwright/test')
const {LoginPage} = require('../pageObjects/LoginPage')
const {HomePage} = require('../pageObjects/HomePage')
const { CartPage } = require('../pageObjects/CartPage')
const { CheckoutPage } = require('../pageObjects/CheckoutPage')
const { ThankyouPage } = require('../pageObjects/ThankyouPage')
const { OrdersPage } = require('../pageObjects/OrdersPage')


test('Page Playwright test', async ({page})=>
{
    const products = page.locator('.card-body')
    const productName = "adidas original"
    const username = "minopica@gmail.com"
    const password = "Minone@h3g"
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page)
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)
    const thankyouPage = new ThankyouPage(page)
    const orderPage = new OrdersPage(page)

    await loginPage.goTo()
    await loginPage.validLogin(username,password)
    await homePage.searchProductAddCart(productName)
    //entrare nel carrello e controllare il prodotto nella lista
    await homePage.navigateToCart()
    await cartPage.checkAdidasProduct()

    // click su Checkout
    await cartPage.checkout_click()

    //controllo nel blocco Shipping information selezione paese nella dropdown dinamica
    // occorre digirare i caratteri lentamente altrimenti non appare tendina suggerimenti -> usare opzione delay nel type
    await checkoutPage.selectCountryFunc('India')

    // assert sul testo contenuto nell'input textField
    await checkoutPage.checkUsername(username)

     // click su PLACE ORDER
    await checkoutPage.placeOrderClick()

    // assert su thank you page
    await thankyouPage.checkMessage()
    const orderId = await thankyouPage.getOrderId()
    console.log(orderId)

    
    // click su order history
    await homePage.navigateToOrders()

    // await page.pause()
    // cicla orderId della tabella alla ricerca dell'orderId
    
    await orderPage.viewOrder(orderId)

    // controllo orderId su pagina dettaglio ordine
    await orderPage.checkOrderId(orderId)
    
})