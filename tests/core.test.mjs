import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, readdirSync } from "node:fs";

import { filterAnimals, filterLostAnimals, parseListingDate, formatListingDate } from "../src/lib/animal-filters.ts";
import { validateContact, prepareContactDraft } from "../src/lib/contact.ts";
import { parseFavoriteIds } from "../src/lib/favorites.ts";
import { getQueryValue } from "../src/lib/query.ts";
import { knowledgeArticles, getKnowledgeArticle, searchKnowledge } from "../src/data/academy.ts";
import { publishedAnimals, publishedLostAnimals } from "../src/data/published-records.ts";

// Synthetic fixtures only for pure-function tests; not imported by the app.
const animals = [0, 3, 25, 26].map((age) => ({ id: `test-${age}`, age, species: age === 3 ? "dog" : "cat", gender: "female", adoptionStatus: "available", healthStatus: "healthy", sterilizationStatus: "sterilized" }));
const lost = [
  { id: "test-a", name: "İSİM", location: "BÖLGE", distinguishingFeatures: "Siyah tasma", species: "cat", status: "missing", lostDate: "2026-08-01" },
  { id: "test-b", name: "Test", location: "Bölge", distinguishingFeatures: "Beyaz tasma", species: "dog", status: "found", lostDate: "2026-08-27" },
  { id: "test-c", name: "Test", location: "Alan", distinguishingFeatures: "", species: "cat", status: "closed", lostDate: null },
];

test("age is an inclusive upper bound, including zero", () => {
  assert.deepEqual(filterAnimals(animals, { maxAge: 25 }).map((a) => a.age), [0, 3, 25]);
  assert.deepEqual(filterAnimals(animals, { maxAge: 0 }).map((a) => a.age), [0]);
  assert.equal(filterAnimals(animals).length, 4);
});
test("animal filters combine without changing the records", () => {
  assert.equal(filterAnimals(animals, { species: "dog", gender: "female", maxAge: 25, adoptionStatus: "available" }).length, 1);
  assert.equal(filterAnimals(animals, { adoptionStatus: "adopted" }).length, 0);
  assert.equal(filterAnimals(animals, { healthStatus: "disabled" }).length, 0);
  assert.equal(animals.length, 4);
});
test("Turkish search and location matching ignore case and surrounding space", () => {
  assert.equal(filterLostAnimals(lost, { query: " isim " })[0].id, "test-a");
  assert.equal(filterLostAnimals(lost, { query: "TASMA", location: " bölge ", species: "dog", status: "found" })[0].id, "test-b");
});
test("date boundaries are inclusive and unknown dates do not match", () => {
  assert.equal(filterLostAnimals(lost, { dateFrom: "2026-08-01", dateTo: "2026-08-27" }).length, 2);
  assert.equal(filterLostAnimals(lost, { dateFrom: "2026-08-27", dateTo: "2026-08-27" })[0].id, "test-b");
  assert.equal(filterLostAnimals(lost, { dateFrom: "2026-08-27", dateTo: "2026-08-01" }).length, 0);
});
test("calendar dates are validated, not merely parsed", () => {
  for (const value of ["2026-02-29", "2026-13-01", "2026-08-99", "invalid", "27/08/2026"]) assert.equal(parseListingDate(value), undefined);
  assert.equal(parseListingDate("2024-02-29"), "2024-02-29");
  assert.equal(formatListingDate(null), "Belirtilmedi");
  assert.equal(formatListingDate("2026-08-27"), "27 Ağustos 2026");
});
const fields = { name: "Arayüz Testi", email: "ui-test@example.invalid", subject: "other", message: "Yalnızca yerel test için hazırlanan iletişim metni." };
test("contact rejects empty fields and invalid subjects", () => {
  assert.equal(Object.keys(validateContact({ name: "", email: "", subject: "", message: "" })).length, 4);
  assert.ok(validateContact({ ...fields, subject: "__proto__" }).subject);
  assert.ok(validateContact({ ...fields, email: "bad\naddress@example.invalid" }).email);
  assert.ok(validateContact({ ...fields, message: "x".repeat(1501) }).message);
  assert.equal(prepareContactDraft({ ...fields, message: "short" }, "recipient@example.invalid"), null);
});
test("contact creates a safely encoded mail draft, not a sent receipt", () => {
  const draft = prepareContactDraft({ ...fields, message: fields.message + " &bcc=not-a-recipient" }, "recipient@example.invalid");
  const url = new URL(draft.href);
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.searchParams.has("bcc"), false);
  assert.ok(url.searchParams.get("body").includes("&bcc=not-a-recipient"));
  assert.ok(draft.text.includes(fields.email));
});
test("favorite data is bounded and tolerates corrupt storage", () => {
  assert.deepEqual(parseFavoriteIds("bad json"), []);
  assert.deepEqual(parseFavoriteIds('{"id":"x"}'), []);
  assert.deepEqual(parseFavoriteIds('["record-1","record-1",null,"<script>",42,"record-2"]'), ["record-1", "record-2"]);
  assert.equal(parseFavoriteIds(JSON.stringify(Array.from({ length: 600 }, (_, i) => `id-${i}`))).length, 500);
});
test("academy has four sourced, addressable guides with searchable Turkish text", () => {
  assert.equal(knowledgeArticles.length, 4);
  assert.equal(new Set(knowledgeArticles.map((a) => a.slug)).size, 4);
  for (const article of knowledgeArticles) {
    assert.ok(article.sections.length >= 3);
    assert.ok(article.sources.every((s) => s.url.startsWith("https://")));
    assert.equal(getKnowledgeArticle(article.slug), article);
  }
  assert.equal(searchKnowledge("MOBİVET").length, 1);
  assert.equal(searchKnowledge("", "Sahiplenme").length, 2);
  assert.equal(searchKnowledge("no-matching-result").length, 0);
  assert.equal(getKnowledgeArticle("missing"), undefined);
});
test("query arrays resolve predictably and public inventories contain no fixtures", () => {
  assert.equal(getQueryValue(["first", "second"]), "first");
  assert.equal(getQueryValue(undefined), "");
  assert.equal(getQueryValue([]), "");
  assert.ok([...publishedAnimals, ...publishedLostAnimals].every((r) => !r.isDemo && r.publication.sourceReference && parseListingDate(r.publication.verifiedAt)));
});

