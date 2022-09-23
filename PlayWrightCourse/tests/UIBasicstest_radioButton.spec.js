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
    const documentLink = page.locator("[href*='documents-request']")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await userName.fill("rahulshettyacademy")
    await password.type("learning")
    await dropdown.selectOption("consult")
    // radio button
    await page.locator('input[value="admin"]').click()
    await page.locator('input[value="user"]').click()
    await page.locator('#okayBtn').click()

    //assert radio button user is checked
    await expect(page.locator('input[value="user"]')).toBeChecked()

    //estrarre booleano per conoscere stato del check sul radio button
    console.log(await page.locator('input[value="user"]').isChecked)

    await page.locator('#terms').click()
    await expect(page.locator('#terms')).toBeChecked()
    await page.locator('#terms').uncheck()

    //non eiste assertion diretta per verificare che il box sia unchecked
    expect(await page.locator('#terms').isChecked()).toBeFalsy()
    //expect(await page.locator('#terms').isChecked()).toBeTruthy()

    await expect (documentLink).toHaveAttribute('class','blinkingText')
    await expect(documentLink).toHaveClass('blinkingText');
})