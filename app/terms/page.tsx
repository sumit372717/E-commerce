export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-ink">
      <div className="border-b border-line pb-8">
        <span className="font-mono text-xs uppercase tracking-wider text-trace">Legal & Compliance</span>
        <h1 className="mt-2 font-display text-3xl font-bold">Terms & Conditions</h1>
        <p className="mt-2 text-sm text-muted">Effective Date: January 1, 2026 • CircuitForge Ltd</p>
      </div>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted">
        <div className="rounded-xl border border-line bg-surface p-6">
          <h2 className="font-display text-lg font-bold text-ink mb-3">1. Orders & Pricing</h2>
          <p>
            All prices listed on CircuitForge are in GBP (£) and include VAT where applicable. We reserve the right to modify component pricing at any time prior to order confirmation due to global semiconductor market shifts.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-6">
          <h2 className="font-display text-lg font-bold text-ink mb-3">2. Custom Build Orders</h2>
          <p>
            Custom PC builds enter assembly once payment is verified. Modifications or cancellations after component allocation may incur a restock fee of up to 10% to cover bench testing labor and unboxing costs.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-6">
          <h2 className="font-display text-lg font-bold text-ink mb-3">3. Delivery & Transit Risk</h2>
          <p>
            CircuitForge assumes responsibility for risk of damage or loss during transit until goods are delivered to your designated address by our courier partners (DPD / DHL).
          </p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-6">
          <h2 className="font-display text-lg font-bold text-ink mb-3">4. Hardware Warranties</h2>
          <p>
            Standard components carry full manufacturer warranties. Custom rigs include 3-year CircuitForge Care. Warranty is voided by unauthorized physical modifications, over-volting/bios flashing failures, or liquid damage not caused by custom loops installed directly by us.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-6">
          <h2 className="font-display text-lg font-bold text-ink mb-3">5. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the English courts.
          </p>
        </div>
      </div>
    </main>
  );
}