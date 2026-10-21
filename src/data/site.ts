import media from "./media.json";

export const BRAND = "UNIYAALLL";
export const BRAND_HANDLE = "@uniyaalll";

export type MediaItem = {
  src: string;
  poster: string | null;
  type: "image" | "video";
};

export type PageKind = "work" | "artifact" | "note" | "sound" | "folder";

export type SitePage = {
  slug: string;
  name: string;
  section: "works" | "artifacts" | "notes" | "sounds" | "links";
  kind: PageKind;
  href: string;
  icon?: string;
  about?: string;
  aboutLinks?: { label: string; href: string }[];
  external?: { label: string; href: string };
  caption?: { title: string; subtitle: string };
  date?: string;
  filename?: string;
  media?: MediaItem[];
  videoId?: string;
  color?: string;
  stats?: { label: string; value: string; href?: string }[];
};

export const WORKS: SitePage[] = [
  {
    slug: "odyssey",
    name: "Odyssey",
    section: "works",
    kind: "work",
    href: "/odyssey",
    icon: "odyssey",
    about: "Unofficial mac app for",
    aboutLinks: [{ label: "Cosmos", href: "https://cosmos.so" }],
    external: { label: "View app", href: "https://odyssey-hq.vercel.app/" },
    media: media.odyssey as MediaItem[],
  },
  {
    slug: "deximal",
    name: "Deximal",
    section: "works",
    kind: "work",
    href: "/deximal",
    icon: "deximal",
    about: "Personal wallet app · Unreleased private beta · Native iOS app",
    external: { label: "deximal.com", href: "https://deximal.com" },
    media: media.deximal as MediaItem[],
  },
  {
    slug: "life",
    name: "Life",
    section: "works",
    kind: "work",
    href: "/life",
    icon: "life",
    about: "Capture & collect memories · Native iOS app, private beta",
    external: { label: "lifeapp.so", href: "https://lifeapp.so" },
    media: media.life as MediaItem[],
  },
  {
    slug: "siphon",
    name: "Siphon",
    section: "works",
    kind: "work",
    href: "/siphon",
    icon: "siphon",
    about: "Intent-based trading interface · Trade tokens, stocks & commodities · Built on top of Hyperliquid",
    external: { label: "siphon.sh", href: "https://siphon.sh" },
    media: media.siphon as MediaItem[],
    stats: [
      { label: "Volume", value: "$1,704,032+ USD" },
      { label: "Executions", value: "637+" },
      { label: "Traders", value: "10+" },
    ],
  },
  {
    slug: "streamius",
    name: "Streamius",
    section: "works",
    kind: "work",
    href: "/streamius",
    icon: "streamius",
    about: "Your media collection in one place · Save movies, series, books & games",
    external: { label: "streamius.com", href: "https://streamius.com" },
    media: media.streamius as MediaItem[],
  },
  {
    slug: "labs",
    name: "Labs",
    section: "works",
    kind: "work",
    href: "/labs",
    icon: "labs",
    about: "Various works & experiments",
    external: { label: "@traf", href: "https://x.com/traf" },
    media: media.labs as MediaItem[],
  },
];

