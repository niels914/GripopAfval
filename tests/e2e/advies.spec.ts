import { expect, test } from "@playwright/test";

/**
 * Rooktest van de adviesbot. In CI/e2e draait de site zonder
 * ANTHROPIC_API_KEY, dus de API-route antwoordt met de fallback-tekst —
 * precies wat we hier verifiëren (de flow werkt end-to-end zonder key).
 */

test("adviesbot: pagina toont chat en beantwoordt via de fallback", async ({
  page,
}) => {
  await page.goto("/advies");

  await expect(
    page.getByRole("heading", {
      name: "Vertel over uw situatie, krijg 10 concrete handvatten",
    })
  ).toBeVisible();

  // Welkomstbericht en starter-suggesties staan klaar.
  await expect(page.getByText("Ik ben de adviesbot van GripOpAfval")).toBeVisible();
  const starter = page.getByRole("button", {
    name: "Wij zijn een MBO-school en willen serieus beginnen met afval scheiden.",
  });
  await expect(starter).toBeVisible();

  // Starter versturen → gebruikersbubbel + (fallback-)antwoord van de route.
  await starter.click();
  await expect(
    page.getByText("Wij zijn een MBO-school en willen serieus beginnen")
  ).toBeVisible();
  await expect(
    page.getByText("De adviesbot is op dit moment niet beschikbaar")
  ).toBeVisible({ timeout: 15_000 });
});
