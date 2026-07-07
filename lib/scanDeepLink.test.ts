import { describe, expect, it } from "vitest";
import { bouwDeelQuery, parseDeelQuery } from "./scanDeepLink";
import type { FactuurInput, SchattingInput } from "./scanCalculator";

describe("deelbare scan-URL", () => {
  it("maakt een round-trip voor de schattingsroute", () => {
    const input: SchattingInput = {
      route: "schatting",
      sector: "mbo",
      m2: 10_000,
      fte: 1200,
    };
    const query = bouwDeelQuery(input);
    expect(query).toContain("route=schatting");
    expect(parseDeelQuery(new URLSearchParams(query))).toEqual(input);
  });

  it("maakt een round-trip voor de factuurroute incl. optionele tonnages", () => {
    const input: FactuurInput = {
      route: "factuur",
      sector: "hotel",
      locaties: 3,
      kostenPerJaar: 90_000,
      restTon: 120,
      gftTon: 40,
    };
    const geparsed = parseDeelQuery(new URLSearchParams(bouwDeelQuery(input)));
    expect(geparsed).toMatchObject({
      route: "factuur",
      sector: "hotel",
      locaties: 3,
      kostenPerJaar: 90_000,
      restTon: 120,
      gftTon: 40,
    });
    expect((geparsed as FactuurInput).papierTon).toBeUndefined();
  });

  it("weigert ongeldige of onvolledige parameters", () => {
    expect(parseDeelQuery(new URLSearchParams("route=schatting&sector=mbo"))).toBeNull();
    expect(parseDeelQuery(new URLSearchParams("route=schatting&sector=nep&m2=1&fte=1"))).toBeNull();
    expect(parseDeelQuery(new URLSearchParams("route=factuur&sector=mbo&locaties=1"))).toBeNull();
    expect(parseDeelQuery(new URLSearchParams("route=schatting&sector=mbo&m2=-5&fte=10"))).toBeNull();
    expect(parseDeelQuery(new URLSearchParams(""))).toBeNull();
  });
});
