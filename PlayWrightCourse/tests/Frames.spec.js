const {test, expect} = require('@playwright/test')

test.only('Frames validations', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // per switchare su iframe è necessario id o name del frame
    const framePage = page.frameLocator("#courses-iframe")
    await page.pause()
    await framePage.locator('li a[href*="lifetime-access"]:visible').click()
    const text = await framePage.locator('.text h2').textContent()
    // text = Join 13,522 ccc ddd (ci serve secondo blocco)
    console.log(text.split(" ")[1])


}
)