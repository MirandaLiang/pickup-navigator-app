/**
 * Design tokens synced from Figma — single source of truth for values
 * that must be used outside Tailwind classes (SVG fills/strokes, canvases).
 * Figma: "Design System – Claude Code" → page "Pickup Navigator" (node 13:59).
 */
export const tokens = {
  ink: "#16161D",
  ink2: "#5C5C66",
  primary: "#3D3DD8",
  primary2: "#775BFD",
  accent: "#E62ED0",
  positive: "#85E061",
  positiveBase: "#0E9F6E",
  locator: "#FF0004",
  canvas: "#EFF0F6",
  label: "#A9AABB",
  plate: "#FAFAFD",
  plateBorder: "#DCDDE8",
  mapBlock: "#E4E5EF",
  mapGrid: "#D7D8E5",
  mapRoadDash: "#DCDDE8",
} as const;

export const ease = "cubic-bezier(.22,1,.36,1)";
