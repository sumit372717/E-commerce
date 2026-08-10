"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredUser } from "@/lib/auth";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      return;
    }
    setUser(storedUser);

    fetch(`/api/orders?userId=${storedUser.id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">My Orders</h1>
        <p className="mt-4 text-muted">Please log in to view your orders.</p>
        <Link
          href="/login"
          className="mt-6 inline-block bg-trace px-6 py-3 text-base font-semibold hover:opacity-80"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-muted">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">My Orders</h1>
        <p className="mt-4 text-muted">You haven&apos;t placed any orders yet.</p>
        <Link
          href="/"
          className="mt-6 inline-block bg-trace px-6 py-3 text-base font-semibold hover:opacity-80"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink">My Orders</h1>
      
      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-line bg-surface p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-ink">Order #{order.id}</p>
                <p className="text-sm text-muted">
                  {new Date(order.createdAt || order.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted">{order.items.length} items</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-ink">৳{order.total}</p>
                <span className={`text-xs font-medium px-2 py-1 capitalize ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}