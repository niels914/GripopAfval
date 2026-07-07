import { describe, expect, it } from "vitest";
import {
  benchmarkTegenSector,
  berekenCashflow,
  berekenFactuurScan,
  berekenMeerjarenProjectie,
  berekenSchattingScan,
  berekenScan,
  berekenWhatIf,
  schatTonnageUitKosten,
  tariefRestInJaar,
  CO2_PER_TON_REST,
  INVESTERING_PER_LOCATIE,
  KG_PER_FTE,
  ONZEKERHEIDSMARGE,
  RESTAFVAL_SAMENSTELLING,
  SECTOR_KENGETALLEN,
  SUCCES_FEE,
  TARIEVEN,
} from "./scanCalculator";

describe("schatTonnageUitKosten", () => {
  it("verdeelt tonnage volgens het sector-restaandeel", () => {
    // MBO: 60% rest → kosten per ton = 0.6×190 + 0.4×80 = 146 €/ton
    const r = schatTonnageUitKosten(146_000, "mbo");
    expect(r.totaalTon).toBeCloseTo(1000, 5);
    expect(r.restTon).toBeCloseTo(600, 5);
    expect(r.gescheidenTon).toBeCloseTo(400, 5);
  });

  it("gebruikt het juiste restaandeel per sector", () => {
    // Kantoor: 50% rest → 0.5×190 + 0.5×80 = 135 €/ton
    const r = schatTonnageUitKosten(135_000, "kantoor");
    expect(r.totaalTon).toBeCloseTo(1000, 5);
    expect(r.restTon).toBeCloseTo(500, 5);
  });
});

describe("berekenSchattingScan (m²-route)", () => {
  it("berekent volume, kosten en scheidingsgraad voor een MBO", () => {
    // 10.000 m² × 2,0 kg/m² = 20 ton; 60% rest = 12 ton rest, 8 ton gescheiden
    const r = berekenSchattingScan({
      route: "schatting",
      sector: "mbo",
      m2: 10_000,
      fte: 1200,
    });
    expect(r.totaalTon).toBe(20);
    expect(r.restTon).toBe(12);
    expect(r.gescheidenTon).toBe(8);
    expect(r.kgPerM2).toBe(2.0);
    expect(r.scheidingsgraad).toBeCloseTo(0.4, 3);
    // Kosten: 12×190 + 8×80 = 2280 + 640 = 2920
    expect(r.kostenPerJaar).toBe(2920);
    expect(r.geschat).toBe(true);
  });

  it("gebruikt hotelkengetallen (8 kg/m², 55% rest)", () => {
    const r = berekenSchattingScan({
      route: "schatting",
      sector: "hotel",
      m2: 5_000,
      fte: 80,
    });
    // 5000 × 8 kg = 40 ton; 55% = 22 ton rest
    expect(r.totaalTon).toBe(40);
    expect(r.restTon).toBe(22);
    expect(r.kgPerM2).toBe(8.0);
  });
});

describe("berekenFactuurScan", () => {
  it("gebruikt opgegeven tonnages als die er zijn", () => {
    const r = berekenFactuurScan({
      route: "factuur",
      sector: "mbo",
      locaties: 2,
      kostenPerJaar: 80_000,
      restTon: 300,
      papierTon: 80,
      pmdTon: 15,
      gftTon: 5,
    });
    expect(r.totaalTon).toBe(400);
    expect(r.restTon).toBe(300);
    expect(r.gescheidenTon).toBe(100);
    expect(r.scheidingsgraad).toBe(0.25);
    expect(r.geschat).toBe(false);
    expect(r.kostenPerJaar).toBe(80_000);
  });

  it("schat tonnages uit kosten als er geen tonnages zijn opgegeven", () => {
    const r = berekenFactuurScan({
      route: "factuur",
      sector: "mbo",
      locaties: 1,
      kostenPerJaar: 146_000,
    });
    expect(r.geschat).toBe(true);
    expect(r.totaalTon).toBe(1000);
    expect(r.restTon).toBe(600);
  });

  it("negeert negatieve of ongeldige tonnages", () => {
    const r = berekenFactuurScan({
      route: "factuur",
      sector: "kantoor",
      locaties: 1,
      kostenPerJaar: 13_500,
      restTon: -5,
      papierTon: Number.NaN,
    });
    // Alles ongeldig → terugvallen op schatting uit kosten
    expect(r.geschat).toBe(true);
    expect(r.totaalTon).toBe(100);
  });
});

