const {test, expect, request} = require('@playwright/test')
const {APIUtils} = require('../utils/APIUtils')
const loginPayload = {userEmail:"minopica@gmail.com",userPassword:"Minone@h3g"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6262e990e26b7e1a10e89bfa"}]}
const fakePayloadOrders = {data:[], message:"No Orders"}
/* const fakePayloadOrders = {
    data: [
        {
            _id: "6336b21fc4d0c51f4f315d1d",
            orderById: "63037d72c4d0c51f4f0f8d0a",
            orderBy: "minopica@gmail.com",
            productOrderedId: "Fri Sep 30",
            productName: "adidas original",
            country: "Cuba",
            productDescription: "adidas original",
            productImage: "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649488046.jpg",
            orderDate: null,
            orderPrice: "31500",
            __v: 0
        }
    ],
    "count": 1,
    "message": "Orders fetched for customer Successfully"
} */

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
    
    // prima di cliccare su ordini occorre intercettare chiamata
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63037d72c4d0c51f4f0f8d0a',
    async route=>{
        //intercepting response - API response -> {playwright fake response} -> browser -> render data
        const response = await page.request.fetch(route.request())
        console.log('Entro nel blocco route e stampo response: '+JSON.stringify(response))
        let body = JSON.stringify(fakePayloadOrders)
        console.log('Entro nel blocco route e stampo body da stubbare: '+JSON.stringify(body))
        route.fulfill({
            response,
            body
        })
    })
    // click su order history
    await page.locator("button[routerlink='/dashboard/myorders']").click()
    // introdotto un wait di 5sec
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(5000);
    
    console.log(await page.locator(".mt-4").textContent())
})