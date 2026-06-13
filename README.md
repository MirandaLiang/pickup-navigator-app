‼️NOTE: This repository is an AI-assisted, code-ready prototype meant to validate interactions, test UI components in the browser, and accelerate developer handoff.

# Pickup Navigator — React · TypeScript · Tailwind

Driver tracking + AR walking navigation, implemented 1:1 from the Figma file
**Design System – Claude Code → page "Pickup Navigator"** (`Te6AEyWKmfPKGoOIPFHaNU`).

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
```

## Demo View from my portfolio
https://www.mirandaliang.com/vibe-design

## Camera feed video

The clip behind Figma's `Camera feed` node (14:3) is bundled at
`public/camera-feed.mp4` (H.264 768×512, 5.2 s loop; `object-cover` center-crops
it to the portrait view). `<CameraFeed />` starts it from the first frame each
time the AR screen becomes active and pauses it on exit. Muted + playsInline
keeps programmatic playback within browser autoplay policies, and the poster
frame (`public/camera-poster.jpg`, extracted from the clip) covers load/failure.
In production, replace this layer with the device camera surface behind the
ARKit/ARCore session.

## Design tokens

All Figma tokens live in two synced places:

- `tailwind.config.ts` — colors, radii (`rounded-card` = 4px, `rounded-chip` = 2px),
  shadows (`shadow-card/float/cta/pin`), the brand ease, and keyframes.
- `src/design/tokens.ts` — the same values as TS consts for SVG fills/strokes.

⚠️ Known token drift (flagged for design): the Figma token sheet lists
**Positive `#0E9F6E`**, but the screens apply **`#85E061`**. The code follows
the screens (`positive`), with the sheet value kept as `positive-base`.

## Structure

```
src/
  data/trip.ts                  # Driver/trip fixture (Sam · Tesla Model 3 · NUM 1090)
  design/tokens.ts              # Token values for SVG usage
  hooks/usePickupTrip.ts        # TRACKING → WALKING → ARRIVED → MATCHED (demo 8×)
  screens/TrackingScreen.tsx    # Figma 13:2
  screens/ARNavigationScreen.tsx# Figma 14:2
  components/
    ui/        IconButton · Plate · PrimaryButton
    tracking/  MapView (animated car) · DriverCard · EtaChip · MeetPointCard
    ar/        CameraFeed (video) · ARRibbon · RidePin · ARTopCard · DistancePill · ArrivalSheet
```

## Production contract

- Trip socket (~1 Hz) feeds `driverEtaSec` / driver position → map car + ETA chip.
- AR pose from ARKit/ARCore; `walkDistanceM` from remaining route length (1.3 m/s ETA).
- Arrival triggers at 0 m → `ArrivalSheet` slides up; "I see my driver" emits the match event.
- a11y: `aria-live` on ETA/distance, plate announced per character, ≥44px targets,
  pulses disabled under `prefers-reduced-motion` (`motion-reduce:hidden`).
- Edge states still to design: AR permission denied, positioning lost, driver cancel/reroute.
