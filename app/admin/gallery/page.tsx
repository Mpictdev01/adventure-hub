import { getGallery } from '@/app/lib/db';
import GalleryManager from '../components/GalleryManager';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  const galleryItems = await getGallery();

  return (
    <div className="space-y-6">
       <h2 className="text-xl font-bold text-gray-800">Gallery Manager</h2>
       <GalleryManager initialItems={galleryItems} />
    </div>
  );
}
