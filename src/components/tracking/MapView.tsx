import { useEffect, useRef } from "react";
import { tokens } from "../../design/tokens";

interface MapViewProps {
  /** 0 → 1 driver progress along the route; animates the car. */
  driverProgress: number;
}

/**
 * Stylized SFO map (Figma: Map 13:3). Route, pickup ring, car, and user
 * locator are the verbatim SVG export of the Figma vectors, so geometry and
 * styling match the file exactly.
 */

/** Route 13:18 — near-straight curve from the screen edge to the pickup ring. */
const ROUTE_D = "M0 322C73.5192 371.901 147.038 421.802 217.793 470.161";

/** Pose the car was exported in (centroid + route tangent), used as the
 *  reference frame when animating it along the path. */
const CAR_BASE = { x: 122.97, y: 405.75, angleDeg: 34.23 };

export function MapView({ driverProgress }: MapViewProps) {
  const routeRef = useRef<SVGPathElement>(null);
  const carRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const route = routeRef.current;
    const car = carRef.current;
    if (!route || !car) return;
    const len = route.getTotalLength();
    const t = Math.min(1, Math.max(0, driverProgress));
    const p = route.getPointAtLength(t * len);
    const p2 = route.getPointAtLength(Math.min(len, t * len + 2));
    const angle = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
    car.setAttribute(
      "transform",
      `translate(${p.x} ${p.y}) rotate(${angle - CAR_BASE.angleDeg}) translate(${-CAR_BASE.x} ${-CAR_BASE.y})`,
    );
  }, [driverProgress]);

  return (
    <svg
      viewBox="0 0 392 812"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect width="392" height="812" fill={tokens.canvas} />

      {/* City blocks */}
      <g fill={tokens.mapBlock}>
        <rect x="150" y="120" width="260" height="190" rx="18" transform="rotate(-8 280 215)" />
        <rect x="-40" y="560" width="220" height="240" rx="18" transform="rotate(-8 70 680)" />
        <rect x="250" y="640" width="220" height="200" rx="18" transform="rotate(-8 360 740)" />
      </g>
      <g stroke={tokens.mapGrid} strokeWidth="2" fill="none" transform="rotate(-8 280 215)">
        <path d="M175 145 V290 M205 145 V290 M235 145 V290 M265 145 V290 M295 145 V290 M325 145 V290 M355 145 V290" />
        <path d="M165 180 H385 M165 255 H385" />
      </g>

      {/* Roads: white with dashed casings */}
      <g fill="none" stroke="#FFFFFF" strokeWidth="26" strokeLinecap="round">
        <path d="M330 -20 C 180 120, 60 300, 80 470 C 96 600, 200 700, 420 760" />
        <path d="M-30 300 C 120 380, 260 520, 430 560" />
      </g>
      <g fill="none" stroke={tokens.mapRoadDash} strokeWidth="2" strokeDasharray="7 9">
        <path d="M330 -20 C 180 120, 60 300, 80 470 C 96 600, 200 700, 420 760" />
        <path d="M-30 300 C 120 380, 260 520, 430 560" />
      </g>

      {/* Driver route (Figma 13:18) */}
      <path
        ref={routeRef}
        d={ROUTE_D}
        fill="none"
        stroke={tokens.ink}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Pickup ring (Figma 2:2 + 13:20) — black donut */}
      <circle cx="222" cy="473" r="6" fill="black" />
      <circle cx="222" cy="473" r="3" fill="white" />

      {/* Driver car (Figma group 13:22) — exact export, animated along the route */}
      <g ref={carRef}>
        <path
          d="M143.308 422.068L145.565 418.766C148.993 413.751 147.706 406.906 142.691 403.478L117.924 386.549C112.908 383.121 106.063 384.407 102.635 389.423L100.378 392.725C96.9498 397.741 98.2366 404.585 103.252 408.014L128.019 424.943C133.035 428.371 139.88 427.084 143.308 422.068Z"
          fill="#1C1C24"
        />
        <path
          d="M140.57 418.986L141.698 417.335C144.503 413.231 143.45 407.631 139.347 404.826L117.882 390.154C113.778 387.349 108.178 388.402 105.373 392.506L104.245 394.157C101.44 398.26 102.492 403.861 106.596 406.666L128.061 421.337C132.164 424.142 137.765 423.089 140.57 418.986Z"
          fill="#EDEEF4"
        />
        <path
          d="M129.092 414.612L133.054 408.815C134.027 407.392 133.337 405.228 131.513 403.982L121.606 397.21C119.782 395.964 117.515 396.106 116.543 397.529L112.581 403.326C111.608 404.748 112.298 406.912 114.122 408.159L124.029 414.931C125.853 416.177 128.12 416.034 129.092 414.612Z"
          fill="#3A3A46"
        />
        <path
          d="M135.554 421.008L141.761 411.927C142.696 410.559 142.345 408.692 140.977 407.757C139.609 406.822 137.742 407.173 136.808 408.541L130.6 417.622C129.665 418.99 130.016 420.857 131.384 421.792C132.752 422.727 134.619 422.376 135.554 421.008Z"
          fill="#C9CAD6"
        />
        <path
          d="M108.853 403.363L115.625 393.456C116.404 392.317 116.111 390.761 114.972 389.982C113.832 389.203 112.276 389.495 111.497 390.635L104.725 400.542C103.946 401.682 104.239 403.237 105.379 404.016C106.518 404.796 108.074 404.503 108.853 403.363Z"
          fill="#C9CAD6"
        />
      </g>

      {/* User locator (Figma 13:32 + 13:33) — 16% halo, red dot, white ring */}
      <circle
        className="origin-center animate-halo [transform-box:fill-box] motion-reduce:animate-none"
        opacity="0.16"
        cx="214"
        cy="398"
        r="15"
        fill="black"
      />
      <circle cx="214" cy="398" r="5.5" fill={tokens.locator} stroke="white" strokeWidth="3" />
    </svg>
  );
}
