import { NextResponse } from 'next/server';
import { getArticles, saveArticle } from '@/app/lib/db';

export async function GET() {
  const articles = await getArticles();
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newArticle = {
      ...body,
      id: body.id || Math.random().toString(36).substr(2, 9),
      date: body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    
    await saveArticle(newArticle);
    
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
