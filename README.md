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
