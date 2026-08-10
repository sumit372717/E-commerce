import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/cart - Get cart from localStorage (handled client-side)
// This endpoint is just for server-side validation if needed
export async function GET() {
  return NextResponse.json({
    message: 'Cart is managed client-side via localStorage'
  })
}

// POST /api/cart - Add item to cart (client-side handles storage)
export async function POST(request: Request) {
  try {
    const { productId, quantity, customBuild, buildName, parts, total } = await request.json()
    
    // Fetch product from Supabase for validation
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()
    
    if (!product && !customBuild) {
      // Try to find by slug
      const { data: productBySlug, error: slugError } = await supabase
        .from('products')
        .select('*')
        .eq('slug', productId)
        .single()
      
      if (slugError || !productBySlug) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
      
      // Return product info so client can add to localStorage
      return NextResponse.json({
        productId: productBySlug.id,
        name: productBySlug.name,
        price: productBySlug.price,
        image: productBySlug.image,
        inStock: productBySlug.in_stock
      })
    }
    
    if (product && !product.in_stock) {
      return NextResponse.json(
        { error: 'Product is out of stock' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({
      success: true,
      productId: product?.id || productId,
      name: product?.name || buildName || 'Custom Build',
      price: product?.price || total || 0,
      image: product?.image || 'https://placehold.co/600x600/121722/E3A24C?text=Custom+Build'
    })
  } catch (error: any) {
    console.error('Cart API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to add to cart' },
      { status: 500 }
    )
  }
}