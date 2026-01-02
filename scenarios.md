# Test Scenarios (Manual)

Target: Sauce Demo (Swag Labs) - https://www.saucedemo.com

## Auth (Risk: access/security/ux)
1. Login with valid user (standard_user) → user is redirected to Inventory.
2. Login with locked user (locked_out_user) → user sees locked-out error message.
3. Login with invalid credentials → user sees authentication error message.

## Inventory (Risk: navigation/conversion)
4. Sort products by price low → high → prices are in ascending order.

## Cart (Risk: revenue/data integrity)
5. Add item to cart → cart badge increments and item appears in cart.
6. Remove item from cart → cart badge removed/updated and item disappears.
7. Navigate inventory ↔ cart → items remain in cart.

## Checkout (Risk: revenue/blocker)
8. Checkout requires First Name → error shown when missing.
9. Checkout requires Postal Code → error shown when missing.
10. Checkout happy path → order completes successfully.
11. Totals validation → item total equals sum of item prices; total equals item total + tax.
