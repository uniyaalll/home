/**
 * Personal homepage content.
 */

export const BIO = {
  name: "UNIYAALLL",
  intro: "Designer, creator & independent maker.",
  previewSrc: "/preview.jpg",
  previewAlt: "Interface preview",
} as const;

export type NavId = "work" | "projects" | "sound" | "supply" | "notes";

/** Desktop right-pane views. `home` = static preview; galleries scroll. */
export type DesktopView = "home" | "work" | "projects" | "sounds";

export const NAV_LINKS = [
  { label: "Work", id: "work", href: "/#work", icon: "folder", opens: "work" },
  {
    label: "Projects",
    id: "projects",
    href: "/#projects",
    icon: "labs",
    opens: "projects",
  },
  {
    label: "Sounds",
    id: "sound",
    href: "/#sounds",
    icon: "music",
    opens: "sounds",
  },
  /* These return to the static home preview on desktop. */
  { label: "Supply", id: "supply", href: "/", icon: "bag", opens: "home" },
  { label: "Notes", id: "notes", href: "/", icon: "file", opens: "home" },
] as const satisfies ReadonlyArray<{
  label: string;
  id: NavId;
  href: string;
  icon: "folder" | "labs" | "music" | "bag" | "file";
  opens: DesktopView;
}>;

/**
 * Placeholder Sounds tracks (YouTube streams — swap when real files land).
 * IDs match the existing /lofi /soul /ambient pages.
 */
export const SOUND_TRACKS = [
  {
    id: "lofi",
    title: "Lofi",
    artist: "Live stream",
    videoId: "rFZHOHl-L8A",
  },
  {
    id: "soul",
    title: "Soul",
    artist: "Live stream",
    videoId: "E2vONfzoyRI",
  },
  {
    id: "ambient",
    title: "Ambient",
    artist: "Live stream",
    videoId: "S_MOd40zlYU",
  },
] as const;

export type SoundTrack = (typeof SOUND_TRACKS)[number];
export type RepeatMode = "off" | "all" | "one";

/** Placeholder galleries — same preview image stacked with page-gap spacing. */
export const SECTION_GALLERIES = {
  work: [
    { alt: "Work — preview 1" },
    { alt: "Work — preview 2" },
    { alt: "Work — preview 3" },
    { alt: "Work — preview 4" },
  ],
  projects: [
    { alt: "Projects — preview 1" },
    { alt: "Projects — preview 2" },
    { alt: "Projects — preview 3" },
    { alt: "Projects — preview 4" },
  ],
} as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "/" },
  { label: "YouTube", href: "/" },
  { label: "X.COM", href: "/" },
] as const;
