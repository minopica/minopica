const {test, expect} = require('@playwright/test')

// browser e page sono fixture visibili a livello globale, vanno passate tra {}
test('Browser Error Login', async ({browser})=>
{
    const context = await browser.newContext()
    const page = await context.newPage()
    
    // Bloccare richieste forzandole in errore

    //     page.route('**/*.css', async route=>{
    //    route.abort()
    //})

    page.route('**/*.{jpg,png,jpeg}', async route=>{
        route.abort()
    })

    // Stampare su console log tutte le richieste e lo status code della response
    page.on('request', request=> {
        console.log(request.url())
    })
    page.on('response', response =>{
        console.log(response.url(), response.status())
    })


    // carico pagina ed effettuo login
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
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator('#userEmail').fill("minopica@gmail.com")
    await page.locator('#userPassword').fill("Minone@h3g")
    await page.locator('[value="Login"]').click()
    
    // introdurre attesa fino a quando le chiamate di rete non sono state completate
    await page.waitForLoadState('networkidle')

    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles)
    await page.pause()


})