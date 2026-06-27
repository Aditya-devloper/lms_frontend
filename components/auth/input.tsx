import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-xl px-3.5 py-2 text-sm",
        "bg-white/[0.04] border border-white/10 text-[var(--color-text-primary)]",
        "placeholder:text-[var(--color-text-muted)]",
        "transition-colors duration-200 outline-none",
        "focus:outline-none focus:ring-0",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
