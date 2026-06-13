import { trip } from "../../data/trip";

/** Meet-point instructions docked at the bottom (Figma: MeetPointCard 13:40). */
export function MeetPointCard() {
  const { meetPoint } = trip;
  return (
    <div className="absolute left-[17px] top-[693px] flex w-[359px] flex-col gap-2 rounded-card bg-white p-3 shadow-card">
      <h1 className="text-base font-semibold text-ink">{meetPoint.title}</h1>
      <p className="text-xs font-normal leading-[21px] text-ink-2">
        {meetPoint.instruction}
      </p>
    </div>
  );
}
