import { NextResponse } from 'next/server';
import { getAdminUserById, updateAdminUser, deleteAdminUser } from '@/app/lib/db';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = params.id;
    const user = await getAdminUserById(id);
    
    if (!user) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching admin user:', error);
    return NextResponse.json({ error: 'Failed to fetch admin user' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = params.id;
    const body = await request.json();
    
    const user = await getAdminUserById(id);
    
    if (!user) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }
    
    const updates: Record<string, any> = {};
    if (body.name) updates.name = body.name;
    if (body.email) updates.email = body.email;
    if (body.role) updates.role = body.role;
    if (body.password) updates.passwordHash = body.password; // In production, hash this
    
    await updateAdminUser(id, updates);
    
    return NextResponse.json({ success: true, message: 'Admin user updated' });
  } catch (error) {
    console.error('Error updating admin user:', error);
    return NextResponse.json({ error: 'Failed to update admin user' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = params.id;
    
    const user = await getAdminUserById(id);
    
    if (!user) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }
    
    await deleteAdminUser(id);
    
    return NextResponse.json({ success: true, message: 'Admin user deleted' });
  } catch (error) {
    console.error('Error deleting admin user:', error);
    return NextResponse.json({ error: 'Failed to delete admin user' }, { status: 500 });
  }
}
