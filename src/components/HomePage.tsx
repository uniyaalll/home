"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  BIO,
  NAV_LINKS,
  SECTION_GALLERIES,
  SOCIAL_LINKS,
  type DesktopView,
} from "../data/bio";
import { asset } from "../lib/asset";
import { HomeNavTree } from "./HomeNavTree";
import { Icon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

/** Desktop / iPad landscape — right pane swaps; chrome + nav stay fixed. */
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

function viewFromHash(): DesktopView {
  const id = window.location.hash.replace(/^#/, "");
  if (id === "work" || id === "projects") return id;
  return "home";
}

export function HomePage() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<DesktopView>("home");

  const openView = useCallback((next: DesktopView, syncHash = true) => {
    setView(next);
    if (syncHash && typeof window !== "undefined") {
      const url = next === "home" ? "/" : `/#${next}`;
      window.history.replaceState(null, "", url);
    }
  }, []);

  // Deep-link on load (desktop only).
  useEffect(() => {
    if (!isDesktopLayout()) return;
    openView(viewFromHash(), false);
  }, [openView]);

  // Reset gallery scroll when switching into a section.
  useEffect(() => {
    if (view === "home") return;
    const el = scrollerRef.current;
    if (el) el.scrollTop = 0;
  }, [view]);

  const onNavClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    opens: DesktopView,
  ) => {
    if (!isDesktopLayout()) return;
    event.preventDefault();
    openView(opens, true);
  };

  const onHomeClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!isDesktopLayout()) return;
    event.preventDefault();
    openView("home", true);
  };

  const gallery =
    view === "work" || view === "projects" ? SECTION_GALLERIES[view] : null;

  return (
    <div className="home-shell" data-view={view}>
      <div className="home-atmosphere pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="home-grain pointer-events-none absolute inset-0 z-[5]"
        style={{ backgroundImage: `url(${asset("/noise.png")})` }}
        aria-hidden
      />

      <header className="home-header home-chrome-top">
        <div className="home-chrome-inner">
          <div className="home-identity min-w-0">
            <Link href="/" className="home-name text-fg" onClick={onHomeClick}>
              {BIO.name}
            </Link>
            <p className="home-intro mt-1 max-w-[22rem] text-muted">{BIO.intro}</p>
          </div>
          <ThemeToggle size="md" />
        </div>
      </header>

      <main className="home-main">
        <div className="home-stage">
          <HomeNavTree />

          {/* Smartphone / portrait: single static preview — unchanged. */}
          <div className="home-preview home-preview--mobile">
            <PreviewFrame alt={BIO.previewAlt} />
          </div>

          {/*
            Desktop right column:
            - home → static single preview (no scroll)
            - work / projects → scrollable gallery with --home-gap between frames
          */}
          <div className="home-desktop-pane">
            {view === "home" ? (
              <div className="home-preview home-preview--desktop">
                <PreviewFrame alt={BIO.previewAlt} />
              </div>
            ) : (
              <div
                ref={scrollerRef}
                className="home-scroller no-scrollbar"
                aria-label={view === "work" ? "Work" : "Projects"}
              >
                {gallery?.map((item, index) => (
                  <div key={`${view}-${index}`} className="home-gallery-item">
                    <PreviewFrame alt={item.alt} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <nav className="home-nav" aria-label="Primary">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={
                  item.opens !== "home" && view === item.opens
                    ? "home-nav-row text-fg"
                    : "home-nav-row text-muted"
                }
                aria-current={
                  item.opens !== "home" && view === item.opens
                    ? "page"
                    : undefined
                }
                onClick={(event) => onNavClick(event, item.opens)}
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
