import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined')
}

// GET /api/business?userId=1 - Get business account by user ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('business_accounts')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      // Return null if not found (404)
      if (error.code === 'PGRST116') {
        return NextResponse.json(null, { status: 404 })
      }
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch business' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Business API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch business' },
      { status: 500 }
    )
  }
}

// POST /api/business - Create a new business account
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.userId || !body.companyName) {
      return NextResponse.json(
        { error: 'User ID and company name are required' },
        { status: 400 }
      )
    }

    // Check if user already has a business account
    const { data: existing, error: checkError } = await supabase
      .from('business_accounts')
      .select('id')
      .eq('user_id', body.userId)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'User already has a business account' },
        { status: 400 }
      )
    }

    const newBusiness = {
      id: String(Date.now()),
      user_id: body.userId,
      company_name: body.companyName,
      tax_id: body.taxId || null,
      vat_number: body.vatNumber || null,
      address: body.address || null,
      phone: body.phone || null,
      website: body.website || null,
      business_type: body.businessType || 'retail',
      estimated_monthly_order: body.estimatedMonthlyOrder || '0-1000',
      status: 'active',
      created_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('business_accounts')
      .insert(newBusiness)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create business account' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Business API error:', error)
    return NextResponse.json(
      { error: 'Failed to create business account' },
      { status: 500 }
    )
  }
}