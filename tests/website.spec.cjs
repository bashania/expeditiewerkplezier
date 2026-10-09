const { test: base, expect } = require('@playwright/test');

const test = base.extend({
  page: async ({ page }, use) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('https://link.agathehania.nl/js/external-tracking.js', route =>
      route.fulfill({ contentType: 'application/javascript', body: 'window.__trackingStarts = (window.__trackingStarts || 0) + 1;' }));
    await page.route('https://formsubmit.co/**', route => route.abort());
    await use(page);
    expect(errors, 'No uncaught browser errors').toEqual([]);
  },
});

const pages = ['index.html', 'over-agathe.html', 'aanbod.html', 'ervaringen.html',
  'contact.html', 'traject.html', 'deep-dive.html', 'gratis-scan.html',
  'bedankt-scan.html', 'privacy.html', 'cookies.html', 'voorwaarden.html', 'sitemap.html', '404.html'];

for (const width of [1440, 390, 320]) {
  test(`All public pages fit a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const file of pages) {
      const response = await page.goto('/' + file);
      expect(response.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await page.evaluate(() => Promise.all(Array.from(document.images).map(image => {
        image.loading = 'eager'; return image.decode().catch(() => {});
      })));
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({
        width: innerWidth, content: document.documentElement.scrollWidth,
        broken: Array.from(document.images).filter(image => !image.naturalWidth).map(image => image.src),
      }));
      expect(layout.broken, file).toEqual([]);
      expect(layout.content, file).toBeLessThanOrEqual(layout.width + 1);
    }
  });
}

for (const outcome of ['success', 'server-error', 'network-error']) {
  test(`Contact form handles ${outcome} without losing the page`, async ({ page }) => {
    let requests = 0;
    await page.route('https://formsubmit.co/**', async route => {
      requests++;
      expect(route.request().postDataJSON()['E-mailadres']).toBe('controle@example.invalid');
      // Keep the request pending long enough to check the sending state.
      await new Promise(resolve => setTimeout(resolve, 100));
      if (outcome === 'network-error') return route.abort();
      await route.fulfill({ status: outcome === 'success' ? 200 : 500,
        json: { success: outcome === 'success' ? 'true' : false } });
    });
    await page.goto('/contact.html');
    await page.getByLabel('Je naam', { exact: true }).fill('Browsercontrole');
    await page.getByLabel('E-mailadres', { exact: true }).fill('controle@example.invalid');
    await page.getByLabel('Je bericht', { exact: true }).fill('Gesimuleerde controle; wordt niet verzonden.');
    await page.getByRole('button', { name: 'Verstuur bericht' }).click();
    await expect(page.getByRole('button', { name: 'Bezig met versturen…' })).toBeDisabled();
    if (outcome === 'success') await expect(page.getByRole('status')).toContainText('Dankjewel, Browsercontrole!');
    else {
      await expect(page.getByRole('alert')).toContainText('Het versturen lukte niet.');
      await expect(page.getByRole('button', { name: 'Verstuur bericht' })).toBeEnabled();
    }
    await expect(page.locator('main')).toBeVisible();
    expect(requests).toBe(1);
  });
}

test('Tracking stays off until acceptance and stops on withdrawal', async ({ page }) => {
  let trackingRequests = 0;
  page.on('request', request => { if (request.url().includes('/js/external-tracking.js')) trackingRequests++; });
  await page.goto('/index.html');
  await expect(page.getByRole('dialog', { name: 'Cookievoorkeuren' })).toBeVisible();
  expect(trackingRequests).toBe(0);
  await page.getByRole('button', { name: 'Alleen functioneel', exact: true }).click();
  await page.reload();
  await expect(page.locator('h1')).toBeVisible();
  expect(trackingRequests).toBe(0);
  await page.getByRole('button', { name: 'Cookievoorkeuren', exact: true }).click();
  await page.getByRole('button', { name: 'Alle cookies accepteren' }).click();
  await expect.poll(() => page.evaluate(() => window.__trackingStarts)).toBe(1);
  await page.getByRole('button', { name: 'Cookievoorkeuren', exact: true }).click();
  await page.getByRole('button', { name: 'Alle cookies accepteren' }).click();
  expect(trackingRequests).toBe(1);
  await page.reload();
  await expect.poll(() => page.evaluate(() => window.__trackingStarts)).toBe(1);
  expect(trackingRequests).toBe(2);
  await page.getByRole('button', { name: 'Cookievoorkeuren', exact: true }).click();
  await Promise.all([
    page.waitForEvent('domcontentloaded'),
    page.getByRole('button', { name: 'Alleen functioneel', exact: true }).click(),
  ]);
  await expect(page.locator('h1')).toBeVisible();
  expect(await page.evaluate(() => window.__trackingStarts)).toBeUndefined();
  expect(trackingRequests).toBe(2);
});

for (const stored of ['legacy', 'expired', 'malformed']) {
  test(`A ${stored} cookie choice does not enable tracking`, async ({ page }) => {
    await page.addInitScript(value => {
      const consent = value === 'malformed' ? '{' : JSON.stringify({ analytics: true,
        version: value === 'legacy' ? 1 : 2, ts: value === 'expired' ? 0 : Date.now() });
      localStorage.setItem('ewk-cookie-consent', consent);
    }, stored);
    await page.goto('/index.html');
    await expect(page.getByRole('dialog', { name: 'Cookievoorkeuren' })).toBeVisible();
    expect(await page.evaluate(() => document.getElementById('ewk-external-tracking'))).toBeNull();
  });
}

test('Menu icons, video focus and reviews respond to interaction', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/index.html');
  await page.getByRole('button', { name: 'Alleen functioneel', exact: true }).click();
  const menu = page.getByRole('button', { name: 'Menu', exact: true });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(menu.locator('svg')).toHaveClass('lucide lucide-x');
  await page.locator('#mobile-menu').getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(/contact\.html$/);
  await page.goto('/index.html');
  const play = page.locator('main button').filter({ hasText: 'Bekijk mijn verhaal' }).first();
  await play.click();
  await expect(page.getByRole('dialog', { name: 'Het verhaal van Agathe' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Video sluiten' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Het verhaal van Agathe' })).toHaveCount(0);
  await expect(play).toBeFocused();
  await page.goto('/ervaringen.html');
  await page.getByRole('button', { name: 'Lees het hele verhaal' }).first().click();
  await expect(page.getByRole('button', { name: 'Lees minder' }).first().locator('svg')).toHaveClass('lucide lucide-chevron-up');
  await page.getByRole('button', { name: 'Lees minder' }).first().click();
});

test('Legacy links and nested 404 links reach the right page', async ({ page }) => {
  await page.goto('/Expeditie%20Werkplezier.html?utm_source=test#bedankt-scan');
  await expect(page).toHaveURL(/bedankt-scan\.html\?utm_source=test$/);
  await expect(page.locator('h1')).toBeVisible();
  const response = await page.goto('/missing/nested/page');
  expect(response.status()).toBe(404);
  await expect(page.locator('.nf img')).toBeVisible();
  await page.getByRole('link', { name: 'Terug naar de homepage' }).click();
  await expect(page).toHaveURL(/index\.html$/);
});

test('Contact, home and cookie pages pass the accessibility checks', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const file of ['index.html', 'contact.html', 'cookies.html']) {
    await page.goto('/' + file);
    await expect(page.locator('h1')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
    const violations = await page.evaluate(async () => {
      const results = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
      return results.violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) }));
    });
    expect(violations, file).toEqual([]);
  }
});

test('The published checkout destinations stay consistent', async ({ page }) => {
  for (const [file, checkout] of [
    ['deep-dive.html', 'https://expeditiewerkplezier.plugandpay.com/checkout/1-op-1-deep-dive'],
    ['bedankt-scan.html', 'https://expeditiewerkplezier.plugandpay.com/checkout/1-op-1-deep-dive-oto'],
  ]) {
    await page.goto('/' + file);
    const links = await page.locator('main a[href*="plugandpay"]').evaluateAll(elements => [...new Set(elements.map(element => element.href))]);
    expect(links).toEqual([checkout]);
  }
  await page.goto('/gratis-scan.html');
  await page.route('https://checkout.agathehania.nl/**', route => route.abort());
  const checkout = page.waitForRequest(request => request.isNavigationRequest() && request.url().startsWith('https://checkout.agathehania.nl/'));
  await page.locator('.ewk-scanform button').first().click();
  expect((await checkout).url()).toBe('https://checkout.agathehania.nl/gratis-stress-scan');
  await page.goto('/traject.html');
  await page.getByRole('button', { name: 'Vrijblijvend kennismaken', exact: true }).click();
  await expect(page).toHaveURL(/contact\.html$/);
});
