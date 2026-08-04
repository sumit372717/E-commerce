"use client";

import { useState } from "react";

const positions = [
  {
    id: "tech-1",
    title: "Senior PC Bench Assembly Technician",
    department: "Engineering",
    location: "Leeds, UK (On-site)",
    type: "Full-time",
  },
  {
    id: "tech-2",
    title: "Custom Water-Cooling Specialist",
    department: "Engineering",
    location: "Leeds, UK (On-site)",
    type: "Full-time",
  },
  {
    id: "sales-1",
    title: "B2B Hardware Account Manager",
    department: "Sales",
    location: "Hybrid (Leeds/Remote)",
    type: "Full-time",
  },
  {
    id: "dev-1",
    title: "Frontend E-commerce Developer",
    department: "Software",
    location: "Remote",
    type: "Full-time",
  },
];

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-ink">
      <div>
        <h1 className="font-display text-3xl font-bold">Join the CircuitForge Team</h1>
        <p className="mt-2 text-muted">
          Build high-performance computing hardware alongside hardware engineers and system architects.
        </p>
      </div>

      {/* Open Roles List */}
      <div className="mt-10 space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-wider text-muted">Open Positions ({positions.length})</h2>
        {positions.map((pos) => (
          <div
            key={pos.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-line bg-surface p-5 gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-line/80 px-2 py-0.5 text-[10px] font-mono text-muted">{pos.department}</span>
                <span className="text-xs text-muted">• {pos.location}</span>
              </div>
              <h3 className="mt-1 font-bold text-ink">{pos.title}</h3>
            </div>
            <button
              onClick={() => { setSelectedRole(pos.title); setApplied(false); }}
              className="rounded border border-line bg-background px-4 py-2 text-xs font-semibold hover:border-trace hover:text-trace transition-colors"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Application Form */}
      {selectedRole && (
        <div className="mt-10 rounded-xl border border-trace/40 bg-surface p-6">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h3 className="font-bold text-ink">Applying for: <span className="text-trace">{selectedRole}</span></h3>
            <button onClick={() => setSelectedRole(null)} className="text-xs text-muted hover:text-ink">Close</button>
          </div>

          {applied ? (
            <p className="mt-4 text-sm text-trace">Application submitted! Our recruitment team will review your CV shorty.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setApplied(true); }} className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-muted mb-1">Full Name</label>
                  <input required type="text" className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted mb-1">Email Address</label>
                  <input required type="email" className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted mb-1">LinkedIn Profile or Portfolio URL</label>
                <input required type="url" placeholder="https://" className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace" />
              </div>
              <button type="submit" className="rounded bg-trace px-6 py-2.5 text-xs font-bold text-surface hover:opacity-90">
                Submit Application
              </button>
            </form>
          )}
        </div>
      )}
    </main>
  );
}