"use client";

import { Check, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const included = [
  "Unlimited leads",
  "Follow-up reminders",
  "CSV import & export",
  "Lead activity history",
  "Notes on every lead",
  "Dashboard & insights",
];

export default function Pricing() {
  const router = useRouter();

  const handleAuthRedirect = () => {
    const token = localStorage.getItem("token");

    if (token) {
      window.location.href = "/dashboard";
    } else {
      router.push("/login");
    }
  };

  return (
    <section id="pricing" className="relative px-4 sm:px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium text-[var(--color-coral)] tracking-wide uppercase mb-3">
            Pricing
          </p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
            Simple pricing. No surprise tiers.
          </h2>
          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
            Try everything free for 14 days. Keep going for less than a coffee a
            week.
          </p>
        </div>

        <div className="glass-strong rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--color-coral)" }}
          />
          <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <p className="font-display font-medium text-lg">Leado Pro</p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Everything you need to never lose a lead again
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-1.5 sm:justify-end">
                <span className="font-display font-semibold text-4xl">
                  ₹599
                </span>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  /month
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Billed monthly · No setup fee
              </p>
            </div>
          </div>

          <div className="relative grid sm:grid-cols-2 gap-3 mb-8">
            {included.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[var(--color-mint-soft)] flex items-center justify-center flex-shrink-0">
                  <Check size={12} color="var(--color-mint)" strokeWidth={3} />
                </span>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <a
            onClick={handleAuthRedirect}
            className="relative w-full cursor-pointer font-medium bg-[var(--color-coral)] text-white rounded-full px-6 py-3.5 flex items-center justify-center gap-2 hover:brightness-110 transition-all"
          >
            Start your 14-day free trial
            <ArrowRight size={16} />
          </a>
          <p className="relative text-center text-xs text-[var(--color-text-muted)] mt-3">
            No credit card required to start
          </p>
        </div>
      </div>
    </section>
  );
}
