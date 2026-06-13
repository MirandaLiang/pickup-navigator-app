import { tokens } from "../../design/tokens";

/**
 * AR path ribbon (Figma: 14:4) — geometry is the verbatim SVG export of the
 * node, so position/size match the file exactly.
 *
 * - Lane fill: linear gradient primary → primary-2 at 50% fill-opacity
 *   (userSpaceOnUse coords from Figma), so the floor reads through it.
 * - Chevrons: white strokes 4→8 px widening toward the viewer, base
 *   opacities 1 / .9 / .8 / .65 / .5, marching upward on a staggered loop.
 */
export function ARRibbon() {
  return (
    <svg
      viewBox="0 0 392 812"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="ribbonGrad"
          x1="177.167"
          y1="814.667"
          x2="191.164"
          y2="451.629"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={tokens.primary} />
          <stop offset="1" stopColor={tokens.primary2} />
        </linearGradient>
      </defs>

      {/* Lane (Figma vector 14:5) */}
      <path
        d="M134.172 835.124C173.495 662.524 199.48 560.282 207.685 502.379C211.756 477.424 230.471 461.576 262.706 450.328L272.656 465.395C246.618 476.69 233.723 491.083 231.217 514.051C226.518 569.483 219.059 679.861 223.427 812.816L134.172 835.124Z"
        fill="url(#ribbonGrad)"
        fillOpacity="0.5"
      />

      {/* Chevrons (Figma vectors 14:7 … 14:11) — march upward */}
      <g fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round">
        <g opacity="1">
          <path
            className="animate-chev [animation-delay:1.44s] motion-reduce:animate-none"
            d="M206.077 529.392L217.018 523.182L227.146 529.07"
            strokeWidth="4"
          />
        </g>
        <g opacity="0.9">
          <path
            className="animate-chev [animation-delay:1.08s] motion-reduce:animate-none"
            d="M198.129 573.126L211.655 564.486L224.079 572.264"
            strokeWidth="5"
          />
        </g>
        <g opacity="0.8">
          <path
            className="animate-chev [animation-delay:0.72s] motion-reduce:animate-none"
            d="M186.202 631.348L203.976 620.39L220.3 631.034"
            strokeWidth="6"
          />
        </g>
        <g opacity="0.65">
          <path
            className="animate-chev [animation-delay:0.36s] motion-reduce:animate-none"
            d="M170.562 707.55L194.862 692.689L217.247 706.344"
            strokeWidth="7"
          />
        </g>
        <g opacity="0.5">
          <path
            className="animate-chev motion-reduce:animate-none"
            d="M151 797.375L184.379 777.917L215.204 796.479"
            strokeWidth="8"
          />
        </g>
      </g>
    </svg>
  );
}
