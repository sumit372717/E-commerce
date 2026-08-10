"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items: cartItems, totalPrice: total, refreshCart } = useCart();
  const [loading, setLoading] = useState(false);
  
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "US"
  });

  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    refreshCart();
  }, [user, router, refreshCart]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert("Please login to place an order");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity
          })),
          shippingAddress: address,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      window.location.href = data.url;
    } catch (error: any) {
      console.error('❌ Error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">Checkout</h1>
        <p className="mt-4 text-muted">Your cart is empty.</p>
        <Link
          href="/"
          className="mt-6 inline-block bg-trace px-6 py-3 text-base font-semibold hover:opacity-80"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink">Checkout</h1>
      
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border border-line bg-surface p-6">
              <h2 className="font-display text-xl font-bold text-ink">Shipping Address</h2>
              
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink">Street Address</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                    className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-ink">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                    className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink">State</label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) => setAddress({...address, state: e.target.value})}
                      className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink">ZIP Code</label>
                    <input
                      type="text"
                      value={address.zip}
                      onChange={(e) => setAddress({...address, zip: e.target.value})}
                      className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-line bg-surface p-6">
              <h2 className="font-display text-xl font-bold text-ink">Payment Method</h2>
              
              <div className="mt-4 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="credit-card"
                    checked={paymentMethod === "credit-card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Credit Card
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  PayPal
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="bank-transfer"
                    checked={paymentMethod === "bank-transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Bank Transfer
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-trace px-6 py-3 text-base font-semibold hover:opacity-80 disabled:opacity-50"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="border border-line bg-surface p-6">
            <h2 className="font-display text-xl font-bold text-ink">Order Summary</h2>
            
            <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm py-2 border-b border-line">
                  <span className="text-ink">{item.product.name} x{item.quantity}</span>
                  <span className="text-ink">৳{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-line">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>৳{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}