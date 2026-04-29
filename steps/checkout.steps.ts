import { Given, When, Then, Before, DataTable } from '@cucumber/cucumber'
import { Browser, chromium, Page } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { CheckoutPage } from '../pages/CheckoutPage'

let browser: Browser
let page: Page
let loginPage: LoginPage
let checkoutPage: CheckoutPage

Before(async () => {
  browser = await chromium.launch()
  page = await browser.newPage()
  loginPage = new LoginPage(page)
  checkoutPage = new CheckoutPage(page)
})

Given('the user is logged in', async () => {
  await loginPage.login('testuser@example.com', 'Test@1234')
})

Given('the user has items in the cart', async () => {
  await page.goto('/cart')
})

When('the user navigates to checkout', async () => {
  await checkoutPage.goto()
})

When('the user fills in the shipping address', async (table: DataTable) => {
  const row = table.hashes()[0]
  await checkoutPage.fillShippingAddress({
    street: row.street,
    city: row.city,
    zip: row.zip,
    country: row.country,
  })
})

When('the user fills in payment details', async (table: DataTable) => {
  const row = table.hashes()[0]
  await checkoutPage.fillPaymentDetails({
    number: row.card_number,
    expiry: row.expiry,
    cvv: row.cvv,
  })
})

When('the user places the order', async () => {
  await checkoutPage.placeOrder()
})

When('the user clicks Place Order without filling shipping address', async () => {
  await checkoutPage.placeOrder()
})

Then('an order confirmation should be displayed', async () => {
  await checkoutPage.expectOrderConfirmation('ORD-')
})

Then('the order total should be {string}', async (amount: string) => {
  await checkoutPage.expectTotalPrice(amount)
})

Then('a payment error {string} should be displayed', async (message: string) => {
  await page.getByRole('alert').filter({ hasText: message }).waitFor()
})

Then('a validation error {string} should be displayed', async (message: string) => {
  await page.getByText(message).waitFor()
})
