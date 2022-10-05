const {test, expect} = require('@playwright/test')
// browser e page sono fixture visibili a livello globale, vanno passate tra {}

//test.describe.configure({mode:'parallel'})
test.describe.configure({mode:'serial'}) // se fallisce 1 test gli altri vengono skippati
test('Browser Playwright test', async ({browser})=>
{
    //chrome - plugins - cookies - context
    const context = await browser.newContext()
    const page = await context.newPage()
    const userName = page.locator('#username')
    const signIn = page.locator('#signInBtn')
    const cardTitles = page.locator(".card-body a")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    //css, xpath
    await page.locator('#username').type("rahulshetty")
    await page.locator('#password').type("learning")
    await page.locator('#signInBtn').click()
    //check errore message in caso di pwd errata -> estrai text message e fai assertion
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')

    // type - fill
    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    
    await signIn.click()
    // select multiple webelements in page
    // console.log(await cardTitles.first().textContent())
    // console.log(await cardTitles.nth(1).textContent())
    // console.log(await cardTitles.last().textContent())
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)


})


test('Page Playwright test', async ({page})=>
{
    await page.goto("https://www.google.com/")
    // get title - assertion
    console.log(await page.title())
    await expect(page).toHaveTitle("Google")

})