export const ARTIFACTS: SitePage[] = [
  {
    slug: "aeons",
    name: "Aeons",
    section: "artifacts",
    kind: "artifact",
    href: "/aeons",
    icon: "aeons",
    about: "Ephemeral NFT collection on Base",
    aboutLinks: [
      { label: "Tom", href: "https://x.com/tom_hirst" },
      { label: "aeons.xyz", href: "https://aeons.xyz" },
    ],
    external: { label: "aeons.xyz", href: "https://aeons.xyz" },
    caption: { title: "Aeons", subtitle: "Cosmos artifacts with lifespans" },
    media: media.aeons as MediaItem[],
    stats: [
      { label: "Minted", value: "16,584" },
      { label: "Burned", value: "—" },
      { label: "Alive", value: "—" },
      { label: "Collectors", value: "—" },
      { label: "Price", value: "—" },
      { label: "Sales", value: "—" },
      { label: "Volume", value: "— USD" },
      {
        label: "Market",
        value: "[View on OpenSea]",
        href: "https://opensea.io/collection/aeons",
      },
    ],
  },
  {
    slug: "anti",
    name: "Anti",
    section: "artifacts",
    kind: "artifact",
    href: "/anti",
    icon: "anti",
    about: "Future artifact systems · 888 cybernetic agents",
    external: {
      label: "View on OpenSea",
      href: "https://opensea.io/collection/antigens",
    },
    caption: { title: "Anti", subtitle: "Future artifact systems" },
    media: media.anti as MediaItem[],
    stats: [
      { label: "Collections", value: "02" },
      { label: "Supply", value: "—" },
      { label: "Collectors", value: "—" },
      { label: "Sales", value: "—" },
      { label: "Volume", value: "— USD" },
      {
        label: "Market",
        value: "[View on OpenSea]",
        href: "https://opensea.io/collection/antigens",
      },
    ],
  },
  {
    slug: "based",
    name: "Based",
    section: "artifacts",
    kind: "artifact",
    href: "/based",
    icon: "based",
    about: "Collections of art on Base (Ethereum L2)",
    aboutLinks: [
      { label: "Tom", href: "https://x.com/tom_hirst" },
      { label: "displaydriver", href: "https://x.com/displaydriver" },
    ],
    external: {
      label: "opensea.io/based",
      href: "https://opensea.io/based/created",
    },
    caption: {
      title: "Based",
      subtitle: "Collections of art on Base (Ethereum L2)",
    },
    media: media.based as MediaItem[],
    stats: [
      { label: "Collections", value: "04" },
      { label: "Supply", value: "—" },
      { label: "Collectors", value: "—" },
      { label: "Sales", value: "—" },
      { label: "Volume", value: "— USD" },
      {
        label: "Market",
        value: "[opensea.io/based]",
        href: "https://opensea.io/based/created",
      },
    ],
  },
  {
    slug: "checks",
    name: "Checks",
    section: "artifacts",
    kind: "artifact",
    href: "/checks",
    icon: "checks",
    about: "Public Art on Ethereum",
    aboutLinks: [
      { label: "Jack", href: "https://x.com/jackbutcher" },
      { label: "Jalil", href: "https://x.com/jalilwahdat" },
      { label: "jack.art", href: "https://jack.art/checks-originals" },
    ],
    external: { label: "checks.art", href: "https://checks.art" },
    caption: { title: "Checks", subtitle: "Public Art on Ethereum" },
    media: media.checks as MediaItem[],
    stats: [
      { label: "Supply", value: "—" },
      { label: "Collectors", value: "—" },
      { label: "Price", value: "—" },
      { label: "Sales", value: "—" },
      { label: "Volume", value: "— USD" },
      {
        label: "Market",
        value: "[View on OpenSea]",
        href: "https://opensea.io/collection/vv-checks-originals",
      },
    ],
  },
  {
    slug: "editions",
    name: "Editions",
    section: "artifacts",
    kind: "artifact",
    href: "/editions",
    icon: "editions",
    about: "Unrevealed · The placeholder is the artwork · Antipass · Antiware access card",
    external: { label: "@traf", href: "https://x.com/traf" },
    caption: {
      title: "Unrevealed",
      subtitle: "The placeholder is the artwork",
    },
    media: media.editions as MediaItem[],
    stats: [
      { label: "Supply", value: "12,208" },
      { label: "Collectors", value: "2,518" },
      { label: "Volume", value: "— USD" },
      {
        label: "Market",
        value: "[View on OpenSea]",
        href: "https://opensea.io/collection/artifacts",
      },
    ],
  },
];

export const NOTES: SitePage[] = [
  {
    slug: "100",
    name: "100 Simple Truths",
    section: "notes",
    kind: "note",
    href: "/100",
    icon: "file",
    date: "2021-07-26",
    filename: "100.md",
  },
  {
    slug: "6",
    name: "Six figures in 6 days",
    section: "notes",
    kind: "note",
    href: "/6",
    icon: "file",
    date: "2020-09-30",
    filename: "6.md",
  },
  {
    slug: "music",
    name: "Your Music & People",
    section: "notes",
    kind: "note",
    href: "/music",
    icon: "file",
    date: "2020-01-15",
    filename: "music.md",
  },
  {
    slug: "system",
    name: "SYSTEM.md",
    section: "notes",
    kind: "note",
    href: "/system",
    icon: "file",
    date: "2026-10-08",
    filename: "system.md",
  },
];

export const SOUNDS: SitePage[] = [
  {
    slug: "lofi",
    name: "Lofi",
    section: "sounds",
    kind: "sound",
    href: "/lofi",
    icon: "record",
    videoId: "rFZHOHl-L8A",
    color: "colorful",
  },
  {
    slug: "soul",
    name: "Soul",
    section: "sounds",
    kind: "sound",
    href: "/soul",
    icon: "record",
    videoId: "E2vONfzoyRI",
    color: "sunset",
  },
  {
    slug: "ambient",
    name: "Ambient",
    section: "sounds",
    kind: "sound",
    href: "/ambient",
    icon: "record",
    videoId: "S_MOd40zlYU",
    color: "ocean",
  },
];

export const LINKS = [
  {
    name: "x.com",
    href: "https://x.com/traf",
    title: "@traf",
    icon: "x",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/traf",
    title: "@traf",
    icon: "instagram",
  },
  {
    name: "GitHub",
    href: "https://github.com/traf",
    title: "@traf",
    icon: "github",
  },
];

export const ALL_PAGES: SitePage[] = [
  ...WORKS,
  ...ARTIFACTS,
  ...NOTES,
  ...SOUNDS,
];

export const PAGE_MAP = Object.fromEntries(
  ALL_PAGES.map((p) => [p.slug, p]),
) as Record<string, SitePage>;

export const SECTION_LABELS = {
  works: "Works",
  artifacts: "Artifacts",
  notes: "Notes",
  sounds: "Sounds",
  links: "links",
} as const;

export function getPage(slug: string): SitePage | undefined {
  return PAGE_MAP[slug];
}
