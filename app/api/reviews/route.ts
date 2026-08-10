import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Reviews API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('🔍 Review POST body:', body)

    const { productId, userId, userName, rating, comment } = body

    if (!productId || !userId || !userName || !rating) {
      return NextResponse.json(
        { error: 'Product ID, user ID, user name, and rating are required' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Check if user already reviewed this product
    const { data: existing } = await supabase
      .from('reviews')
      .select('id')
      .eq('product_id', productId)
      .eq('user_id', userId)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'You have already reviewed this product' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        product_id: productId,
        user_id: userId,
        user_name: userName,
        rating,
        comment: comment || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { error: error.message || 'Failed to create review' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Reviews API error:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}