'use client';

import { useState, useEffect, useMemo } from 'react';
import { Booking } from '@/app/lib/db';
import Invoice from '../components/Invoice';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<Booking | null>(null);
  const [confirmingBooking, setConfirmingBooking] = useState<Booking | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        setBookings(await res.json());
      }
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings based on search query
  const filteredBookings = useMemo(() => {
    if (!searchQuery.trim()) return bookings;
    
    const query = searchQuery.toLowerCase();
    return bookings.filter(booking => 
      booking.id?.toLowerCase().includes(query) ||
      booking.customerName?.toLowerCase().includes(query) ||
      booking.email?.toLowerCase().includes(query) ||
      booking.tripName?.toLowerCase().includes(query)
    );
  }, [bookings, searchQuery]);

  // Toggle selection of a single booking
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
    if (selectedIds.size === filteredBookings.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredBookings.map(b => b.id)));
    }
  };

  // Delete selected bookings
  const deleteSelected = async () => {
    if (selectedIds.size === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} booking(s)? This action cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    try {
      const deletePromises = Array.from(selectedIds).map(id =>
        fetch(`/api/bookings/${id}`, { method: 'DELETE' })
      );
      
      await Promise.all(deletePromises);
      
      // Clear selection and refresh
      setSelectedIds(new Set());
      fetchBookings();
    } catch (error) {
      console.error('Error deleting bookings:', error);
      alert('Failed to delete some bookings');
    } finally {
      setDeleting(false);
    }
  };

  const processPaymentConfirmation = async () => {
    if (!confirmingBooking) return;
    
    try {
      const res = await fetch(`/api/bookings/${confirmingBooking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'confirm_payment' }),
      });
      
      if (res.ok) {
        fetchBookings(); // Refresh list
        setConfirmingBooking(null); // Close modal
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      alert('Error updating status');
    }
  };

  if (loading) return <div className="p-8 text-[#9eb7ab]">Loading bookings...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-white">Booking Management</h2>
        <div className="text-sm text-[#9eb7ab]">
           Total Bookings: <span className="text-[#19b366] font-bold">{bookings.length}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-[#9eb7ab]">search</span>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Booking ID, Customer Name, or Email..."
          className="w-full pl-12 pr-4 py-3 bg-[#1c2621] border border-[#293830] rounded-lg text-white placeholder-[#9eb7ab]/60 focus:outline-none focus:border-[#19b366] transition-colors"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9eb7ab] hover:text-white"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        )}
      </div>

      {/* Action Bar - Shows when items are selected */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-red-400">check_circle</span>
            <span className="text-white font-medium">
              {selectedIds.size} booking(s) selected
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

      {/* Results count when searching */}
      {searchQuery && (
        <p className="text-sm text-[#9eb7ab]">
          Found <span className="text-[#19b366] font-bold">{filteredBookings.length}</span> result(s) for "{searchQuery}"
        </p>
      )}

      <div className="bg-[#1c2621] rounded-lg shadow overflow-hidden border border-[#293830]">
        {/* Mobile Card View (Visible on small screens) */}
        <div className="block md:hidden divide-y divide-[#293830]">
          {filteredBookings.slice().reverse().map((booking) => (
            <div key={booking.id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                   <p className="font-bold text-white text-lg">{booking.customerName || 'N/A'}</p>
                   <p className="text-xs text-[#9eb7ab] font-mono">#{booking.id}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold
                   ${booking.paymentStatus === 'Paid' ? 'bg-[#19b366]/20 text-[#19b366]' : 'bg-yellow-500/20 text-yellow-500'}
                `}>
                   {booking.paymentStatus}
                </span>
              </div>
              
              <div className="text-sm text-[#9eb7ab] space-y-1">
                <p><strong className="text-white">Trip:</strong> {booking.tripName}</p>
                <p><strong className="text-white">Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                <p><strong className="text-white">Amount:</strong> IDR {(booking.totalPrice || 0).toLocaleString()}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                 {booking.paymentStatus === 'Unpaid' && booking.status !== 'Cancelled' && (
                    <button 
                      onClick={() => setConfirmingBooking(booking)}
                      className="flex-1 px-3 py-2 bg-[#19b366] text-[#112119] font-bold text-xs rounded hover:bg-[#159655]"
                    >
                      Confirm
                    </button>
                 )}
                 {booking.paymentStatus === 'Paid' && (
                    <button 
                        onClick={async () => {
                           if (!confirm('Revoke?')) return;
                           await fetch(`/api/bookings/${booking.id}`, {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ action: 'revoke_payment' }),
                           });
                           fetchBookings();
                         }}
                        className="flex-1 px-3 py-2 bg-red-400/10 text-red-400 text-xs rounded border border-red-400/30"
                    >
                        Revoke
                    </button>
                 )}
                 <button 
                   onClick={() => setSelectedInvoice(booking)}
                   className="flex-1 px-3 py-2 border border-[#293830] text-[#9eb7ab] text-xs rounded hover:bg-[#293830] hover:text-white"
                 >
                   Invoice
                 </button>
              </div>
            </div>
          ))}
          {bookings.length === 0 && (
             <div className="p-8 text-center text-[#9eb7ab]">No bookings found.</div>
          )}
        </div>

        {/* Desktop Table View (Hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm text-[#9eb7ab]">
            <thead className="bg-[#111714] uppercase text-xs font-semibold text-[#9eb7ab] border-b border-[#293830]">
              <tr>
                <th className="px-4 py-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === filteredBookings.length && filteredBookings.length > 0}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-gray-600 bg-[#1c2621] text-[#19b366] focus:ring-[#19b366] focus:ring-offset-0"
                  />
                </th>
                <th className="px-4 py-4">Booking ID</th>
                <th className="px-4 py-4">Customer</th>
                <th className="px-4 py-4">Trip Info</th>
                <th className="px-4 py-4">Payment</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#293830]">
              {filteredBookings.slice().reverse().map((booking) => (
                <tr key={booking.id} className={`hover:bg-[#111714] ${selectedIds.has(booking.id) ? 'bg-[#19b366]/5' : ''}`}>
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(booking.id)}
                      onChange={() => toggleSelect(booking.id)}
                      className="h-4 w-4 rounded border-gray-600 bg-[#1c2621] text-[#19b366] focus:ring-[#19b366] focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-4 font-mono text-xs text-white">{booking.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white">{booking.customerName || 'N/A'}</p>
                    <p className="text-xs text-[#9eb7ab]">{booking.email}</p>
                    <p className="text-xs text-[#9eb7ab]">{booking.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{booking.tripName}</p>
                    <p className="text-xs text-[#9eb7ab]">{new Date(booking.date).toLocaleDateString()}</p>
                    <p className="text-xs text-[#9eb7ab]">{booking.guests} Guests • IDR {(booking.totalPrice || 0).toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded text-xs font-bold
                      ${booking.paymentStatus === 'Paid' ? 'bg-[#19b366]/20 text-[#19b366]' : 'bg-yellow-500/20 text-yellow-500'}
                     `}>
                       {booking.paymentStatus}
                     </span>
                     <p className="text-xs mt-1 text-[#9eb7ab]">{booking.paymentMethod}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border
                      ${booking.status === 'Confirmed' ? 'bg-[#19b366]/10 text-[#19b366] border-[#19b366]/30' : ''}
                      ${booking.status === 'Pending' ? 'bg-gray-700/50 text-gray-300 border-gray-600' : ''}
                      ${booking.status === 'Cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/30' : ''}
                    `}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-y-2">
                    {booking.paymentStatus === 'Unpaid' && booking.status !== 'Cancelled' && (
                       <button 
                         onClick={() => setConfirmingBooking(booking)}
                         className="block w-full text-center px-3 py-1 bg-[#19b366] text-[#112119] font-bold text-xs rounded hover:bg-[#159655]"
                       >
                         Confirm Payment
                       </button>
                    )}
                    {booking.paymentStatus === 'Paid' && (
                       <button 
                         onClick={async () => {
                           if (!confirm('Revoke this payment? Status will return to Pending/Unpaid.')) return;
                           await fetch(`/api/bookings/${booking.id}`, {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ action: 'revoke_payment' }),
                           });
                           fetchBookings();
                         }}
                         className="block w-full text-center px-3 py-1 bg-red-400/10 text-red-400 text-xs rounded hover:bg-red-400/20 border border-red-400/30"
                       >
                         Cancel Confirm
                       </button>
                    )}
                    <button 
                      onClick={() => setSelectedInvoice(booking)}
                      className="block w-full text-center px-3 py-1 border border-[#293830] text-[#9eb7ab] text-xs rounded hover:bg-[#293830] hover:text-white"
                    >
                      View Invoice
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[#9eb7ab]">
                    {searchQuery ? `No bookings found for "${searchQuery}"` : "No bookings found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <Invoice 
          booking={selectedInvoice} 
          onClose={() => setSelectedInvoice(null)} 
        />
      )}

      {/* Confirmation Modal with Proof */}
      {confirmingBooking && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setConfirmingBooking(null)}>
           <div className="bg-[#1c2621] border border-[#293830] rounded-lg p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-white mb-4">Verify Payment</h3>
              
              <div className="mb-6">
                <p className="text-sm text-[#9eb7ab] mb-2">Proof of Payment:</p>
                {confirmingBooking.proofOfPaymentUrl ? (
                  <div className="bg-[#111714] rounded overflow-hidden border border-[#293830]">
                    <img 
                      src={confirmingBooking.proofOfPaymentUrl} 
                      alt="Proof" 
                      className="w-full h-64 object-contain"
                    />
                    <div className="p-2 text-center bg-[#1c2621] border-t border-[#293830]">
                      <a 
                        href={confirmingBooking.proofOfPaymentUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs text-[#19b366] hover:text-[#159655] underline"
                      >
                        Open original image
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-500/10 text-yellow-500 p-4 rounded text-sm text-center border border-yellow-500/30">
                    No proof of payment uploaded.
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setConfirmingBooking(null)}
                  className="px-4 py-2 bg-[#293830] text-[#9eb7ab] rounded hover:bg-[#111714] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={processPaymentConfirmation}
                  className="px-4 py-2 bg-[#19b366] text-[#112119] font-bold rounded hover:bg-[#159655] transition-colors shadow-sm shadow-[#19b366]/20"
                >
                  Verify & Confirm
                </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
