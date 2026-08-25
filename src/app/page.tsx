import type { Metadata } from "next";

import { AdoptionDiscoveryCarousel } from "@/components/home/AdoptionDiscoveryCarousel";
import { HomepageExperience } from "@/components/home/HomepageExperience";
import { LostAnimalsImageTrail } from "@/components/home/LostAnimalsImageTrail";
import { createPageMetadata } from "@/lib/metadata";

import "@/styles/homepage.css";

export const metadata: Metadata = createPageMetadata(
  "Ana sayfa",
  "Beşiktaş Belediyesi hayvan sahiplendirme, kayıp hayvan ilanları ve güvenilir bilgi platformu.",
);

export default function HomePage() {
  return (
    <>
      <HomepageExperience />
      <AdoptionDiscoveryCarousel />
      <LostAnimalsImageTrail />
    </>
  );
}