test("official brand colors remain exact and functional text pairs pass AA", () => {
  const css = readFileSync(new URL("../src/styles/tokens.css", import.meta.url), "utf8");
  for (const [name, value] of Object.entries({ primary: "#FF2C55", dark: "#790000", accent: "#00BECE", warm: "#F3EED9" })) {
    assert.ok(css.includes(`--color-brand-${name}: ${value};`));
  }
  const luminance = (hex) => {
    const [r, g, b] = hex.match(/[a-f0-9]{2}/gi).map((part) => parseInt(part, 16) / 255).map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return r * 0.2126 + g * 0.7152 + b * 0.0722;
  };
  for (const [foreground, background] of [["#790000", "#FFFFFF"], ["#790000", "#FFE9EE"], ["#72666A", "#F5F2EE"], ["#005D66", "#F5F2EE"], ["#F3EED9", "#171214"]]) {
    const values = [luminance(foreground), luminance(background)].sort((a, b) => a - b);
    assert.ok((values[1] + 0.05) / (values[0] + 0.05) >= 4.5, `${foreground} on ${background}`);
  }
});

test("public pages and components never import development fixtures", () => {
  for (const folder of ["app", "components"]) {
    const root = new URL(`../src/${folder}/`, import.meta.url);
    for (const file of readdirSync(root, { recursive: true }).filter((file) => /\.tsx?$/.test(file))) {
      const source = readFileSync(new URL(file.replaceAll("\\", "/"), root), "utf8");
      assert.ok(!/from\s+["'][^"']*data\/mock\//.test(source), file);
    }
  }
});
