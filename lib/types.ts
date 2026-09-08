export interface Category {
  slug: string;
  label: string;
  /** Short blurb shown on the category landing page. Fill in per category later. */
  description?: string;
  subcategories?: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category_slug: string;
  subcategory?: string;
  price: number;
  compare_at_price?: number;
  currency?: string;
  image: string;
  rating?: number;
  review_count?: number;
  in_stock: boolean;
  badge?: "New" | "Sale" | "Best Seller" | "Deal";
  specs?: { label: string; value: string }[];
}