import { NextResponse } from 'next/server';
import { getBookingById, updateBooking, deleteBooking } from '@/app/lib/db';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const id = params.id;
  const booking = await getBookingById(id);
  
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }
  
  return NextResponse.json(booking);
}

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = params.id;
    const { action } = await request.json();
    
    const booking = await getBookingById(id);
    
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    
    let updates: { status?: 'Pending' | 'Confirmed' | 'Cancelled'; paymentStatus?: 'Unpaid' | 'Paid' } = {};
    
    if (action === 'confirm_payment') {
      updates = { status: 'Confirmed', paymentStatus: 'Paid' };
    } else if (action === 'revoke_payment') {
      updates = { status: 'Pending', paymentStatus: 'Unpaid' };
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
    await updateBooking(id, updates);
    
    return NextResponse.json({ ...booking, ...updates });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = params.id;
    
    const booking = await getBookingById(id);
    
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    
    await deleteBooking(id);
    
    return NextResponse.json({ success: true, message: 'Booking deleted' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}

