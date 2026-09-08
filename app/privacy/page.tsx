import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink">Privacy & Cookies</h1>
      <p className="text-muted mt-2">Last updated: August 2026</p>
      
      <div className="mt-8 space-y-6">
        <div>
          <h2 className="font-display text-xl font-bold text-ink">1. Information We Collect</h2>
          <p className="text-muted mt-2">
            We collect information you provide directly, such as your name, email address, and shipping address when you create an account or place an order.
          </p>
        </div>
        
        <div>
          <h2 className="font-display text-xl font-bold text-ink">2. How We Use Your Information</h2>
          <p className="text-muted mt-2">
            We use your information to process orders, send order confirmations, and improve our services.
          </p>
        </div>
        
        <div>
          <h2 className="font-display text-xl font-bold text-ink">3. Cookies</h2>
          <p className="text-muted mt-2">
            We use cookies to enhance your browsing experience and analyze site traffic.
          </p>
        </div>
        
        <div>
          <h2 className="font-display text-xl font-bold text-ink">4. Contact</h2>
          <p className="text-muted mt-2">
            For privacy concerns, contact us at privacy@circuitforge.com.
          </p>
        </div>
      </div>
      
      <Link href="/" className="mt-8 inline-block bg-trace px-6 py-3 text-base font-semibold hover:opacity-80">
        ← Back to Home
      </Link>
    </div>
  );
}