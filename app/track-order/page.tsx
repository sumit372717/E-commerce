"use client";

import { useState } from "react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId && email) {
      setSearched(true);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-ink">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight">Track Your Order</h1>
        <p className="mt-2 text-sm text-muted">
          Enter your CircuitForge order reference and email to view your build or shipping status.
        </p>
      </div>

      {/* Lookup Form */}
      <form onSubmit={handleTrack} className="mx-auto mt-8 max-w-md space-y-4 rounded-xl border border-line bg-surface p-6 shadow-sm">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">Order Number</label>
          <input
            type="text"
            required
            placeholder="e.g. CF-94021"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full rounded border border-line bg-background px-4 py-2 text-sm outline-none focus:border-trace"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">Billing Email</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-line bg-background px-4 py-2 text-sm outline-none focus:border-trace"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-trace py-2.5 text-sm font-semibold text-surface transition-opacity hover:opacity-90"
        >
          Locate Order
        </button>
      </form>

      {/* Status Result View */}
      {searched && (
        <div className="mt-12 rounded-xl border border-line bg-surface p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-4 gap-2">
            <div>
              <span className="text-xs text-muted">Order Ref:</span>
              <p className="font-mono font-bold text-ink">{orderId.toUpperCase()}</p>
            </div>
            <div>
              <span className="text-xs text-muted">Estimated Delivery:</span>
              <p className="font-semibold text-trace">2-3 Business Days</p>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="mt-8 grid grid-cols-4 gap-2 text-center text-xs">
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-trace" />
              <p className="font-semibold text-ink">Confirmed</p>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-trace" />
              <p className="font-semibold text-ink">Assembly & Testing</p>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-trace opacity-50" />
              <p className="text-muted">Dispatched</p>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-line" />
              <p className="text-muted">Delivered</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}