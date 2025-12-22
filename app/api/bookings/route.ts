import { NextResponse } from 'next/server';
import { getBookings, createBooking } from '@/app/lib/db';

export async function GET() {
  try {
    const bookings = await getBookings();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Ensure participants is properly formatted
    const participants = body.participants || [];
    
    const newBooking = {
      id: `BKG-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      tripId: body.tripId || '',
      tripName: body.tripName || '',
      tripImage: body.tripImage || '',
      tripLocation: body.tripLocation || '',
      customerName: body.customerName || '',
      email: body.email || '',
      phone: body.phone || '',
      date: body.date || new Date().toISOString().split('T')[0],
      guests: body.guests || 1,
      totalPrice: body.totalPrice || 0,
      pricePerPax: body.pricePerPax || 0,
      participants: JSON.stringify(participants), // Serialize to JSON string for DB
      status: body.status || 'Pending',
      paymentStatus: body.paymentStatus || 'Unpaid',
      paymentMethod: body.paymentMethod || '',
      proofOfPaymentUrl: body.proofOfPaymentUrl || '',
      createdAt: new Date().toISOString(),
    };
    
    await createBooking(newBooking as any);
    
    return NextResponse.json({ ...newBooking, participants }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking', details: String(error) }, { status: 500 });
  }
}

