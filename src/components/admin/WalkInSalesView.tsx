import React, { useState } from 'react';
import {
  UserPlus,
  CreditCard,
  Building2,
  CheckCircle2,
  Receipt,
  Search,
  IndianRupee,
  Clock,
  KeyRound,
  Printer,
  ShieldCheck,
  Phone,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { INITIAL_ROOMS } from '../../data/mockData';
import { RoomItem } from '../../types';

interface OfflineSaleRecord {
  id: string;
  guestName: string;
  phone: string;
  roomNumber: string;
  roomName: string;
  cluster: string;
  nights: number;
  pax: number;
  totalAmount: number;
  paymentMode: 'Cash' | 'UPI QR' | 'POS Card' | 'Bank Transfer';
  source: 'Direct Walk-in' | 'Phone Reservation' | 'Front Desk Referral';
  time: string;
  status: 'Checked-In' | 'Allocated';
}

const INITIAL_OFFLINE_SALES: OfflineSaleRecord[] = [
  {
    id: 'OFF-8812',
    guestName: 'Vikramaditya Singhania',
    phone: '+91 98200 12345',
    roomNumber: '101',
    roomName: 'King Master Suite',
    cluster: 'Candolim Beachfront Haven',
    nights: 2,
    pax: 2,
    totalAmount: 56000,
    paymentMode: 'UPI QR',
    source: 'Direct Walk-in',
    time: '11:30 AM Today',
    status: 'Checked-In',
  },
  {
    id: 'OFF-8813',
    guestName: 'Karan Mehra',
    phone: '+91 98111 98765',
    roomNumber: '201',
    roomName: 'Coco River Suite',
    cluster: 'Coco Beach Estate',
    nights: 3,
    pax: 4,
    totalAmount: 67500,
    paymentMode: 'POS Card',
    source: 'Phone Reservation',
    time: '09:15 AM Today',
    status: 'Checked-In',
  },
  {
    id: 'OFF-8814',
    guestName: 'Anand & Sunita Joshi',
    phone: '+91 97654 32100',
    roomNumber: '302',
    roomName: 'Anjuna Palm Suite',
    cluster: 'Anjuna Palm Grove',
    nights: 1,
    pax: 2,
    totalAmount: 26000,
    paymentMode: 'Cash',
    source: 'Direct Walk-in',
    time: 'Yesterday, 06:40 PM',
    status: 'Checked-In',
  },
];

export const WalkInSalesView: React.FC = () => {
  const [rooms, setRooms] = useState<RoomItem[]>(INITIAL_ROOMS);
  const [salesLog, setSalesLog] = useState<OfflineSaleRecord[]>(INITIAL_OFFLINE_SALES);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('room-201');
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [nights, setNights] = useState(2);
  const [pax, setPax] = useState(2);
  const [source, setSource] = useState<OfflineSaleRecord['source']>('Direct Walk-in');
  const [paymentMode, setPaymentMode] = useState<OfflineSaleRecord['paymentMode']>('UPI QR');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Available vacant/clean rooms for walk-in allocation
  const vacantRooms = rooms.filter(
    (r) => r.status === 'VACANT_CLEAN' || r.status === 'DIRTY_TURNOVER' || r.status === 'ARRIVING_TODAY'
  );

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || vacantRooms[0] || rooms[0];
  const totalTariff = (selectedRoom?.tariff || 25000) * nights;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAllocateWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      showToast('Please enter guest name');
      return;
    }

    // 1. Create offline sale record
    const newRecord: OfflineSaleRecord = {
      id: `OFF-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName,
      phone,
      roomNumber: selectedRoom.roomNumber,
      roomName: selectedRoom.name,
      cluster: selectedRoom.clusterName,
      nights,
      pax,
      totalAmount: totalTariff,
      paymentMode,
      source,
      time: 'Just Now',
      status: 'Checked-In',
    };

    setSalesLog([newRecord, ...salesLog]);

    // 2. Update room status to OCCUPIED / IN_HOUSE
    setRooms((prev) =>
      prev.map((r) =>
        r.id === selectedRoom.id
          ? {
              ...r,
              status: 'IN_HOUSE',
              statusLabel: 'In-House (Walk-In)',
              guest: {
                name: guestName,
                pax,
                phone,
                email: email || 'walkin@frontdesk.com',
                passport: idNumber || 'Desk Aadhaar Verified',
                idVerified: true,
                checkIn: 'Today (Immediate)',
                checkOut: `In ${nights} Nights`,
                arrivedAt: 'Now',
                folioAmount: totalTariff,
                settlementStatus: paymentMode === 'Cash' ? 'PAID_UPI' : 'PAID_CARD',
                securityHold: 15000,
              },
            }
          : r
      )
    );

    showToast(`Walk-In Allocated! ${guestName} assigned to Suite ${selectedRoom.roomNumber} (₹${totalTariff.toLocaleString('en-IN')})`);

    // Reset Form
    setGuestName('');
    setPhone('+91 ');
    setEmail('');
    setIdNumber('');
    setNights(2);
  };

  return (
    <div className="flex-1 p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F3A41] text-white px-4 py-3 rounded-lg shadow-xl border border-teal-500/30 flex items-center gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900">
            Walk-In & Offline Sales
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Direct front desk allocations, walk-in guest registration, cash/card settlements, and immediate key issuing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Desk Ready For Walk-Ins</span>
          </span>
        </div>
      </div>

      {/* Quick Metric Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
            Today's Offline Sales
          </span>
          <div className="text-2xl font-bold text-stone-900 mt-1.5">
            ₹1,49,500
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            3 Walk-ins Cleared
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
            Available Rooms For Walk-In
          </span>
          <div className="text-2xl font-bold text-[#1B6B76] mt-1.5">
            {vacantRooms.length} Ready
          </div>
          <span className="text-[11px] text-stone-500 block mt-1">
            Cleaned & Inspected
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
            Average Walk-In Stay
          </span>
          <div className="text-2xl font-bold text-stone-900 mt-1.5">
            2.3 Nights
          </div>
          <span className="text-[11px] text-stone-500 block mt-1">
            ₹28,500 ADR yield
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
            Desk Cash / UPI Balance
          </span>
          <div className="text-2xl font-bold text-stone-900 mt-1.5">
            ₹82,000
          </div>
          <span className="text-[11px] text-stone-500 block mt-1">
            Reconciled today
          </span>
        </div>
      </div>

      {/* Main Grid: Walk-In Form (Left) + Available Rooms & Recent Sales (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form: Walk-In Registration & Allocation */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-[#1B6B76]" />
              <h3 className="font-bold text-sm text-stone-900">
                New Walk-In Allocation
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-teal-50 text-[#1B6B76] rounded border border-teal-200">
              Immediate Check-In
            </span>
          </div>

          <form onSubmit={handleAllocateWalkIn} className="space-y-3.5 text-xs">
            {/* Villa and Room Selection */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Select Villa Property *
                </label>
                <select
                  value={selectedRoom.clusterId}
                  onChange={(e) => {
                    const firstRoomInCluster = rooms.find((r) => r.clusterId === e.target.value);
                    if (firstRoomInCluster) {
                      setSelectedRoomId(firstRoomInCluster.id);
                    }
                  }}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#1B6B76] cursor-pointer"
                >
                  <option value="candolim">Candolim Beachfront Haven</option>
                  <option value="coco-beach">Coco Beach River Estate</option>
                  <option value="anjuna-assagao">Casa Portuguesa (Assagao)</option>
                  <option value="morjim-pavilion">Morjim Turtle Pavilion</option>
                  <option value="vagator-cliff">Vagator Cliffside</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Select Suite / Room *
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#1B6B76] cursor-pointer"
                >
                  {rooms
                    .filter((r) => r.clusterId === selectedRoom.clusterId)
                    .map((r) => (
                      <option key={r.id} value={r.id}>
                        Suite {r.roomNumber} - {r.name} (₹{r.tariff.toLocaleString('en-IN')}) [{r.statusLabel}]
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Guest Name */}
            <div>
              <label className="block text-stone-700 font-bold mb-1">
                Guest Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Singhal"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-[#1B6B76]"
              />
            </div>

            {/* Contact & ID */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Mobile Contact *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 98..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-[#1B6B76]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Aadhaar / ID Number
                </label>
                <input
                  type="text"
                  placeholder="ID Verification"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-[#1B6B76]"
                />
              </div>
            </div>

            {/* Nights & Pax */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Stay Nights
                </label>
                <select
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-[#1B6B76] cursor-pointer font-semibold"
                >
                  <option value={1}>1 Night</option>
                  <option value={2}>2 Nights</option>
                  <option value={3}>3 Nights</option>
                  <option value={4}>4 Nights</option>
                  <option value={7}>7 Nights</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Guests (Pax)
                </label>
                <select
                  value={pax}
                  onChange={(e) => setPax(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-[#1B6B76] cursor-pointer font-semibold"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Sales Source
                </label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value as OfflineSaleRecord['source'])}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-[#1B6B76] cursor-pointer"
                >
                  <option value="Direct Walk-in">Direct Walk-in</option>
                  <option value="Phone Reservation">Phone Call</option>
                  <option value="Front Desk Referral">Referral</option>
                </select>
              </div>
            </div>

            {/* Payment Calculation Box */}
            <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-600 font-medium">Room Rate × Nights:</span>
                <span className="font-bold text-stone-900">
                  ₹{(selectedRoom?.tariff || 25000).toLocaleString('en-IN')} × {nights} = ₹{totalTariff.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
                <span className="text-stone-700 font-bold">Payment Method:</span>
                <div className="flex items-center gap-3">
                  {(['UPI QR', 'POS Card', 'Cash', 'Bank Transfer'] as const).map((mode) => (
                    <label key={mode} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMode"
                        checked={paymentMode === mode}
                        onChange={() => setPaymentMode(mode)}
                        className="accent-[#1B6B76]"
                      />
                      <span className="text-[11px] font-medium text-stone-800">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Allocation Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#1B6B76] hover:bg-[#13515a] text-white font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Allocate Suite & Confirm Walk-In</span>
            </button>
          </form>
        </div>

        {/* Right Column: Available Rooms Quick Select + Sales Records */}
        <div className="lg:col-span-7 space-y-5">
          {/* Vacant Rooms Ready for Walk-In */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-bold text-sm text-stone-900">
                Ready Suites Available for Allocation
              </h3>
              <span className="text-xs text-stone-500">
                Click any suite to load into walk-in console
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {rooms.slice(0, 3).map((r) => (
                <div
                  key={r.id}
                  onClick={() => setSelectedRoomId(r.id)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                    selectedRoomId === r.id
                      ? 'border-[#1B6B76] bg-teal-50/60 shadow-xs'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex gap-2.5 items-center">
                    {r.imageUrl ? (
                      <img
                        src={r.imageUrl}
                        alt={r.name}
                        className="w-12 h-12 rounded-md object-cover border border-stone-200 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-md bg-stone-200 flex items-center justify-center font-mono font-bold text-stone-700 shrink-0">
                        {r.roomNumber}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 truncate">Suite {r.roomNumber}</span>
                        <span className="text-[9px] px-1 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                          Ready
                        </span>
                      </div>
                      <div className="text-stone-500 text-[10px] truncate">{r.name}</div>
                      <div className="font-bold text-[#1B6B76] text-xs mt-0.5">
                        ₹{r.tariff.toLocaleString('en-IN')}<span className="text-[9px] font-normal text-stone-500">/n</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Offline Sales & Walk-Ins Table */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-bold text-sm text-stone-900">
                Recent Walk-In & Offline Sales Ledger
              </h3>
              <span className="text-xs text-stone-500 font-medium">
                {salesLog.length} Records Today
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] uppercase font-bold text-stone-400 bg-stone-50 border-y border-stone-100">
                  <tr>
                    <th className="py-2.5 px-3">Receipt / Ref</th>
                    <th className="py-2.5 px-3">Guest Name</th>
                    <th className="py-2.5 px-3">Suite Allocated</th>
                    <th className="py-2.5 px-3">Stay</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Payment Mode</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {salesLog.map((sale) => (
                    <tr key={sale.id} className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-stone-700">
                        {sale.id}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-stone-900">{sale.guestName}</div>
                        <div className="text-[10px] text-stone-500 font-mono">{sale.phone}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-stone-800">Suite {sale.roomNumber}</div>
                        <div className="text-[10px] text-stone-500 truncate max-w-[120px]">{sale.roomName}</div>
                      </td>
                      <td className="py-2.5 px-3 font-medium text-stone-700">
                        {sale.nights} Nights ({sale.pax} Pax)
                      </td>
                      <td className="py-2.5 px-3 font-bold text-stone-900">
                        ₹{sale.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium text-[10px]">
                          {sale.paymentMode}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
