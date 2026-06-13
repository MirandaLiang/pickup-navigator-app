import { trip } from "../../data/trip";

interface ArrivalSheetProps {
  visible: boolean;
  onConfirm: () => void;
  onContact: () => void;
}

/** Arrival sheet — slides up at 0 m (Figma state: 14:31, copy synced to Sam/Tesla). */
export function ArrivalSheet({ visible, onConfirm, onContact }: ArrivalSheetProps) {
  const { driver } = trip;
  return (
    <div
      role="dialog"
      aria-label="You have arrived"
      aria-hidden={!visible}
      className={`absolute inset-x-3 bottom-3 rounded-card bg-white px-4 pb-4 pt-5 shadow-card transition-transform duration-500 ease-brand ${
        visible ? "translate-y-0" : "translate-y-[calc(100%+24px)]"
      }`}
    >
      <h2 className="mb-1.5 text-xl font-semibold text-ink">
        You&rsquo;re at the pickup point
      </h2>
      <p className="mb-3.5 text-[15px] leading-[21px] text-ink-2">
        Look for {driver.name} in a {driver.vehicle.toLowerCase()} · plate {driver.plate}.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onContact}
          className="flex-1 rounded-card bg-[#F0F0F7] py-3.5 text-base font-semibold tracking-[0.02em] text-ink transition-transform duration-150 ease-brand active:scale-[0.97]"
        >
          Contact driver
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 rounded-card bg-primary py-3.5 text-base font-semibold tracking-[0.02em] text-white shadow-cta transition-transform duration-150 ease-brand active:scale-[0.97]"
        >
          I see my driver
        </button>
      </div>
    </div>
  );
}
