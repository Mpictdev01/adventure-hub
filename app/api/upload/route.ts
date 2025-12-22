import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';

export const runtime = 'edge'; // Optional: Use Edge Runtime for faster uploads if compatible, or remove if causing issues. sticking to default for now is safer.
// Actually, standard Node runtime is safer for compatibility unless we are sure about Edge limits.
// Let's stick to standard runtime but usage of supabase-js is fine.

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    // Create unique filename
    // Sanitize filename to avoid issues
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase
      .storage
      .from('trip-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase storage error:', error);
      throw error;
    }

    // Get Public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('trip-images')
      .getPublicUrl(filePath);

    return NextResponse.json({ success: true, url: publicUrl });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, message: 'Error uploading file' }, { status: 500 });
  }
}
