"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectContextValue {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  labelMap: Map<string, string>;
  registerLabel: (value: string, label: string) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("Select components must be used within <Select>");
  return ctx;
}

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

function Select({
  value = "",
  onValueChange = () => {},
  children,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [labelMap] = React.useState(() => new Map<string, string>());
  const containerRef = React.useRef<HTMLDivElement>(null);

  const registerLabel = React.useCallback(
    (val: string, label: string) => {
      labelMap.set(val, label);
    },
    [labelMap],
  );

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SelectContext.Provider
      value={{ value, onValueChange, open, setOpen, labelMap, registerLabel }}
    >
      <div ref={containerRef} className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

function SelectTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open, setOpen } = useSelectContext();
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-xl px-3.5 py-2 text-sm",
        "bg-white/[0.04] border border-white/10 text-[var(--color-text-primary)]",
        "transition-colors duration-200 outline-none",
        "focus:border-[var(--color-coral)]/50 focus:ring-2 focus:ring-[var(--color-coral)]/20",
        className,
      )}
    >
      {children}
      <ChevronDown
        size={16}
        className={cn(
          "text-[var(--color-text-muted)] transition-transform duration-200",
          open && "rotate-180",
        )}
      />
    </button>
  );
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value, labelMap } = useSelectContext();
  const label = value ? (labelMap.get(value) ?? value) : "";
  return (
    <span className={cn(!value && "text-[var(--color-text-muted)]")}>
      {label || placeholder}
    </span>
  );
}

function SelectContent({ children }: { children: React.ReactNode }) {
  const { open } = useSelectContext();
  if (!open) return null;
  return (
    <div
      className={cn(
        "absolute left-0 top-full z-[9999] mt-2 w-full rounded-xl",
        "border border-white/10 bg-[#0a0d17]/95 backdrop-blur-xl",
        "shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]",
        "py-1.5 max-h-64 overflow-y-auto custom-scrollbar",
      )}
      style={{ animation: "slide-fade-in 0.15s ease-out" }}
    >
      {children}
    </div>
  );
}

function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const {
    value: selected,
    onValueChange,
    setOpen,
    registerLabel,
  } = useSelectContext();
  const label = typeof children === "string" ? children : value;

  React.useEffect(() => {
    registerLabel(value, label);
  }, [value, label, registerLabel]);

  const isSelected = selected === value;

  return (
    <button
      type="button"
      onClick={() => {
        onValueChange(value);
        setOpen(false);
      }}
      className={cn(
        "flex w-full items-center justify-between gap-2 px-3.5 py-2.5 text-sm text-left",
        "text-[var(--color-text-secondary)] hover:bg-white/[0.06] hover:text-[var(--color-text-primary)]",
        "transition-colors duration-150",
        isSelected && "text-[var(--color-text-primary)]",
      )}
    >
      {children}
      {isSelected && <Check size={14} className="text-[var(--color-coral)]" />}
    </button>
  );
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
