import { chromium } from 'playwright';
const OUT = '/tmp/claude-0/-home-claude-ishaan-aras-portfolio/9d1846f7-2bb4-522a-a832-bc5ec98b5be3/scratchpad';
const URL = 'http://127.0.0.1:4173/';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [], failed = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); });
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message.slice(0, 160)));
page.on('requestfailed', r => failed.push(r.url().slice(0, 120)));
page.on('response', r => { if (r.status() >= 400) failed.push(r.status() + ' ' + r.url().slice(0, 120)); });

await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(7000);
await page.keyboard.press('Escape');
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/v1-desktop.png` });

// launcher
await page.keyboard.press('Control+k');
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/v2-launcher.png` });
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

// terminal + run a command
await page.keyboard.press('Control+Alt+t');
await page.waitForTimeout(1200);
const ti = page.locator('input').last();
if (await ti.count()) {
  await ti.click();
  await ti.type('pinout', { delay: 15 });
  await ti.press('Enter');
  await page.waitForTimeout(700);
}
await page.screenshot({ path: `${OUT}/v3-terminal.png` });

// open Skills app from dock to see the pinout
await page.keyboard.press('Control+k');
await page.waitForTimeout(500);
const q = page.locator('input').first();
await q.type('skills', { delay: 20 });
await page.waitForTimeout(400);
await q.press('Enter');
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/v4-skills.png` });

// settings -> wallpaper swatches
await page.keyboard.press('Control+k');
await page.waitForTimeout(500);
const q2 = page.locator('input').first();
await q2.type('settings', { delay: 20 });
await page.waitForTimeout(400);
await q2.press('Enter');
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/v5-settings.png` });

// 404 route
const p404 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await p404.goto(URL + 'does-not-exist', { waitUntil: 'networkidle' });
await p404.waitForTimeout(1200);
await p404.screenshot({ path: `${OUT}/v6-404.png` });

// mobile
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
await m.goto(URL, { waitUntil: 'networkidle' });
await m.waitForTimeout(7000);
await m.keyboard.press('Escape');
await m.waitForTimeout(1200);
await m.screenshot({ path: `${OUT}/v7-mobile.png` });
const overflow = await m.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
const tagline = await m.evaluate(() => document.querySelector('.hero-detail')?.textContent?.trim() || 'n/a');

console.log('CONSOLE ERRORS:', errors.length ? [...new Set(errors)].join(' || ') : 'none');
console.log('FAILED/4xx REQUESTS:', failed.length ? [...new Set(failed)].join(' || ') : 'none');
console.log('MOBILE H-OVERFLOW:', overflow);
console.log('TAGLINE:', JSON.stringify(tagline));
await browser.close();
