import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/products - Get all products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categorySlug = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '100')
    
    let query = supabase
      .from('products')
      .select('*')
      .limit(limit)
    
    if (categorySlug) {
      query = query.eq('category_slug', categorySlug)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create a new product
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.slug || !body.name || !body.price || !body.categorySlug) {
      return NextResponse.json(
        { error: 'Slug, name, price, and category are required' },
        { status: 400 }
      )
    }
    
    const newProduct = {
      id: String(Date.now()),
      slug: body.slug,
      name: body.name,
      category_slug: body.categorySlug,
      subcategory: body.subcategory || null,
      price: parseFloat(body.price),
      compare_at_price: body.compareAtPrice ? parseFloat(body.compareAtPrice) : null,
      image: body.image || 'https://placehold.co/600x600/121722/E3A24C?text=Product',
      rating: body.rating ? parseFloat(body.rating) : null,
      review_count: body.reviewCount ? parseInt(body.reviewCount) : null,
      in_stock: body.inStock ?? true,
      badge: body.badge || null,
      specs: body.specs || []
    }
    
    const { data, error } = await supabase
      .from('products')
      .insert(newProduct)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}