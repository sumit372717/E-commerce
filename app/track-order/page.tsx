"use client";

import { useState } from "react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOrder(null);
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`/api/track-order?id=${orderId}&email=${encodeURIComponent(email)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Order not found");
      }

      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return '✅';
      case 'pending': return '⏳';
      case 'processing': return '🔄';
      case 'shipped': return '📦';
      default: return '📋';
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-3xl font-bold text-ink text-center">
        Track Your Order
      </h1>
      <p className="mt-2 text-center text-muted">
        Enter your order ID and email address to check your order status
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="orderId" className="block text-sm font-medium text-ink">
            Order ID *
          </label>
          <input
            id="orderId"
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g., 1, 2, 3..."
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-trace px-6 py-3 text-base font-semibold hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Track Order"}
        </button>
      </form>

      {error && (
        <div className="mt-6 border border-red-500 bg-red-50 p-4">
          <p className="text-red-600">{error}</p>
          {searched && (
            <p className="mt-2 text-sm text-muted">
              Tip: Check your email for the order confirmation with your order ID.
            </p>
          )}
        </div>
      )}

      {order && (
        <div className="mt-8 border border-line bg-surface p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-display text-xl font-bold text-ink">
                Order #{order.id}
              </h2>
              <p className="text-sm text-muted">
                {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </div>
          </div>

          <div className="mt-4 border-t border-line pt-4">
            <h3 className="font-medium text-ink">Order Items</h3>
            <div className="mt-2 space-y-2">
              {order.items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between text-sm py-2 border-b border-line">
                  <span className="text-ink">{item.name} x{item.quantity}</span>
                  <span className="text-ink">৳{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 border-t border-line pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>৳{order.total}</span>
            </div>
          </div>

          <div className="mt-4 border-t border-line pt-4">
            <h3 className="font-medium text-ink">Shipping Address</h3>
            <p className="text-sm text-muted mt-1">
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
              {order.shippingAddress.country}
            </p>
          </div>

          <div className="mt-4 border-t border-line pt-4">
            <h3 className="font-medium text-ink">Payment Method</h3>
            <p className="text-sm text-muted mt-1 capitalize">{order.paymentMethod.replace('-', ' ')}</p>
          </div>

          <div className="mt-6">
            <Link
              href="/"
              className="inline-block bg-trace px-6 py-2 text-sm font-semibold hover:opacity-80"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}