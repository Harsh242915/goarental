import React, { useState } from 'react';
import {
  X,
  LogOut,
  Receipt,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  IndianRupee,
  BedDouble,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Check,
  User,
  Phone,
  Calendar,
} from 'lucide-react';
import { RoomItem, RoomStatus } from '../../types';

interface CheckOutModalProps {
  room: RoomItem;
  onClose: () => void;
  onConfirmCheckOut: (roomId: string, nextStatus: RoomStatus, notes?: string) => void;
}

export const CheckOutModal: React.FC<CheckOutModalProps> = ({
  room,
  onClose,
  onConfirmCheckOut,
}) => {
  const guest = room.guest;

  // Billing calculations
  const roomNights = 3;
  const roomCharges = room.tariff * roomNights;
  const diningCharges = guest?.specialRequests?.bbqDinner ? 12500 : 6500;
  const airportTransferCharges = guest?.specialRequests?.airportTransfer ? 4500 : 0;
  const subtotal = roomCharges + diningCharges + airportTransferCharges;
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;
  const securityDeposit = guest?.securityHold || 20000;

  // Checkout Session State
  const [settlementMode, setSettlementMode] = useState<'ALREADY_SETTLED' | 'CARD' | 'UPI' | 'CASH'>('ALREADY_SETTLED');
  const [depositAction, setDepositAction] = useState<'RELEASE_FULL' | 'DEDUCT_INCIDENTALS'>('RELEASE_FULL');
  const [deductionAmount, setDeductionAmount] = useState<number>(0);
  const [nextRoomCondition, setNextRoomCondition] = useState<RoomStatus>('DIRTY_TURNOVER');
  const [cleaningSquad, setCleaningSquad] = useState('Housekeeping Squad 1 (Express)');
  const [departureNotes, setDepartureNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      onConfirmCheckOut(room.id, nextRoomCondition, departureNotes);
      setIsProcessing(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-6 text-xs text-stone-800">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <LogOut className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                Guest Check-Out & Room Clearance
              </h3>
              <p className="text-[11px] text-stone-400">
                Suite {room.roomNumber} - {room.name} • {room.clusterName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer text-base"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleProcessCheckout} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* 1. Guest & Stay Summary */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              In-House Guest Details
            </span>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-bold text-stone-900 text-sm block">
                  {guest?.name || 'Walk-in Guest'}
                </span>
                <span className="text-stone-500 text-[11px] flex items-center gap-2 mt-0.5">
                  <span>{guest?.phone || 'No phone recorded'}</span>
                  <span>•</span>
                  <span>Ref: {guest?.bookingRef || `VG-${room.roomNumber}`}</span>
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-stone-400 block uppercase font-semibold">Stay Period</span>
                <span className="font-medium text-stone-800 text-xs">
                  {guest?.checkIn || 'Nov 11'} → Today (Check-Out)
                </span>
              </div>
            </div>
          </div>

          {/* 2. Final Billing & Folio Settlement */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Final Bill & Charges Breakdown
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Auto-Calculated Folio
              </span>
            </div>

            <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-100">
              <div className="p-3 flex justify-between items-center bg-stone-50/50">
                <span className="text-stone-600">Room Tariff ({roomNights} Nights @ ₹{room.tariff.toLocaleString()})</span>
                <span className="font-mono font-bold text-stone-900">₹{roomCharges.toLocaleString()}</span>
              </div>
              <div className="p-3 flex justify-between items-center bg-stone-50/50">
                <span className="text-stone-600">In-Villa Master Chef Dining & Beverages</span>
                <span className="font-mono font-bold text-stone-900">₹{diningCharges.toLocaleString()}</span>
              </div>
              {airportTransferCharges > 0 && (
                <div className="p-3 flex justify-between items-center bg-stone-50/50">
                  <span className="text-stone-600">Innova Airport Chauffeur Dispatch</span>
                  <span className="font-mono font-bold text-stone-900">₹{airportTransferCharges.toLocaleString()}</span>
                </div>
              )}
              <div className="p-3 flex justify-between items-center bg-stone-50/50 text-stone-500">
                <span>GST (18% Hospitality Tax)</span>
                <span className="font-mono">₹{gst.toLocaleString()}</span>
              </div>
              <div className="p-3.5 flex justify-between items-center bg-stone-100 font-bold text-sm">
                <span className="text-stone-900">Total Folio Amount:</span>
                <span className="font-mono text-[#1B6B76] text-base">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Settlement Status */}
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-stone-700">Folio Settlement:</span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="settlementMode"
                    checked={settlementMode === 'ALREADY_SETTLED'}
                    onChange={() => setSettlementMode('ALREADY_SETTLED')}
                    className="accent-[#1B6B76]"
                  />
                  <span className="font-medium text-emerald-800">Pre-Settled (UPI / Card)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="settlementMode"
                    checked={settlementMode === 'CARD'}
                    onChange={() => setSettlementMode('CARD')}
                    className="accent-[#1B6B76]"
                  />
                  <span className="font-medium text-stone-700">Collect POS Card</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="settlementMode"
                    checked={settlementMode === 'CASH'}
                    onChange={() => setSettlementMode('CASH')}
                    className="accent-[#1B6B76]"
                  />
                  <span className="font-medium text-stone-700">Cash Settlement</span>
                </label>
              </div>
            </div>
          </div>

          {/* 3. Security Deposit Clearance */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              Security Deposit Clearance (₹{securityDeposit.toLocaleString()} Hold)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setDepositAction('RELEASE_FULL');
                  setDeductionAmount(0);
                }}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  depositAction === 'RELEASE_FULL'
                    ? 'border-emerald-500 bg-emerald-50/60 text-emerald-900'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Release 100% Deposit</span>
                </div>
                <p className="text-[10px] text-stone-500 mt-1">
                  No property damage reported. ₹{securityDeposit.toLocaleString()} released to guest.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setDepositAction('DEDUCT_INCIDENTALS')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  depositAction === 'DEDUCT_INCIDENTALS'
                    ? 'border-amber-500 bg-amber-50/60 text-amber-900'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Deduct Incidentals / Minibar</span>
                </div>
                <p className="text-[10px] text-stone-500 mt-1">
                  Deduct broken glass, minibar, or extra laundry fees.
                </p>
              </button>
            </div>
          </div>

          {/* 4. Room Post-Departure Condition */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              Next Room Status After Check-Out *
            </span>

            <div className="grid grid-cols-2 gap-3">
              <label
                onClick={() => setNextRoomCondition('DIRTY_TURNOVER')}
                className={`p-3 rounded-lg border flex items-start gap-2.5 cursor-pointer transition-all ${
                  nextRoomCondition === 'DIRTY_TURNOVER'
                    ? 'border-amber-500 bg-amber-50/70 text-amber-950 font-semibold'
                    : 'border-stone-200 bg-stone-50 text-stone-700'
                }`}
              >
                <input
                  type="radio"
                  name="nextRoomCondition"
                  checked={nextRoomCondition === 'DIRTY_TURNOVER'}
                  onChange={() => setNextRoomCondition('DIRTY_TURNOVER')}
                  className="accent-amber-600 mt-0.5"
                />
                <div>
                  <span className="font-bold text-xs block">
                    Dirty / Turnover (Recommended)
                  </span>
                  <span className="text-[10px] text-stone-500 block mt-0.5">
                    Dispatches housekeeping squad for deep clean & linen refresh.
                  </span>
                </div>
              </label>

              <label
                onClick={() => setNextRoomCondition('VACANT_CLEAN')}
                className={`p-3 rounded-lg border flex items-start gap-2.5 cursor-pointer transition-all ${
                  nextRoomCondition === 'VACANT_CLEAN'
                    ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold'
                    : 'border-stone-200 bg-stone-50 text-stone-700'
                }`}
              >
                <input
                  type="radio"
                  name="nextRoomCondition"
                  checked={nextRoomCondition === 'VACANT_CLEAN'}
                  onChange={() => setNextRoomCondition('VACANT_CLEAN')}
                  className="accent-emerald-600 mt-0.5"
                />
                <div>
                  <span className="font-bold text-xs block">
                    Immediately Vacant Clean
                  </span>
                  <span className="text-[10px] text-stone-500 block mt-0.5">
                    Room is already inspected & ready for next immediate walk-in.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* 5. Departure Notes */}
          <div>
            <label className="block text-stone-700 font-bold mb-1 text-[11px]">
              Departure Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Guest left for airport, luggage loaded in Innova, complimentary spices given"
              value={departureNotes}
              onChange={(e) => setDepartureNotes(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-[#1B6B76]"
            />
          </div>

          {/* Form Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-stone-600 hover:text-stone-900 font-semibold cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isProcessing}
              className="px-6 py-2.5 bg-[#9a460c] hover:bg-[#783200] text-white font-bold rounded-lg cursor-pointer flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span>Complete Check-Out & Free Up Room</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
