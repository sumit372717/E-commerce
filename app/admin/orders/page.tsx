"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getStoredUser } from "@/lib/auth";

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser || storedUser.role !== 'admin') {
      router.push('/login');
      return;
    }

    fetchOrders();
  }, [router]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchOrders();
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      alert('Error updating order');
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink">Manage Orders</h1>

      <div className="mt-8 border border-line bg-surface">
        {orders.length === 0 ? (
          <p className="p-4 text-center text-muted">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-line">
                  <th className="p-4 text-left text-sm font-medium text-muted">Order #</th>
                  <th className="p-4 text-left text-sm font-medium text-muted">Date</th>
                  <th className="p-4 text-left text-sm font-medium text-muted">Items</th>
                  <th className="p-4 text-left text-sm font-medium text-muted">Total</th>
                  <th className="p-4 text-left text-sm font-medium text-muted">Status</th>
                  <th className="p-4 text-left text-sm font-medium text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-line">
                    <td className="p-4 text-ink">#{order.id}</td>
                    <td className="p-4 text-ink">
                      {new Date(order.createdAt || order.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-ink">{order.items.length} items</td>
                    <td className="p-4 text-ink">৳{order.total}</td>
                    <td className="p-4">
                      <span className={`text-xs font-medium px-2 py-1 capitalize ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="border border-line bg-base px-2 py-1 text-sm text-ink focus:border-trace"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}