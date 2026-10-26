"use client";

import Link from "next/link";
import { BIO, NAV_LINKS, SOCIAL_LINKS } from "../data/bio";
import { asset } from "../lib/asset";
import { Icon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

export function HomePage() {
  return (
    <div className="home-shell relative min-h-dvh">
      <div className="home-atmosphere pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="home-grain pointer-events-none fixed inset-0 z-[5]"
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
        <nav className="home-nav" aria-label="Primary">
          {NAV_LINKS.map((item) => (
            <Link key={item.label} href={item.href} className="home-nav-row text-muted">
              <Icon name={item.icon} className="home-nav-icon" size={20} />
              <span className="translate-y-px">{item.label}</span>
            </Link>
          ))}
        </nav>
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
