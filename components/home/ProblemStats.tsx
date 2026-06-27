export default function ProblemStats() {
  return (
    <section className="relative px-4 sm:px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="glass rounded-3xl p-8 sm:p-12 grid sm:grid-cols-3 gap-8 sm:gap-6 text-center">
          <div>
            <p className="font-display font-semibold text-4xl sm:text-5xl text-[var(--color-coral)]">
              62%
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
              of small sales teams in India still track leads on spreadsheets
            </p>
          </div>
          <div>
            <p className="font-display font-semibold text-4xl sm:text-5xl text-[var(--color-mint)]">
              4-6
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
              channels leads come in from Insta, calls, referrals, walk-ins
            </p>
          </div>
          <div>
            <p className="font-display font-semibold text-4xl sm:text-5xl text-[var(--color-indigo)]">
              1 in 3
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
              leads go cold simply because nobody followed up in time
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
