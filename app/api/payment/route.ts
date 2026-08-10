import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPESECRETKEY!, {
  apiVersion: '2026-07-29.dahlia',
})

export async function POST(request: Request) {
  try {
    const { items, shippingAddress, email } = await request.json()

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: `Quantity: ${item.quantity}`,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `https://e-commerce-tan-one-94.vercel.app/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://e-commerce-tan-one-94.vercel.app/cart`,
      customer_email: email,
      shipping_address_collection: {
        allowed_countries: ['US', 'GB', 'CA', 'AU', 'BD'],
      },
      metadata: {
        shippingAddress: JSON.stringify(shippingAddress),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: error.message || 'Payment failed' },
      { status: 500 }
    )
  }
}