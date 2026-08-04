"use client";

import { useState } from "react";

export default function AffiliatePage() {
  const [joined, setJoined] = useState(false);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-ink">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold">CircuitForge Partner Program</h1>
        <p className="mt-2 text-sm text-muted">
          Earn competitive commissions by reviewing and promoting PC hardware and custom rigs.
        </p>
      </div>

      {/* Program Details Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-3 text-center">
        <div className="rounded-xl border border-line bg-surface p-6">
          <p className="font-mono text-2xl font-bold text-trace">Up to 5%</p>
          <p className="mt-1 font-semibold text-sm">Commission Rate</p>
          <p className="mt-2 text-xs text-muted">High average order value on custom rigs (£1,500+).</p>
        </div>
        <div className="rounded-xl border border-line bg-surface p-6">
          <p className="font-mono text-2xl font-bold text-trace">30-Day</p>
          <p className="mt-1 font-semibold text-sm">Cookie Window</p>
          <p className="mt-2 text-xs text-muted">Get credited for purchases made within 30 days of click.</p>
        </div>
        <div className="rounded-xl border border-line bg-surface p-6">
          <p className="font-mono text-2xl font-bold text-trace">Monthly</p>
          <p className="mt-1 font-semibold text-sm">Automated Payouts</p>
          <p className="mt-2 text-xs text-muted">Direct bank transfers with live dashboard analytics.</p>
        </div>
      </div>

      {/* Application Form */}
      <div className="mt-12 rounded-xl border border-line bg-surface p-6 max-w-xl mx-auto">
        <h2 className="font-display text-lg font-bold mb-4 text-center">Apply to Join</h2>

        {joined ? (
          <div className="rounded border border-trace/30 bg-trace/10 p-4 text-center text-trace text-sm">
            Partner application received! Check your inbox for affiliate dashboard access details.
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setJoined(true); }} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Channel / Website Name</label>
              <input required type="text" placeholder="e.g. HardwareTech Reviews" className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Primary Platform Link (YouTube, Twitch, Website)</label>
              <input required type="url" placeholder="https://" className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Email Address</label>
              <input required type="email" placeholder="you@channel.com" className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace" />
            </div>
            <button type="submit" className="w-full rounded bg-trace py-2.5 text-sm font-bold text-surface hover:opacity-90">
              Apply as Partner
            </button>
          </form>
        )}
      </div>
    </main>
  );
}