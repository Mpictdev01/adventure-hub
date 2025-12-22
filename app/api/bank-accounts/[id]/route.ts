import { NextResponse } from 'next/server';
import { getBankAccountById, updateBankAccount, deleteBankAccount } from '@/app/lib/db';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = params.id;
    const account = await getBankAccountById(id);
    
    if (!account) {
      return NextResponse.json({ error: 'Bank account not found' }, { status: 404 });
    }
    
    return NextResponse.json(account);
  } catch (error) {
    console.error('Error fetching bank account:', error);
    return NextResponse.json({ error: 'Failed to fetch bank account' }, { status: 500 });
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
    
    const account = await getBankAccountById(id);
    
    if (!account) {
      return NextResponse.json({ error: 'Bank account not found' }, { status: 404 });
    }
    
    const updates: Record<string, any> = {};
    if (body.bankName !== undefined) updates.bankName = body.bankName;
    if (body.accountNumber !== undefined) updates.accountNumber = body.accountNumber;
    if (body.accountName !== undefined) updates.accountName = body.accountName;
    if (body.logo !== undefined) updates.logo = body.logo;
    if (body.isActive !== undefined) updates.isActive = body.isActive;
    
    await updateBankAccount(id, updates);
    
    return NextResponse.json({ success: true, message: 'Bank account updated' });
  } catch (error) {
    console.error('Error updating bank account:', error);
    return NextResponse.json({ error: 'Failed to update bank account' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = params.id;
    
    const account = await getBankAccountById(id);
    
    if (!account) {
      return NextResponse.json({ error: 'Bank account not found' }, { status: 404 });
    }
    
    await deleteBankAccount(id);
    
    return NextResponse.json({ success: true, message: 'Bank account deleted' });
  } catch (error) {
    console.error('Error deleting bank account:', error);
    return NextResponse.json({ error: 'Failed to delete bank account' }, { status: 500 });
  }
}
