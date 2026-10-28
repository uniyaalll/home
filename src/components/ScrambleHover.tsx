"use client";

import { useEffect } from "react";

/** Character set used by tr.af for hover scramble. */
const SCRAMBLE_CHARS = "0248XYZT#$&";

type TextSlot = { node: Text; text: string };
type LetterSlot = { index: number; order: number; character: string };
type TextPlan = {
  node: Text;
  letters: string[];
  slots: LetterSlot[];
};

/**
 * Global hover scramble matching tr.af:
 * pointerover on `a, summary, [data-scramble]` → alphanumerics cycle through
 * `0248XYZT#$&` for `--transition` duration, revealing left-to-right.
 */
export function ScrambleHover() {
  useEffect(() => {
    let active: Element | null = null;
    let tracked: TextSlot[] = [];
    let previousAria: string | null = null;
    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const restore = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      for (const { node, text } of tracked) {
        if (node.data !== text) node.data = text;
      }
      if (active) {
        if (previousAria === null) active.removeAttribute("aria-label");
        else active.setAttribute("aria-label", previousAria);
      }
      active = null;
      tracked = [];
    };

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const target =
        event.target instanceof Element
          ? event.target.closest("a, summary, [data-scramble]")
          : null;

      if (
        !target ||
        target === active ||
        (event.relatedTarget instanceof Node &&
          target.contains(event.relatedTarget))
      ) {
        return;
      }

      // Always clear the previous scramble before starting another.
      restore();
      if (document.hidden || reducedMotion.matches) return;

      const match = getComputedStyle(document.documentElement)
        .getPropertyValue("--transition")
        .match(/([\d.]+)(ms|s)/);
      const duration = match
        ? Number(match[1]) * (match[2] === "s" ? 1000 : 1)
        : 0;
      if (!duration) return;

      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        if (
          !node.parentElement?.closest("svg, [aria-hidden=true]") &&
          node.data.trim()
        ) {
          tracked.push({ node, text: node.data });
        }
      }
      if (!tracked.length) return;

      active = target;
      previousAria = target.getAttribute("aria-label");
      target.setAttribute(
        "aria-label",
        previousAria ?? target.textContent ?? "",
      );

      let letterCount = 0;
      const plans: TextPlan[] = tracked.map(({ node, text }) => {
        const letters = Array.from(text);
        const slots = letters.flatMap((character, index) =>
          /[a-z0-9]/i.test(character)
            ? [{ index, order: letterCount++, character }]
            : [],
        );
        return { node, letters, slots };
      });

      const started = performance.now();

      const tick = (now: number) => {
        if (!active?.isConnected || document.hidden) {
          restore();
          return;
        }

        const progress = Math.min((now - started) / duration, 1);
        if (progress === 1) {
          restore();
          return;
        }

        const revealed = Math.floor(progress * letterCount);
        for (const { node, letters, slots } of plans) {
          for (const { index, order, character } of slots) {
            letters[index] =
              order < revealed
                ? character
                : SCRAMBLE_CHARS[
                    Math.floor(Math.random() * SCRAMBLE_CHARS.length)
                  ]!;
          }
          const next = letters.join("");
          if (node.data !== next) node.data = next;
        }

        frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    const onPointerOut = (event: PointerEvent) => {
      if (
        active &&
        !(
          event.relatedTarget instanceof Node &&
          active.contains(event.relatedTarget)
        )
      ) {
        restore();
      }
    };

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("pointerdown", restore, true);
    document.addEventListener("click", restore, true);
    window.addEventListener("blur", restore);
    window.addEventListener("pagehide", restore);
    document.addEventListener("visibilitychange", restore);
    reducedMotion.addEventListener("change", restore);

    return () => {
      restore();
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointerdown", restore, true);
      document.removeEventListener("click", restore, true);
      window.removeEventListener("blur", restore);
      window.removeEventListener("pagehide", restore);
      document.removeEventListener("visibilitychange", restore);
      reducedMotion.removeEventListener("change", restore);
    };
  }, []);

  return null;
}
