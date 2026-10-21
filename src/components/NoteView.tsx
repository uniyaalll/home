import { readFileSync } from "fs";
import path from "path";
import type { ReactNode } from "react";
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

const SECTION_HEADINGS = new Set([
  "Publish often",
  "Act immediately",
  "Be Transparent",
  "Have a clear schedule",
  "Charge more",
  "Do it for the art",
  "Aftermath",
  "What's next?",
  "Metrics, 1 week in:",
  "4 months later:",
  "9 months later:",
  "Design",
  "Layout",
  "Controls",
  "States",
  "Motion & navigation",
  "Copy",
  "Code & docs",
  "Workflow",
]);

function linkify(text: string): ReactNode[] {
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
  return parts.map((p, j) =>
    typeof p === "string" ? (
      <span key={j}>{p}</span>
    ) : (
      <a key={j} href={p.href} target="_blank" rel="noopener noreferrer">
        {p.label}
      </a>
    ),
  );
}

function contentLines(lines: string[], title: string) {
  return lines.filter((line, i) => {
    if (i === 0 && /^\d{4}-\d{2}-\d{2}$/.test(line)) return false;
    if (i === 1 && line.toLowerCase() === title.toLowerCase()) return false;
    if (i === 1 && line === "SYSTEM.md") return false;
    return true;
  });
}

export function NoteView({ page }: { page: SitePage }) {
  const file = path.join(process.cwd(), "src/content", `${page.slug}.txt`);
  const raw = readFileSync(file, "utf8");
  const lines = contentLines(raw.split("\n"), page.name);

  // 100 Simple Truths → numbered list like tr.af
  if (page.slug === "100") {
    const items = lines.filter((l) => l.trim());
    return (
      <article className="note-article shrink-0">
        <h1>{page.name}</h1>
        <div>
          <ol>
            {items.map((item, i) => (
              <li key={i}>{linkify(item)}</li>
            ))}
          </ol>
        </div>
      </article>
    );
  }

  const blocks: ReactNode[] = [];
  let para: string[] = [];

  const flushPara = () => {
    if (!para.length) return;
    const text = para.join(" ");
    para = [];
    if (SECTION_HEADINGS.has(text) || /^\d+\/ /.test(text)) {
      blocks.push(<h2 key={`h-${blocks.length}`}>{linkify(text)}</h2>);
    } else {
      blocks.push(<p key={`p-${blocks.length}`}>{linkify(text)}</p>);
    }
  };

  for (const line of lines) {
    if (!line.trim()) {
      flushPara();
      continue;
    }
    if (SECTION_HEADINGS.has(line) || /^\d+\/ /.test(line)) {
      flushPara();
      blocks.push(<h2 key={`h-${blocks.length}`}>{linkify(line)}</h2>);
      continue;
    }
    para.push(line);
  }
  flushPara();

  return (
    <article className="note-article shrink-0">
      <h1>{page.name}</h1>
      <div>{blocks}</div>
    </article>
  );
}
