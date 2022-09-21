const {test, expect} = require('@playwright/test')
// browser e page sono fixture visibili a livello globale, vanno passate tra {}

test('Browser Playwright test', async ({page})=>
{
    //chrome - plugins - cookies - context

    const userName = page.locator('#username')
    const signIn = page.locator('#signInBtn')
    const cardTitles = page.locator(".card-body a")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await userName.fill("rahulshettyacademy")
    await page.locator('#password').type("learning")
    
    // resolve race condition
    await Promise.all(
        [
            signIn.click(),
            page.waitForNavigation()
        ]

    )
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)


})