class LoginPage {

    constructor(page)
    {
        this.page = page
        this.username = page.locator('#userEmail')
        this.password = page.locator('#userPassword')
        this.signInButton = page.locator('[value="Login"]')
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client")
    }

    async validLogin(username,password)
    {
        await this.username.type(username)
        await this.password.type(password)
        await this.signInButton.click()
        // introdurre attesa fino a quando le chiamate di rete non sono state completate
        await this.page.waitForLoadState('networkidle')
    }
    
}

module.exports = {LoginPage}