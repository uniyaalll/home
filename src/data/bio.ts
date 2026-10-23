import { BRAND, BRAND_HANDLE, LINKS, WORKS } from "./site";

export type BioLink = {
  id: string;
  label: string;
  href: string;
  description?: string;
  icon?: string;
  external?: boolean;
};

export const BIO = {
  brand: BRAND,
  handle: BRAND_HANDLE,
  tagline: "Works, artifacts, notes & sounds.",
  presence: "online",
} as const;

/** Featured destinations for the link-in-bio surface. */
export const BIO_LINKS: BioLink[] = [
  {
    id: "portfolio",
    label: "Portfolio",
    href: "/odyssey",
    description: "Finder · works & artifacts",
    icon: "folder",
  },
  ...WORKS.slice(0, 4).map((work) => ({
    id: work.slug,
    label: work.name,
    href: work.external?.href ?? work.href,
    description: work.about?.split("·")[0]?.trim(),
    icon: work.icon,
    external: Boolean(work.external?.href),
  })),
  {
    id: "notes",
    label: "Notes",
    href: "/100",
    description: "Simple truths & writing",
    icon: "file",
  },
  {
    id: "sounds",
    label: "Sounds",
    href: "/lofi",
    description: "Lofi · soul · ambient radio",
    icon: "record",
  },
];

export const BIO_SOCIALS = LINKS;
