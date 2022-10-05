const {test, expect, request} = require('@playwright/test')
const loginPayload = {userEmail:"minopica@gmail.com",userPassword:"Minone@h3g"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6262e990e26b7e1a10e89bfa"}]}
let token=''
let orderId=''

// viene eseguito 1 volta prima di tutti i test
test.beforeAll( async()=>
{
    // eseguo seconda chiamata di login e cattura token dalla reponse
    const apiContext = await request.newContext()
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    {
        data: loginPayload
    })
    expect(loginResponse.ok()).toBeTruthy
    const status = loginResponse.status()
    expect(status=='200').toBeTruthy
    const loginResponseJson = await loginResponse.json()
    token = loginResponseJson.token
    console.log(token)

    // eseguo seconda chiamata, apiContext già creato in precedemza, e passo il token nell'header authorization
    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
        data: orderPayload,
        headers: {
            'Authorization': token,
            'Content-type': 'application/json'
        }
    }
    )
    expect(orderResponse.ok()).toBeTruthy
    const orderResponseJson = await orderResponse.json()
    orderId = orderResponseJson.orders[0]
    console.log('orderId estratto da chiamata: ' + orderId)
})

// viene eseguito sempre prima di ogni test
test.beforeEach( ()=>
{
    
})


test('Create Order with API', async ({page})=>
{
    // eseguire codice javascript per inserire token nell'area di memoria "localStorage" -> page.addInitScript, prende in input due argomenti.
    page.addInitScript(value => {
        window.localStorage.setItem('token',value)
    }, token)
    
    // await page.goto("https://rahulshettyacademy.com/client")
    // await page.locator('#userEmail').fill(email)
    // await page.locator('#userPassword').fill("Minone@h3g")
    // await page.locator('[value="Login"]').click()
    
    // // introdurre attesa fino a quando le chiamate di rete non sono state completate
    // await page.waitForLoadState('networkidle')
    
    await page.goto('https://rahulshettyacademy.com/client')
    const products = page.locator('.card-body')
    const productName = "adidas original"
    const email = "minopica@gmail.com"
    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles)
    console.log('orderId estratto da chiamata nel blocco test: ' + orderId)

    // Add ADIDAS ORIGINAL to Cart
    // iterate array of products
    
    // click su order history
    await page.locator("button[routerlink='/dashboard/myorders']").click()

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
        console.log(orderId)
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