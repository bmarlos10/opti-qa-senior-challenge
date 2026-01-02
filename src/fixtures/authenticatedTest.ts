import { test as base, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../data/users';

type Fixtures = {
  loggedPage: Page;
};

export const authenticatedTest = base.extend<Fixtures>({
  loggedPage: async ({ page }, use) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory\.html/);

    await use(page);
  },
});

export { expect } from '@playwright/test';
