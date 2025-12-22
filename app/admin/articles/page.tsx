import { getArticles } from '@/app/lib/db';
import ArticlesManager from '../components/ArticlesManager';

export const dynamic = 'force-dynamic';

export default async function AdminArticlesPage() {
  const articles = await getArticles();

  return <ArticlesManager initialArticles={articles} />;
}
