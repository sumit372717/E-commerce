"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function BusinessPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBusinessUser, setIsBusinessUser] = useState(false);
  const [businessData, setBusinessData] = useState<any>(null);

  const [form, setForm] = useState({
    companyName: "",
    taxId: "",
    vatNumber: "",
    address: "",
    phone: "",
    website: "",
    businessType: "retail",
    estimatedMonthlyOrder: "0-1000",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      
      if (!user) {
        router.push('/login');
        return;
      }
      
      setUser(user);

      fetch(`/api/business?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.id) {
            setIsBusinessUser(true);
            setBusinessData(data);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };
    
    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          ...form,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Business account registered successfully!");
        setIsBusinessUser(true);
        setBusinessData(data);
      } else {
        setMessage(data.error || "Failed to register business account");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (isBusinessUser && businessData) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-ink">Business Dashboard</h1>
        <p className="text-muted mt-2">Welcome, {businessData.companyName}</p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="border border-line bg-surface p-6">
            <p className="text-sm text-muted">Account Status</p>
            <p className="text-2xl font-bold text-green-600 capitalize">{businessData.status || 'active'}</p>
          </div>
          <div className="border border-line bg-surface p-6">
            <p className="text-sm text-muted">Business Type</p>
            <p className="text-2xl font-bold text-ink capitalize">{businessData.businessType}</p>
          </div>
          <div className="border border-line bg-surface p-6">
            <p className="text-sm text-muted">Tax ID</p>
            <p className="text-2xl font-bold text-ink">{businessData.taxId || 'Not provided'}</p>
          </div>
        </div>

        <div className="mt-8 border border-line bg-surface p-6">
          <h3 className="font-display text-xl font-bold text-ink">Company Details</h3>
          <dl className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted">Company Name</dt>
              <dd className="text-ink">{businessData.companyName}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">VAT Number</dt>
              <dd className="text-ink">{businessData.vatNumber || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Phone</dt>
              <dd className="text-ink">{businessData.phone || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Website</dt>
              <dd className="text-ink">{businessData.website || 'Not provided'}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm text-muted">Address</dt>
              <dd className="text-ink">{businessData.address || 'Not provided'}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 border border-line bg-surface p-6">
          <h3 className="font-display text-xl font-bold text-ink">Business Benefits</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink">
            <li>✅ Bulk pricing on orders over ₹50,000</li>
            <li>✅ Dedicated account manager</li>
            <li>✅ Net 30 payment terms available</li>
            <li>✅ Tax invoices for all purchases</li>
            <li>✅ Priority support</li>
          </ul>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block bg-trace px-6 py-3 text-base font-semibold hover:opacity-80"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink">Business Account</h1>
      <p className="text-muted mt-2">
        Register your business for wholesale pricing and bulk discounts.
      </p>

      {message && (
        <div className={`mt-4 border p-3 ${
          message.includes('✅') ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-600'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink">Company Name *</label>
          <input
            type="text"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-ink">Tax ID</label>
            <input
              type="text"
              value={form.taxId}
              onChange={(e) => setForm({ ...form, taxId: e.target.value })}
              className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">VAT Number</label>
            <input
              type="text"
              value={form.vatNumber}
              onChange={(e) => setForm({ ...form, vatNumber: e.target.value })}
              className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">Business Address</label>
          <textarea
            rows={2}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace resize-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-ink">Phone Number</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">Website</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">Business Type</label>
          <select
            value={form.businessType}
            onChange={(e) => setForm({ ...form, businessType: e.target.value })}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
          >
            <option value="retail">Retail</option>
            <option value="wholesale">Wholesale</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">Estimated Monthly Order Value</label>
          <select
            value={form.estimatedMonthlyOrder}
            onChange={(e) => setForm({ ...form, estimatedMonthlyOrder: e.target.value })}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
          >
            <option value="0-1000">₹0 - ₹1,000</option>
            <option value="1000-5000">₹1,000 - ₹5,000</option>
            <option value="5000-10000">₹5,000 - ₹10,000</option>
            <option value="10000-50000">₹10,000 - ₹50,000</option>
            <option value="50000+">₹50,000+</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-trace px-6 py-3 text-base font-semibold hover:opacity-80 disabled:opacity-50"
        >
          {submitting ? "Registering..." : "Register Business Account"}
        </button>

        <p className="text-xs text-muted text-center">
          By registering, you agree to our business terms and conditions.
        </p>
      </form>
    </div>
  );
}