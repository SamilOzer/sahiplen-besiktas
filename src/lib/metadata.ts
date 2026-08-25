import type { Metadata } from "next";

export function createPageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: "tr_TR",
      type: "website",
    },
  };
}
