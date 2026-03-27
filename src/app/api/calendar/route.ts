import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const dateStr = searchParams.get('date');

    if (dateStr) {
      const day = await db.moonCalendar.findUnique({
        where: { date: dateStr }
      });

      if (!day) {
        return NextResponse.json({ error: 'Дата не найдена' }, { status: 404 });
      }

      return NextResponse.json(day);
    }

    const where: { year?: number; month?: number } = {};
    if (year) where.year = parseInt(year);
    if (month) where.month = parseInt(month);

    const calendar = await db.moonCalendar.findMany({
      where,
      orderBy: [{ year: 'asc' }, { month: 'asc' }, { day: 'asc' }]
    });

    return NextResponse.json(calendar);
  } catch (error) {
    console.error('Error fetching calendar:', error);
    return NextResponse.json({ error: 'Ошибка загрузки календаря' }, { status: 500 });
  }
}