describe("scenario-berekeningen", () => {
  const r = berekenFactuurScan({
    route: "factuur",
    sector: "mbo",
    locaties: 1,
    kostenPerJaar: 50_000,
    restTon: 100,
    papierTon: 50,
  });

  it("bevat drie scenario's met oplopende reductie", () => {
    expect(r.scenarios.map((s) => s.reductie)).toEqual([0.2, 0.35, 0.5]);
  });

  it("berekent besparing als tariefverschil rest vs. gescheiden", () => {
    // Voorzichtig: 20% van 100 ton = 20 ton × (190−80) = € 2.200
    const voorzichtig = r.scenarios[0];
    expect(voorzichtig.restReductieTon).toBe(20);
    expect(voorzichtig.besparingPerJaar).toBe(
      20 * (TARIEVEN.rest - TARIEVEN.gescheidenGemiddeld)
    );
  });

  it("berekent CO2-reductie met de indicatieve factor", () => {
    const ambitieus = r.scenarios[2];
    expect(ambitieus.co2ReductieTon).toBe(50 * CO2_PER_TON_REST);
  });

  it("berekent terugverdientijd van inzamelmiddelen in maanden", () => {
    // Investering 1 locatie = € 1.500; voorzichtig bespaart € 2.200/jr
    // → 1500/2200 × 12 ≈ 8,2 maanden
    const voorzichtig = r.scenarios[0];
    expect(voorzichtig.terugverdientijdMaanden).toBeCloseTo(
      (INVESTERING_PER_LOCATIE / 2200) * 12,
      1
    );
  });

  it("geeft null terug als er geen besparing is", () => {
    const leeg = berekenFactuurScan({
      route: "factuur",
      sector: "mbo",
      locaties: 1,
      kostenPerJaar: 0,
    });
    expect(leeg.scenarios[0].besparingPerJaar).toBe(0);
    expect(leeg.scenarios[0].terugverdientijdMaanden).toBeNull();
  });
});

describe("modelconstanten", () => {
  it("restafvalsamenstelling telt op tot 100%", () => {
    const som = RESTAFVAL_SAMENSTELLING.reduce((acc, s) => acc + s.pct, 0);
    expect(som).toBe(100);
  });

  it("alle sectoren hebben kengetallen", () => {
    for (const k of Object.values(SECTOR_KENGETALLEN)) {
      expect(k.kgPerM2).toBeGreaterThan(0);
      expect(k.restAandeel).toBeGreaterThan(0);
      expect(k.restAandeel).toBeLessThan(1);
    }
  });
});

describe("fte-consistentiecheck (schattingsroute)", () => {
  it("berekent de fte-schatting en spreiding t.o.v. de m²-schatting", () => {
    // MBO: m² geeft 20 ton; 1200 leerlingen × 15 kg = 18 ton → spreiding 10%
    const r = berekenSchattingScan({
      route: "schatting",
      sector: "mbo",
      m2: 10_000,
      fte: 1200,
    });
    expect(r.fteSchattingTon).toBe((1200 * KG_PER_FTE.mbo) / 1000);
    expect(r.schattingsSpreiding).toBeCloseTo(0.1, 2);
  });

  it("laat de fte-velden leeg bij de factuurroute", () => {
    const r = berekenFactuurScan({
      route: "factuur",
      sector: "mbo",
      locaties: 1,
      kostenPerJaar: 10_000,
    });
    expect(r.fteSchattingTon).toBeNull();
    expect(r.schattingsSpreiding).toBeNull();
  });
});

describe("bandbreedtes", () => {
  it("geeft ±20% rond de puntschatting", () => {
    const r = berekenFactuurScan({
      route: "factuur",
      sector: "mbo",
      locaties: 1,
      kostenPerJaar: 50_000,
      restTon: 100,
    });
    const s = r.scenarios[1]; // realistisch: 35 ton × €110 = €3.850
    expect(s.besparingLaag).toBe(
      Math.round(s.besparingPerJaar * (1 - ONZEKERHEIDSMARGE))
    );
    expect(s.besparingHoog).toBe(
      Math.round(s.besparingPerJaar * (1 + ONZEKERHEIDSMARGE))
    );
    expect(s.besparingLaag).toBeLessThan(s.besparingPerJaar);
    expect(s.besparingHoog).toBeGreaterThan(s.besparingPerJaar);
  });
});

