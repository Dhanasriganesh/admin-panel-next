import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

// GET - Fetch all packages
export async function GET(request) {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ packages: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create a new package
export async function POST(request) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('packages')
      .insert([{
        name: body.name,
        destination: body.destination,
        duration: body.duration,
        price: body.price,
        original_price: body.originalPrice,
        description: body.description,
        highlights: body.highlights,
        includes: body.includes,
        category: body.category,
        status: body.status || 'Active',
        featured: body.featured || false,
        image: body.image || '/cards/1.jpg',
        route: body.route || '',
        nights: body.nights || 0,
        days: body.days || 0,
        trip_type: body.tripType || 'custom'
      }])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ package: data[0] }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
