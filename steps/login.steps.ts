import { Given, When, Then, Before } from '@cucumber/cucumber'
import { Browser, chromium, Page } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'

let browser: Browser
let page: Page
let loginPage: LoginPage
let dashboardPage: DashboardPage

Before(async () => {
  browser = await chromium.launch()
  page = await browser.newPage()
  loginPage = new LoginPage(page)
  dashboardPage = new DashboardPage(page)
})

Given('the user is on the login page', async () => {
  await loginPage.goto()
})

Given('the user is logged in as {string}', async (email: string) => {
  await loginPage.login(email, 'Test@1234')
})

When('the user enters email {string}', async (email: string) => {
  await loginPage.fillEmail(email)
})

When('the user enters password {string}', async (password: string) => {
  await loginPage.fillPassword(password)
})

When('the user clicks Sign in', async () => {
  await loginPage.submit()
})

When('the user clicks Sign in without filling any fields', async () => {
  await loginPage.submit()
})

When('the user clicks Logout', async () => {
  await dashboardPage.logout()
})

Then('the user should be redirected to the dashboard', async () => {
  await loginPage.expectRedirectedToDashboard()
})

Then('a welcome message should display {string}', async (message: string) => {
  const name = message.replace('Welcome, ', '')
  await dashboardPage.expectWelcomeMessage(name)
})

Then('an error message {string} should be displayed', async (message: string) => {
  await loginPage.expectErrorMessage(message)
})

Then('the user should be redirected to the login page', async () => {
  await loginPage.goto()
})
