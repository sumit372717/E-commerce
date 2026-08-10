"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getStoredUser } from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.push('/login');
      return;
    }
    setUser(storedUser);
    setName(storedUser.name);
    setEmail(storedUser.email);
    setLoading(false);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        localStorage.setItem('auth_user', JSON.stringify(updatedUser));
        alert('Profile updated successfully!');
        router.push('/account');
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
    <div className="mx-auto max-w-md px-6 py-12">
      <div className="flex items-center gap-4">
        <Link href="/account" className="text-muted hover:text-trace">
          ← Back
        </Link>
        <h1 className="font-display text-2xl font-bold text-ink">Edit Profile</h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-trace px-6 py-3 text-base font-semibold hover:opacity-80 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}