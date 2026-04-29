import { Page, expect } from '@playwright/test'

export class CheckoutPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/checkout')
  }

  async fillShippingAddress(address: { street: string; city: string; zip: string; country: string }) {
    await this.page.getByLabel('Street').fill(address.street)
    await this.page.getByLabel('City').fill(address.city)
    await this.page.getByLabel('ZIP Code').fill(address.zip)
    await this.page.getByLabel('Country').selectOption(address.country)
  }

  async fillPaymentDetails(card: { number: string; expiry: string; cvv: string }) {
    await this.page.getByLabel('Card Number').fill(card.number)
    await this.page.getByLabel('Expiry Date').fill(card.expiry)
    await this.page.getByLabel('CVV').fill(card.cvv)
  }

  async placeOrder() {
    await this.page.getByRole('button', { name: 'Place Order' }).click()
  }

  async expectOrderConfirmation(orderNumber: string) {
    await expect(this.page.getByRole('heading', { name: 'Order Confirmed' })).toBeVisible()
    await expect(this.page.getByText(orderNumber)).toBeVisible()
  }

  async expectTotalPrice(amount: string) {
    await expect(this.page.getByTestId('order-total')).toContainText(amount)
  }
}
