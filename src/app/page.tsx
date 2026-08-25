import type { Metadata } from "next";

import { HomepageExperience } from "@/components/home/HomepageExperience";
import { getMockAnimals } from "@/data/mock/animals";
import { getMockLostAnimals } from "@/data/mock/lost-animals";
import { createPageMetadata } from "@/lib/metadata";

import "@/styles/homepage.css";

export const metadata: Metadata = createPageMetadata(
  "Ana sayfa",
  "Beşiktaş Belediyesi hayvan sahiplendirme, kayıp hayvan ilanları ve güvenilir bilgi platformu.",
);

export default function HomePage() {
  const animals = getMockAnimals().slice(0, 2);
  const lostAnimals = getMockLostAnimals().slice(0, 2);

  return <HomepageExperience animals={animals} lostAnimals={lostAnimals} />;
}
