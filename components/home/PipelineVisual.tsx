"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, CalendarCheck, CheckCircle2 } from "lucide-react";

const stages = [
  { label: "New", icon: MessageCircle, color: "var(--color-indigo)" },
  { label: "Contacted", icon: Phone, color: "#a78bfa" },
  { label: "Site Visit", icon: CalendarCheck, color: "var(--color-coral)" },
  { label: "Closed", icon: CheckCircle2, color: "var(--color-mint)" },
];

export default function PipelineVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % stages.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Lead card */}
      <div className="glass-strong rounded-2xl p-5 mb-8 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-indigo)] to-[var(--color-coral)] flex items-center justify-center font-display font-semibold text-sm text-white">
              RS
            </div>
            <div>
              <p className="font-display font-medium text-[15px] text-[var(--color-text-primary)]">
                Rahul Sharma
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                2BHK · ₹55-60L budget
              </p>
            </div>
          </div>
          <span
            className="text-xs font-medium px-3 py-1 rounded-full transition-colors duration-500"
            style={{
              backgroundColor: `${stages[active].color}22`,
              color: stages[active].color,
            }}
          >
            {stages[active].label}
          </span>
        </div>
        <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
          <p className="text-xs text-[var(--color-text-muted)]">
            Next follow-up · Tomorrow, 11:00 AM
          </p>
          <span className="flex items-center gap-1.5 text-xs text-[var(--color-mint)]">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[var(--color-mint)]"
              style={{ animation: "pulse-dot 1.8s ease-in-out infinite" }}
            />
            Reminder set
          </span>
        </div>
      </div>

      {/* Stage tracker */}
      <div className="flex items-center justify-between relative">
        <div className="absolute top-4 left-0 right-0 h-[1px] bg-[var(--color-border)]" />
        <div
          className="absolute top-4 left-0 h-[1px] transition-all duration-700 ease-out"
          style={{
            width: `${(active / (stages.length - 1)) * 100}%`,
            background:
              "linear-gradient(90deg, var(--color-indigo), var(--color-coral))",
          }}
        />
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          const isActive = i === active;
          const isPast = i < active;
          return (
            <div
              key={stage.label}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border"
                style={{
                  backgroundColor: isActive || isPast ? stage.color : "var(--color-bg-soft)",
                  borderColor: isActive || isPast ? stage.color : "var(--color-border)",
                  transform: isActive ? "scale(1.15)" : "scale(1)",
                }}
              >
                <Icon
                  size={14}
                  strokeWidth={2.25}
                  color={isActive || isPast ? "#0a0d17" : "var(--color-text-muted)"}
                />
              </div>
              <span
                className="text-[11px] font-medium transition-colors duration-500 hidden sm:block"
                style={{
                  color: isActive ? "var(--color-text-primary)" : "var(--color-text-muted)",
                }}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
