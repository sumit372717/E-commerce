// Map Supabase snake_case to frontend camelCase
export function mapProduct(supabaseProduct: any) {
  return {
    id: supabaseProduct.id,
    slug: supabaseProduct.slug,
    name: supabaseProduct.name,
    categorySlug: supabaseProduct.category_slug,
    category_slug: supabaseProduct.category_slug,
    subcategory: supabaseProduct.subcategory,
    price: supabaseProduct.price,
    compareAtPrice: supabaseProduct.compare_at_price,
    compare_at_price: supabaseProduct.compare_at_price,
    currency: supabaseProduct.currency || 'USD',
    image: supabaseProduct.image,
    rating: supabaseProduct.rating,
    reviewCount: supabaseProduct.review_count,
    review_count: supabaseProduct.review_count,
    inStock: supabaseProduct.in_stock,
    in_stock: supabaseProduct.in_stock,
    badge: supabaseProduct.badge,
    specs: supabaseProduct.specs || [],
    createdAt: supabaseProduct.created_at
  };
}

// Map Supabase snake_case to frontend camelCase (Category)
export function mapCategory(supabaseCategory: any) {
  return {
    slug: supabaseCategory.slug,
    label: supabaseCategory.label,
    description: supabaseCategory.description,
    subcategories: supabaseCategory.subcategories || [],
    createdAt: supabaseCategory.created_at
  };
}

// Map array of products
export function mapProducts(supabaseProducts: any[]) {
  return supabaseProducts.map(p => mapProduct(p));
}

// Map array of categories
export function mapCategories(supabaseCategories: any[]) {
  return supabaseCategories.map(c => mapCategory(c));
}