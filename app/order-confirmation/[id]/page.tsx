"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    fetch(`/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [orderId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-muted">Loading order confirmation...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">Order Not Found</h1>
        <Link
          href="/"
          className="mt-6 inline-block bg-trace px-6 py-3 text-base font-semibold hover:opacity-80"
        >
          Return Home
        </Link>
      </div>
    );
  }

  // Get shipping address from either snake_case or camelCase
  const shipping = order.shipping_address || order.shippingAddress || {};

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <div className="border border-green-500 bg-green-50 p-6">
        <span className="text-6xl">✅</span>
        <h1 className="mt-4 font-display text-3xl font-bold text-green-700">Order Placed Successfully!</h1>
        <p className="mt-2 text-green-600">Order #{order.id}</p>
        <p className="text-sm text-muted">Thank you for your order!</p>
      </div>

      <div className="mt-8 border border-line bg-surface p-6 text-left">
        <h2 className="font-display text-xl font-bold text-ink">Order Summary</h2>
        
        <div className="mt-4 space-y-2">
          {order.items.map((item: any, i: number) => (
            <div key={i} className="flex justify-between text-sm py-2 border-b border-line">
              <span className="text-ink">{item.name} x{item.quantity}</span>
              <span className="text-ink">৳{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-line">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>৳{order.total}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-line">
          <h3 className="font-medium text-ink">Shipping Address</h3>
          <p className="text-sm text-muted mt-1">
            {shipping.street}<br />
            {shipping.city}, {shipping.state} {shipping.zip}<br />
            {shipping.country}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-line">
          <h3 className="font-medium text-ink">Payment Method</h3>
          <p className="text-sm text-muted mt-1 capitalize">
            {order.payment_method || order.paymentMethod || 'Not specified'}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-line">
          <h3 className="font-medium text-ink">Order Status</h3>
          <p className="text-sm text-muted mt-1 capitalize">{order.status}</p>
        </div>
      </div>

      <Link
        href="/orders"
        className="mt-6 inline-block bg-trace px-6 py-3 text-base font-semibold hover:opacity-80"
      >
        View My Orders
      </Link>
    </div>
  );
}