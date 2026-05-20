// Типы для приложения Садовый менеджер

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string | null;
  order: number;
}

export interface Culture {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  category?: Category;
  description: string | null;
  history: string | null;
  plantingTime: string | null;
  careTips: string | null;
  watering: string | null;
  fertilizing: string | null;
  harvesting: string | null;
  storage: string | null;
  goodNeighbors: string | null;
  badNeighbors: string | null;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  content: string;
  tags: string | null;
}

// Навигационные разделы
export type Section = 'home' | 'catalog' | 'articles' | 'settings';
