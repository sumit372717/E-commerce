import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('🔍 Sync request:', body)
    
    if (!body.id || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Step 1: Check if user exists by email
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', body.email)
      .single()

    console.log('🔍 Existing user:', existingUser)
    console.log('🔍 Check error:', checkError)

    if (existingUser) {
      // User exists by email — update the ID if needed
      if (existingUser.id !== body.id) {
        console.log('🔄 User exists with different ID. Updating...')
        console.log('🔍 Updating orders from:', existingUser.id, 'to:', body.id)
        
        // Update orders to the new ID
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .update({ user_id: body.id })
          .eq('user_id', existingUser.id)
          .select()
        
        console.log('🔍 Orders updated:', ordersData, ordersError)
        
        // Update the user ID
        const { error: updateError } = await supabase
          .from('users')
          .update({ id: body.id })
          .eq('id', existingUser.id)
        
        console.log('🔍 User update error:', updateError)
        
        if (updateError) {
          return NextResponse.json(
            { error: `Failed to update user: ${updateError.message}` },
            { status: 500 }
          )
        }
        
        console.log('✅ User ID updated successfully')
        return NextResponse.json({ success: true, action: 'updated' })
      }
      
      console.log('✅ User already exists and ID matches')
      return NextResponse.json({ success: true, action: 'exists' })
    }

    // Step 2: User doesn't exist — insert new
    console.log('🆕 Creating new user...')
    
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        id: body.id,
        email: body.email,
        password: 'supabase_auth',
        name: body.name || body.email,
        role: body.role || 'customer'
      })

    console.log('🔍 Insert error:', insertError)

    if (insertError) {
      return NextResponse.json(
        { error: `Failed to create user: ${insertError.message}` },
        { status: 500 }
      )
    }

    console.log('✅ New user created successfully')
    return NextResponse.json({ success: true, action: 'created' })
  } catch (error: any) {
    console.error('Sync error:', error)
    return NextResponse.json(
      { error: `Sync error: ${error.message}` },
      { status: 500 }
    )
  }
}