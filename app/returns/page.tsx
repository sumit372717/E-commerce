"use client";

import { useState } from "react";

export default function ReturnsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-ink">
      <h1 className="font-display text-3xl font-bold">Returns & Exchanges</h1>
      <p className="mt-2 text-muted">30-day return policy for standard hardware and components.</p>

      {/* Overview Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-line bg-surface p-5">
          <h3 className="font-bold text-sm">30-Day Window</h3>
          <p className="mt-1 text-xs text-muted">Return unopened components within 30 days for a full refund.</p>
        </div>
        <div className="rounded-lg border border-line bg-surface p-5">
          <h3 className="font-bold text-sm">Free UK Returns</h3>
          <p className="mt-1 text-xs text-muted">Prepaid DPD collection labels provided for defective parts.</p>
        </div>
        <div className="rounded-lg border border-line bg-surface p-5">
          <h3 className="font-bold text-sm">Custom Build Guarantee</h3>
          <p className="mt-1 text-xs text-muted">14-day remorse period on custom PC builds subject to restock fee.</p>
        </div>
      </div>

      {/* Return Form */}
      <div className="mt-10 rounded-xl border border-line bg-surface p-6">
        <h2 className="font-display text-xl font-bold mb-4">Submit a Return Request (RMA)</h2>
        
        {submitted ? (
          <div className="rounded border border-trace/30 bg-trace/10 p-4 text-trace text-sm">
            RMA ticket submitted successfully. Check your email for return shipping labels and instructions.
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-muted mb-1">Order ID</label>
                <input required type="text" placeholder="CF-XXXXX" className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-muted mb-1">Serial Number / Part ID</label>
                <input required type="text" placeholder="Optional for general items" className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-muted mb-1">Reason for Return</label>
              <select className="w-full rounded border border-line bg-background px-3 py-2 text-sm text-ink outline-none focus:border-trace">
                <option>Item defective / DOA</option>
                <option>Ordered incorrect part</option>
                <option>Incompatible hardware</option>
                <option>No longer needed</option>
              </select>
            </div>
            <button type="submit" className="rounded bg-trace px-6 py-2.5 text-sm font-semibold text-surface hover:opacity-90">
              Generate Return Label
            </button>
          </form>
        )}
      </div>
    </main>
  );
}