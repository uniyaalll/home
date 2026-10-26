/**
 * Personal homepage content.
 */

export const BIO = {
  name: "Ashutosh",
  intro: "Designer, creator & independent maker.",
  profileSrc: "/profile.jpg",
  heroSrc: "/hero-stipple.jpg",
} as const;

export const NAV_LINKS = [
  { label: "Work", href: "/", icon: "folder" },
  { label: "Projects", href: "/", icon: "labs" },
  { label: "Sound", href: "/", icon: "record" },
  { label: "Supply", href: "/", icon: "siphon" },
  { label: "Notes", href: "/", icon: "file" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "/" },
  { label: "YouTube", href: "/" },
  { label: "X", href: "/" },
] as const;
