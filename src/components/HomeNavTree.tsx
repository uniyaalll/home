"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/** Equidistant dash rhythm — matches tr.af (3px on, 3px off). */
export const HOME_DASH = 3;
export const HOME_DASH_GAP = 3;
export const HOME_DASH_PERIOD = HOME_DASH + HOME_DASH_GAP;
export const HOME_DASH_ARRAY = `${HOME_DASH} ${HOME_DASH_GAP}`;

type TreeGeom = {
  width: number;
  height: number;
  /** Distance from nav left (spine) to the icon. */
  gutter: number;
  /** Exact vertical center of each nav row (half-pixel for crisp 1px stroke). */
  mids: number[];
  /** Bottom edge of each row except the last. */
  separators: number[];
};

/**
 * Horizontal tree arms + separators for the home nav.
 *
 * Vertical spine stays in CSS (identical 3/3 gradient as tr.af). Arms use the
 * same 3/3 dasharray. Each arm is an L-path (short vertical → horizontal) so
 * the dash runs continuously around the corner. A clip keeps every stroke at
 * or right of the spine — no left-side cross.
 */
export function HomeNavTree() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geom, setGeom] = useState<TreeGeom | null>(null);

  const measure = useCallback(() => {
    const svg = svgRef.current;
    const nav = svg?.parentElement;
    if (!svg || !nav) return;

    const rows = Array.from(
      nav.querySelectorAll<HTMLElement>(".home-nav-row"),
    );
    if (rows.length === 0) return;

    const navCs = getComputedStyle(nav);
    const rowCs = getComputedStyle(rows[0]);
    // Desktop: nav padding-left = gutter. Mobile: row padding-left = elbow.
    const gutter = Math.round(
      parseFloat(navCs.paddingLeft) ||
        parseFloat(rowCs.paddingLeft) ||
        28,
    );

    const navRect = nav.getBoundingClientRect();
    setGeom({
      width: nav.offsetWidth,
      height: nav.offsetHeight,
      gutter,
      mids: rows.map((row) => {
        const r = row.getBoundingClientRect();
        return Math.round(r.top - navRect.top + r.height / 2) + 0.5;
      }),
      separators: rows.slice(0, -1).map((row) => {
        const r = row.getBoundingClientRect();
        return Math.round(r.bottom - navRect.top) - 0.5;
      }),
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    const nav = svgRef.current?.parentElement;
    if (!nav || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(nav);
    for (const row of nav.querySelectorAll(".home-nav-row")) {
      ro.observe(row);
    }
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const clipId = "home-nav-tree-clip";

  return (
    <svg
      ref={svgRef}
      className="home-nav-tree"
      width={geom?.width ?? "100%"}
      height={geom?.height ?? "100%"}
      aria-hidden
    >
      {geom ? (
        <>
          {/* Clip to the spine’s right edge so strokes never paint left of it. */}
          <defs>
            <clipPath id={clipId}>
              <rect
                x="1"
                y="0"
                width={Math.max(geom.width - 1, 0)}
                height={geom.height}
              />
            </clipPath>
          </defs>
          <g
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="1"
            strokeDasharray={HOME_DASH_ARRAY}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            shapeRendering="crispEdges"
            clipPath={`url(#${clipId})`}
          >
            {/*
              L-arm into each icon. Starts at x=1 (the spine’s right edge) so
              the first dash abuts the spine and forms a right-angle L — never
              paints left of the spine. Same 3/3 dasharray as the CSS spine.
            */}
            {geom.mids.map((y, i) => (
              <line
                key={`arm-${i}`}
                x1="1"
                y1={y}
                x2={geom.gutter}
                y2={y}
              />
            ))}
            {geom.separators.map((y, i) => (
              <line
                key={`sep-${i}`}
                x1="1"
                y1={y}
                x2={geom.width}
                y2={y}
              />
            ))}
          </g>
        </>
      ) : null}
    </svg>
  );
}
