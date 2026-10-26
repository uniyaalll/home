"use client";

import Link from "next/link";
import { BIO, NAV_LINKS, SOCIAL_LINKS } from "../data/bio";
import { asset } from "../lib/asset";
import { Icon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

export function HomePage() {
  return (
    <div className="home-shell relative flex min-h-dvh flex-col">
      <div className="home-atmosphere pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="home-grain pointer-events-none fixed inset-0 z-[5]"
        style={{ backgroundImage: `url(${asset("/noise.png")})` }}
        aria-hidden
      />

      <div className="home-frame relative z-10 mx-auto flex w-full max-w-[32rem] flex-1 flex-col px-5 py-8 sm:px-8 sm:py-12">
        <section className="home-hero mb-8 sm:mb-10" aria-label="Featured">
          <div className="home-hero-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(BIO.heroSrc)}
              alt=""
              className="home-hero-img"
              width={1400}
              height={780}
            />
            <div
              className="home-hero-grain"
              style={{
                backgroundImage: `url(${asset("/noise.png")}), url(${asset("/noise-2.png")})`,
              }}
              aria-hidden
            />
          </div>
        </section>

        <header className="home-header mb-10 flex items-start justify-between gap-4 sm:mb-12">
          <div className="home-profile flex min-w-0 flex-1 items-start gap-4">
            <div className="home-avatar-wrap shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(BIO.profileSrc)}
                alt={BIO.name}
                className="home-avatar-img"
                width={88}
                height={88}
              />
              <div
                className="home-avatar-grain"
                style={{
                  backgroundImage: `url(${asset("/noise.png")}), url(${asset("/noise-2.png")})`,
                }}
                aria-hidden
              />
            </div>

            <div className="home-identity min-w-0 pt-0.5">
              <h1 className="home-name text-fg">{BIO.name}</h1>
              <p className="home-intro mt-1 max-w-[18rem] text-muted">{BIO.intro}</p>
            </div>
          </div>

          <ThemeToggle size="md" />
        </header>

        <main className="home-main flex flex-1 flex-col">
          <nav className="home-nav" aria-label="Primary">
            {NAV_LINKS.map((item) => (
              <Link key={item.label} href={item.href} className="home-nav-row text-muted">
                <Icon name={item.icon} className="home-nav-icon" size={20} />
                <span className="translate-y-px">{item.label}</span>
              </Link>
            ))}
          </nav>

          <nav
            className="home-socials mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-14"
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
