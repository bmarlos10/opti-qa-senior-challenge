import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Login', () => {
  test('[@smoke][@auth] should login with standard_user', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('[@auth] should show error for locked_out_user', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');

    await login.expectErrorContains('locked out');
  });
});
