import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// GET /api/track-order?id=1&email=test@test.com
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('id')
    const email = searchParams.get('email')
    
    if (!orderId || !email) {
      return NextResponse.json(
        { error: 'Order ID and email are required' },
        { status: 400 }
      )
    }
    
    // Get the order from Supabase
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()
    
    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }
    
    // Get the user for this order
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, name')
      .eq('id', order.user_id)
      .single()
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Order not found for this email' },
        { status: 404 }
      )
    }
    
    // Check if email matches
    if (user.email !== email) {
      return NextResponse.json(
        { error: 'Order not found for this email' },
        { status: 404 }
      )
    }
    
    // Return order details
    return NextResponse.json({
      id: order.id,
      status: order.status,
      total: order.total,
      items: order.items,
      shippingAddress: order.shipping_address,
      paymentMethod: order.payment_method,
      createdAt: order.created_at,
      userEmail: user.email,
      userName: user.name
    })
  } catch (error) {
    console.error('Track order error:', error)
    return NextResponse.json(
      { error: 'Failed to track order' },
      { status: 500 }
    )
  }
}