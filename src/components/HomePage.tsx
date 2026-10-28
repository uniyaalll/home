"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { BIO, NAV_LINKS, SOCIAL_LINKS } from "../data/bio";
import { asset } from "../lib/asset";
import { HomeNavTree } from "./HomeNavTree";
import { Icon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

/** Desktop / iPad landscape — right panel scrolls; chrome + nav stay fixed. */
const DESKTOP_MQ =
  "(min-width: 768px) and (orientation: landscape), (min-width: 1100px)";

function NortheastArrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      className="home-nav-arrow"
      aria-hidden
    >
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H6M11.5 4.5V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function PreviewFrame({ alt }: { alt: string }) {
  return (
    <div className="home-preview-frame">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(BIO.previewSrc)}
        alt={alt}
        className="home-preview-img"
        width={1200}
        height={1500}
      />
      <div
        className="home-preview-grain"
        style={{
          backgroundImage: `url(${asset("/noise.png")}), url(${asset("/noise-2.png")})`,
        }}
        aria-hidden
      />
    </div>
  );
}

function isDesktopLayout() {
  return typeof window !== "undefined" && window.matchMedia(DESKTOP_MQ).matches;
}

export function HomePage() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollToPanel = useCallback((id: string, smooth = true) => {
    const scroller = scrollerRef.current;
    const panel = scroller?.querySelector<HTMLElement>(`#panel-${id}`);
    if (!scroller || !panel) return;
    scroller.scrollTo({
      top: panel.offsetTop,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  // Deep-link / refresh: jump to hash panel on desktop.
  useEffect(() => {
    if (!isDesktopLayout()) return;
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    // Wait a frame so layout (and scroller height) is ready.
    const t = window.requestAnimationFrame(() => scrollToPanel(id, false));
    return () => window.cancelAnimationFrame(t);
  }, [scrollToPanel]);

  const onNavClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (!isDesktopLayout()) return;
    event.preventDefault();
    scrollToPanel(id, true);
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="home-shell">
      <div className="home-atmosphere pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="home-grain pointer-events-none absolute inset-0 z-[5]"
        style={{ backgroundImage: `url(${asset("/noise.png")})` }}
        aria-hidden
      />

      <header className="home-header home-chrome-top">
        <div className="home-chrome-inner">
          <div className="home-identity min-w-0">
            <h1 className="home-name text-fg">{BIO.name}</h1>
            <p className="home-intro mt-1 max-w-[22rem] text-muted">{BIO.intro}</p>
          </div>
          <ThemeToggle size="md" />
        </div>
      </header>

      <main className="home-main">
        <div className="home-stage">
          {/* One pixel-grid tree for spine + elbows + separators (phone & desktop). */}
          <HomeNavTree />

          {/* Smartphone / portrait: single preview — unchanged. */}
          <div className="home-preview home-preview--mobile">
            <PreviewFrame alt={BIO.previewAlt} />
          </div>

          {/* Desktop / landscape: right-side scroll panel (no visible scrollbar). */}
          <div
            ref={scrollerRef}
            className="home-scroller no-scrollbar"
            aria-label="Sections"
          >
            {NAV_LINKS.map((item) => (
              <section
                key={item.id}
                id={`panel-${item.id}`}
                className="home-panel"
                aria-label={item.label}
              >
                <PreviewFrame alt={`${item.label} — ${BIO.previewAlt}`} />
              </section>
            ))}
          </div>

          <nav className="home-nav" aria-label="Primary">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="home-nav-row text-muted"
                onClick={(event) => onNavClick(event, item.id)}
              >
                <Icon name={item.icon} className="home-nav-icon" size={20} />
                <span className="translate-y-px">{item.label}</span>
                <NortheastArrow />
              </Link>
            ))}
          </nav>
        </div>
      </main>

      <footer className="home-footer home-chrome-bottom">
        <nav className="home-chrome-inner home-socials" aria-label="Social">
          {SOCIAL_LINKS.map((item) => (
            <Link key={item.label} href={item.href} className="home-social-link text-muted">
              {item.label}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}
