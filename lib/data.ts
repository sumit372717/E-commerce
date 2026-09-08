import { supabase } from './supabase'
import { Category, Product } from './types'
import { mapProducts, mapCategories, mapProduct } from './mapData'

// ============ CATEGORIES ============

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('label')
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  
  return mapCategories(data || [])
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching category:', error)
    return undefined
  }
  
  if (!data) return undefined
  
  // Map the single category using mapCategories with an array
  const mapped = mapCategories([data])
  return mapped[0]
}

// ============ PRODUCTS ============

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name')
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  
  return mapProducts(data || [])
}

export async function getProductsByCategory(category_slug: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_slug', category_slug)
    .order('name')
  
  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
  
  return mapProducts(data || [])
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching product:', error)
    return undefined
  }
  
  return data ? mapProduct(data) : undefined
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .limit(limit)
  
  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
  
  return mapProducts(data || [])
}

// ============ STATIC FALLBACK DATA (for development) ============

export const categories: Category[] = [
  { slug: "desktop", label: "Desktop", subcategories: ["Prebuilt PCs", "Mini PCs", "Workstations"] },
  { slug: "laptop", label: "Laptop", subcategories: ["Gaming Laptops", "Ultrabooks", "Business Laptops"] },
  { slug: "component", label: "Component", subcategories: ["CPU", "GPU", "Motherboard", "RAM", "Storage", "PSU", "Case", "Cooling"] },
  { slug: "monitor", label: "Monitor", subcategories: ["Gaming Monitors", "4K Monitors", "Ultrawide"] },
  { slug: "power", label: "Power", subcategories: ["Power Supplies", "UPS", "Surge Protection"] },
  { slug: "phone", label: "Phone", subcategories: ["Smartphones", "Accessories"] },
  { slug: "tablet", label: "Tablet", subcategories: ["Tablets", "Styluses", "Keyboards"] },
  { slug: "office-equipment", label: "Office Equipment", subcategories: ["Printers", "Scanners", "Shredders"] },
  { slug: "camera", label: "Camera", subcategories: ["Webcams", "Security Cameras", "Action Cameras"] },
  { slug: "security", label: "Security", subcategories: ["Antivirus", "NVR/DVR", "Access Control"] },
  { slug: "networking", label: "Networking", subcategories: ["Routers", "Switches", "Wi-Fi Systems"] },
  { slug: "software", label: "Software", subcategories: ["Operating Systems", "Productivity", "Security"] },
  { slug: "server", label: "Server", subcategories: ["Rack Servers", "Tower Servers", "Storage Servers"] },
  { slug: "accessories", label: "Accessories", subcategories: ["Cables", "Mounts", "Peripherals"] },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "vertex-rtx-gpu",
    name: "Vertex RTX 5080 16GB Graphics Card",
    category_slug: "component",
    subcategory: "GPU",
    price: 899.99,
    compare_at_price: 999.99,
    image: "https://placehold.co/600x600/121722/E3A24C?text=GPU",
    rating: 4.8,
    review_count: 214,
    in_stock: true,
    badge: "Sale",
    specs: [
      { label: "Memory", value: "16GB GDDR7" },
      { label: "Interface", value: "PCIe 5.0" },
    ],
  },
  {
    id: "p2",
    slug: "forge-x9-cpu",
    name: "Forge X9-14900 Desktop Processor",
    category_slug: "component",
    subcategory: "CPU",
    price: 549.00,
    compare_at_price: undefined,
    image: "https://placehold.co/600x600/121722/E3A24C?text=CPU",
    rating: 4.7,
    review_count: 132,
    in_stock: true,
    badge: "Best Seller",
    specs: [
      { label: "Cores", value: "24" },
      { label: "Base Clock", value: "3.2GHz" },
    ],
  },
  {
    id: "p3",
    slug: "nimbus-14-ultrabook",
    name: 'Nimbus 14" Ultrabook, 32GB RAM',
    category_slug: "laptop",
    subcategory: "Ultrabooks",
    price: 1249.00,
    compare_at_price: undefined,
    image: "https://placehold.co/600x600/121722/E3A24C?text=Laptop",
    rating: 4.6,
    review_count: 88,
    in_stock: true,
    badge: undefined,
    specs: [
      { label: "Display", value: '14" 2.8K OLED' },
      { label: "Battery", value: "Up to 18h" },
    ],
  },
  {
    id: "p4",
    slug: "aurora-32-oled-monitor",
    name: 'Aurora 32" 4K OLED Gaming Monitor',
    category_slug: "monitor",
    subcategory: "Gaming Monitors",
    price: 799.00,
    compare_at_price: undefined,
    image: "https://placehold.co/600x600/121722/E3A24C?text=Monitor",
    rating: 4.9,
    review_count: 176,
    in_stock: true,
    badge: "New",
    specs: [
      { label: "Refresh Rate", value: "240Hz" },
      { label: "Panel", value: "4K OLED" },
    ],
  },
  {
    id: "p5",
    slug: "coreforge-r7-tower",
    name: "CoreForge R7 Prebuilt Gaming Tower",
    category_slug: "desktop",
    subcategory: "Prebuilt PCs",
    price: 1899.00,
    compare_at_price: undefined,
    image: "https://placehold.co/600x600/121722/E3A24C?text=Desktop",
    rating: 4.8,
    review_count: 61,
    in_stock: true,
    badge: undefined,
    specs: [
      { label: "GPU", value: "RTX 5080" },
      { label: "RAM", value: "32GB DDR5" },
    ],
  },
  {
    id: "p6",
    slug: "meshnet-ax6-router",
    name: "MeshNet AX6 Tri-Band Wi-Fi Router",
    category_slug: "networking",
    subcategory: "Routers",
    price: 189.99,
    compare_at_price: undefined,
    image: "https://placehold.co/600x600/121722/E3A24C?text=Router",
    rating: 4.5,
    review_count: 340,
    in_stock: true,
    badge: "Deal",
    specs: [
      { label: "Standard", value: "Wi-Fi 6E" },
      { label: "Ports", value: "4x 2.5GbE" },
    ],
  },
  {
    id: "p7",
    slug: "rackline-2u-server",
    name: "RackLine 2U Storage Server, 8-Bay",
    category_slug: "server",
    subcategory: "Rack Servers",
    price: 3299.00,
    compare_at_price: undefined,
    image: "https://placehold.co/600x600/121722/E3A24C?text=Server",
    rating: 4.7,
    review_count: 19,
    in_stock: false,
    badge: undefined,
    specs: [
      { label: "Bays", value: "8x Hot-Swap" },
      { label: "CPU", value: "Dual Xeon" },
    ],
  },
  {
    id: "p8",
    slug: "shieldcam-pro-nvr-kit",
    name: "ShieldCam Pro 4-Camera NVR Kit",
    category_slug: "security",
    subcategory: "Security Cameras",
    price: 429.00,
    compare_at_price: undefined,
    image: "https://placehold.co/600x600/121722/E3A24C?text=Security",
    rating: 4.4,
    review_count: 97,
    in_stock: true,
    badge: undefined,
    specs: [
      { label: "Resolution", value: "4K per camera" },
      { label: "Storage", value: "2TB included" },
    ],
  },
];