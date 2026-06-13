import { Plate } from "../ui/Plate";
import { trip } from "../../data/trip";

interface DriverCardProps {
  arriving: boolean;
}

/** Driver card docked at the top (Figma: DriverCard 13:48). */
export function DriverCard({ arriving }: DriverCardProps) {
  const { driver } = trip;
  return (
    <div
      aria-label="Driver details"
      className="absolute left-4 top-[77px] flex h-[84px] w-[359px] items-center gap-3 rounded-card bg-white p-3 shadow-card"
    >
      <div
        aria-hidden="true"
        className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#00FF5E_0%,#7A5CFF_71.429%)] text-xl font-bold text-white"
      >
        {driver.initial}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <span className="text-base font-semibold text-ink">{driver.name}</span>
        <span className="text-xs font-medium text-ink-2">{driver.vehicle}</span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-positive">
          <span aria-hidden="true" className="size-[7px] rounded-full bg-positive" />
          {arriving ? "Arriving now" : "On the way"}
        </span>
      </div>
      <Plate plate={driver.plate} />
    </div>
  );
}
