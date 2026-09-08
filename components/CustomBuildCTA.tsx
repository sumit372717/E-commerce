import Link from "next/link";
import SectionHeader from "./SectionHeader";

const steps = [
  { label: "Choose a base chassis", detail: "Mini-ITX to full tower" },
  { label: "Pick CPU + GPU pairing", detail: "Compatibility checked live" },
  { label: "We build & burn-in test", detail: "48-hour stability run" },
  { label: "Shipped fully cabled", detail: "Ready to power on" },
];

export default function CustomBuildCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeader
        eyebrow="Configure to order"
        title="Custom Built PCs"
        description="Pick every part, or hand us a budget and a use case — either way, it's built on our bench and stress-tested before it ships."
        href="/custom-builds"
        linkLabel="Start a build"
      />

      <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div key={step.label} className="bg-surface p-6">
            <span className="font-mono text-xs text-trace">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-sm font-semibold text-ink">{step.label}</h3>
            <p className="mt-1 text-xs text-muted">{step.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 border border-line bg-surface p-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-ink">Not sure where to start?</p>
          <p className="text-xs text-muted">
            Answer four questions and we&apos;ll suggest a parts list within your budget.
          </p>
        </div>
        <Link
          href="/custom-builds"
          className="whitespace-nowrap border border-trace bg-trace px-5 py-2.5 text-sm font-semibold text-base hover:opacity-90"
        >
          Guided Build →
        </Link>
      </div>
    </section>
  );
}