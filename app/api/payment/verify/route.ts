import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPESECRETKEY!, {
  apiVersion: '2026-07-29.dahlia',
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    console.log('🔍 Session data:', JSON.stringify(session, null, 2))

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    const shippingAddress = session.metadata?.shippingAddress
      ? JSON.parse(session.metadata.shippingAddress)
      : {}

    const newOrder = {
      id: `ORD-${Date.now()}`,
      user_id: session.client_reference_id || 'guest',
      items: session.metadata?.items ? JSON.parse(session.metadata.items) : [],
      total: session.amount_total ? session.amount_total / 100 : 0,
      shipping_address: shippingAddress,
      payment_method: 'stripe',
      payment_intent: session.payment_intent,
      status: 'processing',
      created_at: new Date().toISOString(),
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

    return NextResponse.json({ orderId: data.id })
  } catch (error: any) {
    console.error('Verify error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to verify payment' },
      { status: 500 }
    )
  }
}