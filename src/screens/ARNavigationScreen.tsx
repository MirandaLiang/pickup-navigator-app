import { useState } from "react";
import { IconButton } from "../components/ui/IconButton";
import { CameraFeed } from "../components/ar/CameraFeed";
import { ARRibbon } from "../components/ar/ARRibbon";
import { RidePin } from "../components/ar/RidePin";
import { ARTopCard } from "../components/ar/ARTopCard";
import { DistancePill } from "../components/ar/DistancePill";
import { ArrivalSheet } from "../components/ar/ArrivalSheet";
import { trip } from "../data/trip";
import type { TripPhase } from "../hooks/usePickupTrip";

interface ARNavigationScreenProps {
  /** True while this screen is the visible screen — drives video playback. */
  active: boolean;
  phase: TripPhase;
  walkDistanceM: number;
  walkEtaMin: number;
  onBack: () => void;
  onConfirmMatch: () => void;
}

/** Screen 2 · AR walking navigation (Figma frame 14:2). */
export function ARNavigationScreen({
  active,
  phase,
  walkDistanceM,
  walkEtaMin,
  onBack,
  onConfirmMatch,
}: ARNavigationScreenProps) {
  const arrived = phase === "ARRIVED" || phase === "MATCHED";
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  return (
    <section aria-label="AR walking navigation" className="absolute inset-0 bg-[#101018]">
      <CameraFeed active={active} />
      <ARRibbon />
      <RidePin />

      <IconButton label="Back to map" onClick={onBack} className="absolute left-4 top-[19px]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 5 8 12l7 7"
            stroke="#16161D"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IconButton>

      <ARTopCard walkEtaMin={walkEtaMin} arrived={arrived} />
      <DistancePill distanceM={walkDistanceM} arrived={arrived} />

      <ArrivalSheet
        visible={phase === "ARRIVED"}
        onConfirm={() => {
          onConfirmMatch();
          showToast(`Ride matched — ${trip.driver.name} is waiting`);
        }}
        onContact={() => showToast(`Calling ${trip.driver.name}…`)}
      />

      {/* Toast */}
      <div
        aria-live="polite"
        className={`pointer-events-none absolute bottom-[200px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-card bg-ink/[.92] px-[18px] py-2.5 text-[13px] font-medium text-white transition-all duration-300 ease-brand ${
          toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {toast}
      </div>
    </section>
  );
}
