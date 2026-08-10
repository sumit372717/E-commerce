"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push("/");
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        console.log('🟡 Syncing user:', data.user.id);
        
        try {
          const response = await fetch('/api/users/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: data.user.id,
              email: data.user.email,
              name: data.user.user_metadata?.name || data.user.email,
              role: 'customer'
            }),
          });
          
          console.log('🟢 Sync response status:', response.status);
          const result = await response.json();
          console.log('🟢 Sync result:', result);
        } catch (syncError) {
          console.error('🔴 Sync error:', syncError);
        }
        
        router.push("/");
        window.location.reload();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="font-display text-3xl font-bold text-ink text-center">Sign In</h1>
      <p className="mt-2 text-center text-muted">
        Or{" "}
        <Link href="/register" className="text-trace hover:underline">
          create an account
        </Link>
      </p>

      {error && (
        <div className="mt-4 border border-red-500 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink">
            Email
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

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-ink">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            required
          />
        </div>

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-xs text-muted hover:text-trace"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-trace px-6 py-3 text-base font-semibold hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}