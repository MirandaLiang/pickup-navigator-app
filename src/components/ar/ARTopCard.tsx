import { Plate } from "../ui/Plate";
import { trip } from "../../data/trip";

interface ARTopCardProps {
  walkEtaMin: number;
  arrived: boolean;
}

/** AR header card (Figma: ARTopCard 14:17). */
export function ARTopCard({ walkEtaMin, arrived }: ARTopCardProps) {
  const { driver } = trip;
  return (
    <div className="absolute left-4 top-[77px] flex h-[84px] w-[359px] items-center gap-3 rounded-card bg-white p-3 shadow-card">
      <div
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F0F0F7]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" className="fill-primary">
          <circle cx="13" cy="4" r="2.2" />
          <path d="M12.2 7.2c.9-.2 1.8.2 2.2 1l1.4 2.6 2.7 1.3-.8 1.8-3.3-1.6-1.2-2-1 3.4 2.3 2.4.7 5h-2l-.6-4.1-2.4-2.4-.8 2.7L7 21.5l-1.8-.9 2.3-3.6 1.3-5.1-1.7 1-.7 3H4.5l.9-4.2 4.4-2.7c.7-.5 1.5-.7 2.4-.8z" />
        </svg>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <span aria-live="polite" className="text-base font-semibold text-ink">
          {arrived ? "At pickup point" : `${walkEtaMin} min to pickup point`}
        </span>
        <span className="text-xs font-medium text-ink-2">{driver.vehicle}</span>
      </div>
      <Plate plate={driver.plate} />
    </div>
  );
}
