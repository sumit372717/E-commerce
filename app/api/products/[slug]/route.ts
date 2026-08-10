import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/products/:slug - Get a single product
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', params.slug)
      .single()
    
    if (error || !data) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Product API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT /api/products/:slug - Update a product
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json()
    
    const updateData = {
      name: body.name,
      category_slug: body.categorySlug || body.category_slug,
      subcategory: body.subcategory || null,
      price: body.price ? parseFloat(body.price) : undefined,
      compare_at_price: body.compareAtPrice ? parseFloat(body.compareAtPrice) : null,
      image: body.image,
      rating: body.rating ? parseFloat(body.rating) : null,
      review_count: body.reviewCount ? parseInt(body.reviewCount) : null,
      in_stock: body.inStock !== undefined ? body.inStock : true,
      badge: body.badge || null,
      specs: body.specs || []
    }
    
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('slug', params.slug)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update product' },
        { status: 500 }
      )
    }
    
    if (!data) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Product API error:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/:slug - Delete a product
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('slug', params.slug)
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Product API error:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}