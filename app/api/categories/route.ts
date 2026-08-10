import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/categories - Get all categories
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('label')
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Categories API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST /api/categories - Create a new category
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.slug || !body.label) {
      return NextResponse.json(
        { error: 'Slug and label are required' },
        { status: 400 }
      )
    }
    
    // Check if category already exists
    const { data: existing, error: checkError } = await supabase
      .from('categories')
      .select('slug')
      .eq('slug', body.slug)
      .single()
    
    if (existing) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 400 }
      )
    }
    
    const newCategory = {
      slug: body.slug,
      label: body.label,
      subcategories: body.subcategories || [],
      description: body.description || null
    }
    
    const { data, error } = await supabase
      .from('categories')
      .insert(newCategory)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create category' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Categories API error:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}