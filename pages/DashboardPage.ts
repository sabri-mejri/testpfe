import { Page, expect } from '@playwright/test'

export class DashboardPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/dashboard')
  }

  async expectWelcomeMessage(userName: string) {
    await expect(this.page.getByText(`Welcome, ${userName}`)).toBeVisible()
  }

  async navigateTo(section: string) {
    await this.page.getByRole('link', { name: section }).click()
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Logout' }).click()
    await expect(this.page).toHaveURL('/login')
  }
}
