import { describe, expect, it } from "vitest";
import {
  HANDVATTEN_EINDE,
  HANDVATTEN_START,
  parseAdviesJson,
  parseBotAntwoord,
} from "./parser";
import { chatVerzoekSchema } from "./types";
import { bouwSysteemPrompt } from "./prompt";
import { handvattenBank } from "@/content/library/handvatten";

function voorbeeldAdvies(aantal = 10) {
  return {
    intro: "Je bent een MBO-school met 3.000 studenten en één locatie.",
    handvatten: Array.from({ length: aantal }, (_, i) => ({
      titel: `Handvat ${i + 1}`,
      categorie: "contract",
      toelichting: "Vraag offertes op bij drie landelijke inzamelaars en één regionale.",
      actie: "Plan deze week een belronde.",
      links: [{ label: "Renewi", url: "https://www.renewi.com/nl-nl" }],
    })),
  };
}

describe("parseBotAntwoord", () => {
  it("geeft gewone tekst ongewijzigd terug zonder adviesblok", () => {
    const uit = parseBotAntwoord("Hoeveel studenten heeft jullie school?");
    expect(uit.tekst).toBe("Hoeveel studenten heeft jullie school?");
    expect(uit.advies).toBeNull();
    expect(uit.bezigMetAdvies).toBe(false);
  });

  it("parseert een compleet adviesblok met tekst eromheen", () => {
    const json = JSON.stringify(voorbeeldAdvies());
    const ruw = `Gelet op jouw situatie zou ik je deze tien handvatten geven:\n${HANDVATTEN_START}${json}${HANDVATTEN_EINDE}\nZal ik er één uitwerken?`;
    const uit = parseBotAntwoord(ruw);
    expect(uit.advies).not.toBeNull();
    expect(uit.advies?.handvatten).toHaveLength(10);
    expect(uit.tekst).toContain("Gelet op jouw situatie");
    expect(uit.tekst).toContain("Zal ik er één uitwerken?");
    expect(uit.tekst).not.toContain(HANDVATTEN_START);
  });

  it("markeert een half gestreamd blok als bezig en verbergt de JSON", () => {
    const uit = parseBotAntwoord(
      `Hier komen ze:\n${HANDVATTEN_START}{"intro":"Je bent`
    );
    expect(uit.bezigMetAdvies).toBe(true);
    expect(uit.advies).toBeNull();
    expect(uit.tekst).toBe("Hier komen ze:");
  });

  it("verbergt een half gestreamde openingsmarker aan het einde", () => {
    const uit = parseBotAntwoord("Hier komen ze:\n<HANDV");
    expect(uit.tekst).toBe("Hier komen ze:\n");
    expect(uit.bezigMetAdvies).toBe(false);
  });
});

describe("parseAdviesJson", () => {
  it("valideert een correct advies", () => {
    expect(parseAdviesJson(JSON.stringify(voorbeeldAdvies()))).not.toBeNull();
  });

  it("wijst kapotte JSON af", () => {
    expect(parseAdviesJson('{"intro": "half')).toBeNull();
  });

  it("wijst te weinig handvatten af", () => {
    expect(parseAdviesJson(JSON.stringify(voorbeeldAdvies(2)))).toBeNull();
  });

  it("wijst onveilige link-schema's af (javascript:)", () => {
    const advies = voorbeeldAdvies();
    advies.handvatten[0].links = [{ label: "x", url: "javascript:alert(1)" }];
    expect(parseAdviesJson(JSON.stringify(advies))).toBeNull();
  });

  it("accepteert interne paden als link", () => {
    const advies = voorbeeldAdvies();
    advies.handvatten[0].links = [{ label: "Afvalscan", url: "/afvalscan" }];
    expect(parseAdviesJson(JSON.stringify(advies))).not.toBeNull();
  });
});

describe("chatVerzoekSchema", () => {
  it("accepteert een geldig gesprek dat eindigt met de gebruiker", () => {
    const uit = chatVerzoekSchema.safeParse({
      messages: [
        { role: "user", content: "Hoi" },
        { role: "assistant", content: "Vertel eens over je organisatie?" },
        { role: "user", content: "Wij zijn een hotel met 80 kamers." },
      ],
    });
    expect(uit.success).toBe(true);
  });

  it("wijst een gesprek af dat eindigt met de bot", () => {
    const uit = chatVerzoekSchema.safeParse({
      messages: [
        { role: "user", content: "Hoi" },
        { role: "assistant", content: "Vertel!" },
      ],
    });
    expect(uit.success).toBe(false);
  });

  it("wijst te lange berichten af", () => {
    const uit = chatVerzoekSchema.safeParse({
      messages: [{ role: "user", content: "x".repeat(4001) }],
    });
    expect(uit.success).toBe(false);
  });
});

describe("bouwSysteemPrompt", () => {
  it("bevat de markers, de bouwstenen en alleen gecontroleerde links", () => {
    const prompt = bouwSysteemPrompt();
    expect(prompt).toContain(HANDVATTEN_START);
    expect(prompt).toContain(HANDVATTEN_EINDE);
    for (const bouwsteen of handvattenBank) {
      expect(prompt).toContain(bouwsteen.titel);
    }
    expect(prompt).toContain("https://www.renewi.com/nl-nl");
  });
});
