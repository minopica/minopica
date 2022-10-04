const {expect} = require('@playwright/test')
class CheckoutPage {

    constructor(page)
    {
        this.page = page
        this.selectCountry =  page.locator("//input[@placeholder='Select Country']")   
        this.username = page.locator(".user__name input[type$='text']")
        this.placeOrderButton = page.locator('.action__submit')
    }

    async selectCountryFunc(country)
    {
        await this.selectCountry.type(country,{delay:100})
        //attendere comparsa menu tendina suggestions
        const dropdown = this.page.locator(".ta-results")
        await dropdown.waitFor()
        // ciclo alla ricerca di un testo specifico (es India)
        const optionsCount = await dropdown.locator("button").count()
        console.log("numero opzioni in tendina: "+optionsCount)
        for(let i=0;i<optionsCount;i++) {
            const text = await dropdown.locator("button").nth(i).textContent()
            console.log(text)
            if (text.trim().toLowerCase() === country.toLowerCase()) {
                //text.includes("India")
                dropdown.locator("button").nth(i).click()
                break
            }
        }
    }

    async checkUsername(email)
    {
    // assert sul testo contenuto nell'input textField
     const label = (await this.username.inputValue())
     expect(label===email).toBeTruthy
    
    }

    async placeOrderClick()
    {
        await this.placeOrderButton.click()
    }

}

module.exports = {CheckoutPage}