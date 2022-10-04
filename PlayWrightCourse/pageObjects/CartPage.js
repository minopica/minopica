const {expect} = require('@playwright/test')

class CartPage {

    constructor(page) {
        this.page = page
        this.checkout = page.locator('text=Checkout')
    }

    async checkProduct(productName) {
        const product = this.page.locator("h3:has-text('"+productName+"')")
        const elemento = this.page.locator('div li').first()
        await elemento.waitFor() 
        // const bool = await page.locator("h3:has-text('adidas original')").isVisible()
        // expect(bool).toBeTruthy()
        //console.log(await page.locator("h3:has-text('adidas original')").textContent())
        // await page.pause()
        const bool = await product.isVisible()
        expect(bool).toBeTruthy()
    }

    async checkout_click()
    {
        this.checkout.click()
    }
}

module.exports = {CartPage}