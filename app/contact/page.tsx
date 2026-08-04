"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-ink">
      <div className="grid gap-12 lg:grid-cols-2">
        
        {/* Contact Info Details */}
        <div>
          <h1 className="font-display text-3xl font-bold">Get in Touch</h1>
          <p className="mt-2 text-sm text-muted">
            Have a question about component compatibility, custom water-cooling loops, or bulk orders?
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted">Technical Support</h4>
              <p className="mt-1 text-sm font-semibold text-ink">support@circuitforge.co.uk</p>
              <p className="text-xs text-muted">Response time: &lt; 2 hours during business hours</p>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted">Headquarters & Service Centre</h4>
              <p className="mt-1 text-sm font-semibold text-ink">CircuitForge Ltd</p>
              <p className="text-sm text-muted">Unit 4 Foundry Court, Leeds, LS1 4AP, UK</p>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted">Opening Hours</h4>
              <p className="mt-1 text-sm text-muted">Mon – Fri: 09:00 – 18:00 GMT</p>
              <p className="text-sm text-muted">Sat: 10:00 – 16:00 GMT</p>
            </div>
          </div>
        </div>

        {/* Support Message Form */}
        <div className="rounded-xl border border-line bg-surface p-6 shadow-sm">
          <h3 className="font-display text-lg font-bold mb-4">Send a Message</h3>

          {sent ? (
            <div className="rounded border border-trace/30 bg-trace/10 p-4 text-trace text-sm">
              Thank you for reaching out! A CircuitForge technician will respond shortly.
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-muted mb-1">Full Name</label>
                <input required type="text" placeholder="Alex Morgan" className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-muted mb-1">Email Address</label>
                <input required type="email" placeholder="alex@example.com" className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-muted mb-1">Message</label>
                <textarea required rows={4} placeholder="How can our technical team help you?" className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace" />
              </div>
              <button type="submit" className="w-full rounded bg-trace py-2.5 text-sm font-semibold text-surface hover:opacity-90">
                Submit Inquiry
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}