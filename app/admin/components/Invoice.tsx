'use client';

import { Booking } from '@/app/lib/db';
import React, { useRef } from 'react';

interface InvoiceProps {
  booking: Booking;
  onClose: () => void;
}

export default function Invoice({ booking, onClose }: InvoiceProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="invoice-print-wrapper fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto overflow-visible">
        
        {/* Actions Bar (Hidden when printing) */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center print:hidden sticky top-0 bg-white z-10">
          <h2 className="font-bold text-gray-800">Invoice Preview</h2>
          <div className="space-x-2">
            <button 
              onClick={handlePrint} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Print Invoice
            </button>
            <button 
              onClick={onClose} 
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-10 text-gray-800 print:p-0">
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6 mb-8">
            <div>
              <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight uppercase">Invoice</h1>
              <p className="text-sm font-medium text-gray-500 mt-1">AdventureHub Inc.</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">#{booking?.id?.split('-')?.pop() || 'N/A'}</div>
              <div className="mt-1 text-sm text-gray-600">
                <p>Date: <span className="font-bold text-gray-900">{booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}</span></p>
                <p>Status: <span className={`font-bold uppercase ${booking.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>{booking.paymentStatus || 'Pending'}</span></p>
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="flex justify-between gap-12 mb-8">
             <div className="w-1/2">
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">From</h3>
                <p className="font-bold text-lg text-gray-900">Adventure Hub</p>
                <div className="text-sm text-gray-600 space-y-1 mt-1">
                  <p>Cyber 2 Tower, Jl. H.R. Rasuna Said</p>
                  <p>Jakarta Selatan, DKI Jakarta 12950</p>
                  <p>support@adventurehub.id</p>
                </div>
             </div>
             <div className="w-1/2 text-right">
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Bill To</h3>
                <p className="font-bold text-lg text-gray-900">{booking.customerName || 'N/A'}</p>
                <div className="text-sm text-gray-600 space-y-1 mt-1">
                  <p>{booking.email || 'N/A'}</p>
                  <p>{booking.phone || 'N/A'}</p>
                </div>
             </div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
             <table className="w-full text-left text-sm">
                <thead>
                   <tr className="border-b-2 border-gray-800">
                      <th className="py-3 font-bold text-gray-800 uppercase tracking-wider w-1/2">Description</th>
                      <th className="py-3 font-bold text-gray-800 uppercase tracking-wider text-right">Price</th>
                      <th className="py-3 font-bold text-gray-800 uppercase tracking-wider text-right">Pax</th>
                      <th className="py-3 font-bold text-gray-800 uppercase tracking-wider text-right">Amount</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                   <tr>
                      <td className="py-4 pr-4">
                         <p className="font-bold text-gray-900 text-base">{booking.tripName || 'Trip Name'}</p>
                         <p className="text-sm text-gray-500">{booking.tripLocation || 'Location'}</p>
                         <p className="text-xs text-gray-400 mt-1">
                           Travel Date: {booking.date ? new Date(booking.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                         </p>
                      </td>
                      <td className="py-4 text-right align-top text-gray-700">IDR {(booking.pricePerPax || 0).toLocaleString()}</td>
                      <td className="py-4 text-right align-top">{booking.guests || 0}</td>
                      <td className="py-4 text-right align-top font-bold text-gray-900">IDR {(booking.totalPrice || 0).toLocaleString()}</td>
                   </tr>
                </tbody>
             </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end pt-4 border-t border-gray-800 mb-8">
             <div className="w-64 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                   <span>Subtotal</span>
                   <span>IDR {(booking.totalPrice || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-2xl font-extrabold text-blue-900 pt-4 border-t border-gray-200 mt-2">
                   <span>Total</span>
                   <span>IDR {(booking.totalPrice || 0).toLocaleString()}</span>
                </div>
             </div>
          </div>
          
          {/* Participants Details */}
          <div className="border-t border-dashed border-gray-300 pt-8">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Registered Participants</h3>
            <div className="grid grid-cols-2 gap-4">
               {(booking.participants || []).map((p, idx) => (
                 <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-100 break-inside-avoid">
                    <p className="font-bold text-sm text-gray-800">{p.fullName || 'N/A'}</p>
                    <p className="text-xs text-gray-500 font-mono">ID: {p.idNumber || 'N/A'}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t-2 border-gray-100 text-center">
             <p className="font-bold text-gray-800 text-sm mb-1">Thank you for your business!</p>
             <div className="text-xs text-gray-400">
                Payment: BCA 1234567890 a/n Adventure Hub Indonesia
             </div>
          </div>
        </div>
      </div>
      
      {/* Print Hide Global Override */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          
          body {
            visibility: hidden;
            background: white;
          }
          
          .invoice-print-wrapper {
            visibility: visible;
            position: fixed;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            background: white;
            z-index: 9999;
          }
          
          .invoice-print-wrapper * {
            visibility: visible;
          }
        
          .invoice-print-wrapper > div {
             box-shadow: none !important;
             max-width: 100% !important;
             width: 100% !important;
             max-height: none !important;
             overflow: visible !important;
             padding: 0 !important;
             margin: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
