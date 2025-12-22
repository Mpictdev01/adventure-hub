import { NextResponse } from 'next/server';
import { getBankAccounts, createBankAccount } from '@/app/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';
    
    const accounts = await getBankAccounts(activeOnly);
    return NextResponse.json(accounts);
  } catch (error) {
    console.error('Error fetching bank accounts:', error);
    return NextResponse.json({ error: 'Failed to fetch bank accounts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.bankName || !body.accountNumber || !body.accountName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newAccount = {
      bankName: body.bankName,
      accountNumber: body.accountNumber,
      accountName: body.accountName,
      logo: body.logo || '🏦',
      isActive: body.isActive !== false, // Default to true
    };
    
    const created = await createBankAccount(newAccount);
    
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating bank account:', error);
    return NextResponse.json({ error: 'Failed to create bank account' }, { status: 500 });
  }
}
