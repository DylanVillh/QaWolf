// @ts-check
const { test, expect } = require('@playwright/test');
const { chromium } = require("playwright");

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Acticle Test',async ({page}) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  let topArticles = [];

  for (let i = 0; i < 10; i++) {
      let id = await page.locator('//tr[@class="athing"]').nth(i).getAttribute("id");
      let title = await page.locator('//tr[@id="' + id + '"]//span[@class="titleline"]').locator('a').nth(0).innerText();
      let link = await page.locator('//tr[@id="' + id + '"]//span[@class="titleline"]').locator('a').nth(0).getAttribute('href');

      let article = {
          id: id,
          title: title,
          link: link
      };

      topArticles[i] = article;
  }

  expect(topArticles.length).toEqual(10);
  for(let i = 0; i < topArticles.length; i++) {
      let rank = await page.locator('//tr[@id="' + topArticles[i].id + '"]//span[@class="rank"]').innerText();

      expect(rank).toEqual(i+1+ '.');
  }

  await page.close();

} )
