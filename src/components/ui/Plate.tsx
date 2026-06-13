interface PlateProps {
  plate: string;
}

/** License plate chip (Figma: 13:57 / 14:25) — 32 px tall, 1.5 px border. */
export function Plate({ plate }: PlateProps) {
  return (
    <span
      aria-label={`License plate ${plate.split("").join(" ")}`}
      className="flex h-8 shrink-0 items-center rounded-card border-[1.5px] border-plate-border bg-plate px-[11px] text-xs font-bold tracking-[0.14em] text-ink"
    >
      {plate}
    </span>
  );
}
