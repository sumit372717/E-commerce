import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic';

// GET /api/search?q=keyword
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.toLowerCase() || ''
    
    if (!query || query.length < 2) {
      return NextResponse.json([])
    }
    
    // Search in Supabase using ilike for case-insensitive search
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,slug.ilike.%${query}%,category_slug.ilike.%${query}%`)
      .limit(20)
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Search failed' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}