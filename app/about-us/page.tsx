export default function AboutUsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-ink">
      {/* Hero Header */}
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-wider text-trace">Established 2010</span>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Engineered for Performance. Built for Enthusiasts.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          CircuitForge started in a workshop in Leeds with a single mission: to eliminate system bottlenecks and deliver benchmark-ready custom rigs and verified component hardware across the UK.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="mt-12 grid grid-cols-2 gap-4 rounded-xl border border-line bg-surface p-6 sm:grid-cols-4">
        <div>
          <p className="font-display text-3xl font-bold text-trace">14+</p>
          <p className="mt-1 text-xs text-muted">Years of System Tuning</p>
        </div>
        <div>
          <p className="font-display text-3xl font-bold text-trace">45k+</p>
          <p className="mt-1 text-xs text-muted">Rigs Assembled</p>
        </div>
        <div>
          <p className="font-display text-3xl font-bold text-trace">4.8 / 5</p>
          <p className="mt-1 text-xs text-muted">Average User Rating</p>
        </div>
        <div>
          <p className="font-display text-3xl font-bold text-trace">24-Hr</p>
          <p className="mt-1 text-xs text-muted">Stress-Test Protocol</p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="mt-16 space-y-8">
        <h2 className="font-display text-2xl font-bold">The CircuitForge Standard</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-line bg-surface p-6">
            <h3 className="font-bold">Zero Bloatware</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Every custom machine comes with a clean OS installation, fully updated drivers, and zero background telemetry software.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-6">
            <h3 className="font-bold">Thermal Optimization</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              We test thermal dynamics and fan curve profiles individually to ensure high boost clock stability without high noise.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-6">
            <h3 className="font-bold">Traceable Components</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              All parts are sourced directly from authorized UK distributors with verified serial numbers and original warranties.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}