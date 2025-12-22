'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Article } from '@/app/lib/db';

interface ArticlesManagerProps {
  initialArticles: Article[];
}

export default function ArticlesManager({ initialArticles }: ArticlesManagerProps) {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  // Toggle selection of a single article
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedIds.size === articles.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(articles.map(a => a.id)));
    }
  };

  // Delete selected articles
  const deleteSelected = async () => {
    if (selectedIds.size === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} article(s)? This action cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    try {
      const deletePromises = Array.from(selectedIds).map(id =>
        fetch(`/api/articles/${id}`, { method: 'DELETE' })
      );
      
      await Promise.all(deletePromises);
      
      // Update local state
      setArticles(articles.filter(a => !selectedIds.has(a.id)));
      setSelectedIds(new Set());
      router.refresh();
    } catch (error) {
      console.error('Error deleting articles:', error);
      alert('Failed to delete some articles');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Manage Articles</h2>
        <Link href="/admin/articles/new" className="bg-[#19b366] text-[#112119] px-4 py-2 rounded hover:bg-[#159655] font-bold">
          + New Article
        </Link>
      </div>

      {/* Action Bar - Shows when items are selected */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-red-400">check_circle</span>
            <span className="text-white font-medium">
              {selectedIds.size} article(s) selected
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedIds(new Set())}
              className="px-4 py-2 text-[#9eb7ab] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={deleteSelected}
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
              {deleting ? 'Deleting...' : 'Delete Selected'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-[#1c2621] rounded-lg shadow border border-[#293830]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#9eb7ab] min-w-[600px]">
            <thead className="bg-[#111714] uppercase text-xs font-semibold text-[#9eb7ab] border-b border-[#293830]">
              <tr>
                <th className="px-4 py-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === articles.length && articles.length > 0}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-gray-600 bg-[#1c2621] text-[#19b366] focus:ring-[#19b366] focus:ring-offset-0"
                  />
                </th>
                <th className="px-4 py-4">Title</th>
                <th className="px-4 py-4">Category</th>
                <th className="px-4 py-4">Date</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#293830]">
              {articles.map((article) => (
                <tr key={article.id} className={`hover:bg-[#111714] ${selectedIds.has(article.id) ? 'bg-[#19b366]/5' : ''}`}>
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(article.id)}
                      onChange={() => toggleSelect(article.id)}
                      className="h-4 w-4 rounded border-gray-600 bg-[#1c2621] text-[#19b366] focus:ring-[#19b366] focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-4 font-medium text-white">{article.title}</td>
                  <td className="px-4 py-4">{article.category}</td>
                  <td className="px-4 py-4">{article.date}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border
                      ${article.isFeatured ? 'bg-[#19b366]/10 text-[#19b366] border-[#19b366]/30' : 'bg-gray-500/10 text-gray-400 border-gray-500/30'}`}>
                      {article.isFeatured ? 'Featured' : 'Standard'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link href={`/admin/articles/${article.id}`} className="text-[#19b366] hover:text-[#159655] font-medium">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#9eb7ab]">
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
