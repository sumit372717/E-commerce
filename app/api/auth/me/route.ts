import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { findUserById } from '@/lib/users'

const JWT_SECRET = process.env.JWT_SECRET as string
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined')
}

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
    
    const user = await findUserById(decoded.userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      )
    }

    const { password, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
}