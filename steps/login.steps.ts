import { Given, When, Then } from '../fixtures/base'

Given('the user is on the login page', async ({ loginPage }) => {
  await loginPage.goto()
})

Given('the user is logged in as {string}', async ({ loginPage }, email: string) => {
  await loginPage.login(email, 'Test@1234')
})

When('the user enters email {string}', async ({ loginPage }, email: string) => {
  await loginPage.fillEmail(email)
})

When('the user enters password {string}', async ({ loginPage }, password: string) => {
  await loginPage.fillPassword(password)
})

When('the user clicks Sign in', async ({ loginPage }) => {
  await loginPage.submit()
})

When('the user clicks Sign in without filling any fields', async ({ loginPage }) => {
  await loginPage.submit()
})

When('the user clicks Logout', async ({ dashboardPage }) => {
  await dashboardPage.logout()
})

Then('the user should be redirected to the dashboard', async ({ loginPage }) => {
  await loginPage.expectRedirectedToDashboard()
})

Then('a welcome message should display {string}', async ({ dashboardPage }, message: string) => {
  const name = message.replace('Welcome, ', '')
  await dashboardPage.expectWelcomeMessage(name)
})

Then('an error message {string} should be displayed', async ({ loginPage }, message: string) => {
  await loginPage.expectErrorMessage(message)
})

Then('the user should be redirected to the login page', async ({ loginPage }) => {
  await loginPage.goto()
})
