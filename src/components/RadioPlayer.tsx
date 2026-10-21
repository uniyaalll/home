"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SitePage } from "../data/site";
import { Icon } from "./Icons";

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        opts: Record<string, unknown>,
      ) => {
        playVideo: () => void;
        pauseVideo: () => void;
        getPlayerState: () => number;
        destroy: () => void;
      };
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYT(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (!document.getElementById("yt-api")) {
      const s = document.createElement("script");
      s.id = "yt-api";
      s.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(s);
    }
  });
}

export function RadioPlayer({ page }: { page: SitePage }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<{
    playVideo: () => void;
    pauseVideo: () => void;
    getPlayerState: () => number;
    destroy: () => void;
  } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const bloom =
    page.color === "sunset"
      ? "radio-bloom-sunset"
      : page.color === "ocean"
        ? "radio-bloom-ocean"
        : "radio-bloom-colorful";

  useEffect(() => {
    let cancelled = false;
    const mount = async () => {
      if (!page.videoId || !hostRef.current) return;
      await loadYT();
      if (cancelled || !hostRef.current || !window.YT) return;
      const el = document.createElement("div");
      hostRef.current.innerHTML = "";
      hostRef.current.appendChild(el);
      playerRef.current = new window.YT.Player(el, {
        videoId: page.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: page.videoId,
        },
        events: {
          onReady: () => {
            if (!cancelled) setReady(true);
          },
          onStateChange: (e: { data: number }) => {
            if (!window.YT) return;
            setPlaying(e.data === window.YT.PlayerState.PLAYING);
          },
        },
      });
    };
    void mount();
    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
      setReady(false);
      setPlaying(false);
    };
  }, [page.videoId]);

  const toggle = useCallback(() => {
    const p = playerRef.current;
    if (!p || !ready) return;
    if (playing) p.pauseVideo();
    else p.playVideo();
  }, [playing, ready]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return (
    <section
      aria-label="Radio"
      className="relative flex min-h-64 flex-1 items-center justify-center overflow-hidden"
    >
      <div
        className={`pointer-events-none absolute inset-0 opacity-80 ${bloom}`}
      />
      <div className="relative flex aspect-square w-full max-w-md flex-col items-center justify-center rounded-[var(--window-radius)] border border-line p-10 md:max-w-lg">
        <div
          className={`relative mb-8 flex size-48 items-center justify-center rounded-full border border-[var(--color-record-line)] md:size-56 ${playing ? "record-spin" : ""}`}
        >
          <div className="absolute inset-6 rounded-full border border-[var(--color-record-line)]" />
          <div className="absolute inset-12 rounded-full border border-[var(--color-record-line)]" />
          <button
            type="button"
            onClick={toggle}
            disabled={!ready}
            aria-label={playing ? "Pause radio" : "Play radio"}
            aria-pressed={playing}
            aria-keyshortcuts="Space"
            aria-busy={!ready}
            className="relative z-10 flex size-14 cursor-pointer items-center justify-center rounded-full border border-line bg-bg text-fg hover:text-muted disabled:opacity-50"
          >
            <Icon name={playing ? "pause" : "play"} className="h-5 w-5" />
          </button>
        </div>
        <p className="text-fg">{page.name}</p>
        <p className="mt-1 text-muted">Live stream</p>
      </div>
      <div
        ref={hostRef}
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
        aria-hidden
      />
    </section>
  );
}
