import { IconButton } from "../components/ui/IconButton";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { MapView } from "../components/tracking/MapView";
import { DriverCard } from "../components/tracking/DriverCard";
import { EtaChip } from "../components/tracking/EtaChip";
import { MeetPointCard } from "../components/tracking/MeetPointCard";

interface TrackingScreenProps {
  driverEtaSec: number;
  driverProgress: number;
  onNavigate: () => void;
}

/** Screen 1 · Driver tracking (Figma frame 13:2). */
export function TrackingScreen({
  driverEtaSec,
  driverProgress,
  onNavigate,
}: TrackingScreenProps) {
  return (
    <section aria-label="Driver tracking map" className="absolute inset-0 bg-canvas">
      <MapView driverProgress={driverProgress} />

      {/* Rotated terminal labels (Figma: 13:28 / 13:30) */}
      <span className="pointer-events-none absolute left-[263px] top-[202px] origin-left -rotate-[58.6deg] whitespace-nowrap text-[11px] font-semibold tracking-[1.32px] text-label">
        SFO Terminal 2
      </span>
      <span className="pointer-events-none absolute left-[357px] top-[695px] origin-left rotate-[28.15deg] whitespace-nowrap text-[11px] font-semibold tracking-[1.32px] text-label">
        SFO Terminal 1
      </span>

      <EtaChip etaSec={driverEtaSec} />

      <IconButton label="Open menu" className="absolute left-4 top-[19px]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="#16161D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </IconButton>

      <DriverCard arriving={driverEtaSec <= 8} />

      <PrimaryButton onClick={onNavigate} className="absolute left-[17px] top-[641px] h-10">
        Navigate
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M2 8h11M9 3.5 13.5 8 9 12.5"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </PrimaryButton>

      <MeetPointCard />
    </section>
  );
}
