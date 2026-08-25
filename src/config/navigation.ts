export interface NavigationItem {
  readonly href: string;
  readonly label: string;
}

export const primaryNavigation = [
  { href: "/", label: "Ana sayfa" },
  { href: "/sahiplendirme", label: "Sahiplendirme" },
  { href: "/kayip-hayvanlar", label: "Kayıp hayvanlar" },
  { href: "/akademi", label: "Akademi" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
] as const satisfies readonly NavigationItem[];

export const legalNavigation = [
  { href: "/gizlilik-politikasi", label: "Gizlilik politikası" },
] as const satisfies readonly NavigationItem[];
