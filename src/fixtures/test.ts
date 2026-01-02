import { test as base, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type Fixtures = {
  loggedPage: Page;
};

export const test = base.extend<Fixtures>({
  loggedPage: async ({ page }, use) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory\.html/);

    await use(page);
  },
});

export { expect } from '@playwright/test';
