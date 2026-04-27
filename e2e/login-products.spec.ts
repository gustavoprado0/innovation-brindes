import { test, expect } from '@playwright/test';

test('smoke: login and see products grid', async ({ page }) => {
  await page.goto('/login');

  await expect(page).toHaveTitle(/Login/);

  await page.getByPlaceholder('Usuário').fill('dinamica');
  await page.getByPlaceholder('Senha').fill('123');

  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/products', { timeout: 10000 });

  await expect(page).toHaveTitle(/Produtos/);

  await expect(page.getByText('EXCLUSIVO!').first()).toBeVisible({ timeout: 10000 });

  await expect(page.getByText('CONFIRA').first()).toBeVisible();
});