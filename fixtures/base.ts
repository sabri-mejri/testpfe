import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import { CheckoutPage } from '../pages/CheckoutPage'

type Fixtures = {
  loginPage: LoginPage
  dashboardPage: DashboardPage
  checkoutPage: CheckoutPage
  authenticatedPage: { loginPage: LoginPage; dashboardPage: DashboardPage }
}

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page))
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page))
  },

  // Pre-authenticated session — logs in with default test user before the test
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await loginPage.login(
      process.env.TEST_USER_EMAIL ?? 'testuser@example.com',
      process.env.TEST_USER_PASSWORD ?? 'Test@1234'
    )
    await use({ loginPage, dashboardPage: new DashboardPage(page) })
  },
})

export { expect } from '@playwright/test'
