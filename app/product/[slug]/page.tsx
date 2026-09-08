"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProduct } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Product } from "@/lib/types";

interface Props {
  params: { slug: string };
}

export default function ProductPage({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart: addToCartContext } = useCart();
  const { user } = useAuth();
  
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    getProduct(params.slug).then((data) => {
      if (data) {
        setProduct(data);
      }
      setLoading(false);
    });
  }, [params.slug]);

  // Fetch reviews
  useEffect(() => {
    if (product?.id) {
      fetch(`/api/reviews?productId=${product.id}`)
        .then(res => res.json())
        .then(data => {
          setReviews(data);
          setReviewLoading(false);
        })
        .catch(() => setReviewLoading(false));
    }
  }, [product?.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCartContext(product.id, quantity);
      alert(`Added ${quantity} x ${product.name} to cart!`);
    }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setReviewError("");

    try {
      if (!user) {
        setReviewError("Please login to leave a review");
        setSubmitting(false);
        return;
      }

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product?.id,
          userId: user.id,
          userName: user.user_metadata?.name || user.email || "User",
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      setReviews([data, ...reviews]);
      setNewReview({ rating: 5, comment: "" });
      alert("Review submitted successfully!");
    } catch (error: any) {
      setReviewError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <nav className="mb-6 font-mono text-xs uppercase tracking-wide text-muted">
        <Link href="/" className="hover:text-trace">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.category_slug}`} className="hover:text-trace">
          {product.category_slug}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square border border-line bg-surface">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
            unoptimized
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">{product.name}</h1>
          
          {product.badge && (
            <span className="inline-block bg-trace px-3 py-1 text-xs font-semibold text-base uppercase tracking-wider mt-2">
              {product.badge}
            </span>
          )}

          <div className="mt-4 flex items-center gap-4">
            <span className="text-2xl font-bold text-ink">৳{product.price}</span>
            {product.compare_at_price && (
              <span className="text-muted line-through">৳{product.compare_at_price}</span>
            )}
          </div>

          {product.rating && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted">
              <span>⭐ {product.rating}</span>
              <span>({product.review_count} reviews)</span>
            </div>
          )}

          <div className="mt-4">
            <span className={product.in_stock ? "text-green-500" : "text-red-500"}>
              {product.in_stock ? "✅ In Stock" : "❌ Out of Stock"}
            </span>
          </div>

          {product.specs && product.specs.length > 0 && (
            <div className="mt-6 border border-line bg-surface p-4">
              <h2 className="font-mono text-xs uppercase tracking-wider text-muted">Specifications</h2>
              <dl className="mt-2 grid grid-cols-2 gap-2">
                {product.specs.map((spec, i) => (
                  <div key={i} className="col-span-2 flex border-b border-line py-2 text-sm">
                    <dt className="text-muted w-1/2">{spec.label}</dt>
                    <dd className="text-ink w-1/2 font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Add to Cart */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-line">
              <button
                className="px-3 py-2 text-ink hover:bg-surface"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="w-10 text-center text-ink">{quantity}</span>
              <button
                className="px-3 py-2 text-ink hover:bg-surface"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className="flex-1 bg-trace px-6 py-3 text-base font-semibold hover:opacity-80 disabled:opacity-50"
              onClick={handleAddToCart}
              disabled={!product.in_stock}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8 border-t border-line pt-8">
        <h2 className="font-display text-2xl font-bold text-ink">Reviews</h2>
        
        {reviewLoading ? (
          <p className="text-muted mt-4">Loading reviews...</p>
        ) : (
          <>
            {/* Review Form */}
            <form onSubmit={submitReview} className="mt-4 border border-line bg-surface p-4">
              <h3 className="font-medium text-ink">Leave a Review</h3>
              
              {reviewError && (
                <div className="mt-2 border border-red-500 bg-red-50 p-2 text-sm text-red-600">
                  {reviewError}
                </div>
              )}
              
              <div className="mt-3 flex items-center gap-4">
                <label className="text-sm text-muted">Rating:</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                  className="border border-line bg-base px-3 py-1 text-ink"
                >
                  {[5,4,3,2,1].map((num) => (
                    <option key={num} value={num}>{num} ⭐</option>
                  ))}
                </select>
              </div>
              
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Write your review..."
                className="mt-3 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                rows={3}
              />
              
              <button
                type="submit"
                disabled={submitting}
                className="mt-3 bg-trace px-6 py-2 text-sm font-semibold hover:opacity-80 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>

            {/* Reviews List */}
            <div className="mt-4 space-y-4">
              {reviews.length === 0 ? (
                <p className="text-muted">No reviews yet. Be the first!</p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="border-b border-line py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-ink">{review.user_name}</span>
                      <span className="text-sm text-trace">⭐ {review.rating}</span>
                      <span className="text-xs text-muted">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="mt-2 text-sm text-muted">{review.comment}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}