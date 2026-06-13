import type { ReactNode } from "react";

interface IconButtonProps {
  label: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

/** 46 px circular floating button (Figma: Menu 13:37 / Back 14:14). */
export function IconButton({ label, onClick, children, className = "" }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex size-[46px] items-center justify-center rounded-full bg-white shadow-float transition-transform duration-150 ease-brand active:scale-90 ${className}`}
    >
      {children}
    </button>
  );
}
