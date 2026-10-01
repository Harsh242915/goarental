import React from 'react';
import { X, Printer, CheckCircle2, ShieldCheck } from 'lucide-react';
import { RoomItem } from '../../types';

interface PrintRegCardModalProps {
  room: RoomItem;
  onClose: () => void;
}

export const PrintRegCardModal: React.FC<PrintRegCardModalProps> = ({ room, onClose }) => {
  const guest = room.guest;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Top toolbar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-stone-100 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="font-serif font-semibold text-stone-800 text-sm tracking-wide">
              Official Guest Registration Card
            </span>
            <span className="text-xs px-2 py-0.5 bg-teal-100 text-teal-800 rounded font-medium">
              Verified Folio
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1B6B76] text-white text-xs font-semibold rounded hover:bg-[#14535c] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Card
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-800 rounded hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Card Area */}
        <div className="p-8 bg-[#FDFBF7] print:p-0 print:bg-white text-stone-800">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-stone-800 pb-5">
            <div>
              <h2 className="font-serif text-2xl font-bold tracking-tight text-stone-900">
                VILLAS GOA
              </h2>
              <p className="text-[10px] tracking-widest uppercase font-semibold text-stone-500">
                Luxury Private Residences & Heritage Mansions • North Goa
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Nerul • Candolim • Assagao • Morjim • Goa 403515 | Tel: +91 77989 67689
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-3 py-1 border border-stone-300 rounded inline-block">
                FOLIO #VG-2024-{room.roomNumber}
              </div>
              <p className="text-[11px] text-stone-500 mt-1">Date: {new Date().toLocaleDateString('en-GB')}</p>
            </div>
          </div>

          {/* Details Table */}
          <div className="mt-6 border border-stone-300 rounded overflow-hidden bg-white text-xs">
            <div className="grid grid-cols-2 divide-x divide-stone-200 border-b border-stone-200">
              <div className="p-3">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">Primary Guest Name</span>
                <span className="font-semibold text-stone-900 text-sm">{guest?.name || 'Walk-In Guest'}</span>
              </div>
              <div className="p-3">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">Assigned Suite / Villa</span>
                <span className="font-semibold text-teal-800 text-sm">Room {room.roomNumber} - {room.name}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-stone-200 border-b border-stone-200">
              <div className="p-3">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">Identification / Passport</span>
                <span className="font-mono text-stone-700">{guest?.passport || 'Uploaded & Encrypted'}</span>
              </div>
              <div className="p-3">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">Contact Number</span>
                <span className="font-mono text-stone-700">{guest?.phone || '+91 98201 54312'}</span>
              </div>
              <div className="p-3">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">Email</span>
                <span className="text-stone-700 truncate block">{guest?.email || 'guest@villasgoa.com'}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-stone-200 border-b border-stone-200">
              <div className="p-3">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">Check-In Date</span>
                <span className="font-medium text-stone-800">{guest?.checkIn || 'Nov 12, 2024'}</span>
              </div>
              <div className="p-3">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">Check-Out Date</span>
                <span className="font-medium text-stone-800">{guest?.checkOut || 'Nov 15, 2024 (11:00 AM)'}</span>
              </div>
              <div className="p-3">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">Party Size</span>
                <span className="font-medium text-stone-800">{guest?.pax || 2} Registered Guests</span>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-stone-200 bg-stone-50">
              <div className="p-3">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">Tariff / Night</span>
                <span className="font-mono font-bold text-stone-900">₹{room.tariff.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">Settlement Status</span>
                <span className="font-semibold text-emerald-700">PAID (UPI Confirmed)</span>
              </div>
              <div className="p-3">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">Pre-Auth Security Hold</span>
                <span className="font-mono text-stone-700">₹{guest?.securityHold?.toLocaleString('en-IN') || '15,000'} Held</span>
              </div>
            </div>
          </div>

          {/* Villa Rules & Policies */}
          <div className="mt-4 p-3 bg-stone-50 border border-stone-200 rounded text-[11px] text-stone-600 leading-relaxed">
            <p className="font-semibold text-stone-800 mb-1">Estate Terms & Quiet Hours Policy:</p>
            <p>
              In accordance with Goa Coastal Zone and Luxury Private Residences guidelines, silent hours apply from 10:30 PM across pool and garden grounds. The guest accepts responsibility for damages beyond standard wear.
            </p>
          </div>

          {/* Signatures */}
          <div className="mt-8 grid grid-cols-2 gap-8 pt-4 border-t border-stone-300 text-xs">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">Guest Signature</p>
              <div className="h-12 border-b border-dashed border-stone-400 flex items-end pb-1 italic text-stone-600">
                {guest?.name || 'Michael Chang'} (Verified)
              </div>
              <p className="text-[10px] text-stone-400 mt-1">Signed via Front Desk Check-In</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">Duty Manager Authorization</p>
              <div className="h-12 border-b border-dashed border-stone-400 flex items-end pb-1 text-teal-800 font-medium">
                Arjun Rao (Duty General Manager)
              </div>
              <p className="text-[10px] text-stone-400 mt-1">Ref ID: {guest?.bookingRef || `VG-${room.roomNumber}`}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4" /> Government Identity Document Verified & Archived
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium rounded transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
