"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getStoredUser } from "@/lib/auth";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.push('/login');
      return;
    }
    setUser(storedUser);
    setName(storedUser.name);

    // Fetch user's orders
    fetch(`/api/orders?userId=${storedUser.id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        localStorage.setItem('auth_user', JSON.stringify(updatedUser));
        setEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      alert('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink">My Account</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="border border-line bg-surface p-6">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-trace/20 flex items-center justify-center text-2xl">
                {user.name?.charAt(0) || 'U'}
              </div>
              <h2 className="mt-2 font-medium text-ink">{user.name}</h2>
              <p className="text-sm text-muted">{user.email}</p>
              <p className="text-xs text-muted mt-1 capitalize">Role: {user.role}</p>
            </div>

            <nav className="mt-6 border-t border-line pt-6">
              <ul className="space-y-2">
                <li>
                  <Link href="/account" className="block px-3 py-2 text-sm text-trace bg-trace/10 rounded">
                    📋 My Orders
                  </Link>
                </li>
                <li>
                  <Link href="/account/profile" className="block px-3 py-2 text-sm text-ink/80 hover:bg-surface-2 rounded">
                    👤 Edit Profile
                  </Link>
                </li>
                <li>
                  <Link href="/account/addresses" className="block px-3 py-2 text-sm text-ink/80 hover:bg-surface-2 rounded">
                    📍 Addresses
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content - Orders */}
        <div className="md:col-span-2">
          <div className="border border-line bg-surface p-6">
            <h3 className="font-display text-xl font-bold text-ink">Order History</h3>

            {orders.length === 0 ? (
              <p className="mt-4 text-muted">You haven&apos;t placed any orders yet.</p>
            ) : (
              <div className="mt-4 space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-line p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-ink">Order #{order.id}</p>
                        <p className="text-sm text-muted">
                          {new Date(order.createdAt).toLocaleDateString()}
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
                        <br />
                        <Link
                          href={`/track-order?id=${order.id}&email=${user.email}`}
                          className="text-xs text-trace hover:underline mt-1 inline-block"
                        >
                          Track Order →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}