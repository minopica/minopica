const {test, expect} = require('@playwright/test')
// browser e page sono fixture visibili a livello globale, vanno passate tra {}

test('UI Dropdown Playwright test', async ({page})=>
{
    //chrome - plugins - cookies - context

    const userName = page.locator('#username')
    const signIn = page.locator('#signInBtn')
    const password = page.locator('#password')
    const dropdown = page.locator('select.form-control')
    const cardTitles = page.locator(".card-body a")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await userName.fill("rahulshettyacademy")
    await password.type("learning")
    await dropdown.selectOption("consult")
    // radio button
    await page.locator('input[value="admin"]').click()
    await page.locator('input[value="user"]').click()
    await page.locator('#okayBtn').click()

    //lanciare playright inspector per debug
    //await page.pause()

})