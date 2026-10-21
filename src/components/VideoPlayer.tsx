"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";

export function VideoPlayer({
  src,
  poster,
  label,
  aspect = 16 / 9,
}: {
  src: string;
  poster?: string | null;
  label: string;
  aspect?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div className="relative isolate overflow-hidden rounded-[var(--window-radius)] border border-line">
      <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
        <video
          ref={ref}
          src={src}
          poster={poster || undefined}
          width={1920}
          height={1080}
          aria-label={label}
          muted={muted}
          loop
          playsInline
          disablePictureInPicture
          preload="metadata"
          className="pointer-events-none absolute inset-0 block h-full w-full object-cover [&::-webkit-media-controls]:hidden"
        />
        <button
          type="button"
          className="absolute inset-0 cursor-pointer"
          aria-label={`${playing ? "Pause" : "Play"} ${label}`}
          onClick={togglePlay}
        />
      </div>
      <div className="flex shrink-0 items-center border-t border-line bg-bg p-2">
        <button
          type="button"
          className="flex size-11 cursor-pointer items-center justify-center text-muted hover:text-fg"
          aria-label={playing ? "Pause video" : "Play video"}
          title={playing ? "Pause video" : "Play video"}
          aria-keyshortcuts="Space"
          onClick={togglePlay}
        >
          <Icon name={playing ? "pause" : "play"} className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="flex size-11 cursor-pointer items-center justify-center text-muted hover:text-fg"
          aria-label={muted ? "Unmute video" : "Mute video"}
          title={muted ? "Unmute video" : "Mute video"}
          aria-pressed={!muted}
          aria-keyshortcuts="M"
          onClick={toggleMute}
        >
          <Icon name={muted ? "mute" : "unmute"} className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
