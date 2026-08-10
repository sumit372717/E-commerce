"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if we have a session (user clicked the reset link)
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        // No session means they didn't come from a valid reset link
        router.push("/login");
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        throw new Error(error.message);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-green-600">✅ Password Reset Successfully!</h1>
        <p className="mt-4 text-muted">You can now login with your new password.</p>
        <Link
          href="/login"
          className="mt-6 inline-block bg-trace px-6 py-3 text-base font-semibold hover:opacity-80"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="font-display text-3xl font-bold text-ink text-center">Set New Password</h1>
      <p className="mt-2 text-center text-muted">Enter your new password below</p>

      {error && (
        <div className="mt-4 border border-red-500 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-ink">
            New Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-line bg-surface px-4 py-2 text-ink focus:border-trace"
            required
            minLength={6}
          />
          <p className="mt-1 text-xs text-muted">Must be at least 6 characters</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-trace px-6 py-3 text-base font-semibold hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}