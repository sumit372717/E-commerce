"use client";

export default function WarrantyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-ink">
      <h1 className="font-display text-3xl font-bold">Warranty & Service Policy</h1>
      <p className="mt-2 text-muted">Comprehensive hardware protection engineered into every product.</p>

      {/* Coverage Tiers */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface p-6">
          <span className="rounded bg-line px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-muted">Standard Component</span>
          <h3 className="mt-3 text-xl font-bold">3-Year Manufacturer Warranty</h3>
          <p className="mt-2 text-sm text-muted">
            All individual components (GPUs, CPUs, RAM, PSUs) come backed by original manufacturer warranties with direct RMA replacement through CircuitForge.
          </p>
        </div>

        <div className="rounded-xl border border-trace/40 bg-surface p-6">
          <span className="rounded bg-trace/20 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-trace">Pre-Built Rig</span>
          <h3 className="mt-3 text-xl font-bold">3-Year CircuitForge Care</h3>
          <p className="mt-2 text-sm text-muted">
            Includes 3 years parts and labor coverage, lifetime technical support, and free courier collection for repairs.
          </p>
        </div>
      </div>

      {/* Warranty Lookup Form */}
      <div className="mt-10 rounded-xl border border-line bg-surface p-6">
        <h2 className="font-display text-lg font-bold">Check Serial Number Warranty Status</h2>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter Product Serial Number (S/N)"
            className="flex-1 rounded border border-line bg-background px-4 py-2 text-sm outline-none focus:border-trace"
          />
          <button className="rounded bg-trace px-6 py-2 text-sm font-semibold text-surface hover:opacity-90">
            Verify Coverage
          </button>
        </div>
      </div>
    </main>
  );
}