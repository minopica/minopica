const {expect} = require('@playwright/test')
class ThankyouPage {

    constructor(page)
    {
        this.page = page
        this.message = page.locator(".hero-primary")
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted')

    }

    async checkMessage ()
    {
        await expect(this.message).toHaveText(" Thankyou for the order. ")
    }

    async getOrderId()
    {
        const orderId = await this.orderId.textContent()
        return orderId

    }


}

module.exports = {ThankyouPage}