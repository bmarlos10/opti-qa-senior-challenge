## Auth (Risk: access/security/ux)
1. Login with valid user → redirected to Inventory ✅ Automated
2. Login with locked user → locked-out error shown ✅ Automated
3. Login with invalid credentials → error message shown 📝 Manual only  
   _Reason: similar coverage already validated by locked user test_

## Inventory (Risk: navigation/conversion)
4. Sort products by price low → high → prices sorted correctly ✅ Automated

## Cart (Risk: revenue/data integrity)
5. Add item to cart → badge increments and item appears ✅ Automated
6. Remove item from cart → badge removed and item disappears ✅ Automated
7. Navigate inventory ↔ cart → items persist in cart ✅ Automated

## Checkout (Risk: revenue/blocker)
8. Checkout requires First Name → error shown ✅ Automated
9. Checkout requires Postal Code → error shown ✅ Automated
10. Checkout requires Last Name → error shown 📝 Manual only  
    _Reason: same validation pattern already covered_
11. Checkout happy path → order completes successfully ✅ Automated
12. Totals validation → item total + tax = total ✅ Automated
