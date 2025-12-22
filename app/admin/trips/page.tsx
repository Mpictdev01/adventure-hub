import { getTrips } from '@/app/lib/db';
import TripsManager from '../components/TripsManager';

export const dynamic = 'force-dynamic';

export default async function AdminTripsPage() {
  const trips = await getTrips();

  return <TripsManager initialTrips={trips} />;
}
