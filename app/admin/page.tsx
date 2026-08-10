"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/lib/auth";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser || storedUser.role !== 'admin') {
      router.push('/login');
      return;
    }
    setUser(storedUser);

    // Fetch products and orders
    Promise.all([
      fetch('/api/products').then(res => res.json()),
      fetch('/api/orders').then(res => res.json())
    ]).then(([productsData, ordersData]) => {
      setProducts(productsData);
      setOrders(ordersData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-muted">Loading admin panel...</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink">Admin Dashboard</h1>
      <p className="text-muted mt-2">Welcome, {user.name}</p>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-line bg-surface p-6">
          <p className="text-sm text-muted">Total Products</p>
          <p className="text-3xl font-bold text-ink">{products.length}</p>
        </div>
        <div className="border border-line bg-surface p-6">
          <p className="text-sm text-muted">Total Orders</p>
          <p className="text-3xl font-bold text-ink">{orders.length}</p>
        </div>
        <div className="border border-line bg-surface p-6">
          <p className="text-sm text-muted">Pending Orders</p>
          <p className="text-3xl font-bold text-ink">
            {orders.filter(o => o.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/admin/products"
          className="border border-line bg-surface p-6 text-center hover:border-trace"
        >
          <span className="text-2xl">📦</span>
          <p className="mt-2 font-medium text-ink">Manage Products</p>
        </Link>
        <Link
          href="/admin/orders"
          className="border border-line bg-surface p-6 text-center hover:border-trace"
        >
          <span className="text-2xl">📋</span>
          <p className="mt-2 font-medium text-ink">Manage Orders</p>
        </Link>
        <Link
          href="/admin/categories"
          className="border border-line bg-surface p-6 text-center hover:border-trace"
        >
          <span className="text-2xl">🏷️</span>
          <p className="mt-2 font-medium text-ink">Manage Categories</p>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-ink">Recent Orders</h2>
        <div className="mt-4 border border-line bg-surface">
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className="flex justify-between items-center border-b border-line p-4 last:border-0">
              <div>
                <p className="font-medium text-ink">Order #{order.id}</p>
                <p className="text-sm text-muted">
                  {new Date(order.created_at || order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-ink">৳{order.total}</p>
                <span className={`text-xs font-medium px-2 py-1 capitalize ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <p className="p-4 text-center text-muted">No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
}