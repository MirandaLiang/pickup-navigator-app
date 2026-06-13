interface DistancePillProps {
  distanceM: number;
  arrived: boolean;
}

/** Remaining-distance pill (Figma: DistancePill 14:27). */
export function DistancePill({ distanceM, arrived }: DistancePillProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute left-1/2 top-[173px] flex -translate-x-[calc(50%-0.5px)] items-center gap-2 whitespace-nowrap rounded-card bg-ink/[.42] px-2 py-1 text-sm font-semibold tracking-[0.03em] text-white backdrop-blur-[6px]"
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 1.5 14.5 14.5 8 11 1.5 14.5z"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{arrived ? "You have arrived" : `${Math.round(distanceM)} m · straight ahead`}</span>
    </div>
  );
}
