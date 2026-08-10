import { NextResponse } from 'next/server'
import { validateUser, findUserById } from '@/lib/users'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await validateUser(email, password)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      token
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 500 }
    )
  }
}