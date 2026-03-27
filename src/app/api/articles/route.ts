import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const articleSlug = searchParams.get('slug');
    const articleCategory = searchParams.get('category');

    if (articleSlug) {
      const article = await db.article.findUnique({
        where: { slug: articleSlug }
      });

      if (!article) {
        return NextResponse.json({ error: 'Статья не найдена' }, { status: 404 });
      }

      return NextResponse.json(article);
    }

    const where = articleCategory ? { category: articleCategory } : {};

    const articles = await db.article.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Ошибка загрузки статей' }, { status: 500 });
  }
}
