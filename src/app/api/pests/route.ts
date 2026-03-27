import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pestSlug = searchParams.get('slug');

    if (pestSlug) {
      const pest = await db.pest.findUnique({
        where: { slug: pestSlug },
        include: {
          cultures: true
        }
      });

      if (!pest) {
        return NextResponse.json({ error: 'Вредитель не найден' }, { status: 404 });
      }

      return NextResponse.json(pest);
    }

    const pests = await db.pest.findMany({
      include: {
        _count: {
          select: { cultures: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json(pests);
  } catch (error) {
    console.error('Error fetching pests:', error);
    return NextResponse.json({ error: 'Ошибка загрузки вредителей' }, { status: 500 });
  }
}
