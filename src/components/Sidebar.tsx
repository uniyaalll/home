"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ARTIFACTS,
  BRAND,
  BRAND_HANDLE,
  LINKS,
  NOTES,
  SECTION_LABELS,
  SOUNDS,
  WORKS,
  type SitePage,
} from "../data/site";
import { Icon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

function Folder({
  label,
  items,
  defaultOpen,
  external,
}: {
  label: string;
  items?: SitePage[];
  defaultOpen?: boolean;
  external?: typeof LINKS;
}) {
  const pathname = usePathname();
  const active = items?.some((i) => pathname === i.href) || false;
  const [open, setOpen] = useState(Boolean(defaultOpen || active));

  useEffect(() => {
    if (active) setOpen(true);
  }, [active]);

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="group/folder"
    >
      <summary className="folder-summary flex min-h-12 cursor-pointer select-none items-center gap-3 text-muted hover:text-fg focus-visible:text-fg focus-visible:outline-none [&::-webkit-details-marker]:hidden">
        <Icon name="chevron-right" className="folder-closed size-5 shrink-0" />
        <Icon name="chevron-down" className="folder-open size-5 shrink-0" />
        <Icon name="folder" className="folder-closed size-5 shrink-0" />
        <Icon name="folder-open" className="folder-open size-5 shrink-0" />
        <span className="flex items-center gap-3">
          <span className="translate-y-px">{label}</span>
        </span>
      </summary>
      <div>
        <ul className="tree-list ml-2.5 border-l border-transparent pb-4 pl-[calc(0.25rem*5.5-1px)]">
          {items?.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="sidebar-row flex min-h-12 min-w-0 cursor-pointer select-none items-center gap-3 rounded-[var(--row-radius)] py-3 pl-3 text-muted hover:text-fg focus-visible:text-fg focus-visible:outline-none aria-[current=page]:text-fg [&>svg]:shrink-0 [&>span]:translate-y-px"
              >
                <Icon name={item.icon || "file"} className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
          {external?.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                title={link.title}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-row flex min-h-12 min-w-0 cursor-pointer select-none items-center gap-3 rounded-[var(--row-radius)] py-3 pl-3 text-muted hover:text-fg focus-visible:text-fg focus-visible:outline-none [&>svg]:shrink-0 [&>span]:translate-y-px"
              >
                <Icon name={link.icon} className="h-5 w-5" />
                <span>{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [privacy, setPrivacy] = useState(true);
  const [online] = useState(2);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <aside
      className="finder-sidebar no-scrollbar flex min-h-0 shrink-0 flex-col overflow-hidden overscroll-contain border-b border-line py-2 pl-[var(--preview-pad)] motion-app md:border-b-0 md:pb-6 md:pl-6 md:pt-[1.125rem]"
      data-menu-open={menuOpen}
    >
      <nav className="no-scrollbar min-h-0 w-full flex-1 overflow-y-auto whitespace-nowrap" aria-label="Folder tree">
        <div>
          <div className="folder-heading relative flex min-h-12 shrink-0 select-none items-center gap-3 text-fg">
            <Icon name="logo" className="hidden size-5 shrink-0 md:block" />
            <button
              type="button"
              aria-label="Open file tree"
              aria-expanded={menuOpen}
              aria-controls="file-tree"
              onClick={() => setMenuOpen((v) => !v)}
              className="group flex min-h-12 flex-1 cursor-pointer items-center gap-3 self-stretch text-left focus-visible:opacity-70 focus-visible:outline-none md:hidden"
            >
              <span className="flex size-5 shrink-0 items-center justify-center bg-fg text-bg">
                <Icon name="menu" />
              </span>
              <span className="translate-y-px">{BRAND}</span>
            </button>
            <span className="hidden translate-y-px md:inline">{BRAND}</span>
            <a
              href="https://x.com/traf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 ml-auto flex min-h-12 items-center text-muted hover:text-fg md:hidden"
            >
              [{BRAND_HANDLE}]
            </a>
          </div>

          <div
            id="file-tree"
            className={`tree-branches no-scrollbar ${menuOpen ? "block" : "hidden"} md:block`}
          >
            <div className="tree-list ml-2.5 border-l border-transparent pb-4 pl-[calc(0.25rem*5.5-1px)]">
              <Folder
                label={SECTION_LABELS.works}
                items={WORKS}
                defaultOpen={pathname === "/" || WORKS.some((w) => w.href === pathname)}
              />
              <Folder
                label={SECTION_LABELS.artifacts}
                items={ARTIFACTS}
                defaultOpen={ARTIFACTS.some((a) => a.href === pathname)}
              />
              <Folder
                label={SECTION_LABELS.notes}
                items={NOTES}
                defaultOpen={NOTES.some((n) => n.href === pathname)}
              />
              <Folder
                label={SECTION_LABELS.sounds}
                items={SOUNDS}
                defaultOpen={SOUNDS.some((s) => s.href === pathname)}
              />
              <Folder label={SECTION_LABELS.links} external={LINKS} />
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`mt-auto shrink-0 items-center gap-2 border-t border-line px-3 pt-4 pb-2 md:flex md:border-t-0 md:pt-6 md:pb-0 ${menuOpen ? "flex" : "hidden"}`}
      >
        {!privacy && (
          <div className="mr-1 hidden items-center gap-2 text-muted md:flex">
            <span className="relative flex size-2.5">
              <span
                className="absolute inset-x-px inset-y-0"
                style={{ backgroundColor: "var(--color-online, #00ff66)" }}
              />
              <span
                className="absolute inset-x-0 inset-y-px"
                style={{ backgroundColor: "var(--color-online, #00ff66)" }}
              />
            </span>
            <span className="text-[length:calc(1em-1px)] tabular-nums">
              {online} online
            </span>
          </div>
        )}
        <button
          type="button"
          aria-label="Privacy mode"
          aria-pressed={privacy}
          aria-keyshortcuts="/"
          title={privacy ? "Turn privacy off (/)" : "Turn privacy on (/)"}
          onClick={() => setPrivacy((v) => !v)}
          className="hidden size-6 shrink-0 cursor-pointer select-none items-center justify-center border border-line bg-bg text-muted hover:text-fg aria-pressed:text-fg focus-visible:text-fg focus-visible:outline-none md:flex"
        >
          /
        </button>
        <ThemeToggle />
      </div>
    </aside>
  );
}
