import { test, expect } from '../src/fixtures/test';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';

const ITEM = 'Sauce Labs Backpack';

test.describe('Cart', () => {
  test('[@smoke][@cart] should add and remove item from cart', async ({ loggedPage }) => {
    const inventory = new InventoryPage(loggedPage);
    const cart = new CartPage(loggedPage);

    await inventory.expectLoaded();

    await inventory.addItemToCart(ITEM);
    await inventory.expectCartBadgeCount(1);

    await inventory.openCart();
    await cart.expectLoaded();
    await cart.expectItemPresent(ITEM);

    await cart.continueShopping();
    await inventory.expectLoaded();

    await inventory.removeItemFromCart(ITEM);
    await inventory.expectCartBadgeCount(0);

    await inventory.openCart();
    await cart.expectLoaded();
    await cart.expectItemNotPresent(ITEM);
  });

  test('[@cart] should keep items when navigating back and forth', async ({ loggedPage }) => {
    const inventory = new InventoryPage(loggedPage);
    const cart = new CartPage(loggedPage);

    await inventory.expectLoaded();

    await inventory.addItemToCart(ITEM);
    await inventory.expectCartBadgeCount(1);

    await inventory.openCart();
    await cart.expectLoaded();
    await cart.expectItemPresent(ITEM);

    await cart.continueShopping();
    await inventory.expectLoaded();
    await inventory.expectCartBadgeCount(1);

    await inventory.openCart();
    await cart.expectLoaded();
    await cart.expectItemPresent(ITEM);
  });
});
