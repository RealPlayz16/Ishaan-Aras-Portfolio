import { chromium } from 'playwright';
const OUT = '/tmp/claude-0/-home-claude-ishaan-aras-portfolio/9d1846f7-2bb4-522a-a832-bc5ec98b5be3/scratchpad';
const target = process.argv[2] || 'http://127.0.0.1:4173/';
const tag = process.argv[3] || 'mine';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(target, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(6500);
await page.keyboard.press('Escape');
await page.waitForTimeout(1000);
await page.keyboard.press('Control+k');
await page.waitForTimeout(600);
const q = page.locator('input').first();
await q.type('skills', { delay: 20 });
await page.waitForTimeout(300);
await q.press('Enter');
await page.waitForTimeout(2500);

const box = await page.evaluate(() => {
  const el = document.querySelector('.gpio-pin');
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: Math.max(0, r.left - 30), y: Math.max(0, r.top - 30), width: 560, height: 320 };
});
if (box) await page.screenshot({ path: `${OUT}/zoom-${tag}.png`, clip: box });

const style = await page.evaluate(() => {
  const el = document.querySelector('.gpio-pin');
  if (!el) return null;
  const cs = getComputedStyle(el);
  const label = el.querySelector('*');
  const lcs = label ? getComputedStyle(label) : null;
  return {
    pinBg: cs.backgroundColor, pinColor: cs.color, pinOpacity: cs.opacity,
    pinDisplay: cs.display, pinOverflow: cs.overflow, pinH: cs.height,
    labelCls: label?.className?.toString(), labelColor: lcs?.color,
    labelFs: lcs?.fontSize, labelOpacity: lcs?.opacity,
  };
});
console.log(tag, JSON.stringify(style, null, 2));
await browser.close();
