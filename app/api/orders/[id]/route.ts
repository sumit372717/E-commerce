import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const ALLOWED_STATUSES = ['pending', 'processing', 'shipped', 'delivered']

// GET /api/orders/:id - Get a specific order
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', params.id)
      .single()
    
    if (error || !data) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Order API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

// PUT /api/orders/:id - Update order status
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status } = body
    
    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }
    
    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Status must be one of: ${ALLOWED_STATUSES.join(', ')}` },
        { status: 400 }
      )
    }
    
    // First check if order exists
    const { data: existing, error: checkError } = await supabase
      .from('orders')
      .select('id')
      .eq('id', params.id)
      .single()
    
    if (checkError || !existing) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }
    
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', params.id)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Order API error:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}