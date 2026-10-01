import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Edit3,
  Eye,
  CheckCircle2,
  BedDouble,
  SlidersHorizontal,
  Trash2,
  Search,
  Check,
  X,
  MapPin,
  Users,
  Image as ImageIcon,
  Sparkles,
  Maximize2,
  Tag,
  Layers,
  ChevronRight,
  Info,
  Calendar,
  IndianRupee,
  LogOut,
} from 'lucide-react';
import { VILLA_PRODUCTS, INITIAL_ROOMS } from '../../data/mockData';
import { VillaProduct, RoomItem, RoomStatus } from '../../types';
import { CheckOutModal } from '../modals/CheckOutModal';

// Curated high-res luxury room photos presets
const LUXURY_ROOM_PHOTO_PRESETS = [
  {
    name: 'Sunset Ocean Master Suite',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
    tag: 'Ocean Suite',
  },
  {
    name: 'Tropical Garden Verandah Suite',
    url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
    tag: 'Garden Suite',
  },
  {
    name: 'Rooftop Sky Penthouse',
    url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
    tag: 'Penthouse',
  },
  {
    name: 'Riverside Waterfront Room',
    url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80',
    tag: 'River View',
  },
  {
    name: 'Portuguese Heritage Palacio Suite',
    url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=80',
    tag: 'Heritage',
  },
  {
    name: 'Secluded Dune Coastal Suite',
    url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80',
    tag: 'Dune Villa',
  },
  {
    name: 'Cliffside Panorama Suite',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    tag: 'Cliff Edge',
  },
  {
    name: 'Colonial Courtyard King Suite',
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
    tag: 'Courtyard',
  },
];

const PRESET_AMENITY_TAGS = [
  'Sea Facing Balcony',
  'Private Jacuzzi',
  'Infinity Pool Access',
  'Outdoor Rain Shower',
  'Italian Marble Ensuite',
  'Butler Pantry',
  'High-Speed Wi-Fi',
  'Teakwood Wardrobe',
  'Espresso Machine',
  'Antique Four-Poster Bed',
  'Lush Fern Garden',
  'Wine Cooler',
];

