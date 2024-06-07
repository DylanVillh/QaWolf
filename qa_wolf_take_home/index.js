// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1

const { chromium } = require("playwright");
const ObjectsToCsv = require('objects-to-csv');

const createCsv = (data) => {
  const csv = new ObjectsToCsv(data);
 
  // Save to file:
  csv.toDisk('./test.csv');
}

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  let topArticles = [];
  // loop to find data
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

  // Generate CSV data from the processed data
  createCsv(topArticles);

  await page.close();
}

(async () => {
  await saveHackerNewsArticles();
})();