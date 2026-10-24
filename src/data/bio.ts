import { BRAND, BRAND_HANDLE, LINKS } from "./site";

/**
 * Edit this file to change the link-in-bio page.
 * GitHub: https://github.com/uniyaalll/home/edit/main/src/data/bio.ts
 */

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
  {
    id: "odyssey",
    label: "Odyssey",
    href: "https://odyssey-hq.vercel.app/",
    description: "Unofficial Cosmos mac app",
    icon: "odyssey",
    external: true,
  },
  {
    id: "deximal",
    label: "Deximal",
    href: "https://deximal.com",
    description: "Personal wallet · iOS beta",
    icon: "deximal",
    external: true,
  },
  {
    id: "life",
    label: "Life",
    href: "https://lifeapp.so",
    description: "Capture & collect memories",
    icon: "life",
    external: true,
  },
  {
    id: "siphon",
    label: "Siphon",
    href: "https://siphon.sh",
    description: "Intent-based trading",
    icon: "siphon",
    external: true,
  },
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
