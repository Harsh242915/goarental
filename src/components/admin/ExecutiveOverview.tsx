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
  ArrowRight,
} from 'lucide-react';
import { RoomItem, RoomStatus, VisualScheduleRow } from '../../types';
import { INITIAL_ROOMS, INITIAL_SCHEDULE_ROWS } from '../../data/mockData';
import { PrintRegCardModal } from '../modals/PrintRegCardModal';
import { WhatsAppPassModal } from '../modals/WhatsAppPassModal';
import { AssignWalkInModal } from '../modals/AssignWalkInModal';
import { FolioModal } from '../modals/FolioModal';
import { CheckOutModal } from '../modals/CheckOutModal';

interface ExecutiveOverviewProps {
  searchQuery: string;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({ searchQuery }) => {
  // Rooms state
  const [rooms, setRooms] = useState<RoomItem[]>(INITIAL_ROOMS);
  const [scheduleRows, setScheduleRows] = useState<VisualScheduleRow[]>(INITIAL_SCHEDULE_ROWS);

  // Filters
  const [selectedClusterFilter, setSelectedClusterFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');

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

  // Handler to filter rooms
  const filteredRooms = rooms.filter((r) => {
    if (selectedClusterFilter !== 'all' && r.clusterId !== selectedClusterFilter) {
      return false;
    }
    if (selectedStatusFilter !== 'all' && r.status !== selectedStatusFilter) {
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

      {/* 2. Room Status Overview (Full Width) */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 md:p-5 shadow-2xs space-y-4">
        {/* Header & Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-bold text-stone-900">
                Room Status
              </h2>
              <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 text-stone-600 rounded-full text-xs font-semibold">
                5 Luxury Estates
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

              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-md text-stone-700 font-medium focus:outline-hidden focus:border-[#1B6B76] cursor-pointer"
              >
                <option value="all">All Statuses (24)</option>
                <option value="OCCUPIED">Occupied</option>
                <option value="IN_HOUSE">In-House</option>
                <option value="ARRIVING_TODAY">Arriving Today</option>
                <option value="VACANT_CLEAN">Vacant Clean</option>
                <option value="DIRTY_TURNOVER">Dirty / Turnover</option>
                <option value="OWNER_BLOCK">Owner Block</option>
              </select>
            </div>
          </div>

          {/* Clusters List */}
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
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${cluster.statusColor}`}
                    >
                      {cluster.status}
                    </span>
                  </div>

                  {/* Rooms under cluster */}
                  <div className="divide-y divide-stone-100 bg-white">
                    {clusterRooms.map((room) => {
                      return (
                        <div
                          key={room.id}
                          className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-stone-50/80 transition-colors"
                        >
                          {/* Room Number & Title */}
                          <div className="flex items-start gap-3.5 min-w-[240px]">
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
                                {/* Status badge */}
                                {room.status === 'OCCUPIED' && (
                                  <span className="px-2 py-0.5 text-[10px] font-bold bg-[#E1E8FD] text-[#00525b] rounded">
                                    OCCUPIED
                                  </span>
                                )}
                                {room.status === 'IN_HOUSE' && (
                                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">
                                    IN-HOUSE STAY
                                  </span>
                                )}
                                {room.status === 'ARRIVING_TODAY' && (
                                  <span className="px-2 py-0.5 text-[10px] font-bold bg-[#FDF2EB] text-[#9a460c] rounded">
                                    ARRIVING TODAY
                                  </span>
                                )}
                                {room.status === 'VACANT_CLEAN' && (
                                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                                    VACANT CLEAN
                                  </span>
                                )}
                                {room.status === 'DIRTY_TURNOVER' && (
                                  <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-900 rounded">
                                    DIRTY / TURNOVER
                                  </span>
                                )}
                                {room.status === 'OWNER_BLOCK' && (
                                  <span className="px-2 py-0.5 text-[10px] font-bold bg-stone-200 text-stone-700 rounded">
                                    OWNER BLOCK
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-stone-500 mt-0.5">
                                {room.features.join(' • ')}
                              </div>
                            </div>
                          </div>

                          {/* Room Meta (Guest or turnover or inspection) */}
                          <div className="text-xs text-stone-600 flex-1 md:px-4">
                            {room.guest && (
                              <div className="space-y-0.5">
                                <div className="font-medium text-stone-800">
                                  Guest:{' '}
                                  <span className="font-semibold">{room.guest.name}</span>
                                  {room.guest.pax && (
                                    <span className="text-stone-500"> ({room.guest.pax} Pax)</span>
                                  )}
                                  <span className="text-stone-400 mx-1.5">•</span>
                                  <span className="font-mono text-stone-600">
                                    {room.guest.phone}
                                  </span>
                                </div>
                                <div className="text-[11px] text-stone-500">
                                  {room.guest.eta ? (
                                    <span className="text-amber-800 font-medium">
                                      ETA {room.guest.eta}
                                    </span>
                                  ) : (
                                    <span>
                                      {room.guest.checkIn} - {room.guest.checkOut}
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

                            {room.status === 'VACANT_CLEAN' && (
                              <div className="text-[11px] text-stone-600">
                                <div>
                                  Inspected by {room.inspection?.by} ({room.inspection?.time})
                                  <span className="mx-1.5">•</span>
                                  Tariff: ₹{room.tariff.toLocaleString('en-IN')}/night
                                </div>
                                <div className="text-stone-500">
                                  Next Booking: {room.nextBooking?.date} ({room.nextBooking?.guestName})
                                </div>
                              </div>
                            )}

                            {room.status === 'DIRTY_TURNOVER' && (
                              <div className="text-[11px] text-amber-900 space-y-0.5">
                                <div>
                                  <span className="font-semibold">Deep Sanitization</span> •{' '}
                                  {room.turnoverDetails?.cleaningTimeRemaining} • Staff:{' '}
                                  {room.turnoverDetails?.team}
                                </div>
                                <div className="text-stone-500">
                                  Next: {room.turnoverDetails?.nextCheckIn}
                                </div>
                              </div>
                            )}

                            {room.status === 'OWNER_BLOCK' && (
                              <div className="text-[11px] text-stone-600 space-y-0.5">
                                <div>
                                  Owner Stay:{' '}
                                  <span className="font-semibold">
                                    {room.ownerBlockDetails?.ownerName}
                                  </span>
                                  <span className="mx-1">•</span>
                                  {room.ownerBlockDetails?.assignedStaff}
                                </div>
                                <div className="text-stone-500">
                                  Blocked until {room.ownerBlockDetails?.blockedUntil}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Quick Interactive Actions matching screenshot */}
                          <div className="flex items-center gap-2 shrink-0">
                            {room.status === 'OCCUPIED' && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setModalRoom(room);
                                    setActiveModal('folio');
                                  }}
                                  className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded transition-colors cursor-pointer"
                                >
                                  View Folio
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setModalRoom(room);
                                    setActiveModal('checkOut');
                                  }}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#9a460c] hover:bg-[#783200] text-white text-xs font-semibold rounded transition-colors cursor-pointer shadow-2xs"
                                >
                                  <LogOut className="w-3 h-3" />
                                  Check Out
                                </button>
                              </>
                            )}

                            {room.status === 'IN_HOUSE' && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setModalRoom(room);
                                    setActiveModal('folio');
                                  }}
                                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold rounded transition-colors cursor-pointer"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  Folio
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setModalRoom(room);
                                    setActiveModal('checkOut');
                                  }}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#9a460c] hover:bg-[#783200] text-white text-xs font-semibold rounded transition-colors cursor-pointer shadow-2xs"
                                >
                                  <LogOut className="w-3 h-3" />
                                  Check Out
                                </button>
                              </>
                            )}

                            {room.status === 'VACANT_CLEAN' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setModalRoom(room);
                                  setActiveModal('walkIn');
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00525b] hover:bg-[#166873] text-white text-xs font-semibold rounded transition-colors cursor-pointer shadow-2xs"
                              >
                                <ArrowRight className="w-3 h-3" />
                                Assign Walk-In
                              </button>
                            )}

                            {room.status === 'ARRIVING_TODAY' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRooms((prev) =>
                                    prev.map((r) =>
                                      r.id === room.id
                                        ? {
                                            ...r,
                                            status: 'IN_HOUSE',
                                            statusLabel: 'In-House Stay',
                                            guest: {
                                              ...r.guest!,
                                              arrivedAt: 'Just Now',
                                            },
                                          }
                                        : r
                                    )
                                  );
                                  showToast(`Checked in ${room.guest?.name || 'Guest'} to Room ${room.roomNumber}!`);
                                }}
                                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#9a460c] hover:bg-[#783200] text-white text-xs font-semibold rounded transition-colors cursor-pointer shadow-2xs"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Direct Check-In
                              </button>
                            )}

                            {room.status === 'DIRTY_TURNOVER' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkClean(room.id);
                                }}
                                className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 border border-stone-200 text-xs font-semibold rounded transition-colors cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5" />
                                Mark Clean
                              </button>
                            )}

                            {room.status === 'OWNER_BLOCK' && (
                              <div className="flex items-center gap-1 px-2.5 py-1.5 bg-stone-100 text-stone-500 text-xs font-medium rounded">
                                <Lock className="w-3 h-3" />
                                Restricted By Admin
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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
