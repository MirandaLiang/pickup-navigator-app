interface EtaChipProps {
  etaSec: number;
}

/** Compact ETA chip pinned at the route end (Figma: ETA chip 13:34). */
export function EtaChip({ etaSec }: EtaChipProps) {
  const arriving = etaSec <= 8;
  const mins = Math.max(1, Math.ceil(etaSec / 60));
  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute left-[235px] top-[463px] flex w-[63px] items-center justify-center gap-1 rounded-chip bg-white p-1 shadow-float"
    >
      {arriving ? (
        <span className="text-[8px] font-semibold leading-3 tracking-[0.06em] text-ink">
          Arriving
        </span>
      ) : (
        <>
          <span className="text-xs font-bold text-ink">{mins}</span>
          <span className="text-[8px] font-normal leading-3 tracking-[0.06em] text-ink-2">
            Min away
          </span>
        </>
      )}
    </div>
  );
}
