'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from '@/app/lib/db';

interface ArticleFormProps {
  initialData?: Article;
  isEdit?: boolean;
}

export default function ArticleForm({ initialData, isEdit = false }: ArticleFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Article>>(
    initialData || {
      title: '',
      category: 'News',
      excerpt: '',
      content: '',
      img: '',
      isFeatured: false,
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEdit ? `/api/articles/${initialData?.id}` : '/api/articles';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save article');

      router.push('/admin/articles');
      router.refresh(); 
    } catch (err) {
      setError('An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-4xl">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
           <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black"
              placeholder="Article Title"
            />
          </div>
          
           <div>
            <label className="block text-gray-700 font-medium mb-1">Excerpt</label>
            <textarea
              required
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black h-24"
              placeholder="Short summary..."
            />
          </div>
          
           <div>
            <label className="block text-gray-700 font-medium mb-1">Content (Markdown supported)</label>
            <textarea
              required
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black h-64 font-mono text-sm"
              placeholder="# Heading..."
            />
          </div>
        </div>
        
        <div className="space-y-4">
           <div>
             <label className="block text-gray-700 font-medium mb-1">Category</label>
             <select
               name="category"
               value={formData.category}
               onChange={handleChange}
               className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black"
             >
               <option value="News">News</option>
               <option value="Tips">Tips</option>
               <option value="Story">Story</option>
               <option value="Guide">Guide</option>
             </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-1">Cover Image</label>
             <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  const uploadData = new FormData();
                  uploadData.append('file', file);
                  
                  setLoading(true);
                  try {
                    const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
                    if (res.ok) {
                       const data = await res.json();
                       setFormData(prev => ({ ...prev, img: data.url }));
                    } else {
                       alert('Upload failed');
                    }
                  } catch (err) {
                    alert('Error uploading');
                  } finally {
                    setLoading(false);
                  }
                }}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black"
             />
             
            <input type="hidden" name="img" value={formData.img} />
            
            {formData.img && (
              <div className="mt-2 relative">
                 <img src={formData.img} alt="Preview" className="w-full h-auto rounded border" />
                 <button 
                   type="button"
                   onClick={() => setFormData(prev => ({ ...prev, img: '' }))}
                   className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded text-xs"
                 >
                   Remove
                 </button>
              </div>
            )}
          </div>
          
          <div className="pt-2">
             <label className="flex items-center space-x-2 cursor-pointer">
                <input
                   type="checkbox"
                   name="isFeatured"
                   checked={formData.isFeatured}
                   onChange={handleCheckboxChange}
                   className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">Featured Article</span>
             </label>
          </div>
        </div>
      </div>

      <div className="pt-4 flex items-center space-x-4 border-t border-gray-100 mt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {loading ? 'Saving...' : 'Save Article'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
