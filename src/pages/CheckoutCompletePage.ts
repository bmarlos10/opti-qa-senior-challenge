import { expect, type Page } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(private readonly page: Page) {}

  async expectLoaded() {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
  }
}
