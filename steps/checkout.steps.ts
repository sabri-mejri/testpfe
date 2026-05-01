import { createBdd, DataTable } from 'playwright-bdd'
import { test } from '../fixtures/base'

const { Given, When, Then } = createBdd(test)

Given('the user is logged in', async ({ authenticatedPage: _ }) => {
  // fixture setup handles login
})

Given('the user has items in the cart', async ({ page }) => {
  await page.goto('/cart')
})

When('the user navigates to checkout', async ({ checkoutPage }) => {
  await checkoutPage.goto()
})

When('the user fills in the shipping address', async ({ checkoutPage }, table: DataTable) => {
  const row = table.hashes()[0]
  await checkoutPage.fillShippingAddress({
    street: row.street,
    city: row.city,
    zip: row.zip,
    country: row.country,
  })
})

When('the user fills in payment details', async ({ checkoutPage }, table: DataTable) => {
  const row = table.hashes()[0]
  await checkoutPage.fillPaymentDetails({
    number: row.card_number,
    expiry: row.expiry,
    cvv: row.cvv,
  })
})

When('the user places the order', async ({ checkoutPage }) => {
  await checkoutPage.placeOrder()
})

When('the user clicks Place Order without filling shipping address', async ({ checkoutPage }) => {
  await checkoutPage.placeOrder()
})

Then('an order confirmation should be displayed', async ({ checkoutPage }) => {
  await checkoutPage.expectOrderConfirmation('ORD-')
})

Then('the order total should be {string}', async ({ checkoutPage }, amount: string) => {
  await checkoutPage.expectTotalPrice(amount)
})

Then('a payment error {string} should be displayed', async ({ page }, message: string) => {
  await page.getByRole('alert').filter({ hasText: message }).waitFor()
})

Then('a validation error {string} should be displayed', async ({ page }, message: string) => {
  await page.getByText(message).waitFor()
})
