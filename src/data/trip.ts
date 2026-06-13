/** Trip fixture matching the Figma frames (13:2, 14:2, 14:31). */
export const trip = {
  driver: {
    name: "Sam",
    initial: "S",
    vehicle: "White Tesla Model 3",
    plate: "NUM 1090",
  },
  meetPoint: {
    title: "Follow the instruction",
    instruction:
      "From the Baggage Claim (Level 1) at Terminal 2, take the elevators or escalators up to Level 3.",
  },
  /** Driver ETA when tracking starts (seconds). */
  driverEtaSec: 120,
  /** Walking distance to the pickup point (meters). */
  walkDistanceM: 220,
  /** Average walking speed (m/s) used for the walk ETA. */
  walkSpeedMps: 1.3,
} as const;
