import React from 'react';
import { X, CreditCard, Download, CheckCircle, Receipt, LogOut } from 'lucide-react';
import { RoomItem } from '../../types';

interface FolioModalProps {
  room: RoomItem;
  onClose: () => void;
  onOpenCheckOut?: () => void;
}

export const FolioModal: React.FC<FolioModalProps> = ({ room, onClose, onOpenCheckOut }) => {
  const guest = room.guest;
  const roomTotal = (room.tariff * 3);
  const diningCharges = 8500;
  const airportTransfer = 4500;
  const subtotal = roomTotal + diningCharges + airportTransfer;
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1B6B76] text-white">
          <div className="flex items-center gap-2.5">
            <Receipt className="w-5 h-5 text-teal-200" />
            <div>
              <h3 className="font-serif text-lg font-semibold tracking-wide">Guest Master Folio & Billing</h3>
              <p className="text-xs text-teal-100">
                Room {room.roomNumber} - {room.name} • {guest?.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-stone-800 space-y-6">
          {/* Guest Summary strip */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-stone-50 border border-stone-200 rounded-lg text-xs">
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Folio Number</span>
              <span className="font-mono font-bold text-stone-800">FOL-2024-{room.roomNumber}-A</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Billing Period</span>
              <span className="font-medium text-stone-800">{guest?.checkIn} to {guest?.checkOut}</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Settlement Status</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" /> Settled (UPI Auto-Cleared)
              </span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-stone-200 rounded-lg overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-stone-100 text-stone-600 font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4">Description / Ledger Item</th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-3 px-4 font-mono text-stone-500">11/11/2024</td>
                  <td className="py-3 px-4 font-medium text-stone-900">Villa Suite Night Stay (3 Nights)</td>
                  <td className="py-3 px-4 text-stone-500">Room Tariff</td>
                  <td className="py-3 px-4 text-right font-mono font-medium">{roomTotal.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-stone-500">11/11/2024</td>
                  <td className="py-3 px-4 font-medium text-stone-900">Airport Chauffeur Transfer (Innova Crysta)</td>
                  <td className="py-3 px-4 text-stone-500">Concierge</td>
                  <td className="py-3 px-4 text-right font-mono font-medium">{airportTransfer.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-stone-500">12/11/2024</td>
                  <td className="py-3 px-4 font-medium text-stone-900">In-Villa Tiger Prawns BBQ & Cocktail Sundowner</td>
                  <td className="py-3 px-4 text-stone-500">Food & Beverage</td>
                  <td className="py-3 px-4 text-right font-mono font-medium">{diningCharges.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Luxury Hospitality GST (18%)</span>
              <span className="font-mono">₹{gst.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-stone-500 text-[11px]">
              <span>Security Deposit Pre-Auth (Authorized - Unclaimed)</span>
              <span className="font-mono">₹{guest?.securityHold?.toLocaleString('en-IN') || '20,000'}</span>
            </div>
            <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
              <span>Grand Total Settled</span>
              <span className="font-mono text-[#1B6B76] text-base">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-100 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium rounded transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF Tax Invoice
          </button>

          <div className="flex items-center gap-2">
            {onOpenCheckOut && (
              <button
                onClick={() => {
                  onClose();
                  onOpenCheckOut();
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#9a460c] hover:bg-[#783200] text-white text-xs font-semibold rounded transition-colors cursor-pointer shadow-2xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Check Out Guest</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#1B6B76] hover:bg-[#14535c] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
            >
              Close Folio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
