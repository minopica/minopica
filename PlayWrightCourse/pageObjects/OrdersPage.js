const {expect} = require('@playwright/test')
class OrdersPage
{
    constructor(page) {
        this.page = page
        this.arrayOrderId = page.locator('tbody tr')
        this.orderIdDetail = page.locator('.col-text')
    }

    async viewOrder(orderId) {
        const arrayOrderId = this.arrayOrderId
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
    }

    async checkOrderId(orderId) {
        const orderID_finale = await this.orderIdDetail.textContent()
        console.log("ordine estratto da pagina di conferma ordine"+orderID_finale)
        console.log("ordine con cui confrontare - il precedente deve essere incluso in questo"+orderId)
        expect(orderId.includes(orderID_finale)).toBeTruthy()
    }

}

module.exports = {OrdersPage}