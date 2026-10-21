import { readFileSync } from "fs";
import path from "path";
import type { SitePage } from "../data/site";

const LINK_MAP: Record<string, string> = {
  Gumroad: "https://gumroad.com/",
  Notion: "https://www.notion.so",
  Super: "https://super.so/",
  "9to5Mac": "https://9to5mac.com/2020/10/01/ios-14-icon-set/",
  Uncrate: "https://uncrate.com/monochrome-ios-icon-set/",
  "Cult of Mac":
    "https://www.cultofmac.com/723490/ios-14-iphone-home-screen-customization/",
  iMore:
    "https://www.imore.com/people-are-making-real-money-selling-icon-sets-ios-14-home-screens",
  "Creative Bloq":
    "https://www.creativebloq.com/news/ios-14-designer-100k",
  video: "https://youtu.be/cH66LWWluVE",
  Tweet: "https://x.com/traf/status/1307707156788060160",
  "this tweet": "https://x.com/traf/status/1308158718975111175",
  "DeviantArt profile": "https://deviantart.com/jtraf",
  "@traf": "https://x.com/traf",
  "Your Music and People": "https://sive.rs/m",
  "Derek Sivers": "https://sivers.org/",
  "VS™ Modules": "https://visual.systems/modules",
  "VS™ Icons": "https://visual.systems/modules/icon",
};

function linkify(text: string) {
  const keys = Object.keys(LINK_MAP).sort((a, b) => b.length - a.length);
  const parts: (string | { href: string; label: string })[] = [text];
  for (const key of keys) {
    const next: typeof parts = [];
    for (const part of parts) {
      if (typeof part !== "string") {
        next.push(part);
        continue;
      }
      const split = part.split(key);
      split.forEach((chunk, i) => {
        if (chunk) next.push(chunk);
        if (i < split.length - 1) next.push({ href: LINK_MAP[key], label: key });
      });
    }
    parts.length = 0;
    parts.push(...next);
  }
  return parts;
}

function renderLine(line: string, i: number, title: string) {
  if (!line.trim()) return <br key={i} />;

  // Skip date + title lines already shown in breadcrumb
  if (i === 0 && /^\d{4}-\d{2}-\d{2}$/.test(line)) return null;
  if (i === 1 && line.toLowerCase() === title.toLowerCase()) return null;
  if (i === 1 && line === "SYSTEM.md") return null;

  const linked = linkify(line);
  const isHeading =
    /^(Publish often|Act immediately|Be Transparent|Have a clear schedule|Charge more|Do it for the art|Aftermath|What's next\?|Metrics,|Design|Layout|Controls|States|Motion & navigation|Copy|Code & docs|Workflow|\d+\/ )/i.test(
      line,
    ) ||
    (line.length < 40 && !line.includes(".") && /^[A-Z]/.test(line));

  const content = linked.map((p, j) =>
    typeof p === "string" ? (
      <span key={j}>{p}</span>
    ) : (
      <a key={j} href={p.href} target="_blank" rel="noopener noreferrer">
        {p.label}
      </a>
    ),
  );

  if (isHeading && !/^\d+\./.test(line) && !line.startsWith("It's") && !line.startsWith("Sure")) {
    return (
      <h2 key={i} className="mt-8 mb-2 text-fg">
        {content}
      </h2>
    );
  }

  // Numbered truths list
  if (title.includes("100") && i >= 2) {
    return (
      <p key={i} className="mb-3 flex gap-3 text-fg">
        <span className="w-8 shrink-0 tabular-nums text-muted">{String(i - 1).padStart(2, "0")}</span>
        <span>{content}</span>
      </p>
    );
  }

  return (
    <p key={i} className="mb-4 text-fg">
      {content}
    </p>
  );
}

export function NoteView({ page }: { page: SitePage }) {
  const file = path.join(process.cwd(), "src/content", `${page.slug}.txt`);
  const raw = readFileSync(file, "utf8");
  const lines = raw.split("\n");

  return (
    <article className="note-body w-full max-w-3xl pb-16">
      <h1 className="mb-8 text-fg">{page.name}</h1>
      <div>{lines.map((line, i) => renderLine(line, i, page.name))}</div>
    </article>
  );
}
