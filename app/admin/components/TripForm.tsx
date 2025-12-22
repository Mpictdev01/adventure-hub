'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trip } from '@/app/lib/db';

interface TripFormProps {
  initialData?: Trip;
  isEdit?: boolean;
}

export default function TripForm({ initialData, isEdit = false }: TripFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Trip>>(
    initialData || {
      title: '',
      location: '',
      difficulty: 'Easy',
      duration: '',
      price: '',
      imageUrl: '',
      rating: 5,
      badge: 'Open Trip',
      date: '',
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEdit ? `/api/trips/${initialData?.id}` : '/api/trips';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save trip');

      router.push('/admin/trips');
      router.refresh(); 
    } catch (err) {
      setError('An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-2xl">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black"
            placeholder="e.g. Mt. Bromo Sunrise"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Location</label>
          <input
            required
            name="location"
            value={formData.location}
            onChange={handleChange}
            type="text"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black"
            placeholder="e.g. East Java"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input
            required
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="text"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black"
            placeholder="e.g. IDR 1.2M"
          />
        </div>

        <div>
           <label className="block text-gray-700 font-medium mb-1">Duration</label>
           <input
             required
             name="duration"
             value={formData.duration}
             onChange={handleChange}
             type="text"
             className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black"
             placeholder="e.g. 3 Days"
           />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div>
           <label className="block text-gray-700 font-medium mb-1">Rating (0-5)</label>
           <input
             name="rating"
             value={formData.rating}
             onChange={handleChange}
             type="number"
             step="0.1"
             min="0"
             max="5"
             className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black"
           />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Badge</label>
          <select
            name="badge"
            value={formData.badge}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black"
          >
            <option value="Open Trip">Open Trip</option>
            <option value="Private Trip">Private Trip</option>
          </select>
        </div>
        
         <div>
           <label className="block text-gray-700 font-medium mb-1">Date (Optional)</label>
           <input
             name="date"
             value={formData.date}
             onChange={handleChange}
             type="text"
             className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black"
             placeholder="e.g. Aug 24 - 27"
           />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Trip Image</label>
           <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  const uploadData = new FormData();
                  uploadData.append('file', file);
                  
                  try {
                    setLoading(true);
                    const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
                    if (res.ok) {
                       const data = await res.json();
                       setFormData(prev => ({ ...prev, imageUrl: data.url }));
                    } else {
                       alert('Upload failed');
                    }
                  } catch (err) {
                    console.error(err);
                    alert('Error uploading');
                  } finally {
                    setLoading(false);
                  }
                }}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black"
              />
           </div>
           
           <input type="hidden" name="imageUrl" value={formData.imageUrl} />
           
          {formData.imageUrl && (
            <div className="mt-2 h-48 bg-gray-100 rounded overflow-hidden relative">
               <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
               <button 
                 type="button"
                 onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                 className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
               >
                 Remove
               </button>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 flex items-center space-x-4 border-t border-gray-100 mt-4">
        <button
          type="submit"
          disabled={loading || !formData.imageUrl}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {loading ? 'Saving...' : 'Save Trip'}
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
