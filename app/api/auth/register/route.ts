import { NextResponse } from 'next/server'
import { createUser } from '@/lib/users'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const user = await createUser(email, password, name)
    
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 400 }
    )
  }
}