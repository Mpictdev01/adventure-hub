import { getArticleById } from '@/app/lib/db';
import ArticleForm from '../../components/ArticleForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditArticlePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Edit Article</h2>
      <ArticleForm initialData={article} isEdit />
    </div>
  );
}
