import { ArrowRight } from "lucide-react";
import PipelineVisual from "./PipelineVisual";

export default function Hero() {
  return (
    <section className="relative pt-36 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-[var(--color-text-secondary)] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-mint)]" />
          Built for teams who are still using Excel for leads
        </div>

        <h1 className="font-display font-semibold text-[2.5rem] sm:text-6xl lg:text-[4.2rem] leading-[1.05] tracking-tight text-gradient">
          Every lead deserves
          <br />a follow-up.{" "}
          <span className="text-[var(--color-coral)]">
            Not a forgotten tab.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed">
          Leado tracks every lead from first contact to closed deal with
          reminders that actually fire, so nothing slips through a spreadsheet
          again.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={"/dashboard"}
            className="w-full sm:w-auto font-medium bg-[var(--color-coral)] text-white rounded-full px-6 py-3.5 flex items-center justify-center gap-2 hover:brightness-110 transition-all"
          >
            Start free — no card needed
            <ArrowRight size={16} />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto font-medium glass rounded-full px-6 py-3.5 flex items-center justify-center hover:bg-[var(--color-surface-hover)] transition-colors text-[var(--color-text-primary)]"
          >
            See how it works
          </a>
        </div>

        <p className="mt-4 text-xs text-[var(--color-text-muted)]">
          14-day free trial · Cancel anytime · Setup takes 5 minutes
        </p>
      </div>

      <div className="mt-16 sm:mt-20">
        <PipelineVisual />
      </div>
    </section>
  );
}
