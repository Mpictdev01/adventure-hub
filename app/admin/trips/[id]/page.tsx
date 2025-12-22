import { getTripById } from '@/app/lib/db';
import TripForm from '../../components/TripForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditTripPage(props: { params: Promise<{ id: string }> }) {
  // Await params if necessary in Next.js 15+ (treating as Promise just in case, or normal object)
  // But strictly speaking in 14 it's object. 
  // Let's assume standard object access since it didn't break before, or handle safely.
  // Actually, to be safe against the Next 15 "params should be awaited" warning:
  const params = await props.params;
  const id = params.id; 
  
  const trip = await getTripById(id);

  if (!trip) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Edit Trip</h2>
      <TripForm initialData={trip} isEdit />
    </div>
  );
}
