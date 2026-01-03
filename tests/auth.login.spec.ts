import { authenticatedTest as test, expect } from '../src/fixtures/authenticatedTest';
import { LoginPage } from '../src/pages/LoginPage';
import { users } from '../src/data/users';


test.describe('Login', () => {
  test('[@smoke][@auth] should login with standard_user', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

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
