import { test, expect } from '../src/fixtures/test';
import { InventoryPage } from '../src/pages/InventoryPage';

test.describe('Inventory', () => {
  test('[@smoke][@inventory] should sort by price low to high', async ({ loggedPage }) => {
    const inventory = new InventoryPage(loggedPage);

    await inventory.expectLoaded();
    await inventory.sortBy('lohi');

    const prices = await inventory.getPrices();
    expect(prices.length).toBeGreaterThan(0);
    expect(InventoryPage.isSortedAsc(prices)).toBeTruthy();
  });
});
