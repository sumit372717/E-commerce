import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined')
}

// GET /api/help - Get all contact messages (admin only)
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
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Help API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// POST /api/help - Send a contact message
export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    const newContact = {
      id: String(Date.now()),
      name,
      email,
      subject,
      message,
      status: 'pending',
      created_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert(newContact)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

    // In production, send an email notification here
    
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent! We will respond within 24 hours.'
    }, { status: 201 })
  } catch (error) {
    console.error('Help API error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}