import { NextResponse } from 'next/server';
import { getAdminUsers, createAdminUser } from '@/app/lib/db';

export async function GET() {
  console.log('API: GET /api/admin-users dipanggil');
  try {
    const users = await getAdminUsers();
    console.log('API: Berhasil dapat users dari DB, mengirim respon...');
    return NextResponse.json(users);
  } catch (error) {
    console.error('API: Error fetching admin users:', error);
    return NextResponse.json({ error: 'Failed to fetch admin users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.username || !body.password || !body.name || !body.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newUser = {
      username: body.username,
      passwordHash: body.password, // In production, hash this with bcrypt
      name: body.name,
      email: body.email,
      role: body.role || 'admin',
    };
    
    await createAdminUser(newUser);
    
    return NextResponse.json({ success: true, message: 'Admin user created' }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating admin user:', error);
    if (error.code === '23505') { // Unique constraint violation
      return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create admin user' }, { status: 500 });
  }
}
