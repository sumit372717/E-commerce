"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getStoredUser } from "@/lib/auth";

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({
    slug: "",
    label: "",
    subcategories: ""
  });

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser || storedUser.role !== 'admin') {
      router.push('/login');
      return;
    }

    fetchCategories();
  }, [router]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const subcategories = newCategory.subcategories
        .split(',')
        .map(s => s.trim())
        .filter(s => s);

      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: newCategory.slug,
          label: newCategory.label,
          subcategories
        }),
      });

      if (res.ok) {
        setNewCategory({ slug: "", label: "", subcategories: "" });
        fetchCategories();
      } else {
        alert('Failed to create category');
      }
    } catch (error) {
      alert('Error creating category');
    }
  };

  const handleDeleteCategory = async (slug: string) => {
    if (!confirm(`Delete category "${slug}"?`)) return;
    
    try {
      const res = await fetch(`/api/categories/${slug}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchCategories();
      } else {
        alert('Failed to delete category');
      }
    } catch (error) {
      alert('Error deleting category');
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink">Manage Categories</h1>

      {/* Add Category Form */}
      <div className="mt-8 border border-line bg-surface p-6">
        <h2 className="font-display text-xl font-bold text-ink">Add New Category</h2>
        <form onSubmit={handleAddCategory} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-ink">Slug</label>
            <input
              type="text"
              value={newCategory.slug}
              onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
              placeholder="e.g., accessories"
              className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">Label</label>
            <input
              type="text"
              value={newCategory.label}
              onChange={(e) => setNewCategory({ ...newCategory, label: e.target.value })}
              placeholder="e.g., Accessories"
              className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">Subcategories (comma separated)</label>
            <input
              type="text"
              value={newCategory.subcategories}
              onChange={(e) => setNewCategory({ ...newCategory, subcategories: e.target.value })}
              placeholder="Cables, Mounts, Peripherals"
              className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
            />
          </div>
          <div className="sm:col-span-3">
            <button
              type="submit"
              className="w-full bg-trace px-6 py-2 text-base font-semibold hover:opacity-80 sm:w-auto"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>

      {/* Categories List */}
      <div className="mt-8 border border-line bg-surface">
        {categories.length === 0 ? (
          <p className="p-4 text-center text-muted">No categories yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-line">
                  <th className="p-4 text-left text-sm font-medium text-muted">Slug</th>
                  <th className="p-4 text-left text-sm font-medium text-muted">Label</th>
                  <th className="p-4 text-left text-sm font-medium text-muted">Subcategories</th>
                  <th className="p-4 text-left text-sm font-medium text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.slug} className="border-b border-line">
                    <td className="p-4 text-ink font-mono">{cat.slug}</td>
                    <td className="p-4 text-ink">{cat.label}</td>
                    <td className="p-4 text-ink">
                      {cat.subcategories?.join(', ') || '-'}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDeleteCategory(cat.slug)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}