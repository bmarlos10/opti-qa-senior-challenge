import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  private readonly username = this.page.getByPlaceholder('Username');
  private readonly password = this.page.getByPlaceholder('Password');
  private readonly loginBtn = this.page.getByRole('button', { name: 'Login' });
  private readonly error = this.page.locator('[data-test="error"]');

  async goto() {
    await this.page.goto('/');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async expectErrorContains(text: string) {
    await expect(this.error).toBeVisible();
    await expect(this.error).toContainText(text);
  }
}
