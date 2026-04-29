import { Page, expect } from '@playwright/test'

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login')
  }

  async fillEmail(email: string) {
    await this.page.getByLabel('Email').fill(email)
  }

  async fillPassword(password: string) {
    await this.page.getByLabel('Password').fill(password)
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Sign in' }).click()
  }

  async login(email: string, password: string) {
    await this.goto()
    await this.fillEmail(email)
    await this.fillPassword(password)
    await this.submit()
  }

  async expectErrorMessage(message: string) {
    await expect(this.page.getByRole('alert')).toContainText(message)
  }

  async expectRedirectedToDashboard() {
    await expect(this.page).toHaveURL('/dashboard')
  }
}
