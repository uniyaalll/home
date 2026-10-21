"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  BRAND,
  SECTION_LABELS,
  type SitePage,
} from "../data/site";
import { Icon } from "./Icons";

export function Breadcrumb({ page }: { page: SitePage }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const sectionHref =
    page.section === "works"
      ? "/works"
      : page.section === "notes"
        ? "/100"
        : page.section === "sounds"
          ? "/lofi"
          : page.section === "artifacts"
            ? "/aeons"
            : "/";

  return (
    <nav
      aria-label="Breadcrumb"
      className="pointer-events-none z-10 col-start-1 row-start-1 flex min-h-[var(--bar-height)] min-w-0 flex-wrap items-center gap-x-3 self-start px-[var(--preview-pad)] py-3 text-muted"
    >
      <Link
        href="/"
        className="pointer-events-auto hidden min-h-11 min-w-0 items-center hover:text-fg active:text-fg md:flex"
      >
        {BRAND}
      </Link>
      <span aria-hidden className="hidden md:inline">
        /
      </span>
      <Link
        href={sectionHref}
        className="pointer-events-auto flex min-h-11 min-w-0 items-center hover:text-fg active:text-fg"
      >
        {SECTION_LABELS[page.section]}
      </Link>
      <span aria-hidden>/</span>
      <div className="relative flex min-w-0 items-center">
        <Link
          href={page.href}
          aria-current="page"
          className="pointer-events-auto flex min-h-11 min-w-0 items-center text-fg hover:text-fg"
        >
          {page.kind === "note" ? page.filename || page.name : page.name}
        </Link>
        {page.about && (
          <>
            <button
              ref={btnRef}
              type="button"
              className="pointer-events-auto flex size-11 shrink-0 cursor-pointer items-center justify-center text-muted hover:text-fg aria-expanded:text-fg"
              aria-label={`About ${page.name}`}
              aria-expanded={open}
              aria-controls={panelId}
              aria-haspopup="dialog"
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name="info" className="-translate-x-0.5 size-[1.125rem]" />
            </button>
            {open && (
              <div
                ref={panelRef}
                id={panelId}
                role="dialog"
                aria-label={`About ${page.name}`}
                className="pointer-events-auto absolute left-0 top-full z-50 m-0 mt-1 w-max max-w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] overflow-auto border border-line bg-bg p-4 text-muted shadow-2xl"
              >
                <p className="flex items-start gap-2">
                  <Icon name="plus" className="size-5 shrink-0 translate-y-px" />
                  <span className="max-w-sm normal-case tracking-normal">
                    {page.about}
                    {page.aboutLinks?.map((l, i) => (
                      <span key={l.href}>
                        {i === 0 ? " " : " · "}
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pointer-events-auto text-fg"
                        >
                          [{l.label}]
                        </a>
                      </span>
                    ))}
                  </span>
                </p>
              </div>
            )}
          </>
        )}
      </div>
      {page.external && (
        <a
          href={page.external.href}
          title={page.external.label}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto ml-auto flex min-h-11 min-w-0 items-center justify-end break-all hover:text-fg"
        >
          [{page.external.label}]
        </a>
      )}
      {page.kind === "note" && page.date && (
        <time className="pointer-events-none ml-auto hidden min-h-11 items-center md:flex">
          {page.date}
        </time>
      )}
    </nav>
  );
}
