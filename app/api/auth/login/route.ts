
import { NextResponse } from 'next/server';
import { verifyAdminCredentials } from '../../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    const user = await verifyAdminCredentials(username, password);

    if (user) {
      // Return success. Client will set the cookie.
      // In a more secure app, we'd set an HTTP-Only cookie here.
      return NextResponse.json({ success: true, user: { username: user.username, role: user.role } });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
