import { NextResponse } from 'next/server';
import { getTrips, saveTrip } from '@/app/lib/db';

export async function GET() {
  const trips = await getTrips();
  return NextResponse.json(trips);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTrip = {
      ...body,
      id: body.id || body.title.toLowerCase().replace(/\s+/g, '-'),
    };
    
    await saveTrip(newTrip);
    
    return NextResponse.json(newTrip, { status: 201 });
  } catch (error) {
    console.error('Error creating trip:', error);
    return NextResponse.json({ error: 'Failed to create trip' }, { status: 500 });
  }
}
