# Optii QA Senior - Automation Challenge (Playwright)

This project implements an end-to-end automation suite for the **Sauce Demo (Swag Labs)** application using **Playwright**.

## ✅ Tech Stack
- Playwright (@playwright/test)
- Page Object Model (POM)
- Allure report + Playwright HTML report
- GitHub Actions CI with artifacts (reports + traces/videos/screenshots)

## 🎯 Scope
Covered areas:
- Authentication (valid/invalid/locked user)
- Inventory sorting
- Cart add/remove + navigation persistence
- Checkout validations + happy path + totals consistency

Manual scenarios mapped to risks are documented in: **scenarios.md**

## 🧱 Project Structure
- `src/pages/` → Page Objects
- `src/fixtures/` → fixtures (e.g., logged-in page)
- `tests/` → test specs grouped by feature
- `.github/workflows/` → CI pipeline

## ▶️ Running Locally

### Install
```bash
npm ci
npx playwright install --with-deps

## 🏷️ Running tests by tag

Tests are tagged directly in their titles using annotations such as:

- `@smoke` – critical smoke tests
- `@auth` – authentication
- `@inventory`
- `@cart`
- `@checkout`

### Examples
Run only smoke tests:
```bash
npm run test:smoke

## Run only checkout tests:
npx playwright test --grep "@checkout"

## Run auth-related tests:
npx playwright test --grep "@auth"

## 📦 Test Evidence & Reports

Every CI run uploads the following artifacts:

- **Playwright HTML Report**
  - Human-readable execution report
- **Test Results**
  - Screenshots, videos and traces (on failures)
- **Allure Report**
  - Rich test analytics and execution details

### 📥 How to download reports
1. Open the GitHub Actions run
2. Scroll down to the **Artifacts** section
3. Download:
   - `playwright-report-*`
   - `test-results-*`
   - `allure-report-*`
4. Extract locally and open `index.html`

## 🧠 Automation Strategy

- Not all manual scenarios were automated intentionally
- Automation focused on:
  - High-risk flows (login, cart, checkout)
  - Business-critical validations (totals, required fields)
  - Regression-prone areas
- Similar validations were not duplicated to avoid brittle or redundant tests

