import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { credentials, SortingDirections } from '../constants';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('user can login to saucedemo', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login(
    credentials.standard.username,
    credentials.standard.password,
  );
  const inventory = new InventoryPage(page);
  await inventory.assertIsOpen();
});

[
  {
    username: credentials.standard.username,
    password: 'wrong_password',
    expectedError:
      'Username and password do not match any user in this service',
  },
  {
    username: 'standard_user1',
    password: credentials.standard.password,
    expectedError:
      'Username and password do not match any user in this service',
  },
  {
    username: credentials.standard.username,
    password: '',
    expectedError: 'Password is required',
  },
  {
    username: '',
    password: credentials.standard.password,
    expectedError: 'Username is required',
  },
  {
    username: 'locked_out_user',
    password: credentials.standard.password,
    expectedError: 'Sorry1, this user has been locked out.',
  },
].forEach(({ username, password, expectedError }) => {
  test(`invalid credentials (${username}/${password}) shows error ${expectedError}`, async ({
    page,
  }) => {
    const login = new LoginPage(page);
    await login.login(username, password);
    const error = await login.getError();
    expect(error).toBe(`Epic sadface: ${expectedError}`);
  });
});

test('inventory can be sorted by price low to high', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  await login.login();
  await inventory.sortby(SortingDirections.LoHi);
  const prices = await inventory.getProductPrices();
  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);
});
