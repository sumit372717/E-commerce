"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/lib/auth";

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser || storedUser.role !== 'admin') {
      router.push('/login');
      return;
    }

    fetchProducts();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`/api/products/${slug}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchProducts();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      alert('Error deleting product');
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
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl font-bold text-ink">Manage Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-trace px-6 py-2 text-base font-semibold hover:opacity-80"
        >
          + Add Product
        </Link>
      </div>

      <div className="mt-8 border border-line bg-surface">
        {products.length === 0 ? (
          <p className="p-4 text-center text-muted">No products yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-line">
                  <th className="p-4 text-left text-sm font-medium text-muted">Image</th>
                  <th className="p-4 text-left text-sm font-medium text-muted">Name</th>
                  <th className="p-4 text-left text-sm font-medium text-muted">Category</th>
                  <th className="p-4 text-left text-sm font-medium text-muted">Price</th>
                  <th className="p-4 text-left text-sm font-medium text-muted">Stock</th>
                  <th className="p-4 text-left text-sm font-medium text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-line">
                    <td className="p-4">
                      <img src={product.image} alt={product.name} className="h-12 w-12 object-contain" />
                    </td>
                    <td className="p-4 text-ink">{product.name}</td>
                    <td className="p-4 text-ink">{product.category_slug}</td>
                    <td className="p-4 text-ink">৳{product.price}</td>
                    <td className="p-4">
                      <span className={product.in_stock ? "text-green-500" : "text-red-500"}>
                        {product.in_stock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/products/${product.slug}/edit`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product.slug)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
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