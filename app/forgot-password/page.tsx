"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `https://e-commerce-tan-one-94.vercel.app/reset-password`,
      });

      if (error) {
        throw new Error(error.message);
      }

      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-green-600">✅ Check your email</h1>
        <p className="mt-4 text-muted">
          We sent a password reset link to <strong>{email}</strong>
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block bg-trace px-6 py-3 text-base font-semibold hover:opacity-80"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="font-display text-3xl font-bold text-ink text-center">Reset Password</h1>
      <p className="mt-2 text-center text-muted">
        Enter your email and we&apos;ll send you a reset link
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-trace px-6 py-3 text-base font-semibold hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="text-center text-sm text-muted">
          Remember your password?{" "}
          <Link href="/login" className="text-trace hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}