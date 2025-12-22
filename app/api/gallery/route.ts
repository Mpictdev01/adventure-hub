import { NextResponse } from 'next/server';
import { getGallery, saveGalleryItem } from '@/app/lib/db';

export async function GET() {
  const gallery = await getGallery();
  return NextResponse.json(gallery);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newItem = {
      ...body,
      id: body.id || Math.random().toString(36).substr(2, 9),
    };
    
    await saveGalleryItem(newItem);
    
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error adding gallery item:', error);
    return NextResponse.json({ error: 'Failed to add gallery item' }, { status: 500 });
  }
}
