import { expect, type Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  private readonly cartItems = this.page.locator('.cart_item');
  private readonly itemNames = this.page.locator('.inventory_item_name');
  private readonly continueShoppingBtn = this.page.getByRole('button', { name: /continue shopping/i });
  private readonly checkoutBtn = this.page.getByRole('button', { name: /checkout/i });

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.page.getByText('Your Cart')).toBeVisible();
  }

  async expectItemPresent(itemName: string) {
    await expect(this.itemNames.filter({ hasText: itemName })).toHaveCount(1);
  }

  async expectItemNotPresent(itemName: string) {
    await expect(this.itemNames.filter({ hasText: itemName })).toHaveCount(0);
  }

  async continueShopping() {
    await this.continueShoppingBtn.click();
  }

  async checkout() {
    await this.checkoutBtn.click();
  }

  async getItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }
}
