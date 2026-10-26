"use client";

import Link from "next/link";
import { BIO, NAV_LINKS, SOCIAL_LINKS } from "../data/bio";
import { ThemeToggle } from "./ThemeToggle";

export function HomePage() {
  return (
    <div className="home-shell relative flex min-h-dvh flex-col">
      <div className="home-atmosphere pointer-events-none absolute inset-0" aria-hidden />

      <div className="home-frame relative z-10 mx-auto flex w-full max-w-[28rem] flex-1 flex-col px-6 py-10 sm:px-8 sm:py-14">
        <header className="home-toolbar mb-10 flex items-start justify-end sm:mb-12">
          <ThemeToggle size="md" />
        </header>

        <main className="home-main flex flex-1 flex-col">
          <section className="home-profile" aria-label="Profile">
            {/* Replace this placeholder with: <img src="/profile.jpg" alt="Ashutosh" className="home-avatar-img" /> */}
            <div
              className="home-avatar"
              role="img"
              aria-label="Profile photo placeholder"
            />

            <h1 className="home-name mt-6 text-fg">{BIO.name}</h1>
            <p className="home-intro mt-3 max-w-[22rem] text-muted">{BIO.intro}</p>
          </section>

          <nav className="home-nav mt-12 flex flex-col gap-3" aria-label="Primary">
            {NAV_LINKS.map((item) => (
              <Link key={item.label} href={item.href} className="home-nav-link text-muted">
                {item.label}
              </Link>
            ))}
          </nav>

          <nav
            className="home-socials mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-16"
            aria-label="Social"
          >
            {SOCIAL_LINKS.map((item) => (
              <Link key={item.label} href={item.href} className="home-social-link text-muted">
                {item.label}
              </Link>
            ))}
          </nav>
        </main>
      </div>
    </div>
  );
}
