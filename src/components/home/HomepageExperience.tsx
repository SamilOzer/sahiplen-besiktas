import { HomepageMotion } from "@/components/home/HomepageMotion.client";
import { AcademySection } from "@/components/home/sections/AcademySection";
import { AdoptionSection } from "@/components/home/sections/AdoptionSection";
import { AnimalDiscoverySection } from "@/components/home/sections/AnimalDiscoverySection";
import { ConnectionSection } from "@/components/home/sections/ConnectionSection";
import { FinalCtaSection } from "@/components/home/sections/FinalCtaSection";
import { HeroSection } from "@/components/home/sections/HeroSection";
import { LostAnimalsSection } from "@/components/home/sections/LostAnimalsSection";
import { MunicipalImpactSection } from "@/components/home/sections/MunicipalImpactSection";
import {
  homepageKnowledgeItems,
  municipalContentSlots,
} from "@/data/homepage";
import type { AnimalRecord } from "@/types/animal";
import type { LostAnimalRecord } from "@/types/lost-animal";

interface HomepageExperienceProps {
  readonly animals: readonly AnimalRecord[];
  readonly lostAnimals: readonly LostAnimalRecord[];
}

export function HomepageExperience({
  animals,
  lostAnimals,
}: HomepageExperienceProps) {
  return (
    <HomepageMotion>
      <HeroSection />
      <ConnectionSection />
      <AdoptionSection />
      <AnimalDiscoverySection animals={animals} />
      <LostAnimalsSection animals={lostAnimals} />
      <MunicipalImpactSection items={municipalContentSlots} />
      <AcademySection items={homepageKnowledgeItems} />
      <FinalCtaSection />
    </HomepageMotion>
  );
}
