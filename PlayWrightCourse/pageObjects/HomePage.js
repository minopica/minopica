class HomePage {
    
    constructor(page)
    {
        this.page = page
        this.products = page.locator(".card-body")
        this.productsText = page.locator(".card-body b")
        this.cart = page.locator('[routerLink*="cart"]')
        this.ordersTab = page.locator("label[routerlink='/dashboard/myorders']")

    }

    async searchProductAddCart(productName)
    {  
        // introdurre attesa fino a quando le chiamate di rete non sono state completate
        await this.page.waitForLoadState('networkidle')
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(5000);
        const titles = await this.productsText.allTextContents()
        console.log(titles)

        // Add ADIDAS ORIGINAL to Cart
        // iterate array of products
        const count = await this.products.count()
        for (let i=0; i<count; i++){
            if (await this.products.nth(i).locator('b').textContent() == productName) {
                await this.products.nth(i).locator('text=Add To Cart').click()
                break
            }
        }
    }
    
    async navigateToCart()
    {
        await this.cart.click()
    }

    async navigateToOrders()
    {
        await this.ordersTab.click()
    }

}

module.exports = {HomePage}