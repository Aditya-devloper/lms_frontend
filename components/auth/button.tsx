import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "sm" | "default" | "lg";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-[var(--color-coral)] text-white hover:brightness-110 shadow-[0_8px_24px_-8px_rgba(255,107,74,0.5)]",
  outline:
    "bg-transparent border border-white/15 text-[var(--color-text-primary)] hover:bg-white/[0.06]",
  ghost:
    "bg-transparent text-[var(--color-text-secondary)] hover:bg-white/[0.06]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  default: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium",
        "transition-all duration-200 outline-none whitespace-nowrap cursor-pointer",
        "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
        "focus-visible:ring-2 focus-visible:ring-[var(--color-coral)]/40",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

export { Button };
