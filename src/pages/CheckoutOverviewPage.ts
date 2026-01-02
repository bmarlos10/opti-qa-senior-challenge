import { expect, type Page } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(private readonly page: Page) {}

  private readonly finishBtn = this.page.locator('[data-test="finish"]');
  private readonly itemPrices = this.page.locator('.inventory_item_price');

  async expectLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
  }

  async finish() {
    await this.finishBtn.click();
  }

  async getItemPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((t) => Number(t.replace('$', '').trim()));
  }

  async getSummaryNumbers(): Promise<{ itemTotal: number; tax: number; total: number }> {
    const itemTotalText = await this.page.locator('.summary_subtotal_label').innerText();
    const taxText = await this.page.locator('.summary_tax_label').innerText();
    const totalText = await this.page.locator('.summary_total_label').innerText();

    const parseMoney = (s: string) => Number(s.replace(/[^0-9.]/g, ''));

    return {
      itemTotal: parseMoney(itemTotalText),
      tax: parseMoney(taxText),
      total: parseMoney(totalText),
    };
  }
}