describe("benchmark tegen sector", () => {
  it("vergelijkt scheidingsgraad met het sectorgemiddelde", () => {
    // MBO-sector: 40% gescheiden. Eigen situatie 25% → afwijking −37,5%
    const b = benchmarkTegenSector("mbo", 0.25);
    expect(b.scheidingsgraadSector).toBeCloseTo(0.4, 3);
    expect(b.scheidingsgraadAfwijking).toBeCloseTo(-0.375, 3);
    expect(b.kgPerM2Sector).toBe(2.0);
  });

  it("zit automatisch in elk scanresultaat", () => {
    const r = berekenSchattingScan({
      route: "schatting",
      sector: "kantoor",
      m2: 1000,
      fte: 50,
    });
    // Schattingsroute volgt het kengetal → afwijking 0
    expect(r.benchmark.scheidingsgraadAfwijking).toBeCloseTo(0, 2);
  });
});

describe("meerjarenprojectie (CO2-heffing)", () => {
  it("verdubbelt het restafvaltarief vanaf 2028", () => {
    expect(tariefRestInJaar(2026)).toBe(TARIEVEN.rest);
    expect(tariefRestInJaar(2027)).toBe(Math.round(TARIEVEN.rest * 1.5));
    expect(tariefRestInJaar(2028)).toBe(TARIEVEN.rest * 2);
    expect(tariefRestInJaar(2030)).toBe(TARIEVEN.rest * 2);
  });

  it("laat het verschil groeien met het tarief", () => {
    const p = berekenMeerjarenProjectie({ restTon: 100, gescheidenTon: 50 }, 0.35);
    expect(p).toHaveLength(5);
    // 2026: 35 ton × (190−80) = €3.850; 2028: 35 × (380−80) = €10.500
    expect(p[0].verschil).toBe(3850);
    expect(p[2].verschil).toBe(10_500);
    expect(p[4].verschil).toBe(p[2].verschil); // vlak na 2028
    // Zonder actie stijgen de kosten; met scenario stijgen ze minder hard
    expect(p[2].kostenZonderActie).toBeGreaterThan(p[0].kostenZonderActie);
    expect(p[2].kostenMetScenario).toBeLessThan(p[2].kostenZonderActie);
  });
});

describe("cashflow met succes-fee", () => {
  it("rekent fee, investering en netto correct door", () => {
    // €10.000 bruto, 2 locaties → fee €2.000/jr, investering €3.000 in jaar 1
    const cf = berekenCashflow(10_000, 2);
    expect(cf[0]).toMatchObject({
      jaar: 1,
      brutoBesparing: 10_000,
      succesFee: 10_000 * SUCCES_FEE,
      investering: 2 * INVESTERING_PER_LOCATIE,
      netto: 10_000 - 2_000 - 3_000,
    });
    expect(cf[1].investering).toBe(0);
    expect(cf[1].netto).toBe(8_000);
    expect(cf[2].cumulatief).toBe(5_000 + 8_000 + 8_000);
  });
});

describe("what-if-herberekening", () => {
  const basis = berekenFactuurScan({
    route: "factuur",
    sector: "mbo",
    locaties: 2,
    kostenPerJaar: 50_000,
    restTon: 100,
  });

  it("herberekent met aangepaste reductie en tarief", () => {
    const w = berekenWhatIf(basis, { reductie: 0.4, tariefRest: 300 });
    // 40 ton × (300−80) = €8.800
    expect(w.scenario.besparingPerJaar).toBe(8800);
    expect(w.scenario.id).toBe("maatwerk");
    expect(w.cashflow[0].succesFee).toBe(Math.round(8800 * SUCCES_FEE));
    expect(w.projectie[0].tariefRest).toBe(300);
    expect(w.projectie[2].tariefRest).toBe(600);
  });

  it("gebruikt de aangepaste investering in terugverdientijd en cashflow", () => {
    const w = berekenWhatIf(basis, { reductie: 0.2, investeringPerLocatie: 3000 });
    // 20 ton × 110 = €2.200/jr; investering 2×3000=6000 → 32,7 mnd
    expect(w.scenario.terugverdientijdMaanden).toBeCloseTo((6000 / 2200) * 12, 1);
    expect(w.cashflow[0].investering).toBe(6000);
  });

  it("blijft consistent met de standaardscenario's bij default-aannames", () => {
    const w = berekenWhatIf(basis, { reductie: 0.35 });
    expect(w.scenario.besparingPerJaar).toBe(basis.scenarios[1].besparingPerJaar);
  });
});

describe("berekenScan (dispatch)", () => {
  it("kiest de juiste route", () => {
    const f = berekenScan({
      route: "factuur",
      sector: "mbo",
      locaties: 1,
      kostenPerJaar: 10_000,
    });
    expect(f.kgPerM2).toBeNull();
    const s = berekenScan({
      route: "schatting",
      sector: "kantoor",
      m2: 1000,
      fte: 50,
    });
    expect(s.kgPerM2).toBe(1.5);
  });
});
