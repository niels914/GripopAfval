import { expect, test } from "@playwright/test";

/**
 * Rooktest van de kernflow: homepage → afvalscan → resultaat → leadformulier.
 * De verwachte cijfers spiegelen lib/scanCalculator.test.ts (MBO, 10.000 m²):
 * 20 ton totaal, kosten € 2.920, scheidingsgraad 40%.
 */

test("homepage toont hero en navigatie", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Wij verdienen pas als u bespaart." })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Doe de gratis afvalscan" }).first()
  ).toBeVisible();
});

test("afvalscan: schattingsroute rekent correct en levert lead af", async ({
  page,
}) => {
  await page.goto("/afvalscan");

  // Stap 1: schattingsroute kiezen
  await page.getByRole("button", { name: /Ik schat op basis van m²/ }).click();

  // Stap 2: MBO, 10.000 m², 1.200 leerlingen
  await page.selectOption("#schatting-sector", "mbo");
  await page.fill("#schatting-m2", "10000");
  await page.fill("#schatting-fte", "1200");
  await page.getByRole("button", { name: /Bereken mijn besparing/ }).click();

  // Stap 3: resultaat — cijfers consistent met de unit tests
  await expect(page.getByText("Uw besparingspotentieel")).toBeVisible();
  await expect(page.getByText("€ 2.920")).toBeVisible(); // kosten/jaar
  await expect(page.getByText("40%").first()).toBeVisible(); // scheidingsgraad
  await expect(page.getByText("Drie besparingsscenario's")).toBeVisible();

  // Stap 4: rapport aanvragen → /bedankt
  await page.fill("#scan-naam", "E2E Tester");
  await page.fill("#scan-email", "e2e@example.com");
  // Wacht de minimale invultijd (spam-check) af zodat de lead echt verwerkt wordt.
  await page.waitForTimeout(3100);
  await page.getByRole("button", { name: "Ontvang uw rapport per e-mail" }).click();
  await expect(page).toHaveURL(/\/bedankt/);
  await expect(page.getByText(/binnen 2 werkdagen contact/)).toBeVisible();
});

test("what-if-slider herberekent live", async ({ page }) => {
  // Deellink opent direct het resultaat
  await page.goto("/afvalscan?route=schatting&sector=mbo&m2=10000&fte=1200");
  await expect(page.getByText("Uw besparingspotentieel")).toBeVisible();

  // Standaard 35%-scenario: € 462; op 50%: € 660 (zelfde cijfers als unit tests)
  const besparing = page.getByTestId("whatif-besparing");
  await expect(besparing).toHaveText("€ 462");
  await page.locator("#whatif-reductie").fill("50");
  await expect(besparing).toHaveText("€ 660");

  // Cashflow en benchmark zijn zichtbaar
  await expect(
    page.getByRole("heading", { name: "Wat kost het — en wat houdt u over?" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Hoe doet u het vergeleken met uw sector?" })
  ).toBeVisible();
});

test("terugnavigeren behoudt de invoer", async ({ page }) => {
  await page.goto("/afvalscan");
  await page.getByRole("button", { name: /Ik schat op basis van m²/ }).click();
  await page.selectOption("#schatting-sector", "hotel");
  await page.fill("#schatting-m2", "5000");
  await page.fill("#schatting-fte", "80");
  await page.getByRole("button", { name: /Bereken mijn besparing/ }).click();
  await expect(page.getByText("Uw besparingspotentieel")).toBeVisible();

  await page.getByRole("button", { name: "Gegevens aanpassen" }).click();
  await expect(page.locator("#schatting-m2")).toHaveValue("5000");
  await expect(page.locator("#schatting-fte")).toHaveValue("80");
  await expect(page.locator("#schatting-sector")).toHaveValue("hotel");
});

test("404-pagina verwijst naar de scan", async ({ page }) => {
  await page.goto("/bestaat-niet");
  await expect(page.getByText("404 — pagina niet gevonden")).toBeVisible();
  await expect(
    page.locator("#main").getByRole("link", { name: "Doe de gratis afvalscan" })
  ).toBeVisible();
});

test("sitemap en robots zijn bereikbaar", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("/afvalscan");
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
});
