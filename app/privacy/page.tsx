"use client";

import { useState } from "react";

export default function PrivacyPage() {
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: true,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-ink">
      <div className="border-b border-line pb-8">
        <span className="font-mono text-xs uppercase tracking-wider text-trace">Legal & Compliance</span>
        <h1 className="mt-2 font-display text-3xl font-bold">Privacy Policy & Cookie Preferences</h1>
        <p className="mt-2 text-sm text-muted">Last updated: August 2026</p>
      </div>

      {/* Cookie Settings Panel */}
      <section className="mt-8 rounded-xl border border-trace/40 bg-surface p-6">
        <h2 className="font-display text-xl font-bold">Manage Cookie Preferences</h2>
        <p className="mt-1 text-xs text-muted">
          We use cookies to optimize performance, customize your hardware shopping experience, and analyze site traffic.
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-line bg-background p-4">
            <div>
              <p className="font-bold text-sm">Essential Cookies</p>
              <p className="text-xs text-muted">Required for shopping cart, checkout, and account login functions.</p>
            </div>
            <span className="rounded bg-line/80 px-2.5 py-1 text-[10px] font-mono text-muted">Always Active</span>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-line bg-background p-4">
            <div>
              <p className="font-bold text-sm">Analytics & Diagnostic Cookies</p>
              <p className="text-xs text-muted">Helps us measure site performance and fix system errors.</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
              className="h-4 w-4 accent-trace cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-line bg-background p-4">
            <div>
              <p className="font-bold text-sm">Marketing & Personalized Offer Cookies</p>
              <p className="text-xs text-muted">Used to serve relevant hardware deals and custom rig recommendations.</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
              className="h-4 w-4 accent-trace cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handleSave}
            className="rounded bg-trace px-6 py-2.5 text-xs font-bold text-surface hover:opacity-90"
          >
            Save Preferences
          </button>
          {saved && <span className="text-xs text-trace">Preferences updated successfully!</span>}
        </div>
      </section>

      {/* Policy Details */}
      <section className="mt-12 space-y-8 text-sm leading-relaxed text-muted">
        <div>
          <h3 className="font-bold text-ink text-lg mb-2">1. Data Collection & Usage</h3>
          <p>
            CircuitForge Ltd collects personal information necessary to process orders, fulfill warranty services, and deliver custom PC builds. This includes your name, delivery address, email, phone number, and hardware configuration choices.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-ink text-lg mb-2">2. Data Security & Storage</h3>
          <p>
            All payment transactions are encrypted via TLS 1.3 standards and processed through tier-1 payment gateways (Visa, Mastercard, PayPal). We do not store raw credit or debit card details on our local servers.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-ink text-lg mb-2">3. Your GDPR & Privacy Rights</h3>
          <p>
            UK and EU residents have the right to request access to, deletion of, or correction of their personal data held by CircuitForge. To exercise these rights, contact our Data Protection Officer at privacy@circuitforge.co.uk.
          </p>
        </div>
      </section>
    </main>
  );
}