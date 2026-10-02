import React, { useState } from 'react';
import {
  LogIn,
  LogOut,
  BedDouble,
  PieChart,
  Calendar,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  Lock,
  Printer,
  MessageSquare,
  KeyRound,
  UserCheck,
  Plane,
  Sparkles,
  Users,
  Search,
  Check,
  RefreshCw,
  Phone,
  Clock,
  Shield,
  Globe,
  ArrowRight,
} from 'lucide-react';
import { RoomItem, RoomStatus, VisualScheduleRow, OnlineBooking } from '../../types';
import { INITIAL_ROOMS, INITIAL_SCHEDULE_ROWS, INITIAL_ONLINE_BOOKINGS } from '../../data/mockData';
import { PrintRegCardModal } from '../modals/PrintRegCardModal';
import { WhatsAppPassModal } from '../modals/WhatsAppPassModal';
import { AssignWalkInModal } from '../modals/AssignWalkInModal';
import { FolioModal } from '../modals/FolioModal';
import { CheckOutModal } from '../modals/CheckOutModal';

interface ExecutiveOverviewProps {
  searchQuery: string;
  focusedSection?: 'all' | 'online_bookings' | 'occupied';
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  searchQuery,
  focusedSection = 'all',
}) => {
  // Rooms state
  const [rooms, setRooms] = useState<RoomItem[]>(INITIAL_ROOMS);
  const [scheduleRows, setScheduleRows] = useState<VisualScheduleRow[]>(INITIAL_SCHEDULE_ROWS);

  // Online Bookings state
  const [onlineBookings, setOnlineBookings] = useState<OnlineBooking[]>(INITIAL_ONLINE_BOOKINGS);
  const [onlinePhoneSearch, setOnlinePhoneSearch] = useState<string>('');
  const [onlineStatusFilter, setOnlineStatusFilter] = useState<'ALL' | 'CONFIRMED' | 'CHECKED_IN'>('ALL');

  // Filters
  const [selectedClusterFilter, setSelectedClusterFilter] = useState<string>('all');

  // Modals state
  const [activeModal, setActiveModal] = useState<
    'printRegCard' | 'whatsAppPass' | 'walkIn' | 'folio' | 'checkOut' | null
  >(null);
  const [modalRoom, setModalRoom] = useState<RoomItem>(INITIAL_ROOMS[3]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handler to mark an online booking as checked in & assign into rooms state
  const handleCheckInOnlineBooking = (bookingId: string) => {
    const booking = onlineBookings.find((b) => b.id === bookingId);
    if (!booking) return;

    // 1. Mark booking as checked in
    setOnlineBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'CHECKED_IN' as const } : b))
    );

    // 2. Put guest into rooms state so room becomes OCCUPIED
    let assignedRoomNumber = booking.roomNumber || '103';
    setRooms((prev) => {
      let targetIdx = prev.findIndex(
        (r) => (booking.roomId && r.id === booking.roomId) || r.roomNumber === booking.roomNumber
      );
      if (targetIdx === -1) {
        targetIdx = prev.findIndex((r) => r.status === 'VACANT_CLEAN');
      }
      if (targetIdx !== -1) {
        const updated = [...prev];
        const r = updated[targetIdx];
        assignedRoomNumber = r.roomNumber;
        updated[targetIdx] = {
          ...r,
          status: 'OCCUPIED',
          statusLabel: 'Occupied',
          guest: {
            name: booking.guestName,
            pax: booking.guestsCount || 2,
            phone: booking.phone,
            email: booking.email,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            arrivedAt: 'Just Now',
            folioAmount: booking.totalAmount,
            settlementStatus: booking.paymentStatus === 'PAID_ONLINE' ? 'PAID_UPI' : 'PAID_CARD',
            bookingRef: booking.bookingRef,
            idVerified: true,
          },
        };
        return updated;
      }
      return prev;
    });

    showToast(`Checked in ${booking.guestName} (${booking.phone}) to Suite ${assignedRoomNumber}! Room is now Occupied.`);
  };

  // Handler to filter online bookings (Phone search, guest name, ref)
  const filteredOnlineBookings = onlineBookings.filter((b) => {
    if (onlineStatusFilter !== 'ALL' && b.status !== onlineStatusFilter) {
      return false;
    }
    const query = (onlinePhoneSearch || searchQuery).trim().toLowerCase();
    if (query) {
      const cleanQ = query.replace(/[\s\-\+]/g, '');
      const cleanPhone = b.phone.replace(/[\s\-\+]/g, '');
      const matchPhone = cleanPhone.includes(cleanQ) || b.phone.toLowerCase().includes(query);
      const matchName = b.guestName.toLowerCase().includes(query);
      const matchRef = b.bookingRef.toLowerCase().includes(query);
      const matchVilla = b.villaTitle.toLowerCase().includes(query);
      return matchPhone || matchName || matchRef || matchVilla;
    }
    return true;
  });

  const pendingOnlineCheckIns = onlineBookings.filter((b) => b.status === 'CONFIRMED');

  // Handler to filter rooms: Strictly ONLY occupied rooms where people are staying
  const filteredRooms = rooms.filter((r) => {
    const isStaying = (r.status === 'OCCUPIED' || r.status === 'IN_HOUSE') && Boolean(r.guest);
    if (!isStaying) {
      return false;
    }
    if (selectedClusterFilter !== 'all' && r.clusterId !== selectedClusterFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchRoom =
        r.roomNumber.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.clusterName.toLowerCase().includes(q);
      const matchGuest =
        r.guest?.name.toLowerCase().includes(q) ||
        r.guest?.phone.toLowerCase().includes(q) ||
        r.guest?.email?.toLowerCase().includes(q);
      return matchRoom || matchGuest;
    }
    return true;
  });

  // Group rooms by cluster
  const clusters = [
    {
      id: 'candolim',
      name: 'Candolim Beachfront Haven',
      location: 'North Goa • 8 Luxury Suites',
      status: '100% Operational',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'coco-beach',
      name: 'Coco Beach Estate',
      location: 'Nerul Riverfront • 6 River Villas',
      status: '1 Arrival Pending',
      statusColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'anjuna-assagao',
      name: 'Casa Portuguesa (Assagao)',
      location: 'Heritage Restored Mansions',
      status: '1 In Turnover',
      statusColor: 'bg-orange-100 text-orange-800',
    },
    {
      id: 'morjim-pavilion',
      name: 'Morjim Turtle Coast Pavilion',
      location: 'North Goa • Secluded Dunes',
      status: 'Operational',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'vagator-cliff',
      name: 'Vagator Cliffside Mansions',
      location: 'Ozran Beachfront Heights',
      status: 'Operational',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
  ];

  // Actions
  const handleMarkClean = (roomId: string) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          return {
            ...r,
            status: 'VACANT_CLEAN',
            statusLabel: 'Vacant Clean',
            turnoverDetails: undefined,
            inspection: {
              by: 'Anita (Senior Housekeeper)',
              time: 'Just now',
            },
          };
        }
        return r;
      })
    );
    showToast('Room marked as Vacant & Clean. Ready for immediate arrival inspection.');
  };

  const handleCompleteCheckOut = (roomId: string, nextStatus: RoomStatus, notes?: string) => {
    const targetRoom = rooms.find((r) => r.id === roomId);
    const guestName = targetRoom?.guest?.name || 'Guest';

    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          if (nextStatus === 'DIRTY_TURNOVER') {
            return {
              ...r,
              status: 'DIRTY_TURNOVER',
              statusLabel: 'Dirty / Turnover',
              guest: undefined,
              turnoverDetails: {
                cleaningTimeRemaining: '35m Remaining',
                team: 'Express Housekeeping Squad',
                nextCheckIn: notes ? `Notes: ${notes}` : 'Open for Next Arrival',
              },
            };
          } else {
            return {
              ...r,
              status: 'VACANT_CLEAN',
              statusLabel: 'Vacant Clean',
              guest: undefined,
              turnoverDetails: undefined,
              inspection: {
                by: 'Front Desk Duty Manager',
                time: 'Just Now',
              },
            };
          }
        }
        return r;
      })
    );

    showToast(`Checked out ${guestName} from Room ${targetRoom?.roomNumber || ''}. Room freed up (${nextStatus === 'VACANT_CLEAN' ? 'Vacant Clean' : 'Turnover in Progress'}).`);
  };

  const handleEarlyDeparture = (roomId: string) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          return {
            ...r,
            status: 'DIRTY_TURNOVER',
            statusLabel: 'Turnover in Progress',
            turnoverDetails: {
              cleaningTimeRemaining: '30m Remaining',
              team: 'Express Housekeeping Squad',
              nextCheckIn: 'Open for Walk-In',
            },
          };
        }
        return r;
      })
    );
    showToast('Departure recorded. Housekeeping notified for turnover dispatch.');
  };

  const handleWalkInAssigned = (room: RoomItem, guestData: NonNullable<RoomItem['guest']>) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === room.id) {
          return {
            ...r,
            status: 'IN_HOUSE',
            statusLabel: 'In-House Stay',
            guest: guestData,
          };
        }
        return r;
      })
    );
    showToast(`Walk-in guest ${guestData.name} assigned to Room ${room.roomNumber}!`);
  };

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-7 max-w-[1600px] mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F3A41] text-white px-4 py-3 rounded-lg shadow-xl border border-teal-500/30 flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. TOP METRICS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Arrivals */}
        <div className="bg-white p-3.5 rounded-lg border border-stone-200 shadow-2xs flex flex-col justify-between hover:border-stone-300 transition-colors">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/80">
              Arrivals Today
            </span>
            <span className="text-amber-700">
              <LogIn className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-stone-900">8</span>
              <span className="text-xs text-stone-500 font-medium">Guests</span>
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">
              <span className="font-semibold text-stone-800">3 Arrived</span> • 5 Pending
            </div>
          </div>
        </div>

        {/* Departures */}
        <div className="bg-white p-3.5 rounded-lg border border-stone-200 shadow-2xs flex flex-col justify-between hover:border-stone-300 transition-colors">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600">
              Departures
            </span>
            <span className="text-stone-500">
              <LogOut className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-stone-900">5</span>
              <span className="text-xs text-stone-500 font-medium">Total</span>
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">
              <span className="font-semibold text-stone-800">4 Left</span> (1 Late)
            </div>
          </div>
        </div>

        {/* In-House */}
        <div className="bg-white p-3.5 rounded-lg border border-stone-200 shadow-2xs flex flex-col justify-between hover:border-stone-300 transition-colors">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600">
              In-House
            </span>
            <span className="text-[#1B6B76]">
              <BedDouble className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-[#1B6B76]">18</span>
              <span className="text-xs text-stone-500 font-medium">Rooms</span>
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">42 Guests</div>
          </div>
        </div>

        {/* Occupancy */}
        <div className="bg-white p-3.5 rounded-lg border border-stone-200 shadow-2xs flex flex-col justify-between hover:border-stone-300 transition-colors">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600">
              Occupancy
            </span>
            <span className="text-emerald-700">
              <PieChart className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-emerald-700">87.5%</span>
              <span className="text-[11px] text-stone-500">(21/24)</span>
            </div>
            <div className="text-[11px] text-emerald-700 mt-0.5 font-medium">3 Clean & Ready</div>
          </div>
        </div>

        {/* Unassigned */}
        <div className="bg-white p-3.5 rounded-lg border border-stone-200 shadow-2xs flex flex-col justify-between hover:border-stone-300 transition-colors">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Unassigned
            </span>
            <span className="text-amber-600">
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-amber-800">1</span>
              <span className="text-xs text-stone-500 font-medium">Booking</span>
            </div>
            <div className="text-[11px] text-amber-900/80 truncate mt-0.5 font-medium">
              Coco Beach Suite B
            </div>
          </div>
        </div>

        {/* Month Revenue */}
        <div className="bg-[#00525b] text-white p-3.5 rounded-lg shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-200">
              Month Revenue
            </span>
            <div className="w-5 h-5 rounded bg-teal-800/80 flex items-center justify-center text-teal-200">
              <IndianRupee className="w-3 h-3" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-white">
              ₹14.8L
            </div>
            <div className="text-[11px] text-teal-200 mt-0.5 font-medium">
              +18.4% vs Target
            </div>
          </div>
        </div>
      </div>

      {/* 2. ONLINE BOOKINGS SECTION (Search by Phone Number & Check-In Desk) */}
      {(focusedSection === 'all' || focusedSection === 'online_bookings') && (
        <div className="bg-white rounded-xl border border-stone-200 p-4 md:p-5 shadow-2xs space-y-4">
          {/* Header & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-[#1B6B76]">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-bold text-stone-900">
                      Online Bookings
                    </h2>
                    <span className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{pendingOnlineCheckIns.length} Awaiting Check-In</span>
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5 font-normal">
                    Search customer by phone number to verify booking and mark as checked-in.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Status Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setOnlineStatusFilter('ALL')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  onlineStatusFilter === 'ALL'
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All ({onlineBookings.length})
              </button>
              <button
                onClick={() => setOnlineStatusFilter('CONFIRMED')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  onlineStatusFilter === 'CONFIRMED'
                    ? 'bg-white text-amber-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>Awaiting Arrival ({pendingOnlineCheckIns.length})</span>
              </button>
              <button
                onClick={() => setOnlineStatusFilter('CHECKED_IN')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  onlineStatusFilter === 'CHECKED_IN'
                    ? 'bg-white text-emerald-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                In-House ({onlineBookings.filter((b) => b.status === 'CHECKED_IN').length})
              </button>
            </div>
          </div>

          {/* Dedicated Phone Number Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Phone className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={onlinePhoneSearch}
                onChange={(e) => setOnlinePhoneSearch(e.target.value)}
                placeholder="Search by Phone Number (e.g. 98201, +91 98450...), Guest Name, or Booking Ref..."
                className="w-full pl-10 pr-20 py-2.5 bg-stone-50 hover:bg-stone-50/80 focus:bg-white border border-stone-200 focus:border-[#1B6B76] rounded-lg text-xs text-stone-900 placeholder:text-stone-400 font-medium focus:outline-hidden transition-all shadow-2xs"
              />
              {onlinePhoneSearch && (
                <button
                  onClick={() => setOnlinePhoneSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-700 bg-stone-200/60 px-2 py-0.5 rounded cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Online Bookings List */}
          {filteredOnlineBookings.length === 0 ? (
            <div className="py-10 px-4 text-center bg-stone-50/60 rounded-xl border border-dashed border-stone-200 space-y-1.5">
              <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-2">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-stone-800">
                {onlinePhoneSearch
                  ? `No online bookings found matching "${onlinePhoneSearch}"`
                  : 'No online bookings under this filter'}
              </div>
              <div className="text-[11px] text-stone-500">
                Try searching with a partial phone number (e.g. 98201), customer name, or booking reference.
              </div>
            </div>
          ) : (
            <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[960px]">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                      <th className="py-3 px-4 w-[28%]">Guest & Contact</th>
                      <th className="py-3 px-4 w-[22%]">Reserved Villa</th>
                      <th className="py-3 px-4 w-[20%]">Stay Schedule</th>
                      <th className="py-3 px-4 w-[15%]">Total Amount</th>
                      <th className="py-3 px-4 w-[15%] text-right">Check-In Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs">
                    {filteredOnlineBookings.map((booking) => {
                      const isCheckedIn = booking.status === 'CHECKED_IN';
                      return (
                        <tr
                          key={booking.id}
                          className="hover:bg-stone-50/80 transition-colors"
                        >
                          {/* 1. Guest & Contact */}
                          <td className="py-3.5 px-4 align-middle">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-stone-900 text-sm">
                                {booking.guestName}
                              </span>
                              <span className="font-mono text-[10px] font-bold text-[#1B6B76] bg-teal-50 border border-teal-100 px-1.5 py-0.5 rounded">
                                {booking.bookingRef}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 pt-1 flex-wrap">
                              <a
                                href={`tel:${booking.phone}`}
                                className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-850 border border-emerald-200 rounded font-mono text-[11px] font-bold transition-colors cursor-pointer group"
                                title="Click to dial customer phone number"
                              >
                                <Phone className="w-3 h-3 text-emerald-600 group-hover:scale-110 transition-transform" />
                                <span className="text-emerald-900">{booking.phone}</span>
                              </a>
                              <span className="text-[11px] text-stone-400 truncate max-w-[160px]">
                                {booking.email}
                              </span>
                            </div>
                          </td>

                          {/* 2. Reserved Villa */}
                          <td className="py-3.5 px-4 align-middle">
                            <div className="font-semibold text-stone-900 text-xs sm:text-sm">
                              {booking.villaTitle}
                            </div>
                            <div className="text-[11px] font-bold text-[#1B6B76] mt-0.5">
                              Suite {booking.roomNumber}
                            </div>
                          </td>

                          {/* 3. Stay Schedule */}
                          <td className="py-3.5 px-4 align-middle">
                            <div className="font-medium text-stone-800">
                              {booking.checkIn} – {booking.checkOut}
                            </div>
                            <div className="text-[11px] text-stone-500 mt-0.5">
                              {booking.nights} Nights • {booking.guestsCount} Guests
                            </div>
                          </td>

                          {/* 4. Total Amount */}
                          <td className="py-3.5 px-4 align-middle">
                            <div className="font-mono font-bold text-stone-900 text-sm">
                              ₹{booking.totalAmount.toLocaleString('en-IN')}
                            </div>
                            <span className="inline-block mt-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                              {booking.paymentStatus === 'PAID_ONLINE' ? '✓ Paid Online' : 'Card Verified'}
                            </span>
                          </td>

                          {/* 5. Check-In Action */}
                          <td className="py-3.5 px-4 align-middle text-right">
                            {isCheckedIn ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Checked-In</span>
                              </span>
                            ) : (
                              <button
                                onClick={() => handleCheckInOnlineBooking(booking.id)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#00525b] hover:bg-[#166873] text-white text-xs font-bold rounded-lg transition-all shadow-xs hover:shadow-sm cursor-pointer active:scale-95"
                                title="Verify arrival and mark guest as checked in"
                              >
                                <LogIn className="w-3.5 h-3.5 text-emerald-300" />
                                <span>Mark as Checked-In</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Occupied Rooms Overview (Only rooms where people are staying) */}
      {(focusedSection === 'all' || focusedSection === 'occupied') && (
      <div className="bg-white rounded-xl border border-stone-200 p-4 md:p-5 shadow-2xs space-y-4">
        {/* Header & Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-bold text-stone-900">
              Occupied Rooms
            </h2>
            <span className="px-2.5 py-0.5 bg-amber-100 border border-amber-300 text-amber-900 rounded-full text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>{filteredRooms.length} Currently Occupied</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="relative">
              <select
                value={selectedClusterFilter}
                onChange={(e) => setSelectedClusterFilter(e.target.value)}
                className="pl-7 pr-7 py-1.5 bg-stone-50 border border-stone-200 rounded-md text-stone-700 font-medium focus:outline-hidden focus:border-[#1B6B76] cursor-pointer"
              >
                <option value="all">All Villas & Estates</option>
                <option value="candolim">Candolim Beachfront</option>
                <option value="coco-beach">Coco Beach Estate</option>
                <option value="anjuna-assagao">Casa Portuguesa (Assagao)</option>
                <option value="morjim-pavilion">Morjim Turtle Coast</option>
                <option value="vagator-cliff">Vagator Cliffside</option>
              </select>
              <Filter className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Occupied Rooms List or Empty State */}
        {filteredRooms.length === 0 ? (
          <div className="py-12 px-4 text-center bg-stone-50/70 rounded-xl border border-dashed border-stone-300 space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">All Rooms Are Currently Vacant & Free</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              There are no guests staying in occupied rooms at this time. All suites are freed up for new reservations.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {clusters.map((cluster) => {
              const clusterRooms = filteredRooms.filter((r) => r.clusterId === cluster.id);
              if (clusterRooms.length === 0) return null;

              return (
                <div key={cluster.id} className="border border-stone-200 rounded-lg overflow-hidden">
                  {/* Cluster Sub-header */}
                  <div className="bg-[#F6F8F9] px-4 py-2.5 border-b border-stone-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-900 text-xs md:text-sm">
                        {cluster.name}
                      </span>
                      <span className="text-stone-400 text-xs hidden sm:inline">
                        ({cluster.location})
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                      {clusterRooms.length} Occupied {clusterRooms.length === 1 ? 'Suite' : 'Suites'}
                    </span>
                  </div>

                  {/* Rooms under cluster */}
                  <div className="divide-y divide-stone-100 bg-white">
                    {clusterRooms.map((room) => {
                      return (
                        <div
                          key={room.id}
                          className="p-3.5 grid grid-cols-1 md:grid-cols-12 items-center gap-3 hover:bg-stone-50/80 transition-colors"
                        >
                          {/* Room Number & Title */}
                          <div className="flex items-start gap-3.5 md:col-span-5">
                            <div className="w-14 h-12 rounded-lg bg-stone-100 border border-stone-200 overflow-hidden relative shrink-0">
                              {room.imageUrl ? (
                                <img
                                  src={room.imageUrl}
                                  alt={room.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center font-mono font-bold text-stone-800 text-xs">
                                  {room.roomNumber}
                                </div>
                              )}
                              <span className="absolute bottom-0 right-0 px-1 bg-black/75 text-white font-mono font-bold text-[9px] rounded-tl">
                                {room.roomNumber}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-stone-900 text-sm">
                                  {room.name}
                                </span>
                                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#E1E8FD] text-[#00525b] rounded">
                                  OCCUPIED
                                </span>
                              </div>
                              <div className="text-[11px] text-stone-500 mt-0.5">
                                {room.features.join(' • ')}
                              </div>
                            </div>
                          </div>

                          {/* Room Meta (In-house guest details) */}
                          <div className="text-xs text-stone-600 md:col-span-5">
                            {room.guest && (
                              <div className="space-y-0.5">
                                <div className="font-medium text-stone-800 flex items-center gap-1.5 flex-wrap">
                                  <span>Guest:</span>
                                  <span className="font-bold text-stone-900">{room.guest.name}</span>
                                  {room.guest.pax && (
                                    <span className="text-stone-500 font-normal">({room.guest.pax} Pax)</span>
                                  )}
                                  <span className="text-stone-400">•</span>
                                  <a
                                    href={`tel:${room.guest.phone}`}
                                    className="font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 font-bold hover:underline"
                                  >
                                    {room.guest.phone}
                                  </a>
                                </div>
                                <div className="text-[11px] text-stone-500">
                                  <span>
                                    Stay: {room.guest.checkIn} - {room.guest.checkOut}
                                  </span>
                                  {room.guest.folioAmount && (
                                    <span className="ml-2 font-medium text-stone-700">
                                      • Folio: ₹{room.guest.folioAmount.toLocaleString('en-IN')}
                                    </span>
                                  )}
                                  {room.guest.transferDispatched && (
                                    <span className="text-emerald-700 font-medium ml-2">
                                      • Innova Dispatched
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* ONLY Checkout Action to free up the room */}
                          <div className="md:col-span-2 flex items-center justify-start md:justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setModalRoom(room);
                                setActiveModal('checkOut');
                              }}
                              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#9a460c] hover:bg-[#783200] text-white text-xs font-bold rounded-lg transition-all shadow-xs hover:shadow-sm cursor-pointer active:scale-95"
                              title="Check Out Guest & Free Up Room"
                            >
                              <LogOut className="w-3.5 h-3.5" />
                              <span>Check Out</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      )}

      {/* 3. BOTTOM SECTION: 7-Day Occupancy Schedule */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 md:p-5 shadow-2xs space-y-4">
        {/* Schedule Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-stone-900">
                7-Day Occupancy Schedule
              </h3>
              <span className="text-[10px] px-2 py-0.5 bg-teal-50 text-teal-800 rounded font-semibold border border-teal-200">
                Live
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Confirmed room allocations (Nov 11 – Nov 17, 2024)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-1.5 border border-stone-200 rounded hover:bg-stone-100 text-stone-600 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-3 py-1 bg-stone-50 border border-stone-200 rounded text-xs font-semibold text-stone-800">
              Nov 12, 2024 <span className="text-teal-700">(Today)</span>
            </div>
            <button className="p-1.5 border border-stone-200 rounded hover:bg-stone-100 text-stone-600 cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Schedule Timeline Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[840px]">
            {/* Days Header */}
            <div className="grid grid-cols-12 gap-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-stone-400 border-b border-stone-200">
              <div className="col-span-3 text-stone-700">Suite / Villa</div>
              <div className="col-span-1 text-center">Mon 11</div>
              <div className="col-span-1 text-center text-teal-800 bg-teal-50 rounded py-0.5">
                Tue 12 (Today)
              </div>
              <div className="col-span-1 text-center">Wed 13</div>
              <div className="col-span-1 text-center">Thu 14</div>
              <div className="col-span-1 text-center">Fri 15</div>
              <div className="col-span-1 text-center">Sat 16</div>
              <div className="col-span-1 text-center">Sun 17</div>
              <div className="col-span-2 text-right text-stone-700">Revenue Yield</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-stone-100 mt-2">
              {scheduleRows.map((row, index) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-2 py-3 items-center hover:bg-stone-50/50 transition-colors"
                  >
                    {/* Suite Name */}
                    <div className="col-span-3 pr-2">
                      <div className="font-semibold text-xs text-stone-900">
                        {row.roomNumber}
                      </div>
                      <div className="text-[11px] text-stone-500">{row.roomSubtext}</div>
                    </div>

                    {/* Timeline Multi-column Bar Area (7 columns for 7 days) */}
                    <div className="col-span-7 relative h-7 flex items-center">
                      {/* Grid guideline columns */}
                      <div className="absolute inset-0 grid grid-cols-7 gap-2 pointer-events-none opacity-20">
                        <div className="border-r border-stone-300"></div>
                        <div className="border-r border-teal-500 bg-teal-50/30"></div>
                        <div className="border-r border-stone-300"></div>
                        <div className="border-r border-stone-300"></div>
                        <div className="border-r border-stone-300"></div>
                        <div className="border-r border-stone-300"></div>
                        <div></div>
                      </div>

                      {/* Booking bars */}
                      <div className="w-full flex items-center gap-1 relative z-10">
                        {row.bookings.map((booking) => {
                          let bgStyle = 'bg-stone-200 text-stone-700';
                          if (booking.status === 'IN_HOUSE') {
                            bgStyle = 'bg-[#00525b] text-white';
                          } else if (booking.status === 'ARRIVING_TODAY') {
                            bgStyle = 'bg-[#9a460c] text-white';
                          } else if (booking.status === 'VACANT_CLEAN') {
                            bgStyle = 'bg-emerald-100 text-emerald-900 border border-emerald-300';
                          } else if (booking.status === 'TURNOVER') {
                            bgStyle = 'bg-amber-100 text-amber-900 border border-amber-300';
                          } else if (booking.status === 'FUTURE_BOOKING') {
                            bgStyle = 'bg-[#1b6b76] text-white';
                          }

                          const widthPercent = (booking.durationDays / 7) * 100;

                          return (
                            <div
                              key={booking.id}
                              style={{ width: `${widthPercent}%` }}
                              className={`h-6 rounded px-2 flex items-center justify-between text-[10px] font-medium truncate shadow-2xs cursor-pointer hover:brightness-110 transition-all ${bgStyle}`}
                              title={booking.label}
                            >
                              <span className="truncate">{booking.label}</span>
                              {booking.tag && (
                                <span className="ml-1 text-[9px] font-bold px-1 bg-white/20 rounded">
                                  {booking.tag}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Revenue Yield Value */}
                    <div className="col-span-2 text-right">
                      <div className="font-mono font-bold text-xs text-stone-900">
                        ₹{row.revenueYield.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-stone-500 font-medium">
                        {row.yieldStatus}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Schedule Footer Legend */}
        <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between text-xs text-stone-600 gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00525b]"></span>
              <span className="text-[11px]">In-House</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9a460c]"></span>
              <span className="text-[11px]">Arriving Today</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-[11px]">Vacant Clean</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-[11px]">Housekeeping / Turnover</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-teal-800 font-medium">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Auto-Sync Active</span>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {activeModal === 'printRegCard' && (
        <PrintRegCardModal
          room={modalRoom}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'whatsAppPass' && (
        <WhatsAppPassModal
          room={modalRoom}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'walkIn' && (
        <AssignWalkInModal
          room={modalRoom}
          onClose={() => setActiveModal(null)}
          onAssign={handleWalkInAssigned}
        />
      )}

      {activeModal === 'folio' && (
        <FolioModal
          room={modalRoom}
          onClose={() => setActiveModal(null)}
          onOpenCheckOut={() => setActiveModal('checkOut')}
        />
      )}

      {activeModal === 'checkOut' && (
        <CheckOutModal
          room={modalRoom}
          onClose={() => setActiveModal(null)}
          onConfirmCheckOut={handleCompleteCheckOut}
        />
      )}
    </div>
  );
};
