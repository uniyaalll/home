"use client";

import Link from "next/link";
import { BIO, BIO_LINKS, BIO_SOCIALS } from "../data/bio";
import { Icon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

function NortheastMark() {
  return (
    <span className="ml-auto shrink-0 text-muted group-hover:text-fg" aria-hidden>
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" className="block">
        <path
          d="M4.5 11.5L11.5 4.5M11.5 4.5H6M11.5 4.5V10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    </span>
  );
}

export function LinkBio() {
  return (
    <div className="bio-shell relative flex min-h-dvh flex-col items-center px-5 py-10 sm:px-8 sm:py-14">
      <div className="bio-atmosphere pointer-events-none absolute inset-0" aria-hidden />

      <main className="bio-main relative z-10 flex w-full max-w-md flex-1 flex-col">
        <header className="bio-header mb-10 flex flex-col items-center text-center sm:mb-12">
          <div className="bio-mark mb-5 flex size-14 items-center justify-center border border-line bg-bg text-fg sm:size-16">
            <Icon name="logo" className="h-7 w-7 sm:h-8 sm:w-8" size={32} />
          </div>

          <h1 className="bio-brand text-fg">{BIO.brand}</h1>

          <p className="bio-handle bio-handle-glow mt-2" title="Online">
            {BIO.handle}
          </p>

          <p className="bio-tagline mt-4 max-w-[22rem] text-muted">{BIO.tagline}</p>
        </header>

        <nav className="bio-links flex flex-col gap-3" aria-label="Links">
          {BIO_LINKS.map((item, index) => {
            const className =
              "bio-link group flex min-h-14 items-center gap-3 border border-line bg-bg/80 px-4 py-3 text-muted backdrop-blur-[2px] hover:border-fg hover:text-fg focus-visible:border-fg focus-visible:text-fg";
            const style = { animationDelay: `${80 + index * 45}ms` } as const;
            const body = (
              <>
                {item.icon ? (
                  <Icon name={item.icon} className="h-5 w-5 shrink-0" size={20} />
                ) : null}
                <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                  <span className="translate-y-px text-fg">{item.label}</span>
                  {item.description ? (
                    <span className="truncate text-[0.75rem] leading-tight text-muted group-hover:text-fg/70">
                      {item.description}
                    </span>
                  ) : null}
                </span>
                <NortheastMark />
              </>
            );

            if (item.external) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={className}
                  style={style}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {body}
                </a>
              );
            }

            return (
              <Link key={item.id} href={item.href} className={className} style={style}>
                {body}
              </Link>
            );
          })}
        </nav>

        <div className="bio-socials mt-8 flex items-center justify-center gap-3">
          {BIO_SOCIALS.map((social, index) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={social.title}
              aria-label={social.name}
              className="bio-social flex size-11 items-center justify-center border border-line text-muted hover:border-fg hover:text-fg focus-visible:border-fg focus-visible:text-fg"
              style={{ animationDelay: `${420 + index * 60}ms` }}
            >
              <Icon name={social.icon} className="h-5 w-5" size={20} />
            </a>
          ))}
        </div>
      </main>

      <footer className="bio-footer relative z-10 mt-10 flex w-full max-w-md items-center justify-between border-t border-line pt-5">
        <span className="text-muted">{BIO.brand}</span>
        <ThemeToggle size="md" />
      </footer>
    </div>
  );
}
