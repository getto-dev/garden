import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const diseaseSlug = searchParams.get('slug');

    if (diseaseSlug) {
      const disease = await db.disease.findUnique({
        where: { slug: diseaseSlug },
        include: {
          cultures: true
        }
      });

      if (!disease) {
        return NextResponse.json({ error: 'Болезнь не найдена' }, { status: 404 });
      }

      return NextResponse.json(disease);
    }

    const diseases = await db.disease.findMany({
      include: {
        _count: {
          select: { cultures: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json(diseases);
  } catch (error) {
    console.error('Error fetching diseases:', error);
    return NextResponse.json({ error: 'Ошибка загрузки болезней' }, { status: 500 });
  }
}
