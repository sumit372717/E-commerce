import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined')
}

// GET /api/newsletter - Get all subscribers (admin only)
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET) as any
    
    // Check if user is admin
    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch subscribers' },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('subscribers')
      .select('email')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      )
    }

    const newSubscriber = {
      id: String(Date.now()),
      email,
      status: 'active',
      created_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('subscribers')
      .insert(newSubscriber)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully!'
    }, { status: 201 })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

// DELETE /api/newsletter - Unsubscribe
export async function DELETE(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('subscribers')
      .delete()
      .eq('email', email)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Unsubscribed successfully!'
    })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
}