const {test, expect, request} = require('@playwright/test')
const {APIUtils} = require('./utils/APIUtils')
const loginPayload = {userEmail:"minopica@gmail.com",userPassword:"Minone@h3g"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6262e990e26b7e1a10e89bfa"}]}


let response

test.beforeAll( async()=>
{
    const apiContext = await request.newContext()
    const apiUtils =  new APIUtils(apiContext,loginPayload)
    response = await apiUtils.createOrder(orderPayload)

})

test.beforeEach( ()=>
{
    
})


test.only('Create Order with API', async ({page})=>
{
    
    // eseguire codice javascript per inserire token nell'area di memoria "localStorage" -> page.addInitScript, prende in input due argomenti.
    page.addInitScript(value => {
        window.localStorage.setItem('token',value)
    }, response.token)
    

    await page.goto('https://rahulshettyacademy.com/client')
    const products = page.locator('.card-body')
    const productName = "adidas original"
    const email = "minopica@gmail.com"
    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles)
    console.log('orderId estratto da chiamata nel blocco test: ' + response.orderId)

    
    // click su order history
    await page.locator("button[routerlink='/dashboard/myorders']").click()

    // cicla orderId della tabella alla ricerca dell'orderId
    
    const arrayOrderId = page.locator('tbody tr')
    // l'action count su un selettore non ha l'auto wait in playwright, occorre aggiungere waitFor()
    await arrayOrderId.nth(0).waitFor()
    const arrayOrderId_count = await arrayOrderId.count()
    console.log('Numero elementi array ordini in storico: '+arrayOrderId_count)
    for(let i=0;i<arrayOrderId_count;i++) {
        const text = await arrayOrderId.nth(i).locator('th').textContent()
        console.log(text)
        console.log(response.orderId)
        if (response.orderId.includes(text)) {
            console.log('Ordine trovato in posizione: '+i)
            await arrayOrderId.nth(i).locator('button').first().click()
            break
        }
    }
    
    const orderID_finale = await page.locator('.col-text').textContent()
    expect(response.orderId.includes(orderID_finale)).toBeTruthy()
    //await page.pause()
})