const {test, expect} = require('@playwright/test')

test.only('Visual Testing', async({page})=>
{
    await page.goto("https://priv:P3rz0nal!@pwa.bs.windtre.it/oa/auth/login")
       // screenshot intera pagina e comparison con una precedente snapshot
    expect (await page.screenshot()).toMatchSnapshot('landing.png')

}
)