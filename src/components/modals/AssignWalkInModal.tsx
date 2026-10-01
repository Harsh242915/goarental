import React, { useState } from 'react';
import { X, UserPlus, CreditCard } from 'lucide-react';
import { RoomItem } from '../../types';

interface AssignWalkInModalProps {
  room: RoomItem;
  onClose: () => void;
  onAssign: (room: RoomItem, guestData: NonNullable<RoomItem['guest']>) => void;
}

export const AssignWalkInModal: React.FC<AssignWalkInModalProps> = ({ room, onClose, onAssign }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [email, setEmail] = useState('');
  const [pax, setPax] = useState(2);
  const [nights, setNights] = useState(2);
  const [idNumber, setIdNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'PAID_UPI' | 'PAID_CARD'>('PAID_UPI');

  const totalAmount = room.tariff * nights;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const guestData: NonNullable<RoomItem['guest']> = {
      name,
      pax,
      phone,
      email: email || 'walkin@guest.com',
      passport: idNumber || '***WALK-IN (Front Desk Verified)',
      idVerified: true,
      checkIn: 'Today (Immediate)',
      checkOut: `In ${nights} Nights`,
      arrivedAt: 'Now',
      folioAmount: totalAmount,
      settlementStatus: paymentMethod,
      securityHold: 15000,
      bookingRef: `VG-WALK-${room.roomNumber}`,
      specialRequests: {
        airportTransfer: false,
        woodenBabyCot: false,
        bbqDinner: false,
        chefAssigned: false,
      },
    };

    onAssign(room, guestData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden my-6">
        <div className="flex items-center justify-between px-6 py-4 bg-[#1B6B76] text-white">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-teal-200" />
            <div>
              <h3 className="text-base font-bold">Assign Walk-In Guest</h3>
              <p className="text-xs text-teal-100">
                Suite {room.roomNumber} - {room.name} ({room.clusterName})
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-stone-700 font-bold mb-1">Guest Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Vikramaditya Singhania"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1B6B76] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-bold mb-1">Mobile Contact (+91) *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1B6B76] focus:outline-hidden font-mono"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-bold mb-1">Email Address</label>
              <input
                type="email"
                placeholder="guest@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1B6B76] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-stone-700 font-bold mb-1">Number of Guests</label>
              <select
                value={pax}
                onChange={(e) => setPax(Number(e.target.value))}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1B6B76] focus:outline-hidden"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-bold mb-1">Length of Stay</label>
              <select
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1B6B76] focus:outline-hidden"
              >
                <option value={1}>1 Night</option>
                <option value={2}>2 Nights</option>
                <option value={3}>3 Nights</option>
                <option value={5}>5 Nights</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-bold mb-1">Govt ID / Aadhaar</label>
              <input
                type="text"
                placeholder="Aadhaar / Passport"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1B6B76] focus:outline-hidden font-mono"
              />
            </div>
          </div>

          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-stone-600">Tariff Calculation:</span>
              <span className="font-bold text-stone-900">
                ₹{room.tariff.toLocaleString('en-IN')} × {nights} nights = ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-stone-200">
              <label className="text-stone-700 font-bold">Immediate Payment:</label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'PAID_UPI'}
                    onChange={() => setPaymentMethod('PAID_UPI')}
                    className="accent-[#1B6B76]"
                  />
                  <span>UPI / QR Scan</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'PAID_CARD'}
                    onChange={() => setPaymentMethod('PAID_CARD')}
                    className="accent-[#1B6B76]"
                  />
                  <span>Card Swipe</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1B6B76] hover:bg-[#14535c] text-white font-bold rounded shadow-xs transition-colors cursor-pointer"
            >
              Confirm Walk-In & Allocate Suite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
