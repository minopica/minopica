const {test, expect} = require('@playwright/test')
// browser e page sono fixture visibili a livello globale, vanno passate tra {}

test('Child Window Playwright test', async ({browser})=>
{
    //chrome - plugins - cookies - context
    const context = await browser.newContext()
    const page = await context.newPage()
    const userName = page.locator('#username')
    // const signIn = page.locator('#signInBtn')
    // const password = page.locator('#password')
    // const dropdown = page.locator('select.form-control')
    // const cardTitles = page.locator(".card-body a")
    // const documentLink = page.locator("[href*='documents-request']")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const documentLink = page.locator("[href*='documents-request']")    

    // aprire schermata su un tab separato, prima di cliccare occorre creare dire a Playright di che si sta per aprire nuova pagina 
    // *** funziona solo su Chrome ****
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])

    const text = await newPage.locator('.red').textContent()
    console.log(text)

    // extract a substring from text -> split
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain)

    // insert domain value extracted dentro username edit box nella finestra browser parent page
    await userName.type(domain)
    //await page.pause()

    // stampare valore input nella textField
    console.log(await userName.inputValue())


})