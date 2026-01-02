import { test, expect } from '../src/fixtures/test';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutInfoPage } from '../src/pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../src/pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../src/pages/CheckoutCompletePage';
import { checkoutData } from '../src/data/checkout';

const ITEM = 'Sauce Labs Backpack';

async function goToCheckout(loggedPage: any) {
  const inventory = new InventoryPage(loggedPage);
  const cart = new CartPage(loggedPage);

  await inventory.expectLoaded();
  await inventory.addItemToCart(ITEM);
  await inventory.openCart();
  await cart.expectLoaded();
  await cart.checkout();
}

test.describe('Checkout', () => {
  test('[@checkout] should require first name', async ({ loggedPage }) => {
    await goToCheckout(loggedPage);

    const info = new CheckoutInfoPage(loggedPage);
    await info.expectLoaded();

    await info.fillForm(checkoutData.missingFirstName);
    await info.continue();

    await info.expectErrorContains('First Name is required');
  });

  test('[@checkout] should require postal code', async ({ loggedPage }) => {
    await goToCheckout(loggedPage);

    const info = new CheckoutInfoPage(loggedPage);
    await info.expectLoaded();

    await info.fillForm(checkoutData.missingPostalCode);
    await info.continue();

    await info.expectErrorContains('Postal Code is required');
  });

  test('[@smoke][@checkout] should complete checkout and totals should match', async ({ loggedPage }) => {
    await goToCheckout(loggedPage);

    const info = new CheckoutInfoPage(loggedPage);
    await info.expectLoaded();

    await info.fillForm(checkoutData.valid);
    await info.continue();

    const overview = new CheckoutOverviewPage(loggedPage);
    await overview.expectLoaded();

    const prices = await overview.getItemPrices();
    expect(prices.length).toBeGreaterThan(0);

    const sum = prices.reduce((acc, n) => acc + n, 0);
    const { itemTotal, tax, total } = await overview.getSummaryNumbers();

    const round2 = (n: number) => Math.round(n * 100) / 100;

    expect(round2(itemTotal)).toBe(round2(sum));
    expect(round2(total)).toBe(round2(itemTotal + tax));

    await overview.finish();

    const complete = new CheckoutCompletePage(loggedPage);
    await complete.expectLoaded();
  });
});
