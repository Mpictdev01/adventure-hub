'use client';

import { useState, useEffect } from 'react';
import { uploadImage } from '@/app/lib/db';
import ImageCropper from '../components/ImageCropper';

export default function AdminSettingsPage() {
  const [heroBgUrl, setHeroBgUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  // Cropper State
  const [showCropper, setShowCropper] = useState(false);
  const [croppingFile, setCroppingFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings?key=hero_bg_url');
      if (res.ok) {
        const data = await res.json();
        setHeroBgUrl(data.value || '');
      }
    } catch (error) {
      console.error('Failed to fetch settings', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Start Cropping Flow
      setCroppingFile(selectedFile);
      setShowCropper(true);
      
      // Reset input value so same file can be selected again if needed
      e.target.value = '';
    }
  };

  const handleCropComplete = (croppedFile: File) => {
    setFile(croppedFile);
    setHeroBgUrl(URL.createObjectURL(croppedFile));
    setShowCropper(false);
    setCroppingFile(null);
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setCroppingFile(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      let finalUrl = heroBgUrl;

      // Upload file if selected (and cropped)
      if (file) {
        const filename = `hero-bg-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '') || 'image.jpg'}`;
        const uploadedUrl = await uploadImage(file, filename);
        
        if (!uploadedUrl) {
          throw new Error('Failed to upload image');
        }
        finalUrl = uploadedUrl;
      }

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          key: 'hero_bg_url', 
          value: finalUrl 
        }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
        setHeroBgUrl(finalUrl);
        setFile(null);
      } else {
        setMessage({ type: 'error', text: 'Failed to save settings.' });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'An error occurred during save/upload.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-[#9eb7ab]">Loading settings...</div>;

  return (
    <div className="max-w-4xl space-y-8 animate-fade-in relative">
      {/* Cropper Modal */}
      {showCropper && croppingFile && (
        <ImageCropper 
          imageFile={croppingFile}
          aspectRatio={1920/1080} // Standard Hero Aspect Ratio
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}

      <div>
        <h2 className="text-2xl font-bold text-white">Site Settings</h2>
        <p className="text-[#9eb7ab] text-sm">Manage global website configurations.</p>
      </div>

      <div className="bg-[#1c2621] p-6 rounded-lg border border-[#293830] space-y-6">
        <h3 className="text-lg font-bold text-white border-b border-[#293830] pb-2">Hero Section</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#9eb7ab] mb-2">
              Background Image
            </label>
            <div className="flex gap-4">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-[#9eb7ab]
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#19b366] file:text-[#112119]
                  hover:file:bg-[#159655]
                  cursor-pointer
                "
              />
            </div>
            <p className="text-xs text-[#9eb7ab]/60 mt-2">
              Select an image to default 16:9 crop. You can zoom and drag to adjust position.
            </p>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-[#9eb7ab]">Preview</p>
            <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden border border-[#293830] bg-[#111714]">
              {heroBgUrl ? (
                <img 
                  src={heroBgUrl} 
                  alt="Hero Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Preview+Image';
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-[#9eb7ab]/40">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-4xl mb-2">image</span>
                    <p>No image URL set</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-[#293830]">
          {message && (
             <span className={`text-sm ${message.type === 'success' ? 'text-[#19b366]' : 'text-red-400'}`}>
               {message.text}
             </span>
          )}
          {!message && <span></span>} {/* Spacer */}
          
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-[#19b366] text-[#112119] font-bold rounded-lg hover:bg-[#159655] disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {saving ? (
              <>
                <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
