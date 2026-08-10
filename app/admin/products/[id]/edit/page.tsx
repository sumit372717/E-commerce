"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getStoredUser } from "@/lib/auth";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    slug: "",
    category_slug: "",
    price: "",
    compare_at_price: "",
    image: "",
    rating: "",
    review_count: "",
    in_stock: true,
    badge: "",
    specs: [{ label: "", value: "" }]
  });

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser || storedUser.role !== 'admin') {
      router.push('/login');
      return;
    }

    Promise.all([
      fetch('/api/categories').then(res => res.json()),
      fetch(`/api/products/${productId}`).then(res => res.json())
    ]).then(([categoriesData, productData]) => {
      setCategories(categoriesData);
      setForm({
        name: productData.name || "",
        slug: productData.slug || "",
        category_slug: productData.category_slug || "",
        price: productData.price?.toString() || "",
        compare_at_price: productData.compare_at_price?.toString() || "",
        image: productData.image || "",
        rating: productData.rating?.toString() || "",
        review_count: productData.review_count?.toString() || "",
        in_stock: productData.in_stock ?? true,
        badge: productData.badge || "",
        specs: productData.specs?.length ? productData.specs : [{ label: "", value: "" }]
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [router, productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const productData = {
        ...form,
        price: parseFloat(form.price),
        compare_at_price: form.compare_at_price ? parseFloat(form.compare_at_price) : undefined,
        rating: form.rating ? parseFloat(form.rating) : undefined,
        review_count: form.review_count ? parseInt(form.review_count) : undefined,
        specs: form.specs.filter(s => s.label && s.value)
      };

      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        router.push('/admin/products');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to update product');
      }
    } catch (error) {
      alert('Error updating product');
    } finally {
      setSaving(false);
    }
  };

  const addSpec = () => {
    setForm({ ...form, specs: [...form.specs, { label: "", value: "" }] });
  };

  const removeSpec = (index: number) => {
    const newSpecs = form.specs.filter((_, i) => i !== index);
    setForm({ ...form, specs: newSpecs });
  };

  const updateSpec = (index: number, field: 'label' | 'value', value: string) => {
    const newSpecs = [...form.specs];
    newSpecs[index][field] = value;
    setForm({ ...form, specs: newSpecs });
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl font-bold text-ink">Edit Product</h1>
        <Link href="/admin/products" className="text-muted hover:text-trace">
          ← Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="border border-line bg-surface p-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink">Product Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">Slug *</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">Category</label>
              <select
                value={form.category_slug}
                onChange={(e) => setForm({ ...form, category_slug: e.target.value })}
                className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
              >
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink">Price *</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink">Compare at Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.compare_at_price}
                  onChange={(e) => setForm({ ...form, compare_at_price: e.target.value })}
                  className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">Image URL</label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                  className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink">Review Count</label>
                <input
                  type="number"
                  value={form.review_count}
                  onChange={(e) => setForm({ ...form, review_count: e.target.value })}
                  className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">Badge</label>
              <select
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
              >
                <option value="">None</option>
                <option value="New">New</option>
                <option value="Sale">Sale</option>
                <option value="Best Seller">Best Seller</option>
                <option value="Deal">Deal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">In Stock</label>
              <select
                value={String(form.in_stock)}
                onChange={(e) => setForm({ ...form, in_stock: e.target.value === 'true' })}
                className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border border-line bg-surface p-6">
          <div className="flex justify-between items-center">
            <h2 className="font-display text-xl font-bold text-ink">Specifications</h2>
            <button
              type="button"
              onClick={addSpec}
              className="text-sm text-trace hover:underline"
            >
              + Add Specification
            </button>
          </div>

          {form.specs.map((spec, index) => (
            <div key={index} className="mt-4 grid grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-ink">Label</label>
                <input
                  type="text"
                  value={spec.label}
                  onChange={(e) => updateSpec(index, 'label', e.target.value)}
                  className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                  placeholder="e.g., Memory"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-ink">Value</label>
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => updateSpec(index, 'value', e.target.value)}
                    className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                    placeholder="e.g., 16GB"
                  />
                </div>
                {form.specs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSpec(index)}
                    className="mt-6 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-trace px-6 py-3 text-base font-semibold hover:opacity-80 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}