const {test, expect} = require('@playwright/test')
// browser e page sono fixture visibili a livello globale, vanno passate tra {}

test.only('Page Playwright test', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator('#userEmail').fill("minopica@gmail.com")
    await page.locator('#userPassword').fill("Minone@h3g")
    await page.locator('[value="Login"]').click()
    
    // introdurre attesa fino a quando le chiamate di rete non sono state completate
    await page.waitForLoadState('networkidle')

    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles)
})