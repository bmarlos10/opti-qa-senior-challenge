# Optii QA Senior — Automation Challenge (Playwright)

End-to-end test suite for the Sauce Demo (Swag Labs) application using Playwright, written in TypeScript and organized with the Page Object Model (POM). CI pipeline on GitHub Actions with artifacts collection, Playwright HTML report, and Allure.

See the main configuration in [playwright.config.ts](playwright.config.ts) and the mapped manual scenarios in [scenarios.md](scenarios.md).

---

## ✅ Tech Stack
- Playwright (@playwright/test)
- TypeScript
- Page Object Model (POM)
- Reports: Playwright HTML and Allure
- CI: GitHub Actions with artifact upload (screenshots, videos, traces, reports)

---

## 🎯 Covered Scope
- Authentication: valid, invalid, and locked users
- Inventory: sorting and item consistency
- Cart: add/remove and navigation persistence
-,Checkout: validations, happy path, and totals consistency

Manual scenarios and risks are documented in [scenarios.md](scenarios.md).

---

## 🧱 Project Structure
- [src/pages](src/pages) → Page Objects
- [src/fixtures](src/fixtures) → Test fixtures (e.g., authenticated session)
- [src/data](src/data) → Test data (when applicable)
- [src/utils](src/utils) → Utilities/helpers
- [tests](tests) → Feature-based specs
- [.github/workflows](.github/workflows) → CI pipeline (see [ci.yml](.github/workflows/ci.yml))

---

## ⚙️ Requirements
- Node.js 18+ and npm 9+
- Playwright browsers installed

---

## ▶️ Run Locally

1) Install
```bash
npm ci
npx playwright install --with-deps
```

2) Run all tests (headless)
```bash
npm test
```

3) Open the Playwright HTML report
```bash
npm run report
```

4) Generate and open the Allure report
```bash
npm run allure:generate
npm run allure:open
```

Helpful extras:
- Playwright interactive UI (debug):
```bash
npx playwright test --ui
```
- Run headed:
```bash
npx playwright test --headed
```
- Re-run only previous failures:
```bash
npx playwright test --last-failed
```

---

## 🔖 Running by Tags
Tests are tagged in their titles with labels such as:
- @smoke — critical smoke
- @auth — authentication
- @inventory — inventory
- @cart — cart
- @checkout — checkout

Useful commands:
```bash
# Only smoke
npm run test:smoke

# Only checkout
npx playwright test --grep "@checkout"

# Only authentication
npx playwright test --grep "@auth"
```

---

## 🧪 Automation Strategy
- Focus on high-risk flows (authentication, cart, checkout)
- Business-critical validations (required fields, totals calculation)
- Avoid duplicating validation patterns to reduce brittleness
- Independent tests; authenticated fixture to reduce repetition (see [src/fixtures/test.ts](src/fixtures/test.ts))
- Stable selectors prioritized (getByRole, data-test)

---

## 🏗️ Conventions and Best Practices
- POM with clear responsibilities in [src/pages](src/pages)
- Descriptive test names and functional tags
- Specific assertions and clear messages
- Consistent pre/post state handling (fixtures)

---

## 🚀 CI on GitHub Actions
The pipeline in [ci.yml](.github/workflows/ci.yml) runs on:
- Push to the main branch
- Pull Requests targeting main

Key steps:
- Install dependencies and Playwright browsers
- Run the test suite
- Generate reports
- Upload artifacts for analysis

Artifacts per run:
- Playwright HTML Report (navigable report)
- Test Results (screenshots, videos, and traces on failures)
- Allure Report (rich details and analytics)

How to download:
1. Open the desired GitHub Actions run
2. Scroll to “Artifacts”
3. Download any of: `playwright-report-*`, `test-results-*`, `allure-report-*`
4. Extract locally and open `index.html`

---

## 🔧 Troubleshooting
- Missing browsers: run `npx playwright install --with-deps`
- No report: ensure tests ran and use `npm run report`
- Local flakiness: run with `--ui` to diagnose or clean previous artifacts

---

## 📂 Useful References
- Playwright configuration: [playwright.config.ts](playwright.config.ts)
- Fixtures: [src/fixtures/test.ts](src/fixtures/test.ts)
- Page Objects: [src/pages](src/pages) (e.g., [src/pages/LoginPage.ts](src/pages/LoginPage.ts), [src/pages/InventoryPage.ts](src/pages/InventoryPage.ts))
- Tests: [tests](tests) (e.g., [tests/auth.login.spec.ts](tests/auth.login.spec.ts), [tests/inventory.spec.ts](tests/inventory.spec.ts), [tests/cart.spec.ts](tests/cart.spec.ts), [tests/checkout.spec.ts](tests/checkout.spec.ts))

---
