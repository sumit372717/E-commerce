"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getStoredUser } from "@/lib/auth";

export default function AddressesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.push("/login");
      return;
    }
    setUser(storedUser);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink">My Account</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="border border-line bg-surface p-6">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-trace/20 flex items-center justify-center text-2xl">
                {user.name?.charAt(0) || "U"}
              </div>
              <h2 className="mt-2 font-medium text-ink">{user.name}</h2>
              <p className="text-sm text-muted">{user.email}</p>
              <p className="text-xs text-muted mt-1 capitalize">Role: {user.role}</p>
            </div>

            <nav className="mt-6 border-t border-line pt-6">
              <ul className="space-y-2">
                <li>
                  <Link href="/account" className="block px-3 py-2 text-sm text-ink/80 hover:bg-surface-2 rounded">
                    📋 My Orders
                  </Link>
                </li>
                <li>
                  <Link href="/account/profile" className="block px-3 py-2 text-sm text-ink/80 hover:bg-surface-2 rounded">
                    👤 Edit Profile
                  </Link>
                </li>
                <li>
                  <Link href="/account/addresses" className="block px-3 py-2 text-sm text-trace bg-trace/10 rounded">
                    📍 Addresses
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="border border-line bg-surface p-6">
            <h3 className="font-display text-xl font-bold text-ink">My Addresses</h3>
            <p className="mt-4 text-muted">No saved addresses yet.</p>
            <p className="mt-2 text-sm text-muted">
              Addresses are entered at checkout and not saved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
