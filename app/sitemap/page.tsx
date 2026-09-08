import Link from "next/link";

export default function SitemapPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink">Sitemap</h1>
      
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-bold text-ink">Pages</h2>
          <ul className="mt-4 space-y-2">
            <li><Link href="/" className="text-trace hover:underline">Home</Link></li>
            <li><Link href="/cart" className="text-trace hover:underline">Cart</Link></li>
            <li><Link href="/checkout" className="text-trace hover:underline">Checkout</Link></li>
            <li><Link href="/login" className="text-trace hover:underline">Login</Link></li>
            <li><Link href="/register" className="text-trace hover:underline">Register</Link></li>
            <li><Link href="/track-order" className="text-trace hover:underline">Track Order</Link></li>
          </ul>
        </div>
        
        <div>
          <h2 className="font-display text-xl font-bold text-ink">Categories</h2>
          <ul className="mt-4 space-y-2">
            <li><Link href="/category/desktop" className="text-trace hover:underline">Desktop</Link></li>
            <li><Link href="/category/laptop" className="text-trace hover:underline">Laptop</Link></li>
            <li><Link href="/category/component" className="text-trace hover:underline">Component</Link></li>
            <li><Link href="/category/monitor" className="text-trace hover:underline">Monitor</Link></li>
            <li><Link href="/category/networking" className="text-trace hover:underline">Networking</Link></li>
          </ul>
        </div>
        
        <div>
          <h2 className="font-display text-xl font-bold text-ink">AI Tools</h2>
          <ul className="mt-4 space-y-2">
            <li><Link href="/ai/bottleneck-analyzer" className="text-trace hover:underline">Bottleneck Analyzer</Link></li>
            <li><Link href="/ai/compatibility-checker" className="text-trace hover:underline">Compatibility Checker</Link></li>
            <li><Link href="/ai/upgrade-planner" className="text-trace hover:underline">Upgrade Planner</Link></li>
          </ul>
        </div>
        
        <div>
          <h2 className="font-display text-xl font-bold text-ink">Legal</h2>
          <ul className="mt-4 space-y-2">
            <li><Link href="/privacy" className="text-trace hover:underline">Privacy & Cookies</Link></li>
            <li><Link href="/terms" className="text-trace hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>
      
      <Link href="/" className="mt-8 inline-block bg-trace px-6 py-3 text-base font-semibold hover:opacity-80">
        ← Back to Home
      </Link>
    </div>
  );
}