export const VillaInventoryView: React.FC = () => {
  const [villas, setVillas] = useState<VillaProduct[]>(VILLA_PRODUCTS);
  const [rooms, setRooms] = useState<RoomItem[]>(INITIAL_ROOMS);
  const [activeTab, setActiveTab] = useState<'villas' | 'rooms'>('villas');
  const [selectedVillaFilter, setSelectedVillaFilter] = useState<string>('all');
  const [roomSearchQuery, setRoomSearchQuery] = useState<string>('');

  // Modals state
  const [selectedVillaForDetails, setSelectedVillaForDetails] = useState<VillaProduct | null>(null);
  const [selectedRoomForDetails, setSelectedRoomForDetails] = useState<RoomItem | null>(null);
  const [checkOutRoom, setCheckOutRoom] = useState<RoomItem | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

  // New Villa Modal State
  const [showAddVillaModal, setShowAddVillaModal] = useState(false);
  const [newVillaData, setNewVillaData] = useState({
    title: '',
    location: 'Candolim, North Goa',
    region: 'North Goa' as VillaProduct['region'],
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    pricePerNight: 50000,
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85',
  });

  // Room Modal State (Add & Edit)
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [roomFormData, setRoomFormData] = useState({
    villaClusterId: 'candolim',
    roomNumber: '',
    name: '',
    tariff: 25000,
    bedType: 'California King Bed',
    sizeSqFt: 650,
    maxGuests: 2,
    status: 'VACANT_CLEAN' as RoomStatus,
    statusLabel: 'Vacant Clean',
    description: '',
    features: ['Sea Facing Balcony', 'Private Jacuzzi', 'High-Speed Wi-Fi'],
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
    ],
  });
  const [newGalleryInput, setNewGalleryInput] = useState('');
  const [customAmenityInput, setCustomAmenityInput] = useState('');

  // Quick Inline Tariff Edit State
  const [quickEditingTariffId, setQuickEditingTariffId] = useState<string | null>(null);
  const [quickTariffValue, setQuickTariffValue] = useState<number>(0);

  // Toast Notification
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Open Room Modal for Create
  const handleOpenAddRoom = (defaultVillaClusterId?: string) => {
    setEditingRoomId(null);
    setRoomFormData({
      villaClusterId: defaultVillaClusterId || villas[0]?.clusterId || 'candolim',
      roomNumber: '',
      name: '',
      tariff: 28000,
      bedType: 'California King Bed',
      sizeSqFt: 650,
      maxGuests: 2,
      status: 'VACANT_CLEAN',
      statusLabel: 'Vacant Clean',
      description: 'Luxurious and spacious suite with private views, bespoke furnishings, and luxury ensuite.',
      features: ['Sea Facing Balcony', 'Private Jacuzzi', 'High-Speed Wi-Fi'],
      imageUrl: LUXURY_ROOM_PHOTO_PRESETS[0].url,
      gallery: [LUXURY_ROOM_PHOTO_PRESETS[0].url, LUXURY_ROOM_PHOTO_PRESETS[1].url],
    });
    setNewGalleryInput('');
    setCustomAmenityInput('');
    setShowRoomModal(true);
  };

  // Open Room Modal for Edit
  const handleOpenEditRoom = (room: RoomItem) => {
    setEditingRoomId(room.id);
    setRoomFormData({
      villaClusterId: room.clusterId,
      roomNumber: room.roomNumber,
      name: room.name,
      tariff: room.tariff,
      bedType: room.bedType || 'King Bed',
      sizeSqFt: room.sizeSqFt || 600,
      maxGuests: room.maxGuests || (room.guest?.pax || 2),
      status: room.status,
      statusLabel: room.statusLabel,
      description: room.description || '',
      features: room.features || [],
      imageUrl: room.imageUrl || LUXURY_ROOM_PHOTO_PRESETS[0].url,
      gallery: room.gallery && room.gallery.length > 0 ? room.gallery : [room.imageUrl || LUXURY_ROOM_PHOTO_PRESETS[0].url],
    });
    setNewGalleryInput('');
    setCustomAmenityInput('');
    setShowRoomModal(true);
  };

  // Save Room (Add or Edit)
  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomFormData.roomNumber.trim() || !roomFormData.name.trim()) {
      showToast('Please enter both Room Number and Suite Name.');
      return;
    }

    const targetVilla = villas.find((v) => v.clusterId === roomFormData.villaClusterId) || villas[0];

    if (editingRoomId) {
      // Update existing room
      setRooms((prev) =>
        prev.map((r) => {
          if (r.id === editingRoomId) {
            return {
              ...r,
              roomNumber: roomFormData.roomNumber,
              name: roomFormData.name,
              clusterId: targetVilla.clusterId,
              clusterName: targetVilla.title,
              clusterLocation: targetVilla.location,
              tariff: Number(roomFormData.tariff),
              bedType: roomFormData.bedType,
              sizeSqFt: Number(roomFormData.sizeSqFt),
              maxGuests: Number(roomFormData.maxGuests),
              status: roomFormData.status,
              statusLabel: roomFormData.status === 'VACANT_CLEAN' ? 'Vacant Clean' : r.statusLabel,
              description: roomFormData.description,
              features: roomFormData.features,
              imageUrl: roomFormData.imageUrl,
              gallery: roomFormData.gallery,
            };
          }
          return r;
        })
      );
      showToast(`Room ${roomFormData.roomNumber} (${roomFormData.name}) updated successfully.`);
    } else {
      // Create new room
      const newRoom: RoomItem = {
        id: `room-${roomFormData.roomNumber.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`,
        roomNumber: roomFormData.roomNumber,
        name: roomFormData.name,
        clusterId: targetVilla.clusterId,
        clusterName: targetVilla.title,
        clusterLocation: targetVilla.location,
        status: roomFormData.status,
        statusLabel: roomFormData.status === 'VACANT_CLEAN' ? 'Vacant Clean' : 'Operational',
        tariff: Number(roomFormData.tariff),
        bedType: roomFormData.bedType,
        sizeSqFt: Number(roomFormData.sizeSqFt),
        maxGuests: Number(roomFormData.maxGuests),
        description: roomFormData.description,
        features: roomFormData.features,
        imageUrl: roomFormData.imageUrl,
        gallery: roomFormData.gallery,
        inspection: {
          by: 'Duty Manager',
          time: 'Just now',
        },
      };

      setRooms((prev) => [...prev, newRoom]);
      showToast(`New Room ${newRoom.roomNumber} added to ${targetVilla.title}!`);
    }

    setShowRoomModal(false);
  };

  // Delete Room
  const handleDeleteRoom = (roomId: string, roomNumber: string) => {
    if (confirm(`Are you sure you want to remove Room ${roomNumber} from inventory?`)) {
      setRooms((prev) => prev.filter((r) => r.id !== roomId));
      showToast(`Room ${roomNumber} removed from inventory.`);
    }
  };

  // Complete Check-Out & Free Up Room
  const handleConfirmCheckOut = (roomId: string, nextStatus: RoomStatus, notes?: string) => {
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
                by: 'Duty Manager',
                time: 'Just now',
              },
            };
          }
        }
        return r;
      })
    );

    setCheckOutRoom(null);
    showToast(`Checked out ${guestName} from Room ${targetRoom?.roomNumber || ''}. Room freed up.`);
  };

  // Create Villa
  const handleCreateVilla = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVillaData.title.trim()) return;

    const clusterId = newVillaData.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const createdVilla: VillaProduct = {
      id: `villa-${clusterId}-${Date.now()}`,
      title: newVillaData.title,
      subtitle: `${newVillaData.bedrooms} Bedroom Luxury Estate in ${newVillaData.location}`,
      clusterId,
      location: newVillaData.location,
      region: newVillaData.region,
      bedrooms: newVillaData.bedrooms,
      bathrooms: newVillaData.bathrooms,
      maxGuests: newVillaData.maxGuests,
      pricePerNight: newVillaData.pricePerNight,
      rating: 5.0,
      reviewCount: 1,
      tagline: 'Private Luxury Gated Sanctuary',
      description: newVillaData.description || 'Exclusive private villa with dedicated master chef and private pool.',
      imageUrl: newVillaData.imageUrl,
      gallery: [newVillaData.imageUrl],
      amenities: ['Private Infinity Pool', 'Resident Chef', 'Butler Service', 'High-Speed WiFi'],
      signatureHighlights: ['Private Poolside Sundowner Deck', 'Airport Chauffeur Dispatch'],
    };

    setVillas([...villas, createdVilla]);
    setShowAddVillaModal(false);
    showToast(`Villa "${newVillaData.title}" added to portfolio!`);
    setNewVillaData({
      title: '',
      location: 'Candolim, North Goa',
      region: 'North Goa',
      bedrooms: 4,
      bathrooms: 4,
      maxGuests: 8,
      pricePerNight: 50000,
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85',
    });
  };

  // Quick Tariff Update
  const handleSaveQuickTariff = (roomId: string) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, tariff: quickTariffValue } : r))
    );
    setQuickEditingTariffId(null);
    showToast('Room nightly rate updated.');
  };

  // Quick Status Update
  const handleUpdateRoomStatus = (roomId: string, newStatus: RoomStatus, statusLabel: string) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, status: newStatus, statusLabel } : r))
    );
    showToast('Room status updated.');
  };

  // Filtered rooms
  const filteredRooms = rooms.filter((r) => {
    const matchesVilla = selectedVillaFilter === 'all' || r.clusterId === selectedVillaFilter;
    const matchesSearch =
      !roomSearchQuery.trim() ||
      r.roomNumber.toLowerCase().includes(roomSearchQuery.toLowerCase()) ||
      r.name.toLowerCase().includes(roomSearchQuery.toLowerCase()) ||
      r.clusterName.toLowerCase().includes(roomSearchQuery.toLowerCase()) ||
      (r.features && r.features.some((f) => f.toLowerCase().includes(roomSearchQuery.toLowerCase())));
    return matchesVilla && matchesSearch;
  });

  return (
    <div className="flex-1 p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F3A41] text-white px-4 py-3 rounded-lg shadow-xl border border-teal-500/30 flex items-center gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900">
            Villas & Rooms Inventory
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage multiple luxury villas, room configurations, photo galleries, nightly tariffs, and live statuses.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddVillaModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>+ Add Villa</span>
          </button>

          <button
            onClick={() => handleOpenAddRoom()}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1B6B76] hover:bg-[#13515a] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Room & Photos</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
            Total Villas Portfolio
          </span>
          <div className="text-2xl font-bold text-stone-900 mt-1">
            {villas.length} Villas
          </div>
          <span className="text-[11px] text-stone-500 block mt-0.5">
            North, South & Riverfront Goa
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
            Total Rooms & Suites
          </span>
          <div className="text-2xl font-bold text-[#1B6B76] mt-1">
            {rooms.length} Suites
          </div>
          <span className="text-[11px] text-stone-500 block mt-0.5">
            Across {villas.length} properties
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
            Vacant Clean (Ready)
          </span>
          <div className="text-2xl font-bold text-emerald-700 mt-1">
            {rooms.filter((r) => r.status === 'VACANT_CLEAN').length} Suites
          </div>
          <span className="text-[11px] text-stone-500 block mt-0.5">
            Immediate walk-in availability
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
            Occupied / In-House
          </span>
          <div className="text-2xl font-bold text-blue-700 mt-1">
            {rooms.filter((r) => r.status === 'OCCUPIED' || r.status === 'IN_HOUSE').length} Suites
          </div>
          <span className="text-[11px] text-stone-500 block mt-0.5">
            Active guest stays
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-6">
        <button
          onClick={() => setActiveTab('villas')}
          className={`pb-3 text-xs font-bold transition-colors cursor-pointer relative ${
            activeTab === 'villas'
              ? 'text-stone-900 border-b-2 border-stone-900'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            Villas Portfolio ({villas.length})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('rooms')}
          className={`pb-3 text-xs font-bold transition-colors cursor-pointer relative ${
            activeTab === 'rooms'
              ? 'text-stone-900 border-b-2 border-stone-900'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <BedDouble className="w-4 h-4" />
            All Villa Rooms & Suites ({rooms.length})
          </span>
        </button>
      </div>

      {/* TAB 1: VILLAS PORTFOLIO */}
      {activeTab === 'villas' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {villas.map((villa) => {
              const villaRooms = rooms.filter((r) => r.clusterId === villa.clusterId);
              const occupiedRooms = villaRooms.filter(
                (r) => r.status === 'OCCUPIED' || r.status === 'IN_HOUSE'
              ).length;

              return (
                <div
                  key={villa.id}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Villa Cover Image */}
                    <div className="relative h-44 bg-stone-100 overflow-hidden group">
                      <img
                        src={villa.imageUrl}
                        alt={villa.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white rounded text-[10px] font-semibold">
                        {villa.region}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h3 className="font-bold text-sm leading-snug drop-shadow-xs">
                          {villa.title}
                        </h3>
                        <p className="text-[11px] text-stone-200 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#D4AF37]" />
                          {villa.location}
                        </p>
                      </div>
                    </div>

                    {/* Villa Stats & Rooms */}
                    <div className="p-4 space-y-3 text-xs">
                      <div className="grid grid-cols-3 gap-2 p-2 bg-stone-50 rounded-lg border border-stone-100 text-center">
                        <div>
                          <span className="text-[10px] text-stone-400 block uppercase font-semibold">Bedrooms</span>
                          <span className="font-bold text-stone-800 text-xs">{villa.bedrooms} BHK</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-400 block uppercase font-semibold">Max Guests</span>
                          <span className="font-bold text-stone-800 text-xs">{villa.maxGuests} Pax</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-400 block uppercase font-semibold">Nightly Base</span>
                          <span className="font-bold text-[#1B6B76] text-xs">₹{villa.pricePerNight.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Rooms Summary in this Villa */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-stone-700 flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5 text-stone-400" />
                            Registered Suites ({villaRooms.length})
                          </span>
                          <span className="text-stone-500 text-[10px]">
                            {occupiedRooms} / {villaRooms.length} Occupied
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                          {villaRooms.length > 0 ? (
                            villaRooms.map((room) => (
                              <button
                                key={room.id}
                                onClick={() => {
                                  setSelectedRoomForDetails(room);
                                  setActiveGalleryIndex(0);
                                }}
                                className={`px-2 py-1 rounded text-[10px] font-medium border flex items-center gap-1 cursor-pointer transition-colors ${
                                  room.status === 'OCCUPIED' || room.status === 'IN_HOUSE'
                                    ? 'bg-blue-50 border-blue-200 text-blue-800'
                                    : room.status === 'VACANT_CLEAN'
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                    : 'bg-amber-50 border-amber-200 text-amber-800'
                                }`}
                              >
                                <span>Room {room.roomNumber}</span>
                                {room.imageUrl && <ImageIcon className="w-2.5 h-2.5 opacity-60" />}
                              </button>
                            ))
                          ) : (
                            <span className="text-stone-400 text-[11px] italic">
                              No rooms registered yet.
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 pt-2 border-t border-stone-100 flex items-center justify-between gap-2 text-xs">
                    <button
                      onClick={() => setSelectedVillaForDetails(villa)}
                      className="px-3 py-1.5 text-stone-600 hover:text-stone-900 border border-stone-200 rounded-md font-semibold cursor-pointer hover:bg-stone-50 flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-stone-500" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => handleOpenAddRoom(villa.clusterId)}
                      className="px-3 py-1.5 bg-[#1B6B76] hover:bg-[#13515a] text-white rounded-md font-semibold cursor-pointer flex items-center gap-1 shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Room</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ALL ROOMS & SUITES TABLE */}
      {activeTab === 'rooms' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
          {/* Table Controls */}
          <div className="p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-stone-50/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search room number, suite, features..."
                  value={roomSearchQuery}
                  onChange={(e) => setRoomSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-white border border-stone-200 rounded-md text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#1B6B76] w-64"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>

              <select
                value={selectedVillaFilter}
                onChange={(e) => setSelectedVillaFilter(e.target.value)}
                className="px-3 py-1.5 bg-white border border-stone-200 rounded-md text-xs text-stone-700 font-medium focus:outline-none focus:border-[#1B6B76] cursor-pointer"
              >
                <option value="all">All Villas ({rooms.length} Rooms)</option>
                {villas.map((v) => (
                  <option key={v.id} value={v.clusterId}>
                    {v.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => handleOpenAddRoom(selectedVillaFilter !== 'all' ? selectedVillaFilter : undefined)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1B6B76] hover:bg-[#13515a] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add New Room</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-100/70 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Room Photo & Number</th>
                  <th className="py-3 px-4">Suite Name & Villa</th>
                  <th className="py-3 px-4">Configuration</th>
                  <th className="py-3 px-4">Features & Photos</th>
                  <th className="py-3 px-4">Nightly Tariff</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-stone-50/70 transition-colors">
                    {/* Room Photo & Number */}
                    <td className="py-3.5 px-4 font-bold text-stone-900">
                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => {
                            setSelectedRoomForDetails(room);
                            setActiveGalleryIndex(0);
                          }}
                          className="w-12 h-12 rounded-lg bg-stone-200 overflow-hidden shrink-0 border border-stone-200 cursor-pointer relative group"
                        >
                          {room.imageUrl ? (
                            <img
                              src={room.imageUrl}
                              alt={room.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                            <Eye className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div>
                          <span className="font-bold text-sm text-stone-900">
                            Room {room.roomNumber}
                          </span>
                          <span className="block text-[10px] text-stone-400">
                            ID: {room.id.slice(0, 12)}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Suite Name & Villa */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-stone-800 block text-xs">
                        {room.name}
                      </span>
                      <span className="text-[11px] text-stone-500 block">
                        {room.clusterName}
                      </span>
                    </td>

                    {/* Configuration */}
                    <td className="py-3.5 px-4 text-stone-600">
                      <span className="font-medium block text-xs">
                        {room.bedType || 'King Bed'}
                      </span>
                      <span className="text-[11px] text-stone-400 block">
                        {room.sizeSqFt || 600} sq ft • Up to {room.maxGuests || 2} Guests
                      </span>
                    </td>

                    {/* Features & Photos */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {room.features && room.features.slice(0, 2).map((f, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded text-[10px] font-medium"
                          >
                            {f}
                          </span>
                        ))}
                        {room.features && room.features.length > 2 && (
                          <span className="px-1.5 py-0.5 bg-stone-100 text-stone-400 rounded text-[10px]">
                            +{room.features.length - 2} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-[#1B6B76] font-semibold flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" />
                          {(room.gallery?.length || (room.imageUrl ? 1 : 0))} Photos
                        </span>
                      </div>
                    </td>

                    {/* Nightly Tariff */}
                    <td className="py-3.5 px-4">
                      {quickEditingTariffId === room.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            value={quickTariffValue}
                            onChange={(e) => setQuickTariffValue(Number(e.target.value))}
                            className="w-24 px-2 py-1 border border-[#1B6B76] rounded text-xs focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveQuickTariff(room.id)}
                            className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setQuickEditingTariffId(null)}
                            className="p-1 bg-stone-200 text-stone-600 rounded hover:bg-stone-300 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-900 text-xs">
                            ₹{room.tariff.toLocaleString()}
                          </span>
                          <button
                            onClick={() => {
                              setQuickEditingTariffId(room.id);
                              setQuickTariffValue(room.tariff);
                            }}
                            className="text-stone-400 hover:text-stone-700 p-0.5 rounded cursor-pointer"
                            title="Edit Rate"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <select
                        value={room.status}
                        onChange={(e) => {
                          const val = e.target.value as RoomStatus;
                          const labelMap: Record<RoomStatus, string> = {
                            VACANT_CLEAN: 'Vacant Clean',
                            OCCUPIED: 'Occupied',
                            IN_HOUSE: 'In-House Stay',
                            ARRIVING_TODAY: 'Arriving Today',
                            DIRTY_TURNOVER: 'Dirty / Turnover',
                            OWNER_BLOCK: 'Owner Block',
                          };
                          handleUpdateRoomStatus(room.id, val, labelMap[val] || val);
                        }}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold border cursor-pointer focus:outline-none ${
                          room.status === 'VACANT_CLEAN'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : room.status === 'OCCUPIED' || room.status === 'IN_HOUSE'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : room.status === 'ARRIVING_TODAY'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-orange-50 text-orange-800 border-orange-200'
                        }`}
                      >
                        <option value="VACANT_CLEAN">Vacant Clean</option>
                        <option value="IN_HOUSE">In-House Stay</option>
                        <option value="ARRIVING_TODAY">Arriving Today</option>
                        <option value="OCCUPIED">Occupied</option>
                        <option value="DIRTY_TURNOVER">Dirty / Turnover</option>
                        <option value="OWNER_BLOCK">Owner Block</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {(room.status === 'OCCUPIED' || room.status === 'IN_HOUSE') && (
                          <button
                            onClick={() => setCheckOutRoom(room)}
                            className="p-1.5 text-stone-500 hover:text-[#9a460c] hover:bg-amber-50 rounded cursor-pointer transition-colors"
                            title="Process Check-Out & Free Up Room"
                          >
                            <LogOut className="w-3.5 h-3.5 text-[#9a460c]" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedRoomForDetails(room);
                            setActiveGalleryIndex(0);
                          }}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded cursor-pointer transition-colors"
                          title="View Details & Photos"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEditRoom(room)}
                          className="p-1.5 text-stone-500 hover:text-[#1B6B76] hover:bg-stone-100 rounded cursor-pointer transition-colors"
                          title="Edit Room & Photos"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(room.id, room.roomNumber)}
                          className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer transition-colors"
                          title="Delete Room"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: ADD / EDIT ROOM & PHOTOS */}
      {/* ========================================================================= */}
      {showRoomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl border border-stone-200 text-xs my-8">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#1B6B76] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BedDouble className="w-5 h-5 text-teal-200" />
                <h3 className="font-bold text-sm">
                  {editingRoomId ? `Edit Room & Photos (${roomFormData.roomNumber})` : 'Add New Room / Suite to Villa'}
                </h3>
              </div>
              <button
                onClick={() => setShowRoomModal(false)}
                className="text-white/80 hover:text-white cursor-pointer text-base font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveRoom} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              {/* 1. Villa Assignment & Basic Info */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  1. Villa & Suite Identity
                </span>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Assign to Villa *</label>
                  <select
                    value={roomFormData.villaClusterId}
                    onChange={(e) => setRoomFormData({ ...roomFormData, villaClusterId: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76] text-xs font-medium"
                  >
                    {villas.map((v) => (
                      <option key={v.id} value={v.clusterId}>
                        {v.title} — {v.location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Room / Suite Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 104, Suite A, Pool Villa 2"
                      value={roomFormData.roomNumber}
                      onChange={(e) => setRoomFormData({ ...roomFormData, roomNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Suite Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sunrise Poolside Master Suite"
                      value={roomFormData.name}
                      onChange={(e) => setRoomFormData({ ...roomFormData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Bed Configuration</label>
                    <select
                      value={roomFormData.bedType}
                      onChange={(e) => setRoomFormData({ ...roomFormData, bedType: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76]"
                    >
                      <option value="California King Bed">California King</option>
                      <option value="King Bed">King Bed</option>
                      <option value="Super King Bed">Super King Bed</option>
                      <option value="Antique Canopy Bed">Antique Canopy Bed</option>
                      <option value="Four-Poster King">Four-Poster King</option>
                      <option value="Twin Beds (2x)">Twin Beds (2x)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Area (Sq Ft)</label>
                    <input
                      type="number"
                      value={roomFormData.sizeSqFt}
                      onChange={(e) => setRoomFormData({ ...roomFormData, sizeSqFt: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Max Guests</label>
                    <input
                      type="number"
                      value={roomFormData.maxGuests}
                      onChange={(e) => setRoomFormData({ ...roomFormData, maxGuests: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Rates & Status */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  2. Nightly Tariff & Initial Status
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Nightly Tariff (₹) *</label>
                    <input
                      type="number"
                      required
                      value={roomFormData.tariff}
                      onChange={(e) => setRoomFormData({ ...roomFormData, tariff: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76] font-bold text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Room Status</label>
                    <select
                      value={roomFormData.status}
                      onChange={(e) => setRoomFormData({ ...roomFormData, status: e.target.value as RoomStatus })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76]"
                    >
                      <option value="VACANT_CLEAN">Vacant Clean (Ready for Check-in)</option>
                      <option value="IN_HOUSE">In-House Stay</option>
                      <option value="ARRIVING_TODAY">Arriving Today</option>
                      <option value="OCCUPIED">Occupied</option>
                      <option value="DIRTY_TURNOVER">Dirty / Turnover</option>
                      <option value="OWNER_BLOCK">Owner Block</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Room Description</label>
                  <textarea
                    rows={2}
                    placeholder="Describe the room ambiance, balcony views, bathroom amenities..."
                    value={roomFormData.description}
                    onChange={(e) => setRoomFormData({ ...roomFormData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76] text-xs resize-none"
                  />
                </div>
              </div>

              {/* 3. Photos & Gallery */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    3. Room Cover Photo & Gallery
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium">
                    {roomFormData.gallery.length} photos in gallery
                  </span>
                </div>

                {/* Primary Cover Image Preview & Input */}
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Primary Cover Photo URL *</label>
                  <div className="flex gap-3 items-start">
                    <div className="w-24 h-16 rounded-lg bg-stone-100 border border-stone-300 overflow-hidden shrink-0">
                      {roomFormData.imageUrl ? (
                        <img
                          src={roomFormData.imageUrl}
                          alt="Cover Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-400 text-[10px]">
                          No Photo
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="url"
                        required
                        placeholder="https://images.unsplash.com/..."
                        value={roomFormData.imageUrl}
                        onChange={(e) => setRoomFormData({ ...roomFormData, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76] text-xs"
                      />
                      <span className="text-[10px] text-stone-400 block mt-1">
                        Main high-res photo displayed on booking card and overview.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Photo Presets */}
                <div>
                  <label className="block text-stone-600 font-semibold mb-1.5 text-[11px]">
                    Quick Pick from Curated Goa Suite Photos:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {LUXURY_ROOM_PHOTO_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setRoomFormData({
                            ...roomFormData,
                            imageUrl: preset.url,
                            gallery: roomFormData.gallery.includes(preset.url)
                              ? roomFormData.gallery
                              : [preset.url, ...roomFormData.gallery],
                          });
                        }}
                        className={`relative rounded-md overflow-hidden border text-left group cursor-pointer transition-all ${
                          roomFormData.imageUrl === preset.url
                            ? 'border-[#1B6B76] ring-2 ring-[#1B6B76]/30'
                            : 'border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <div className="h-12 bg-stone-100">
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-1 bg-white">
                          <span className="text-[9px] font-bold text-stone-800 block truncate">
                            {preset.tag}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Gallery Photos */}
                <div className="space-y-2 pt-1">
                  <label className="block text-stone-700 font-bold text-[11px]">
                    Additional Gallery Photos (URLs)
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Paste image URL (https://...)"
                      value={newGalleryInput}
                      onChange={(e) => setNewGalleryInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76] text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newGalleryInput.trim()) {
                          setRoomFormData({
                            ...roomFormData,
                            gallery: [...roomFormData.gallery, newGalleryInput.trim()],
                          });
                          setNewGalleryInput('');
                        }
                      }}
                      className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg font-semibold text-xs cursor-pointer"
                    >
                      + Add Photo
                    </button>
                  </div>

                  {/* Gallery Thumbnails */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {roomFormData.gallery.map((photoUrl, pIdx) => (
                      <div
                        key={pIdx}
                        className="relative w-16 h-12 rounded-md overflow-hidden border border-stone-200 group bg-stone-100"
                      >
                        <img
                          src={photoUrl}
                          alt={`Gallery ${pIdx}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setRoomFormData({
                              ...roomFormData,
                              gallery: roomFormData.gallery.filter((_, i) => i !== pIdx),
                            });
                          }}
                          className="absolute top-0.5 right-0.5 p-0.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="Remove Photo"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Features & Amenities */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  4. Room Features & Amenities
                </span>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_AMENITY_TAGS.map((tag, tIdx) => {
                    const isSelected = roomFormData.features.includes(tag);
                    return (
                      <button
                        key={tIdx}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setRoomFormData({
                              ...roomFormData,
                              features: roomFormData.features.filter((f) => f !== tag),
                            });
                          } else {
                            setRoomFormData({
                              ...roomFormData,
                              features: [...roomFormData.features, tag],
                            });
                          }
                        }}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-semibold border cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#1B6B76] text-white border-[#1B6B76]'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amenity Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add custom feature tag (e.g. Teakwood Armchair)"
                    value={customAmenityInput}
                    onChange={(e) => setCustomAmenityInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76] text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customAmenityInput.trim()) {
                        setRoomFormData({
                          ...roomFormData,
                          features: [...roomFormData.features, customAmenityInput.trim()],
                        });
                        setCustomAmenityInput('');
                      }
                    }}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-semibold text-xs cursor-pointer"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowRoomModal(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B6B76] hover:bg-[#13515a] text-white font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  {editingRoomId ? 'Save Room Changes' : 'Create Room & Photos'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD NEW VILLA TO PORTFOLIO */}
      {/* ========================================================================= */}
      {showAddVillaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white max-w-lg w-full rounded-xl overflow-hidden shadow-2xl border border-stone-200 text-xs">
            <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Add New Luxury Villa to Portfolio</h3>
              <button
                onClick={() => setShowAddVillaModal(false)}
                className="text-stone-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateVilla} className="p-6 space-y-4">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Villa Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ashwem Seaside Palacio"
                  value={newVillaData.title}
                  onChange={(e) => setNewVillaData({ ...newVillaData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Location / Beach *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ashwem Beach, North Goa"
                    value={newVillaData.location}
                    onChange={(e) => setNewVillaData({ ...newVillaData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76]"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Region</label>
                  <select
                    value={newVillaData.region}
                    onChange={(e) => setNewVillaData({ ...newVillaData, region: e.target.value as VillaProduct['region'] })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76]"
                  >
                    <option value="North Goa">North Goa</option>
                    <option value="South Goa">South Goa</option>
                    <option value="Riverfront">Riverfront</option>
                    <option value="Heritage Assagao">Heritage Assagao</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={newVillaData.bedrooms}
                    onChange={(e) => setNewVillaData({ ...newVillaData, bedrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76]"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Max Guests</label>
                  <input
                    type="number"
                    value={newVillaData.maxGuests}
                    onChange={(e) => setNewVillaData({ ...newVillaData, maxGuests: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76]"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Base Rate / Night (₹)</label>
                  <input
                    type="number"
                    value={newVillaData.pricePerNight}
                    onChange={(e) => setNewVillaData({ ...newVillaData, pricePerNight: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Villa Cover Photo URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newVillaData.imageUrl}
                  onChange={(e) => setNewVillaData({ ...newVillaData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Estate overview, private grounds, dedicated chef..."
                  value={newVillaData.description}
                  onChange={(e) => setNewVillaData({ ...newVillaData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B6B76] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowAddVillaModal(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg cursor-pointer"
                >
                  Create Villa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ROOM DETAILS & PHOTO GALLERY VIEWER */}
      {/* ========================================================================= */}
      {selectedRoomForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-white max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl border border-stone-200 text-xs">
            {/* Main Photo Viewer */}
            <div className="relative h-64 bg-stone-900">
              {selectedRoomForDetails.gallery && selectedRoomForDetails.gallery.length > 0 ? (
                <img
                  src={selectedRoomForDetails.gallery[activeGalleryIndex] || selectedRoomForDetails.imageUrl}
                  alt={selectedRoomForDetails.name}
                  className="w-full h-full object-cover"
                />
              ) : selectedRoomForDetails.imageUrl ? (
                <img
                  src={selectedRoomForDetails.imageUrl}
                  alt={selectedRoomForDetails.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedRoomForDetails(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
              >
                ✕
              </button>

              {/* Status Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-xs text-white rounded-md text-xs font-semibold">
                Room {selectedRoomForDetails.roomNumber} • {selectedRoomForDetails.statusLabel}
              </div>

              {/* Gallery Thumbnails Bar */}
              {selectedRoomForDetails.gallery && selectedRoomForDetails.gallery.length > 1 && (
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 p-1.5 bg-black/60 backdrop-blur-xs rounded-lg overflow-x-auto">
                  {selectedRoomForDetails.gallery.map((imgUrl, gIdx) => (
                    <button
                      key={gIdx}
                      onClick={() => setActiveGalleryIndex(gIdx)}
                      className={`w-14 h-10 rounded shrink-0 overflow-hidden border-2 cursor-pointer transition-all ${
                        activeGalleryIndex === gIdx ? 'border-[#D4AF37] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Room Info Body */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-base text-stone-900">
                    {selectedRoomForDetails.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {selectedRoomForDetails.clusterName} ({selectedRoomForDetails.clusterLocation})
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Nightly Rate</span>
                  <span className="text-base font-bold text-[#1B6B76]">
                    ₹{selectedRoomForDetails.tariff.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Configuration Matrix */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-stone-50 rounded-lg border border-stone-100 text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Bedding</span>
                  <span className="font-bold text-stone-800 text-xs">
                    {selectedRoomForDetails.bedType || 'California King Bed'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Area</span>
                  <span className="font-bold text-stone-800 text-xs">
                    {selectedRoomForDetails.sizeSqFt || 600} sq ft
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Capacity</span>
                  <span className="font-bold text-stone-800 text-xs">
                    Up to {selectedRoomForDetails.maxGuests || 2} Guests
                  </span>
                </div>
              </div>

              {/* Description */}
              {selectedRoomForDetails.description && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Room Overview</span>
                  <p className="text-stone-600 leading-relaxed text-xs">
                    {selectedRoomForDetails.description}
                  </p>
                </div>
              )}

              {/* Features Tags */}
              {selectedRoomForDetails.features && selectedRoomForDetails.features.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1.5">Amenities & Features</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRoomForDetails.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="px-2 py-1 bg-stone-100 text-stone-700 rounded-md font-medium text-[11px] border border-stone-200"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Guest Info if Occupied */}
              {selectedRoomForDetails.guest && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg space-y-1 text-blue-900">
                  <span className="text-[10px] uppercase font-bold text-blue-600 block">Current In-House Guest</span>
                  <div className="flex items-center justify-between font-bold">
                    <span>{selectedRoomForDetails.guest.name} ({selectedRoomForDetails.guest.pax} Guests)</span>
                    <span>Ref: {selectedRoomForDetails.guest.bookingRef || 'VG-RES'}</span>
                  </div>
                  <div className="text-[11px] text-blue-700">
                    Stay: {selectedRoomForDetails.guest.checkIn} → {selectedRoomForDetails.guest.checkOut}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const r = selectedRoomForDetails;
                      setSelectedRoomForDetails(null);
                      handleOpenEditRoom(r);
                    }}
                    className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg cursor-pointer flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Details & Photos</span>
                  </button>

                  {selectedRoomForDetails.guest && (
                    <button
                      onClick={() => {
                        const r = selectedRoomForDetails;
                        setSelectedRoomForDetails(null);
                        setCheckOutRoom(r);
                      }}
                      className="px-3.5 py-2 bg-[#9a460c] hover:bg-[#783200] text-white font-semibold rounded-lg cursor-pointer flex items-center gap-1.5 shadow-2xs"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Process Check-Out</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setSelectedRoomForDetails(null)}
                  className="px-4 py-2 bg-stone-900 text-white font-bold rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: VILLA DETAILS */}
      {/* ========================================================================= */}
      {selectedVillaForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white max-w-xl w-full rounded-xl overflow-hidden shadow-2xl border border-stone-200 text-xs">
            <div className="relative h-48 bg-stone-100">
              <img
                src={selectedVillaForDetails.imageUrl}
                alt={selectedVillaForDetails.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedVillaForDetails(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-3">
              <h3 className="font-bold text-base text-stone-900">{selectedVillaForDetails.title}</h3>
              <p className="text-stone-600 leading-relaxed">{selectedVillaForDetails.description}</p>
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    const cId = selectedVillaForDetails.clusterId;
                    setSelectedVillaForDetails(null);
                    handleOpenAddRoom(cId);
                  }}
                  className="px-3.5 py-2 bg-[#1B6B76] text-white font-bold rounded-lg cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Room to this Villa</span>
                </button>
                <button
                  onClick={() => setSelectedVillaForDetails(null)}
                  className="px-4 py-2 bg-stone-900 text-white font-bold rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: GUEST CHECK-OUT MODAL */}
      {/* ========================================================================= */}
      {checkOutRoom && (
        <CheckOutModal
          room={checkOutRoom}
          onClose={() => setCheckOutRoom(null)}
          onConfirmCheckOut={handleConfirmCheckOut}
        />
      )}
    </div>
  );
};
