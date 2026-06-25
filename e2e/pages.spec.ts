import { expect, test } from '@playwright/test';

test.describe('index page', () => {
  test('displays main content', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/H\.S/i);
    await expect(page.getByText("I'm Hironori Sugiyama")).toBeVisible();
    await expect(page.getByText('Japan (Gifu)')).toBeVisible();
    await expect(page.getByText('Frontend Developer')).toBeVisible();
  });
});

test.describe('blog page', () => {
  test('displays blog heading', async ({ page }) => {
    await page.goto('/blog');
    // page heading (nth(1) skips the nav link)
    await expect(page.getByText('Blog').nth(1)).toBeVisible();
  });
});

test.describe('development page', () => {
  test('displays development heading', async ({ page }) => {
    await page.goto('/development');
    // page heading (nth(1) skips the nav link)
    await expect(page.getByText('Development').nth(1)).toBeVisible();
  });
});

test.describe('navigation', () => {
  test('404 page is handled', async ({ page }) => {
    const response = await page.goto('/non-existent-page');
    // static export serves index.html for unknown routes or returns 404
    expect([200, 404]).toContain(response?.status());
  });
});
