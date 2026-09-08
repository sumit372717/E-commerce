import Link from "next/link";

const footerColumns = [
  {
    heading: "Shop",
    links: [
      { label: "Components", href: "/category/component" },
      { label: "Desktops", href: "/category/desktop" },
      { label: "Laptops", href: "/category/laptop" },
      { label: "Monitors", href: "/category/monitor" },
      { label: "Custom Builds", href: "/custom-builds" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Centre", href: "/help" },
      { label: "Track Order", href: "/track-order" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Business Accounts", href: "/business" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy & Cookies", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface text-sm">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-ink">
            <span className="flex h-7 w-7 items-center justify-center border border-trace text-trace">
              <span className="pin-dot" />
            </span>
            Circuit<span className="text-trace">Forge</span>
          </Link>
          <p className="mt-4 max-w-xs text-xs text-muted">
            CircuitForge Ltd, Unit 4 Foundry Court, Leeds, LS1 4AP, UK
          </p>
          <div className="mt-4 flex gap-3 text-muted">
            {["FB", "X", "IG", "YT"].map((s) => (
              <span
                key={s}
                className="flex h-7 w-7 items-center justify-center border border-line text-[10px] hover:border-trace hover:text-trace"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.heading}>
            <h3 className="font-mono text-xs uppercase tracking-wide text-ink">
              {col.heading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted hover:text-trace">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="trace-rule" />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-muted sm:flex-row">
        <p>&copy; {new Date().getFullYear()} CircuitForge Ltd. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span>Visa</span>
          <span>Mastercard</span>
          <span>PayPal</span>
          <span>Apple Pay</span>
          <span>Bitcoin</span>
        </div>
      </div>
    </footer>
  );
}