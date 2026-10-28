/**
 * Personal homepage content.
 */

export const BIO = {
  name: "UNIYAALLL",
  intro: "Designer, creator & independent maker.",
  previewSrc: "/preview.jpg",
  previewAlt: "Interface preview",
} as const;

export const NAV_LINKS = [
  { label: "Work", id: "work", href: "/#work", icon: "folder" },
  { label: "Projects", id: "projects", href: "/#projects", icon: "labs" },
  { label: "Sound", id: "sound", href: "/#sound", icon: "music" },
  { label: "Supply", id: "supply", href: "/#supply", icon: "bag" },
  { label: "Notes", id: "notes", href: "/#notes", icon: "file" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "/" },
  { label: "YouTube", href: "/" },
  { label: "X.COM", href: "/" },
] as const;
