import { expect, type Page } from '@playwright/test';

export class CheckoutInfoPage {
  constructor(private readonly page: Page) {}

  private readonly firstName = this.page.locator('[data-test="firstName"]');
  private readonly lastName = this.page.locator('[data-test="lastName"]');
  private readonly postalCode = this.page.locator('[data-test="postalCode"]');
  private readonly continueBtn = this.page.locator('[data-test="continue"]');
  private readonly error = this.page.locator('[data-test="error"]');

  async expectLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await expect(this.page.getByText('Checkout: Your Information')).toBeVisible();
  }

  async fillForm(data: { firstName?: string; lastName?: string; postalCode?: string }) {
    if (data.firstName !== undefined) await this.firstName.fill(data.firstName);
    if (data.lastName !== undefined) await this.lastName.fill(data.lastName);
    if (data.postalCode !== undefined) await this.postalCode.fill(data.postalCode);
  }

  async continue() {
    await this.continueBtn.click();
  }

  async expectErrorContains(text: string) {
    await expect(this.error).toBeVisible();
    await expect(this.error).toContainText(text);
  }
}
