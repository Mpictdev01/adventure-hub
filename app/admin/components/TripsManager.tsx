'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trip } from '@/app/lib/db';

interface TripsManagerProps {
  initialTrips: Trip[];
}

export default function TripsManager({ initialTrips }: TripsManagerProps) {
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  // Toggle selection of a single trip
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
    if (selectedIds.size === trips.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(trips.map(t => t.id)));
    }
  };

  // Delete selected trips
  const deleteSelected = async () => {
    if (selectedIds.size === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} trip(s)? This action cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    try {
      const deletePromises = Array.from(selectedIds).map(id =>
        fetch(`/api/trips/${id}`, { method: 'DELETE' })
      );
      
      await Promise.all(deletePromises);
      
      // Update local state
      setTrips(trips.filter(t => !selectedIds.has(t.id)));
      setSelectedIds(new Set());
      router.refresh();
    } catch (error) {
      console.error('Error deleting trips:', error);
      alert('Failed to delete some trips');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Manage Trips</h2>
        <Link href="/admin/trips/new" className="bg-[#19b366] text-[#112119] px-4 py-2 rounded hover:bg-[#159655] font-bold">
          + Add New Trip
        </Link>
      </div>

      {/* Action Bar - Shows when items are selected */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-red-400">check_circle</span>
            <span className="text-white font-medium">
              {selectedIds.size} trip(s) selected
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
                    checked={selectedIds.size === trips.length && trips.length > 0}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-gray-600 bg-[#1c2621] text-[#19b366] focus:ring-[#19b366] focus:ring-offset-0"
                  />
                </th>
                <th className="px-4 py-4">Trip Name</th>
                <th className="px-4 py-4">Location</th>
                <th className="px-4 py-4">Price</th>
                <th className="px-4 py-4">Difficulty</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#293830]">
              {trips.map((trip) => (
                <tr key={trip.id} className={`hover:bg-[#111714] ${selectedIds.has(trip.id) ? 'bg-[#19b366]/5' : ''}`}>
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(trip.id)}
                      onChange={() => toggleSelect(trip.id)}
                      className="h-4 w-4 rounded border-gray-600 bg-[#1c2621] text-[#19b366] focus:ring-[#19b366] focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-4 font-medium text-white">{trip.title}</td>
                  <td className="px-4 py-4">{trip.location}</td>
                  <td className="px-4 py-4">{trip.price}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border
                      ${trip.difficulty === 'Easy' || trip.difficulty === 'Beginner' ? 'bg-[#19b366]/10 text-[#19b366] border-[#19b366]/30' :
                        trip.difficulty === 'Medium' || trip.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' :
                        'bg-red-500/10 text-red-500 border-red-500/30'}`}>
                      {trip.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link href={`/admin/trips/${trip.id}`} className="text-[#19b366] hover:text-[#159655] font-medium">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {trips.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#9eb7ab]">
                    No trips found.
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
