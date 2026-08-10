import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendOrderConfirmation } from '@/lib/email'

export interface Order {
  id: string
  userId: string
  items: {
    productId: string
    name: string
    price: number
    quantity: number
  }[]
  total: number
  shippingAddress: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  paymentMethod: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
}

// GET /api/orders - Get all orders (admin) or user's orders
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (userId) {
      query = query.eq('user_id', userId)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Orders API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create a new order
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('🔍 Orders API - Looking for user ID:', body.userId)
    
    if (!body.userId || !body.items || !body.total) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Verify user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email')
      .eq('id', body.userId)
      .single()
    
    console.log('🔍 Orders API - User found:', user)
    console.log('🔍 Orders API - User error:', userError)
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    const newOrder = {
      id: `ORD-${Date.now()}`,
      user_id: body.userId,
      items: body.items,
      total: body.total,
      shipping_address: body.shippingAddress,
      payment_method: body.paymentMethod,
      status: 'pending',
      created_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('orders')
      .insert(newOrder)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      )
    }
    
    // Send confirmation email
    try {
      await sendOrderConfirmation(data, user.email);
      console.log('Confirmation email sent to:', user.email);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the order if email fails
    }
    
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Orders API error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}