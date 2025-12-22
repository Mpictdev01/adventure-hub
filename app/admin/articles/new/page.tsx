import ArticleForm from '../../components/ArticleForm';

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Write New Article</h2>
      <ArticleForm />
    </div>
  );
}
