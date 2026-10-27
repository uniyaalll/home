"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/** Equidistant dash grid — 3px ink, 3px gap (same as tr.af). */
export const DASH = 3;
export const GAP = 3;
export const PERIOD = DASH + GAP;

type Geom = {
  width: number;
  height: number;
  /** Spine X in stage coordinates (CSS px). */
  spineX: number;
  /** Right edge of the nav column (separators stop here — never cross the preview). */
  navRight: number;
  /** Elbow length from spine to icon. */
  gutter: number;
  /** Row mid Y positions (integers on the dash grid). */
  mids: number[];
  /** Separator Y positions (integers on the dash grid). */
  separators: number[];
};

/** Snap to the start of a dash cell so L-corners share a grid point. */
function snapDashStart(y: number) {
  return Math.round(y / PERIOD) * PERIOD;
}

/**
 * Build every dash as a crisp 1×3 or 3×1 rect on one shared grid.
 * Vertical owns x = spineX; horizontals start at spineX + 1 — perfect L,
 * never a cross, every dash equidistant.
 */
function buildDashes(g: Geom) {
  const verts: { x: number; y: number; w: number; h: number }[] = [];
  const horiz: { x: number; y: number; w: number; h: number }[] = [];

  // Continuous spine from top of stage through the nav.
  for (let y = 0; y < g.height; y += PERIOD) {
    verts.push({
      x: g.spineX,
      y,
      w: 1,
      h: Math.min(DASH, g.height - y),
    });
  }

  const paintHorizontal = (y: number, xEnd: number) => {
    // First dash begins at spineX + 1 (abuts spine, no overlap).
    for (let x = g.spineX + 1; x < xEnd; x += PERIOD) {
      horiz.push({
        x,
        y,
        w: Math.min(DASH, xEnd - x),
        h: 1,
      });
    }
  };

  for (const y of g.mids) {
    paintHorizontal(y, g.spineX + g.gutter);
  }
  for (const y of g.separators) {
    paintHorizontal(y, g.navRight);
  }

  return { verts, horiz };
}

/**
 * Single pixel-grid tree for the whole stage (preview spine + nav connectors).
 * Replaces CSS spine gradients and stroke-dasharray elbows so every dash and
 * every L-join is identical on phone and desktop.
 */
export function HomeNavTree() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geom, setGeom] = useState<Geom | null>(null);

  const measure = useCallback(() => {
    const svg = svgRef.current;
    const stage = svg?.parentElement;
    if (!svg || !stage || !stage.classList.contains("home-stage")) return;

    const nav = stage.querySelector<HTMLElement>(".home-nav");
    const rows = nav
      ? Array.from(nav.querySelectorAll<HTMLElement>(".home-nav-row"))
      : [];
    if (!nav || rows.length === 0) return;

    const stageRect = stage.getBoundingClientRect();
    const navCs = getComputedStyle(nav);
    const rowCs = getComputedStyle(rows[0]);
    const gutter = Math.round(
      parseFloat(navCs.paddingLeft) ||
        parseFloat(rowCs.paddingLeft) ||
        28,
    );

    // Spine X: desktop = nav left edge; mobile stacked = stage pad-x
    // (nav is pulled flush to that same x).
    const navRect = nav.getBoundingClientRect();
    const spineX = Math.round(navRect.left - stageRect.left);
    const navRight = Math.round(navRect.right - stageRect.left);

    // Keep elbows near icon centers, but on the dash grid. Separators stay on
    // distinct grid rows so they never collapse onto an elbow Y.
    const mids = rows.map((row) => {
      const r = row.getBoundingClientRect();
      return snapDashStart(r.top - stageRect.top + r.height / 2);
    });
    const separators = rows.slice(0, -1).map((row, i) => {
      const r = row.getBoundingClientRect();
      let y = snapDashStart(r.bottom - stageRect.top);
      // Nudge off the neighboring elbows if snap collided.
      if (y === mids[i] || y === mids[i + 1]) {
        y += PERIOD;
      }
      return y;
    });

    setGeom({
      width: Math.round(stage.clientWidth),
      height: Math.round(stage.clientHeight),
      spineX,
      navRight,
      gutter,
      mids,
      separators,
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    const stage = svgRef.current?.parentElement;
    if (!stage || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(stage);
    const nav = stage.querySelector(".home-nav");
    if (nav) {
      ro.observe(nav);
      for (const row of nav.querySelectorAll(".home-nav-row")) {
        ro.observe(row);
      }
    }
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const dashes = geom ? buildDashes(geom) : null;

  return (
    <svg
      ref={svgRef}
      className="home-nav-tree"
      width={geom?.width ?? "100%"}
      height={geom?.height ?? "100%"}
      aria-hidden
    >
      {dashes ? (
        <g fill="var(--color-line)" shapeRendering="crispEdges">
          {dashes.verts.map((d, i) => (
            <rect
              key={`v-${i}`}
              x={d.x}
              y={d.y}
              width={d.w}
              height={d.h}
            />
          ))}
          {dashes.horiz.map((d, i) => (
            <rect
              key={`h-${i}`}
              x={d.x}
              y={d.y}
              width={d.w}
              height={d.h}
            />
          ))}
        </g>
      ) : null}
    </svg>
  );
}
