"use client";

import { useState } from "react";

const initialReviews = [
  {
    id: 1,
    name: "David K.",
    rating: 5,
    date: "2 days ago",
    verified: true,
    comment: "Ordered a custom RTX 4080 Super build. Cable management is surgical and thermals stay under 65°C under heavy benchmarks.",
  },
  {
    id: 2,
    name: "Sarah M.",
    rating: 5,
    date: "1 week ago",
    verified: true,
    comment: "Fast shipping on individual RAM kits to London. Well packaged with anti-static protection.",
  },
  {
    id: 3,
    name: "Marcus B.",
    rating: 4,
    date: "2 weeks ago",
    verified: true,
    comment: "Great customer support when verifying motherboard BIOS compatibility prior to ordering.",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment && newName) {
      setReviews([
        {
          id: Date.now(),
          name: newName,
          rating: 5,
          date: "Just now",
          verified: true,
          comment: newComment,
        },
        ...reviews,
      ]);
      setNewComment("");
      setNewName("");
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-ink">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-line pb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Verified Customer Reviews</h1>
          <p className="mt-1 text-sm text-muted">Based on 12,400+ verified hardware orders.</p>
        </div>
        <div className="text-right">
          <p className="font-display text-4xl font-bold text-trace">4.8 / 5.0</p>
          <p className="text-xs text-muted">★★★★★ Rating Average</p>
        </div>
      </div>

      {/* Leave a Review */}
      <form onSubmit={handleAddReview} className="mt-8 rounded-xl border border-line bg-surface p-5 space-y-3">
        <h3 className="font-bold text-sm">Write a Review</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            required
            type="text"
            placeholder="Your Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace"
          />
        </div>
        <textarea
          required
          rows={3}
          placeholder="Share your experience with CircuitForge builds or components..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full rounded border border-line bg-background px-3 py-2 text-sm outline-none focus:border-trace"
        />
        <button type="submit" className="rounded bg-trace px-5 py-2 text-xs font-bold text-surface hover:opacity-90">
          Post Review
        </button>
      </form>

      {/* Reviews Feed */}
      <div className="mt-8 space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="rounded-xl border border-line bg-surface p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{rev.name}</span>
                {rev.verified && (
                  <span className="rounded bg-trace/10 text-trace text-[10px] font-mono px-2 py-0.5">Verified Purchase</span>
                )}
              </div>
              <span className="text-xs text-muted">{rev.date}</span>
            </div>
            <div className="mt-2 text-yellow-500 text-xs">{"★".repeat(rev.rating)}</div>
            <p className="mt-2 text-sm text-muted leading-relaxed">{rev.comment}</p>
          </div>
        ))}
      </div>
    </main>
  );
}