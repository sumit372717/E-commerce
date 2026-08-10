import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST /api/users - Create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.id || !body.email || !body.name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('id', body.id)
      .single()

    if (existing) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 200 }
      )
    }

    // Insert user
    const { data, error } = await supabase
      .from('users')
      .insert({
        id: body.id,
        email: body.email,
        name: body.name,
        role: body.role || 'customer'
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('User API error:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}