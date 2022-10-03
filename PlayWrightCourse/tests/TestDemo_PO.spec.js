const {test, expect} = require('@playwright/test')
const {LoginPage} = require('../pageObjects/LoginPage')
const {HomePage} = require('../pageObjects/HomePage')
const { CartPage } = require('../pageObjects/CartPage')


test('Page Playwright test', async ({page})=>
{
    const products = page.locator('.card-body')
    const productName = "adidas original"
    const username = "minopica@gmail.com"
    const password = "Minone@h3g"
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page)
    const cartPage = new CartPage(page)

    await loginPage.goTo()
    await loginPage.validLogin(username,password)
    await homePage.searchProductAddCart(productName)
    //entrare nel carrello e controllare il prodotto nella lista
    await homePage.navigateToCart()

    //la pagina potrebbe richiedere tempo per caricare e isVisible può fallire il check. isVisible action non è nella lista gestita di actions da playright.
    // prima di verificare isVisible aspettiamo che il locator con "li" è presente
    cartPage.checkAdidasProduct()

    // click su Checkout
    cartPage.checkout_click()

    //controllo nel blocco Shipping information selezione paese nella dropdown dinamica
    // occorre digirare i caratteri lentamente altrimenti non appare tendina suggerimenti -> usare opzione delay nel type
    await page.locator("//input[@placeholder='Select Country']").type('Ind',{delay:100})
    //attendere comparsa menu tendina suggestions
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor()
    // ciclo alla ricerca di un testo specifico (es India)
    const optionsCount = await dropdown.locator("button").count()
    for(let i=0;i<optionsCount;i++) {
        const text = await dropdown.locator("button").nth(i).textContent()
        if (text.trim() === "India") {
            //text.includes("India")
            dropdown.locator("button").nth(i).click()
            break
        }
    }

    // assert sul testo contenuto nell'input textField
     const label = (await page.locator(".user__name input[type$='text']").inputValue())
     expect(label===username).toBeTruthy
    
     // altro meccanismo di assertion sul testo
     // await expect(page.locator(".user__name input[type$='text']")).toHaveText(email)

     // click su PLACE ORDER
    await page.locator('.action__submit').click()

    // assert su thank you page
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
    console.log(orderId)

    
    // click su order history
    await page.locator("label[routerlink='/dashboard/myorders']").click()

    // await page.pause()
    // cicla orderId della tabella alla ricerca dell'orderId
    
    const arrayOrderId = page.locator('tbody tr')
    // l'action count su un selettore non ha l'auto wait in playwright, occorre aggiungere waitFor()
    await arrayOrderId.nth(0).waitFor()
    const arrayOrderId_count = await arrayOrderId.count()
    console.log('Numero elementi array ordini in storico: '+arrayOrderId_count)
    for(let i=0;i<arrayOrderId_count;i++) {
        const text = await arrayOrderId.nth(i).locator('th').textContent()
        console.log(text)
        if (orderId.includes(text)) {
            console.log('Ordine trovato in posizione: '+i)
            await arrayOrderId.nth(i).locator('button').first().click()
            break
        }
    }
    
    const orderID_finale = await page.locator('.col-text').textContent()
    expect(orderId.includes(orderID_finale)).toBeTruthy()
    //await page.pause()
})