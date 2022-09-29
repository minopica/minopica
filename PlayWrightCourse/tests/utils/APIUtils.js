const {expect} = require('@playwright/test')

class APIUtils
{

    //constructor per passare apiContext da fuori
    constructor(apiContext, loginPayload)
    {
        this.apiContext = apiContext
        this.loginPayload = loginPayload
    }
   
   
    // restituisce il token dalla login
    async getToken()
    {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    {
        data: this.loginPayload
    })
    expect(loginResponse.ok()).toBeTruthy
    const status = loginResponse.status()
    expect(status=='200').toBeTruthy
    const loginResponseJson = await loginResponse.json()
    const token = loginResponseJson.token
    console.log("token estratto da login in metodo getToken: " + token)

    return token
    }


    // api per creare ordine
    async createOrder(orderPayload)
    {
        let response = {}
        response.token = await this.getToken()
        console.log("token ritornato dal metodo getToken richiamato in createOrder: " + response.token)
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-type': 'application/json'
            }
        }
        )
        expect(orderResponse.ok()).toBeTruthy
        const orderResponseJson = await orderResponse.json()
        const orderId = orderResponseJson.orders[0]
        console.log('orderId estratto da chiamata: ' + orderId)
        response.orderId = orderId

        return response
    }

}

module.exports = {APIUtils}