const { LoginPage } = require('../pageObjects/LoginPage')
const { HomePage } = require('../pageObjects/HomePage')
const { CartPage } = require('../pageObjects/CartPage')
const { CheckoutPage } = require('../pageObjects/CheckoutPage')
const { ThankyouPage } = require('../pageObjects/ThankyouPage')
const { OrdersPage } = require('../pageObjects/OrdersPage')

class POManager {
    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.homePage = new HomePage(this.page)
        this.cartPage = new CartPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
        this.thankyouPage = new ThankyouPage(this.page)
        this.orderPage = new OrdersPage(this.page)
    }

    getLoginPage()
    {
        return this.loginPage
    }

    getHomePage()
    {
        return this.homePage
    }

    getCartPage()
    {
        return this.cartPage
    }

    getCheckoutPage()
    {
        return this.checkoutPage
    }

    getThankyouPage()
    {
        return this.thankyouPage
    }

    getOrderPage()
    {
        return this.orderPage
    }
}

module.exports = {POManager}