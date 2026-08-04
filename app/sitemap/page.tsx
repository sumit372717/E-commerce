import Link from "next/link";

const siteMapSections = [
  {
    category: "Shop Categories",
    links: [
      { label: "Components & Hardware", href: "/category/component" },
      { label: "Pre-Built Desktops", href: "/category/desktop" },
      { label: "Gaming Laptops", href: "/category/laptop" },
      { label: "High-Refresh Monitors", href: "/category/monitor" },
      { label: "Custom PC Builder", href: "/build" },
    ],
  },
  {
    category: "Customer Support",
    links: [
      { label: "Help Centre & FAQ", href: "/help" },
      { label: "Track Your Shipment", href: "/track-order" },
      { label: "Returns & RMA Request", href: "/returns" },
      { label: "Warranty & Service Policy", href: "/warranty" },
      { label: "Contact Technical Support", href: "/contact" },
    ],
  },
  {
    category: "Company & Corporate",
    links: [
      { label: "About CircuitForge", href: "/about-us" },
      { label: "Careers & Engineering Jobs", href: "/careers" },
      { label: "Business & Enterprise Accounts", href: "/business" },
      { label: "Affiliate Partner Program", href: "/affiliates" },
      { label: "Verified Reviews", href: "/reviews" },
    ],
  },
  {
    category: "Legal & Policies",
    links: [
      { label: "Privacy & Cookies", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "HTML Sitemap Index", href: "/sitemap" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-ink">
      <div className="border-b border-line pb-8">
        <h1 className="font-display text-3xl font-bold">Site Directory</h1>
        <p className="mt-2 text-sm text-muted">Complete index of pages across the CircuitForge platform.</p>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {siteMapSections.map((sec) => (
          <div key={sec.category} className="rounded-xl border border-line bg-surface p-6">
            <h2 className="font-mono text-xs uppercase tracking-wider text-trace font-bold mb-4">
              {sec.category}
            </h2>
            <ul className="space-y-3">
              {sec.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-ink hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}