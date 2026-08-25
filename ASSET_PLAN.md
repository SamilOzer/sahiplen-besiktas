# SAHİPLEN BEŞİKTAŞ — Homepage Asset Plan

## Acceptance criteria

Every external asset must have a source page, named creator where available,
explicit license and license URL. Accepted bases are public domain, CC0,
commercial-use Creative Commons, or a clear free commercial-use library
license. Assets with unclear terms will not be downloaded or used.

Photography must look natural and editorial. Reject generic smiling-pet stock,
owner-and-dog lifestyle clichés, costumes, childish staging and obvious AI
generation.

## Required photography

### 1. Hero animal portrait

- Subject: dog or cat with direct gaze and expressive detail.
- Composition: enough negative space for asymmetric Turkish headline.
- Target use: first viewport and no-JavaScript poster.
- Target file: `public/assets/home/hero-animal.webp`.
- Target dimensions: approximately 1800×2200, cropped responsively.

### 2. Connection portrait

- Subject: quiet human–animal proximity or a second direct animal portrait.
- Composition: vertical, tactile, emotionally restrained.
- Target use: Connection section.
- Target file: `public/assets/home/connection.webp`.
- Target dimensions: approximately 1400×1800.

### 3. Adoption dog portrait

- Subject: natural dog portrait, distinct from hero.
- Target use: visibly labelled demo adoption preview.
- Target file: `public/assets/animals/demo-dog.webp`.
- Target dimensions: approximately 1200×1500.

### 4. Adoption cat portrait

- Subject: natural cat portrait with clear facial detail.
- Target use: visibly labelled demo adoption preview.
- Target file: `public/assets/animals/demo-cat.webp`.
- Target dimensions: approximately 1200×1500.

### 5. Lost-animal visual

- Subject: alert animal or urban animal portrait with navigational atmosphere;
  no fabricated location or incident.
- Target use: lost-animal section as an editorial background, never as a real
  report image.
- Target file: `public/assets/home/lost-animal.webp`.
- Target dimensions: approximately 1600×1200.

## Optional assets

### Texture

- Very subtle paper/noise texture only if it improves photographic integration.
- Prefer a locally generated CSS/noise treatment; external texture is accepted
  only with a clear license.

### 3D animal model

- Search GLB/GLTF sources with explicit commercial web usage.
- Requirements: credible anatomy, non-cartoon styling, ≤150k triangles before
  optimization, compressed textures and a realistic path to ≤3MB delivery.
- If no asset meets both visual and legal standards, use no 3D asset.

## Optimization workflow

- Preserve the downloaded original only when required for license/audit; ship
  optimized WebP derivatives.
- Resize before compression; do not ship unnecessary 4K files.
- Record source URL, creator, license, intended use and attribution requirement
  in `ASSETS.md`.
- Use `next/image` with explicit `sizes`, dimensions or `fill` inside a reserved
  aspect-ratio container.

