import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  private readonly sortSelect = this.page.locator('[data-test="product-sort-container"]');
  private readonly itemPrices = this.page.locator('.inventory_item_price');

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  async sortBy(value: 'lohi' | 'hilo' | 'az' | 'za') {
    await this.sortSelect.selectOption(value);
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((t) => Number(t.replace('$', '').trim()));
  }

  static isSortedAsc(nums: number[]) {
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] < nums[i - 1]) return false;
    }
    return true;
  }

  static isSortedDesc(nums: number[]) {
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] > nums[i - 1]) return false;
    }
    return true;
  }

  private readonly cartLink = this.page.locator('.shopping_cart_link');
  private readonly cartBadge = this.page.locator('.shopping_cart_badge');

  addToCartButtonFor(itemName: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({ has: this.page.getByText(itemName, { exact: true }) })
      .getByRole('button', { name: /add to cart/i });
  }

  removeButtonFor(itemName: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({ has: this.page.getByText(itemName, { exact: true }) })
      .getByRole('button', { name: /remove/i });
  }

  async addItemToCart(itemName: string) {
    await this.addToCartButtonFor(itemName).click();
  }

  async removeItemFromCart(itemName: string) {
    await this.removeButtonFor(itemName).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectCartBadgeCount(count: number) {
    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }
}
