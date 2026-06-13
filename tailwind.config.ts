import type { Config } from "tailwindcss";

/**
 * Design tokens synced from Figma
 * File: Design System – Claude Code (Te6AEyWKmfPKGoOIPFHaNU) · page "Pickup Navigator"
 * Token sheet node: 13:59 · Screens: 13:2 (tracking), 14:2 (AR navigation)
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16161D",
        "ink-2": "#5C5C66",
        primary: "#3D3DD8",
        "primary-2": "#775BFD", // AR ribbon gradient top
        accent: "#E62ED0", // reserved in token sheet; unused on current screens
        positive: "#85E061", // applied on screens ("On the way")
        "positive-base": "#0E9F6E", // token-sheet value — pending reconciliation
        locator: "#FF0004", // user location dot
        canvas: "#EFF0F6",
        label: "#A9AABB",
        plate: "#FAFAFD",
        "plate-border": "#DCDDE8",
      },
      borderRadius: {
        card: "4px", // refined sharp card language
        chip: "2px",
      },
      boxShadow: {
        card: "0 8px 28px rgba(22,22,29,.14)",
        float: "0 4px 14px rgba(22,22,29,.18)",
        cta: "0 6px 18px rgba(61,61,216,.35)",
        pin: "0 10px 24px rgba(22,22,29,.35)",
      },
      fontFamily: {
        sans: ["Inter", "SF Pro Text", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(.22,1,.36,1)",
      },
      keyframes: {
        chev: {
          "0%": { transform: "translateY(9px)", opacity: "0" },
          "22%": { opacity: "1" },
          "78%": { opacity: "1" },
          "100%": { transform: "translateY(-9px)", opacity: "0" },
        },
        halo: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.16" },
          "50%": { transform: "scale(1.45)", opacity: "0.07" },
        },
        "pin-pulse": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "70%, 100%": { transform: "scale(1.55)", opacity: "0" },
        },
      },
      animation: {
        chev: "chev 1.8s ease-in-out infinite",
        halo: "halo 2.4s cubic-bezier(.22,1,.36,1) infinite",
        "pin-pulse": "pin-pulse 2.2s cubic-bezier(.22,1,.36,1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
