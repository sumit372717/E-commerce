"use client";

import { useState } from "react";

export default function BusinessPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-ink">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-trace">CircuitForge Enterprise</span>
          <h1 className="mt-2 font-display text-3xl font-bold">Hardware Procurement for Teams & Studios</h1>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            Equip your engineering, rendering, or game development studio with custom workstation builds and bulk hardware procurement under dedicated credit terms.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-lg border border-line bg-surface p-4">
              <h4 className="font-bold text-sm">30-Day Net Credit Terms</h4>
              <p className="text-xs text-muted mt-1">Flexible credit accounts available for VAT-registered businesses.</p>
            </div>
            <div className="rounded-lg border border-line bg-surface p-4">
              <h4 className="font-bold text-sm">Dedicated Hardware Account Manager</h4>
              <p className="text-xs text-muted mt-1">Direct contact for rapid order quotes and custom spec consultations.</p>
            </div>
            <div className="rounded-lg border border-line bg-surface p-4">
              <h4 className="font-bold text-sm">Bulk Volume Discounts</h4>
              <p className="text-xs text-muted mt-1">Tiered pricing for orders of 5+ workstation rigs or server nodes.</p>
            </div>
          </div>
        </div>

        {/* B2B Application Form */}
        <div className="rounded-xl border border-line bg-surface p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold mb-4">Apply for a Business Account</h2>

          {submitted ? (
            <div className="rounded border border-trace/30 bg-trace/10 p-4 text-trace text-sm">
              Business registration received! An enterprise account manager will contact you within 1 business day.
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted mb-1">Company Registered Name</label>
                <input required type="text" placeholder="e.g. Acme Render Studios Ltd" className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-muted mb-1">VAT / Company Reg No.</label>
                  <input required type="text" placeholder="GB12345678" className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted mb-1">Work Email</label>
                  <input required type="email" placeholder="procurement@company.com" className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted mb-1">Estimated Monthly Hardware Spend</label>
                <select className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace">
                  <option>Under £5,000</option>
                  <option>£5,000 – £20,000</option>
                  <option>£20,000 – £50,000</option>
                  <option>£50,000+</option>
                </select>
              </div>
              <button type="submit" className="w-full rounded bg-trace py-2.5 text-sm font-bold text-surface hover:opacity-90">
                Submit Business Request
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}