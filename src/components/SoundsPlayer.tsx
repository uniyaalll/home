"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  SOUND_TRACKS,
  type RepeatMode,
  type SoundTrack,
} from "../data/bio";
import { asset } from "../lib/asset";
import { Icon } from "./Icons";

const LIKED_KEY = "uniyaalll-liked-sounds";

type YtPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (id: string) => void;
  cueVideoById: (id: string) => void;
  getPlayerState: () => number;
  destroy: () => void;
};

type YtApi = {
  Player: new (el: HTMLElement | string, opts: Record<string, unknown>) => YtPlayer;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
};

function ytApi(): YtApi | undefined {
  return (window as Window & { YT?: YtApi }).YT;
}

function loadYT(): Promise<void> {
  return new Promise((resolve) => {
    const w = window as Window & {
      YT?: YtApi;
      onYouTubeIframeAPIReady?: () => void;
    };
    if (w.YT?.Player) {
      resolve();
      return;
    }
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (!document.getElementById("yt-api")) {
      const script = document.createElement("script");
      script.id = "yt-api";
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    }
  });
}

function readLiked(): Set<string> {
  try {
    const raw = localStorage.getItem(LIKED_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? new Set(parsed.filter((v): v is string => typeof v === "string"))
      : new Set();
  } catch {
    return new Set();
  }
}

function writeLiked(ids: Set<string>) {
  try {
    localStorage.setItem(LIKED_KEY, JSON.stringify([...ids]));
  } catch {
    /* ignore */
  }
}

function nextRepeat(mode: RepeatMode): RepeatMode {
  if (mode === "off") return "all";
  if (mode === "all") return "one";
  return "off";
}

function repeatLabel(mode: RepeatMode) {
  if (mode === "all") return "Repeat all";
  if (mode === "one") return "Repeat one";
  return "Repeat off";
}

export function SoundsPlayer() {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const indexRef = useRef(0);
  const repeatRef = useRef<RepeatMode>("off");
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>("off");
  const [liked, setLiked] = useState<Set<string>>(() => new Set());

  const track: SoundTrack = SOUND_TRACKS[index] ?? SOUND_TRACKS[0]!;

  useEffect(() => {
    setLiked(readLiked());
  }, []);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const loadTrack = useCallback((nextIndex: number, autoplay: boolean) => {
    const next = SOUND_TRACKS[nextIndex];
    const player = playerRef.current;
    if (!next || !player) return;
    setIndex(nextIndex);
    if (autoplay) player.loadVideoById(next.videoId);
    else player.cueVideoById(next.videoId);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const mount = async () => {
      if (!hostRef.current) return;
      await loadYT();
      const YT = ytApi();
      if (cancelled || !hostRef.current || !YT) return;

      const el = document.createElement("div");
      hostRef.current.innerHTML = "";
      hostRef.current.appendChild(el);

      playerRef.current = new YT.Player(el, {
        videoId: SOUND_TRACKS[0]!.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            if (!cancelled) setReady(true);
          },
          onStateChange: (event: { data: number }) => {
            const api = ytApi();
            if (!api) return;
            const { PLAYING, PAUSED, ENDED } = api.PlayerState;
            if (event.data === PLAYING) setPlaying(true);
            else if (event.data === PAUSED) setPlaying(false);
            else if (event.data === ENDED) {
              setPlaying(false);
              const mode = repeatRef.current;
              const current = indexRef.current;
              if (mode === "one") {
                loadTrack(current, true);
              } else if (mode === "all") {
                loadTrack((current + 1) % SOUND_TRACKS.length, true);
              }
            }
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
  }, [loadTrack]);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player || !ready) return;
    if (playing) player.pauseVideo();
    else player.playVideo();
  }, [playing, ready]);

  const goPrev = useCallback(() => {
    if (!ready) return;
    const next = (indexRef.current - 1 + SOUND_TRACKS.length) % SOUND_TRACKS.length;
    loadTrack(next, playing);
  }, [loadTrack, playing, ready]);

  const goNext = useCallback(() => {
    if (!ready) return;
    const next = (indexRef.current + 1) % SOUND_TRACKS.length;
    loadTrack(next, playing);
  }, [loadTrack, playing, ready]);

  const cycleRepeat = useCallback(() => {
    setRepeat((mode) => nextRepeat(mode));
  }, []);

  const toggleLike = useCallback(() => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(track.id)) next.delete(track.id);
      else next.add(track.id);
      writeLiked(next);
      return next;
    });
  }, [track.id]);

  const share = useCallback(() => {
    const url = `${window.location.origin}${asset("/")}#sounds`;
    void navigator.clipboard?.writeText(url).catch(() => {
      /* silent — no on-screen feedback by design */
    });
  }, []);

  const isLiked = liked.has(track.id);

  return (
    <div className="home-sounds" aria-label="Sounds">
      <div className="home-sounds-stage">
        <div
          className={`home-sounds-disc${playing ? " record-spin" : ""}`}
          aria-hidden
        >
          <span className="home-sounds-disc-ring home-sounds-disc-ring--mid" />
          <span className="home-sounds-disc-ring home-sounds-disc-ring--inner" />
          <span className="home-sounds-disc-dot" />
        </div>
        <p className="home-sounds-title text-fg">{track.title}</p>
        <p className="home-sounds-meta text-muted">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(SOUND_TRACKS.length).padStart(2, "0")} · {track.artist}
        </p>
      </div>

      <div className="home-sounds-bar" role="toolbar" aria-label="Playback">
        <button
          type="button"
          className="home-sounds-btn"
          aria-label="Previous track"
          disabled={!ready}
          onClick={goPrev}
        >
          <Icon name="skip-back" size={18} />
        </button>
        <button
          type="button"
          className="home-sounds-btn home-sounds-btn--play"
          aria-label={playing ? "Pause" : "Play"}
          aria-pressed={playing}
          disabled={!ready}
          onClick={togglePlay}
        >
          <Icon name={playing ? "pause" : "play"} size={18} />
        </button>
        <button
          type="button"
          className="home-sounds-btn"
          aria-label="Next track"
          disabled={!ready}
          onClick={goNext}
        >
          <Icon name="skip-forward" size={18} />
        </button>
        <button
          type="button"
          className="home-sounds-btn"
          aria-label={repeatLabel(repeat)}
          aria-pressed={repeat !== "off"}
          data-repeat={repeat}
          onClick={cycleRepeat}
        >
          <Icon name="repeat" size={18} />
          {repeat === "one" ? (
            <span className="home-sounds-repeat-one" aria-hidden>
              1
            </span>
          ) : null}
        </button>
        <button
          type="button"
          className="home-sounds-btn"
          aria-label={isLiked ? "Unlike" : "Like"}
          aria-pressed={isLiked}
          onClick={toggleLike}
        >
          <Icon name={isLiked ? "heart-fill" : "heart"} size={18} />
        </button>
        <button
          type="button"
          className="home-sounds-btn"
          aria-label="Copy link"
          onClick={share}
        >
          <Icon name="share" size={18} />
        </button>
      </div>

      <div
        ref={hostRef}
        className="home-sounds-yt"
        aria-hidden
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
