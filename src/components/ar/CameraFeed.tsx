import { useEffect, useRef, useState } from "react";

interface CameraFeedProps {
  /** True while the AR screen is the visible screen. */
  active: boolean;
}

/**
 * Live camera layer (Figma: Camera feed 14:3).
 *
 * Plays `/camera-feed.mp4` (the clip behind the Figma video fill) and starts
 * playback from the first frame each time the AR screen becomes active —
 * pausing again when the user leaves, so the loop always greets them moving.
 * Muted + playsInline keeps programmatic play() within browser autoplay
 * policies. Falls back to the poster frame if the file is missing.
 *
 * In production, replace this layer with the device camera surface behind
 * the ARKit/ARCore session.
 */
export function CameraFeed({ active }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    if (active) {
      video.currentTime = 0;
      // play() returns a promise; a rejection (e.g. strict autoplay policy)
      // simply leaves the poster visible rather than throwing.
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, failed]);

  if (failed) {
    return (
      <img
        className="absolute inset-0 h-full w-full object-cover brightness-[.96] saturate-[.92]"
        src="/camera-poster.jpg"
        alt="Camera view of the airport terminal concourse"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover brightness-[.96] saturate-[.92]"
      src="/camera-feed.mp4"
      poster="/camera-poster.jpg"
      preload="auto"
      muted
      loop
      playsInline
      onError={() => setFailed(true)}
      aria-label="Camera view of the airport terminal concourse"
    />
  );
}
