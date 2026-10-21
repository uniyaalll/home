"use client";

import Image from "next/image";
import type { MediaItem, SitePage } from "../data/site";
import { VideoPlayer } from "./VideoPlayer";

function MediaFrame({
  item,
  title,
  span = false,
  caption,
  priority = false,
}: {
  item: MediaItem;
  title: string;
  span?: boolean;
  caption?: { title: string; subtitle: string };
  priority?: boolean;
}) {
  const label = `${title}, ${item.src.split("/").pop()}`;

  if (item.type === "video") {
    return (
      <div className={span ? "md:col-span-2" : undefined}>
        <VideoPlayer src={item.src} poster={item.poster} label={label} />
        {caption && (
          <div className="-mt-px flex flex-col gap-2 border border-t-0 border-line bg-bg p-5 md:flex-row md:items-center md:justify-between md:gap-5">
            <p className="shrink-0 text-fg">{caption.title}</p>
            <p className="text-muted md:text-right">{caption.subtitle}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative isolate overflow-hidden rounded-[var(--window-radius)] border border-line ${span ? "md:col-span-2" : ""}`}
    >
      <div className="relative" style={{ aspectRatio: 16 / 9 }}>
        <Image
          src={item.src}
          alt={label}
          fill
          sizes="(min-width: 768px) calc(100vw - 24rem), calc(100vw - 3rem)"
          className="object-cover select-none"
          priority={priority}
          unoptimized
          draggable={false}
        />
      </div>
      {caption && (
        <div className="flex flex-col gap-2 border-t border-line bg-bg p-5 md:flex-row md:items-center md:justify-between md:gap-5">
          <p className="shrink-0 text-fg">{caption.title}</p>
          <p className="text-muted md:text-right">{caption.subtitle}</p>
        </div>
      )}
    </div>
  );
}

function Stats({ stats }: { stats: NonNullable<SitePage["stats"]> }) {
  const cols = stats.length >= 8 ? "md:grid-cols-4" : stats.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3";
  return (
    <section
      aria-label="Stats"
      className="relative rounded-[var(--window-radius)] border border-line bg-bg md:col-span-2"
    >
      <dl className={`grid h-full auto-rows-fr grid-cols-2 ${cols}`}>
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`relative flex min-w-0 flex-col gap-1.5 border-line p-6 md:p-8 ${
              i < stats.length - (stats.length % 2 === 0 ? 2 : 1) || stats.length <= 4
                ? "border-b"
                : ""
            } ${i % 2 === 0 ? "border-r" : ""} md:border-r`}
          >
            <dt className="text-muted">{stat.label}</dt>
            <dd className="tabular-nums">
              {stat.href ? (
                <a
                  href={stat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:text-muted"
                >
                  {stat.value}
                </a>
              ) : (
                stat.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function MediaGallery({ page }: { page: SitePage }) {
  const items = page.media || [];
  if (!items.length) return null;

  return (
    <div className="grid w-full shrink-0 grid-cols-1 items-start gap-[var(--preview-pad)] md:grid-cols-2">
      <h1 className="sr-only">{page.name}</h1>
      {items.map((item, i) => (
        <MediaFrame
          key={item.src}
          item={item}
          title={page.name}
          span={i === 0 || item.type === "video" || page.kind === "artifact"}
          caption={i === 0 ? page.caption : undefined}
          priority={i === 0}
        />
      ))}
      {page.stats && <Stats stats={page.stats} />}
      {page.slug === "aeons" && (
        <div className="relative isolate hidden overflow-hidden rounded-[var(--window-radius)] border border-line md:col-span-2 md:block">
          <div className="relative aspect-square md:aspect-[2/1]">
            <iframe
              src="https://aeons.xyz/token-params/0?stage=3&prism=binary&energy=azurite&velocity=2&mintHash=0x9"
              title="Aeons simulator preview"
              className="absolute inset-0 h-full w-full border-0"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_closest-side,transparent_60%,color-mix(in_srgb,var(--color-bg)_90%,transparent)_100%)]"
            />
          </div>
          <div className="flex flex-col gap-2 border-t border-line bg-bg p-5 md:flex-row md:items-center md:justify-between md:gap-5">
            <p className="shrink-0 text-fg">Live simulator</p>
            <p className="text-muted md:text-right">
              Alter the traits to preview new Aeons
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
