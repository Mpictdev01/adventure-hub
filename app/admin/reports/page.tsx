'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Booking } from '@/app/lib/db';

export default function AdminReportsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const componentRef = useRef<HTMLDivElement>(null);

  // Helper for printing
  const handlePrint = () => {
    window.print();
  }

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

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  // Filter logic
  const filteredData = useMemo(() => {
    return bookings.filter(b => {
      const d = new Date(b.date);
      // Check if valid date
      if (isNaN(d.getTime())) return false;
      return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
    });
  }, [bookings, selectedMonth, selectedYear]);

  // Totals
  const stats = useMemo(() => {
    return filteredData.reduce((acc, curr) => {
      // Total Bookings
      acc.count++;
      
      // Total Guests
      acc.guests += (curr.guests || 0);
      
      // Total Revenue (Only count Paid or Confirmed for safer reporting, 
      // but usually 'Paid' implies money received)
      if (curr.paymentStatus === 'Paid') {
        acc.revenue += (curr.totalPrice || 0);
      }
      
      return acc;
    }, { count: 0, guests: 0, revenue: 0 });
  }, [filteredData]);

  if (loading) return <div className="p-8 text-[#9eb7ab]">Generating report data...</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page { size: portrait; margin: 10mm; }
          body { 
            background: white !important; 
            color: black !important; 
          }
          /* Hide Sidebar/Nav explicitly just in case */
          aside, nav, header, footer, .no-print { 
            display: none !important; 
          }
          /* Reset colors for print */
          .print-bg-white { background-color: white !important; }
          .print-text-black { color: black !important; }
          .print-border { border: 1px solid #ddd !important; }
          .print-shadow-none { box-shadow: none !important; }
          
          /* Ensure table fits */
          table { width: 100% !important; border-collapse: collapse !important; font-size: 10pt !important; }
          th, td { border: 1px solid #ccc !important; padding: 4px 8px !important; color: black !important; }
          
          /* Hide scrollbars */
          ::-webkit-scrollbar { display: none; }
        }
      `}</style>

      {/* Header & Controls (Hidden on Print) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
        <div>
          <h2 className="text-2xl font-bold text-white">Monthly Report</h2>
          <p className="text-[#9eb7ab] text-sm">Generate and print financial summaries.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="bg-[#1c2621] border border-[#293830] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#19b366]"
          >
            {months.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>

          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="bg-[#1c2621] border border-[#293830] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#19b366]"
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-[#19b366] text-[#112119] font-bold rounded-lg hover:bg-[#159655] transition-colors"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            Print Report
          </button>
        </div>
      </div>

      {/* Report Content Container */}
      <div ref={componentRef} className="print-bg-white print-text-black p-0 md:p-1">
        
        {/* Print Header (Visible only in print usually, but we can make it part of the design) */}
        <div className="mb-8 hidden print:block">
           <div className="flex justify-between items-end border-b-2 border-black pb-4 mb-4">
              <div>
                 <h1 className="text-3xl font-bold text-black uppercase tracking-widest mb-1">AdventureHub</h1>
                 <p className="text-sm text-gray-600">Monthly Booking Report</p>
              </div>
              <div className="text-right">
                 <p className="font-bold text-xl text-black">{months[selectedMonth]} {selectedYear}</p>
                 <p className="text-xs text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
              </div>
           </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1c2621] p-6 rounded-lg border border-[#293830] print-bg-white print-border print-shadow-none">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 bg-[#19b366]/10 text-[#19b366] rounded-lg material-symbols-outlined print-bg-white print-text-black">payments</span>
              <p className="text-[#9eb7ab] font-medium print-text-black">Total Revenue</p>
            </div>
            <p className="text-2xl font-bold text-white print-text-black">
              IDR {stats.revenue.toLocaleString()}
            </p>
            <p className="text-xs text-[#9eb7ab]/60 print-text-black mt-1">
               Based on paid bookings
            </p>
          </div>

          <div className="bg-[#1c2621] p-6 rounded-lg border border-[#293830] print-bg-white print-border print-shadow-none">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 bg-blue-500/10 text-blue-500 rounded-lg material-symbols-outlined print-bg-white print-text-black">group</span>
              <p className="text-[#9eb7ab] font-medium print-text-black">Total Guests</p>
            </div>
            <p className="text-2xl font-bold text-white print-text-black">
              {stats.guests} <span className="text-sm font-normal text-[#9eb7ab] print-text-black">Pax</span>
            </p>
          </div>

          <div className="bg-[#1c2621] p-6 rounded-lg border border-[#293830] print-bg-white print-border print-shadow-none">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 bg-purple-500/10 text-purple-500 rounded-lg material-symbols-outlined print-bg-white print-text-black">receipt_long</span>
              <p className="text-[#9eb7ab] font-medium print-text-black">Total Transactions</p>
            </div>
            <p className="text-2xl font-bold text-white print-text-black">
              {stats.count} <span className="text-sm font-normal text-[#9eb7ab] print-text-black">Bookings</span>
            </p>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-[#1c2621] rounded-lg border border-[#293830] overflow-hidden print-bg-white print-border print-shadow-none">
          <div className="p-4 border-b border-[#293830] print:border-b-2 print:border-black">
            <h3 className="text-lg font-bold text-white print-text-black">Detailed Transaction List</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#9eb7ab] print-text-black">
              <thead className="bg-[#111714] text-[#9eb7ab] border-b border-[#293830] uppercase text-xs print-bg-white print-text-black print:border-black">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Booking ID</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Trip</th>
                  <th className="px-4 py-3 font-semibold text-center">Pax</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Amount (IDR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#293830] print:divide-gray-300">
                {filteredData.length > 0 ? (
                  filteredData
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((booking) => (
                    <tr key={booking.id} className="hover:bg-[#111714] print:hover:bg-transparent">
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">
                        {booking.id.slice(0, 8)}...
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-white print-text-black">{booking.customerName}</div>
                        <div className="text-xs scale-90 origin-left opacity-70 cursor-pointer print:hidden" title={booking.email}>{booking.email}</div>
                      </td>
                      <td className="px-4 py-3 max-w-[150px] truncate" title={booking.tripName}>
                        {booking.tripName}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {booking.guests}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold print-border print:text-black print:bg-transparent
                          ${booking.paymentStatus === 'Paid' ? 'bg-[#19b366]/20 text-[#19b366]' : ''}
                          ${booking.paymentStatus === 'Unpaid' ? 'bg-yellow-500/20 text-yellow-500' : ''}
                        `}>
                          {booking.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-white print-text-black">
                        {booking.totalPrice?.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center">
                       No bookings found for this month.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-[#111714] font-bold text-white border-t-2 border-[#293830] print-bg-white print-text-black print:border-black">
                <tr>
                   <td colSpan={4} className="px-4 py-3 text-right uppercase tracking-wider text-xs">Grand Total</td>
                   <td className="px-4 py-3 text-center">{stats.guests}</td>
                   <td></td>
                   <td className="px-4 py-3 text-right">{stats.revenue.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Print Footer */}
        <div className="mt-8 hidden print:block pt-8 border-t border-black">
           <div className="flex justify-between text-sm text-gray-500">
              <div>
                 <p>Approved By:</p>
                 <div className="h-16 border-b border-black w-48 mt-2"></div>
                 <p className="mt-1">Manager Signature</p>
              </div>
              <div className="text-right">
                 <p>Prepared By:</p>
                 <div className="h-16 border-b border-black w-48 mt-2"></div>
                 <p className="mt-1">Admin Signature</p>
              </div>
           </div>
           <p className="text-center text-xs mt-8">© {new Date().getFullYear()} AdventureHub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
