import { useCallback, useEffect, useRef, useState } from "react";
import { trip } from "../data/trip";

export type TripPhase = "TRACKING" | "WALKING" | "ARRIVED" | "MATCHED";

export interface PickupTrip {
  phase: TripPhase;
  /** Remaining driver ETA in seconds (drives the map car + ETA chip). */
  driverEtaSec: number;
  /** 0 → 1 progress of the driver along the route. */
  driverProgress: number;
  /** Remaining walking distance in meters. */
  walkDistanceM: number;
  /** Remaining walking ETA in whole minutes (≥ 1 while walking). */
  walkEtaMin: number;
  startWalking: () => void;
  backToTracking: () => void;
  confirmMatch: () => void;
}

/**
 * Pickup trip state machine: TRACKING → WALKING → ARRIVED → MATCHED.
 *
 * In production, `driverEtaSec` comes from the trip socket (~1 Hz) and
 * `walkDistanceM` from the AR session's remaining route length. Here both
 * tick locally, scaled by `demoSpeed` (8× by default) so reviews are quick.
 */
export function usePickupTrip(demoSpeed = 8): PickupTrip {
  const [phase, setPhase] = useState<TripPhase>("TRACKING");
  const [driverEtaSec, setDriverEtaSec] = useState<number>(trip.driverEtaSec);
  const [walkDistanceM, setWalkDistanceM] = useState<number>(trip.walkDistanceM);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  // Driver approach — runs while tracking or walking.
  useEffect(() => {
    if (phase !== "TRACKING" && phase !== "WALKING") return;
    const id = window.setInterval(() => {
      setDriverEtaSec((s) => Math.max(0, s - 0.25 * demoSpeed));
    }, 250);
    return () => window.clearInterval(id);
  }, [phase, demoSpeed]);

  // Walk countdown — runs while walking; arrival at 0 m.
  useEffect(() => {
    if (phase !== "WALKING") return;
    const id = window.setInterval(() => {
      setWalkDistanceM((d) => {
        const next = Math.max(0, d - trip.walkSpeedMps * 0.25 * demoSpeed);
        if (next === 0 && phaseRef.current === "WALKING") setPhase("ARRIVED");
        return next;
      });
    }, 250);
    return () => window.clearInterval(id);
  }, [phase, demoSpeed]);

  const startWalking = useCallback(() => setPhase("WALKING"), []);
  const backToTracking = useCallback(() => {
    setPhase((p) => (p === "WALKING" ? "TRACKING" : p));
  }, []);
  const confirmMatch = useCallback(() => setPhase("MATCHED"), []);

  return {
    phase,
    driverEtaSec,
    driverProgress: 1 - driverEtaSec / trip.driverEtaSec,
    walkDistanceM,
    walkEtaMin: Math.max(1, Math.ceil(walkDistanceM / trip.walkSpeedMps / 60)),
    startWalking,
    backToTracking,
    confirmMatch,
  };
}
