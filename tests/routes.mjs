import assert from "node:assert/strict";
import test from "node:test";

// Read-only HTTP checks against the local app; no browser, login, or form submission.
const origin = new URL(process.env.TEST_BASE_URL || "http://localhost:3000");
assert.ok(["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname), "Use a local test server");
const routes = ["/", "/sahiplendirme", "/kayip-hayvanlar", "/akademi", "/hakkimizda", "/iletisim", "/gizlilik-politikasi", "/akademi/sahiplenmeden-once", "/akademi/besiktasta-sahiplenme", "/akademi/bulunan-kopek-icin-ilk-adimlar", "/akademi/mobivet-iletisim"];
const pageHtml = new Map();
const visibleMarkup = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
const textOnly = (html) => visibleMarkup(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");

for (const path of routes) {
  test(`${path}: successful SSR, one h1, metadata, no development copy`, async () => {
    const response = await fetch(new URL(path, origin));
    assert.equal(response.status, 200);
    const html = await response.text();
    pageHtml.set(path, html);
    const markup = visibleMarkup(html);
    assert.equal((markup.match(/<h1\b/g) || []).length, 1);
    assert.match(markup, /<main\b/);
    assert.match(html, /<html[^>]*lang="tr"/);
    assert.match(html, /<title>[^<]+<\/title>/);
    assert.match(html, /<meta name="description" content="[^"]{30,}"/);
    assert.ok(!/\bdemo\b|lorem ipsum|onaylı içerik bekleniyor|üretim verisi değildir/i.test(textOnly(html)));
    assert.ok(!/<button[^>]*\bdisabled\b/i.test(markup), "No permanently disabled SSR buttons");
    for (const match of markup.matchAll(/<input\b([^>]*)>|<textarea\b([^>]*)>|<select\b([^>]*)>/g)) {
      const attrs = match[1] || match[2] || match[3];
      if (/type="hidden"/.test(attrs)) continue;
      const id = /\bid="([^"]+)"/.exec(attrs)?.[1];
      assert.ok(/aria-label="/.test(attrs) || (id && markup.includes(`for="${id}"`)), "Every form field needs a label");
    }
    for (const match of markup.matchAll(/<img\b([^>]*)>/g)) assert.match(match[1], /\balt="/);
  });
}

test("internal links have destinations, local anchors exist", async () => {
  const checked = new Set(routes);
  for (const [path, html] of pageHtml) {
    for (const match of visibleMarkup(html).matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const href = match[1].replaceAll("&amp;", "&");
      assert.notEqual(href, "#", `${path} contains a dead link`);
      if (!href.startsWith("/") && !href.startsWith("#")) continue;
      const target = new URL(href, new URL(path, origin));
      if (target.origin !== origin.origin) continue;
      const key = target.pathname + target.search;
      if (!checked.has(key)) {
        const response = await fetch(target);
        assert.equal(response.status, 200, `Broken internal link: ${key}`);
        pageHtml.set(key, await response.text());
        checked.add(key);
      }
      if (target.hash) assert.ok(pageHtml.get(key)?.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `Missing anchor: ${href}`);
    }
  }
});

test("unpublished and unknown record URLs are 404, never fixture details", async () => {
  for (const path of ["/sahiplendirme/demo-kedi-kaydi", "/kayip-hayvanlar/demo-kayip-kedi-kaydi", "/akademi/not-an-article", "/not-a-real-page"]) {
    const response = await fetch(new URL(path, origin));
    assert.equal(response.status, 404, path);
  }
});

test("empty inventories, invalid dates and search states explain the next action", async () => {
  assert.match(textOnly(pageHtml.get("/sahiplendirme")), /henüz hayvan kaydı yayımlanmadı/);
  assert.match(textOnly(pageHtml.get("/kayip-hayvanlar")), /henüz ilan yayımlanmadı/);
  const response = await fetch(new URL("/kayip-hayvanlar?baslangic=2026-08-27&bitis=2026-08-01", origin));
  assert.match(textOnly(await response.text()), /Bitiş tarihi başlangıç tarihinden önce olamaz/);
  const noResults = await fetch(new URL("/akademi?q=unmatched-local-test", origin));
  assert.match(textOnly(await noResults.text()), /eşleşen rehber bulunamadı/);
  const category = await fetch(new URL("/akademi?kategori=Sahiplenme", origin));
  assert.match(textOnly(await category.text()), /2 rehber gösteriliyor/);
});

test("contact uses explicit email handoff, privacy and public metadata endpoints exist", async () => {
  assert.match(pageHtml.get("/iletisim"), /mailto:baskanatalepler@besiktas\.bel\.tr/);
  assert.match(textOnly(pageHtml.get("/iletisim")), /site üzerinden göndermez/);
  assert.match(pageHtml.get("/iletisim"), /href="tel:4444455"/);
  for (const path of ["/robots.txt", "/sitemap.xml", "/icon.svg"]) {
    const response = await fetch(new URL(path, origin));
    assert.equal(response.status, 200, path);
  }
});
