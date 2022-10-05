const {test, expect} = require('@playwright/test')

test('Popup validations', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await page.goto("https://www.google.com")
    await page.goBack()
    //await page.goForward()
    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#hide-textbox').click()
    await expect(page.locator('#displayed-text')).toBeHidden()

    //handle dialogue / popup / alert
    page.on("dialog", dialog => 
    {
        dialog.accept()
        console.log(dialog.message())
        //dialog.dismiss()
    })
    await page.locator("#confirmbtn").click()

    await page.pause()
    // how to mouse hover on a page
    await page.locator("#mousehover").hover()
    await page.locator('a').locator('text=Top').click()

    await page.locator("#mousehover").hover()
    await page.locator('a').locator('text=Reload').click()



}
)