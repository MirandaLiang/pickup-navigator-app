/** Pickup pin (Figma: RidePin 14:12) — solid primary, white ring, pulse. */
export function RidePin() {
  return (
    <div
      role="img"
      aria-label="Ride pickup point"
      className="absolute left-[231px] top-[424px] flex size-[60px] items-center justify-center rounded-full border-[3px] border-white bg-primary text-[13px] font-bold tracking-[0.1em] text-white shadow-pin"
    >
      RIDE
      <span
        aria-hidden="true"
        className="absolute -inset-[3px] animate-pin-pulse rounded-full border-[3px] border-white motion-reduce:hidden"
      />
    </div>
  );
}
