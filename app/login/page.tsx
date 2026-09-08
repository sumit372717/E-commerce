```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { setToken, setStoredUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { user, login, refreshUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.push("/");
      }
    };

    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🔵 Form submitted!");

    setError("");
    setLoading(true);

    try {
      // Use AuthContext login instead of directly logging in here
      await login(email, password);

      console.log("🟢 Login successful");

      // Get the newly authenticated user and update AuthContext
      await refreshUser();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        console.log("🟡 User logged in:", user.id);

        // SAVE TO LOCALSTORAGE
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const token = session?.access_token;

        if (token) {
          setToken(token);

          setStoredUser({
            id: user.id,
            email: user.email || "",
            name:
              user.user_metadata?.name ||
              user.email ||
              "",
            role:
              user.user_metadata?.role ||
              "customer",
            createdAt:
              user.created_at ||
              new Date().toISOString(),
          });
        }

        router.push("/");
      }
    } catch (err: any) {
      console.error("🔴 Login error:", err);
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="font-display text-3xl font-bold text-ink text-center">
        Sign In
      </h1>

      <p className="mt-2 text-center text-muted">
        Or{" "}
        <Link
          href="/register"
          className="text-trace hover:underline"
        >
          create an account
        </Link>
      </p>

      {error && (
        <div className="mt-4 border border-red-500 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-ink"
          >
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-ink"
          >
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
```
