# SAHİPLEN BEŞİKTAŞ — Homepage Design Direction

## Creative territory: Bakış Mesafesi

The homepage is built around one idea: an animal should feel close enough to
meet, not displayed as an item in a catalogue. The opening frame uses direct
animal portraiture, oversized editorial typography and restrained municipal
signals. The municipality provides trust; the animal provides the emotional
center.

The experience must read as a premium digital portrait series with public-
service utility, not as a municipal template decorated with pet photography.

## Reference synthesis

### Principles to use

- **Voldogfood:** one animal dominates the first frame; type and navigation
  become a supporting frame around the subject.
- **Igloo:** a full-viewport spatial scene can feel cinematic when interface
  copy is sparse and anchored to the edges.
- **Don't Board Me:** one memorable gesture and a decisive typographic scale
  can establish personality quickly.
- **Phopet:** a high image-to-interface ratio keeps the subject central.
- **Benpetto:** immediate purpose communication is valuable when the hierarchy
  is unmistakable.

### Patterns to reject

- Forced entry games, loaders or interactions before public-service content.
- Empty DOM / WebGL-only experiences and long cinematic waits.
- Paw-print branding, stickers, mascot language and AI-generated pet collages.
- SaaS hero compositions, purple/cyber gradients and device mockup marketing.
- Repeating rounded cards, centered sections and equal three-column grids.
- Copying any reference's logo, layout, proprietary asset, typography or copy.

## Visual composition

- Large-format animal portraits with direct gaze and intentional cropping.
- Asymmetric layouts using a twelve-column editorial grid on desktop.
- Warm negative space, deep near-black passages and selective brand color
  blocks.
- Typography can cross image boundaries, but never compromise readability.
- Thin editorial rules, chapter labels and location-like coordinates create an
  institutional information layer without bureaucratic visual weight.
- Images use hard or gently softened rectangular crops; rounded corners are
  reserved for compact controls, not section containers.

## Typography

- **Display:** Bricolage Grotesque variable (`opsz`, `wdth`, `wght`). Its
  irregular details create a contemporary studio voice without looking cute.
- **Body / UI:** Manrope variable (`wght`). It is neutral, highly legible and
  sufficiently technical for public-service controls.
- Both families are available under the SIL Open Font License through Google
  Fonts, include Latin Extended characters and will be loaded through
  `next/font/google`.
- Display typography uses a tight but readable line-height and mixed case.
  Functional copy remains at least 16px on mobile.

## Color strategy

The four official values remain unchanged:

- `#FF2C55`: precise interaction accents, chapter markers and selected words.
- `#790000`: institutional depth, lost-animal passage and final action field.
- `#00BECE`: search/location signals and secondary informational details.
- `#F3EED9`: primary warm editorial canvas and photographic breathing space.

Most structure uses warm white, charcoal and off-black. No section uses all
four brand colors at once. Brand colors are never used as low-contrast body
text merely for identity.

## Homepage narrative

1. **Encounter — Karşılaş:** direct-gaze animal hero; institution, adoption and
   lost-animal paths are clear in the first viewport.
2. **Connection — Yakınlık:** large photography and a short statement establish
   the relationship between people, animals and the city.
3. **Discover — Tanış:** asymmetric adoption preview using the existing typed
   demo records, visibly labelled as development content.
4. **Choose — Bir adım yaklaş:** a decisive adoption action and visual bridge.
5. **Lost — Bir iz arıyoruz:** a darker, information-first lost-animal preview.
6. **Care — Kamusal sorumluluk:** municipal service content slots without fake
   claims or statistics.
7. **Learn — Bilgi de bakımın parçası:** editorial Academy index.
8. **Act — Şimdi ne yapabilirsiniz?:** three clear public-service paths.

## Navigation

- Compact brand mark and abbreviated service name on the homepage.
- Full route access remains available; desktop navigation is quiet and the
  primary adoption action is visually distinct.
- Mobile uses the existing accessible menu behavior with a redesigned full-
  width panel and at least 48px targets.
- Route focus management, current-page state and skip navigation remain.

## Motion language

- One coordinated GSAP/ScrollTrigger scope for the homepage.
- Hero portrait settles with a small scale change; headline lines move only
  enough to establish depth.
- Image masks reveal vertically or diagonally to echo editorial page turns.
- Decorative image layers may use 5–10% parallax; body text never parallaxs.
- Hover movement is limited to image crop/arrow translation, not floating
  cards.
- Native scroll remains untouched. No smooth-scroll dependency or snapping.
- Reduced-motion users receive the complete final composition immediately.

## 3D decision

3D is optional, not a deliverable checkbox. A production animal model will be
used only if research finds a visually credible asset with a documented
commercial-web license and reasonable weight. Otherwise, photography and
two-dimensional depth choreography will be the final art direction. Abstract
geometry and a generic rotating model are explicitly excluded.

## Responsive direction

- **Desktop ≥1024px:** asymmetric spatial composition, one optional sticky
  portrait passage and restrained scroll choreography.
- **Tablet 768–1023px:** reduced layer count and shorter motion distances;
  portrait and typography do not compete for the same area.
- **Mobile <768px:** content-first vertical editorial sequence, large imagery,
  no WebGL, no clipped text and no desktop composition squeezed into one
  column.

## Accessibility and performance guardrails

- Every essential statement and action exists in semantic HTML.
- Meaningful photography has contextual Turkish alt text; decorative crops use
  empty alt text.
- Focus remains visible and unobscured by the header or sticky imagery.
- All content remains complete when JavaScript, motion or WebGL is unavailable.
- Hero media has reserved dimensions and is optimized; below-fold imagery is
  lazy-loaded through `next/image`.
- No asset is accepted without a documented source and license.

