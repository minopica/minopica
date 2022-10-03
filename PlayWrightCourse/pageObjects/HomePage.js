class HomePage {
    
    constructor(page)
    {
        this.products = page.locator(".card-body")
        this.productsText = page.locator(".card-body b")
        this.cart = page.locator('[routerLink*="cart"]')

    }

    async searchProductAddCart(productName)
    {  
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

}

module.exports = {HomePage}