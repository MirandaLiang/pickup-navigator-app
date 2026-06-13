import type { ReactNode } from "react";

interface PrimaryButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

/** Primary CTA (Figma: Button / Primary 13:44) — 4 px radius, indigo shadow. */
export function PrimaryButton({ onClick, children, className = "" }: PrimaryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-card bg-primary px-3 py-2 text-base font-semibold tracking-[0.02em] text-white shadow-cta transition-transform duration-150 ease-brand hover:-translate-y-px active:translate-y-0 active:scale-[0.97] ${className}`}
    >
      {children}
    </button>
  );
}
