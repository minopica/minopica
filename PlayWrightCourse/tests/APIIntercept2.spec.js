const {test, expect, request} = require('@playwright/test')
const {APIUtils} = require('../utils/APIUtils')
const loginPayload = {userEmail:"minopica@gmail.com",userPassword:"Minone@h3g"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6262e990e26b7e1a10e89bfa"}]}
const fakePayloadOrders = {data:[], message:"No Orders"}

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


test('Create Order with API', async ({page})=>
{
    // eseguire codice javascript per inserire token nell'area di memoria "localStorage" -> page.addInitScript, prende in input due argomenti.
    page.addInitScript(value => {
        window.localStorage.setItem('token',value)
    }, response.token)
    

    await page.goto('https://rahulshettyacademy.com/client')
    // click su order history
    await page.locator("button[routerlink='/dashboard/myorders']").click()
        
    // prima di cliccare su View occorre intercettare chiamata per modificare la request
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", 
    async route =>{
        route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6336ed88c4d0c51f4f31af65'})
    })
    
    // click su View sul primo ordine
    await page.locator("button:has-text('View')").first().click()
    await page.pause()

})