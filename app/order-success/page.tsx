"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState("");
  const { clearCart } = useCart();

  useEffect(() => {
    if (!sessionId) {
      router.push("/");
      return;
    }

    fetch(`/api/payment/verify?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrderId(data.orderId);
        clearCart();
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sessionId, router, clearCart]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-muted">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <div className="border border-green-500 bg-green-50 p-6">
        <span className="text-6xl">✅</span>
        <h1 className="mt-4 font-display text-3xl font-bold text-green-700">
          Payment Successful!
        </h1>
        <p className="mt-2 text-green-600">Order #{orderId}</p>
        <p className="text-sm text-muted">Thank you for your purchase!</p>
      </div>

      <div className="mt-8">
        <Link
          href="/orders"
          className="inline-block bg-trace px-6 py-3 text-base font-semibold hover:opacity-80"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-16 text-center"><p className="text-muted">Loading...</p></div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}