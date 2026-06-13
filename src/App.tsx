import { usePickupTrip } from "./hooks/usePickupTrip";
import { TrackingScreen } from "./screens/TrackingScreen";
import { ARNavigationScreen } from "./screens/ARNavigationScreen";

/**
 * Pickup Navigator — driver tracking + AR walking navigation.
 * Square-cornered 392×812 stage (page radius removed per design).
 */
export default function App() {
  const tripState = usePickupTrip();
  const onAR = tripState.phase !== "TRACKING";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1a22] p-6 font-sans">
      <div className="relative h-[812px] w-[392px] overflow-hidden bg-canvas shadow-[0_30px_80px_rgba(0,0,0,.55)]">
        <div
          className={`absolute inset-0 transition-opacity duration-[420ms] ease-brand ${
            onAR ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <TrackingScreen
            driverEtaSec={tripState.driverEtaSec}
            driverProgress={tripState.driverProgress}
            onNavigate={tripState.startWalking}
          />
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-[420ms] ease-brand ${
            onAR ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <ARNavigationScreen
            active={onAR}
            phase={tripState.phase}
            walkDistanceM={tripState.walkDistanceM}
            walkEtaMin={tripState.walkEtaMin}
            onBack={tripState.backToTracking}
            onConfirmMatch={tripState.confirmMatch}
          />
        </div>
      </div>
    </div>
  );
}
