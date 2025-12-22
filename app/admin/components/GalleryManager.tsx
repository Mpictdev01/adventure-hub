'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GalleryItem } from '@/app/lib/db';

interface GalleryManagerProps {
  initialItems: GalleryItem[];
}

export default function GalleryManager({ initialItems }: GalleryManagerProps) {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    url: '',
    caption: '',
    location: '',
    activities: '',
    size: 'Normal'
  });
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (res.ok) {
        const data = await res.json();
        setNewItem({ ...newItem, url: data.url });
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.url) {
      alert('Please upload an image first');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      
      if (res.ok) {
        const addedItem = await res.json();
        setItems([...items, addedItem]); 
        setNewItem({ url: '', caption: '', location: '', activities: '', size: 'Normal' });
        setShowAddForm(false);
        router.refresh(); 
      }
    } catch (error) {
      console.error('Failed to add item', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setItems(items.filter(item => item.id !== id));
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to delete item', error);
    }
  };

  // Toggle selection of a single item
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
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map(i => i.id)));
    }
  };

  // Delete selected items
  const deleteSelected = async () => {
    if (selectedIds.size === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} image(s)? This action cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    try {
      const deletePromises = Array.from(selectedIds).map(id =>
        fetch(`/api/gallery/${id}`, { method: 'DELETE' })
      );
      
      await Promise.all(deletePromises);
      
      // Update local state
      setItems(items.filter(i => !selectedIds.has(i.id)));
      setSelectedIds(new Set());
      setSelectionMode(false);
      router.refresh();
    } catch (error) {
      console.error('Error deleting gallery items:', error);
      alert('Failed to delete some images');
    } finally {
      setDeleting(false);
    }
  };

  // Cancel selection mode
  const cancelSelection = () => {
    setSelectedIds(new Set());
    setSelectionMode(false);
  };

  // Helper to map size to grid classes (Tailwind)
  const getSizeClass = (size?: string) => {
    switch (size) {
      case 'Wide': return 'md:col-span-2 md:row-span-1';
      case 'Tall': return 'md:col-span-1 md:row-span-2';
      case 'Big': return 'md:col-span-2 md:row-span-2';
      default: return 'md:col-span-1 md:row-span-1';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Selection Toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Gallery Management</h2>
        {!selectionMode ? (
          <button
            onClick={() => setSelectionMode(true)}
            className="flex items-center gap-2 px-4 py-2 border border-[#293830] text-[#9eb7ab] rounded-lg hover:bg-[#293830] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">check_box</span>
            Select Items
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSelectAll}
              className="px-4 py-2 border border-[#293830] text-[#9eb7ab] rounded-lg hover:bg-[#293830] hover:text-white transition-colors"
            >
              {selectedIds.size === items.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        )}
      </div>

      {/* Action Bar - Shows when items are selected */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-red-400">check_circle</span>
            <span className="text-white font-medium">
              {selectedIds.size} image(s) selected
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={cancelSelection}
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

      {/* Upload/Add Section */}
      <div className="bg-[#1c2621] p-6 rounded-lg shadow border border-[#293830]">
        {!showAddForm ? (
          <button 
            onClick={() => setShowAddForm(true)}
            className="w-full py-8 border-2 border-dashed border-[#293830] rounded-lg text-[#9eb7ab] hover:border-[#19b366] hover:text-[#19b366] transition-colors flex flex-col items-center justify-center gap-2"
          >
             <span className="text-2xl font-bold">+</span>
             <span>Add New Gallery Item</span>
          </button>
        ) : (
          <form onSubmit={handleAdd} className="space-y-4">
             <h3 className="font-bold text-white">Add New Image</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="md:col-span-2">
                 <label className="block text-[#9eb7ab] font-medium mb-1">Image File</label>
                 <input 
                   type="file" 
                   accept="image/*"
                   onChange={handleFileChange}
                   className="border border-[#293830] bg-[#111714] p-2 rounded w-full text-white"
                 />
                 {loading && <p className="text-sm text-[#19b366] mt-1">Uploading...</p>}
               </div>
               <input 
                 type="text" 
                 name="caption"
                 placeholder="Caption" 
                 className="border border-[#293830] bg-[#111714] p-2 rounded w-full text-white placeholder-[#9eb7ab]/60"
                 value={newItem.caption}
                 onChange={handleInputChange}
               />
               <input 
                 type="text" 
                 name="location"
                 placeholder="Location (e.g. Bromo)" 
                 className="border border-[#293830] bg-[#111714] p-2 rounded w-full text-white placeholder-[#9eb7ab]/60"
                 value={newItem.location}
                 onChange={handleInputChange}
               />
               <input 
                 type="text" 
                 name="activities"
                 placeholder="Activities (e.g. Trekking, Photography)" 
                 className="border border-[#293830] bg-[#111714] p-2 rounded w-full text-white placeholder-[#9eb7ab]/60"
                 value={newItem.activities}
                 onChange={handleInputChange}
               />
               <select
                 name="size"
                 className="border border-[#293830] bg-[#111714] p-2 rounded w-full text-white"
                 value={newItem.size}
                 onChange={handleInputChange}
               >
                 <option value="Normal">Normal (1x1)</option>
                 <option value="Wide">Wide (2x1)</option>
                 <option value="Tall">Tall (1x2)</option>
                 <option value="Big">Big (2x2)</option>
               </select>
             </div>
             
             {newItem.url && (
               <div className="w-32 h-32 relative bg-[#111714] rounded overflow-hidden mt-2">
                 <img src={newItem.url} alt="Preview" className="w-full h-full object-cover" />
               </div>
             )}
             
             <div className="flex gap-2">
               <button 
                 type="submit" 
                 disabled={loading || !newItem.url}
                 className="bg-[#19b366] text-[#112119] px-4 py-2 rounded hover:bg-[#159655] font-bold disabled:opacity-50"
               >
                 Add to Gallery
               </button>
               <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-[#293830] text-[#9eb7ab] px-4 py-2 rounded hover:bg-[#111714] hover:text-white"
               >
                 Cancel
               </button>
             </div>
          </form>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        {items.map((item) => (
          <div 
            key={item.id} 
            className={`group relative bg-[#1c2621] rounded-lg shadow overflow-hidden border border-[#293830] ${getSizeClass(item.size)} ${selectedIds.has(item.id) ? 'ring-2 ring-[#19b366]' : ''}`}
            onClick={() => selectionMode && toggleSelect(item.id)}
          >
            <img 
              src={item.url} 
              alt={item.caption || 'Gallery Image'} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            
            {/* Selection Checkbox - Always visible in selection mode */}
            {selectionMode && (
              <div className="absolute top-3 left-3 z-10">
                <input
                  type="checkbox"
                  checked={selectedIds.has(item.id)}
                  onChange={() => toggleSelect(item.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="h-5 w-5 rounded border-gray-600 bg-[#1c2621] text-[#19b366] focus:ring-[#19b366] focus:ring-offset-0 cursor-pointer"
                />
              </div>
            )}
            
            {/* Overlay - Only show when not in selection mode */}
            {!selectionMode && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                 <div>
                    {item.caption && <p className="text-white font-bold">{item.caption}</p>}
                    {item.location && (
                      <div className="flex items-center text-gray-300 text-xs mt-1">
                        <span className="material-symbols-outlined text-[14px] mr-1">location_on</span>
                        {item.location}
                      </div>
                    )}
                 </div>
                 
                 <div className="absolute top-2 right-2">
                   <button 
                     onClick={() => handleDelete(item.id)}
                     className="bg-white/20 text-white p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors backdrop-blur-sm"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                       <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                       <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                     </svg>
                   </button>
                 </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-[#9eb7ab]">
          No gallery items found. Add your first image above!
        </div>
      )}
    </div>
  );
}
