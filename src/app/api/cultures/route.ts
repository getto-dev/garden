import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const cultureSlug = searchParams.get('slug');

    if (cultureSlug) {
      const culture = await db.culture.findUnique({
        where: { slug: cultureSlug },
        include: {
          category: true,
          diseases: true,
          pests: true
        }
      });

      if (!culture) {
        return NextResponse.json({ error: 'Культура не найдена' }, { status: 404 });
      }

      return NextResponse.json(culture);
    }

    const where = categorySlug ? { category: { slug: categorySlug } } : {};

    const cultures = await db.culture.findMany({
      where,
      include: {
        category: true
      },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json(cultures);
  } catch (error) {
    console.error('Error fetching cultures:', error);
    return NextResponse.json({ error: 'Ошибка загрузки культур' }, { status: 500 });
  }
}
