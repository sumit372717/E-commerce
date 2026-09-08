import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink">Terms & Conditions</h1>
      <p className="text-muted mt-2">Last updated: August 2026</p>
      
      <div className="mt-8 space-y-6">
        <div>
          <h2 className="font-display text-xl font-bold text-ink">1. Acceptance of Terms</h2>
          <p className="text-muted mt-2">
            By using CircuitForge, you agree to these terms and conditions.
          </p>
        </div>
        
        <div>
          <h2 className="font-display text-xl font-bold text-ink">2. Orders and Payments</h2>
          <p className="text-muted mt-2">
            All orders are subject to availability. Payment must be completed before order processing.
          </p>
        </div>
        
        <div>
          <h2 className="font-display text-xl font-bold text-ink">3. Shipping</h2>
          <p className="text-muted mt-2">
            Shipping times are estimates. We are not responsible for delays caused by shipping carriers.
          </p>
        </div>
        
        <div>
          <h2 className="font-display text-xl font-bold text-ink">4. Returns</h2>
          <p className="text-muted mt-2">
            Returns are accepted within 30 days of delivery. Items must be in original condition.
          </p>
        </div>
      </div>
      
      <Link href="/" className="mt-8 inline-block bg-trace px-6 py-3 text-base font-semibold hover:opacity-80">
        ← Back to Home
      </Link>
    </div>
  );
}