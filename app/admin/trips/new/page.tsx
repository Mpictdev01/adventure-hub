import TripForm from '../../components/TripForm';

export default function NewTripPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Add New Trip</h2>
      <TripForm />
    </div>
  );
}
