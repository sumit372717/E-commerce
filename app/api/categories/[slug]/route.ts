import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// DELETE /api/categories/:slug - Delete a category
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // First check if category exists
    const { data: existing, error: checkError } = await supabase
      .from('categories')
      .select('slug')
      .eq('slug', params.slug)
      .single()
    
    if (checkError || !existing) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }
    
    // Delete the category
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('slug', params.slug)
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to delete category' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Category delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}