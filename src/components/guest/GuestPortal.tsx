import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Waves,
  Sparkles,
  Phone,
  ArrowRight,
  Shield,
  Clock,
  Heart,
  Star,
  Check,
  Compass,
  Anchor,
  UtensilsCrossed,
  Award,
} from 'lucide-react';
import { VILLA_PRODUCTS } from '../../data/mockData';
import { VillaProduct } from '../../types';
import { GuestBookingModal } from './GuestBookingModal';

interface GuestPortalProps {
  onSwitchToAdmin: () => void;
  onNewBookingCreated: (bookingData: {
    villa: VillaProduct;
    guestName: string;
    phone: string;
    email: string;
    checkIn: string;
    nights: number;
    totalAmount: number;
    addOns: string[];
  }) => void;
}

export const GuestPortal: React.FC<GuestPortalProps> = ({
  onSwitchToAdmin,
  onNewBookingCreated,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Beachfront' | 'Riverfront' | 'Heritage'>('All');
  const [locationSearch, setLocationSearch] = useState('All Goa');
  const [guestsCount, setGuestsCount] = useState(2);
  const [activeVillaForBooking, setActiveVillaForBooking] = useState<VillaProduct | null>(null);

  const filteredVillas = VILLA_PRODUCTS.filter((villa) => {
    if (selectedFilter === 'Beachfront') return villa.location.toLowerCase().includes('candolim') || villa.location.toLowerCase().includes('morjim');
    if (selectedFilter === 'Riverfront') return villa.location.toLowerCase().includes('nerul') || villa.region === 'Riverfront';
    if (selectedFilter === 'Heritage') return villa.region === 'Heritage Assagao';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#141b2b]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] flex items-center justify-center overflow-hidden">
        {/* Hero Background Image with luxury dark gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=85"
            alt="Goa Luxury Villa"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase text-amber-200">
            <span>⚜</span>
            <span>Private Estates & Heritage Palacios of Goa</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Where the Arabian Sea Meets Bespoke Goan Hospitality
          </h1>

          <p className="text-base sm:text-lg text-stone-200 max-w-2xl mx-auto font-light leading-relaxed">
            Secluded beachfront sanctuaries, Nerul riverfront estates, and 300-year-old Portuguese mansions. Complete with dedicated resident chefs, private infinity pools, and 24/7 personal butlers.
          </p>

          {/* Floating Search Console */}
          <div className="max-w-4xl mx-auto mt-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/40 text-left text-stone-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              {/* Location */}
              <div className="p-2 sm:border-r border-stone-200">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                  Location / Coastline
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-[#1B6B76] shrink-0" />
                  <select
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="w-full bg-transparent font-semibold text-xs text-stone-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value="All Goa">All Goa Estates</option>
                    <option value="Candolim">Candolim (Beachfront)</option>
                    <option value="Nerul">Nerul (Riverfront)</option>
                    <option value="Assagao">Assagao (Heritage)</option>
                    <option value="Morjim">Morjim (Turtle Coast)</option>
                  </select>
                </div>
              </div>

              {/* Check-In */}
              <div className="p-2 sm:border-r border-stone-200">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                  Check-In
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-[#1B6B76] shrink-0" />
                  <input
                    type="date"
                    defaultValue="2024-11-20"
                    className="w-full bg-transparent font-semibold text-xs text-stone-900 focus:outline-hidden cursor-pointer"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="p-2 lg:border-r border-stone-200">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                  Guests & Suites
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Users className="w-4 h-4 text-[#1B6B76] shrink-0" />
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-transparent font-semibold text-xs text-stone-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value={2}>2 Guests (1 Suite)</option>
                    <option value={4}>4 Guests (2 Suites)</option>
                    <option value={6}>6 Guests (3 Suites)</option>
                    <option value={10}>10+ Guests (Full Villa Buyout)</option>
                  </select>
                </div>
              </div>

              {/* Search CTA */}
              <div className="p-1">
                <a
                  href="#villas"
                  className="w-full py-3.5 bg-[#E27D42] hover:bg-[#d06e35] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Check Availability</span>
                </a>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-300 pt-4">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> 100% Verified Private Estates
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Complimentary Innova Airport Pickup
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> 24/7 Dedicated Estate Butler
            </span>
          </div>
        </div>
      </section>

      {/* 2. THE RESIDENCES (VILLA SHOWCASE) */}
      <section id="villas" className="max-w-7xl mx-auto px-6 py-20 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#1B6B76] block mb-1">
              Handcrafted Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              The Private Villa Residences
            </h2>
            <p className="text-stone-500 text-xs mt-1">
              Select between private beachfront compounds, serene backwater estates, and restored heritage mansions.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg text-xs font-semibold">
            {(['All', 'Beachfront', 'Riverfront', 'Heritage'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-md transition-all cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {filter === 'All' ? 'All Residences' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Villa Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVillas.map((villa) => (
            <div
              key={villa.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Media frame */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-stone-100">
                  <img
                    src={villa.imageUrl}
                    alt={villa.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider rounded-md">
                    {villa.location}
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-bold rounded-md shadow-xs">
                    ★ {villa.rating}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl text-white text-xs">
                    <p className="font-light italic text-stone-200 line-clamp-1">"{villa.tagline}"</p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-[#1B6B76] transition-colors">
                      {villa.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">{villa.subtitle}</p>
                  </div>

                  {/* Bed / Bath / Guest Specs */}
                  <div className="flex items-center gap-3 text-xs text-stone-600 border-y border-stone-100 py-3">
                    <span className="font-semibold">{villa.bedrooms} Bedrooms</span>
                    <span className="text-stone-300">•</span>
                    <span className="font-semibold">{villa.bathrooms} Bathrooms</span>
                    <span className="text-stone-300">•</span>
                    <span className="font-semibold">Up to {villa.maxGuests} Guests</span>
                  </div>

                  {/* Amenities Preview */}
                  <div className="flex flex-wrap gap-1.5">
                    {villa.amenities.slice(0, 4).map((amenity, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded bg-[#EFECE6] text-stone-800 font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with Price and Booking Trigger */}
              <div className="p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Starting From
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-2xl font-bold text-stone-900">
                      ₹{villa.pricePerNight.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">/ night</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveVillaForBooking(villa)}
                  className="px-5 py-2.5 bg-[#1B6B76] hover:bg-[#14535c] text-white font-semibold rounded-lg text-xs transition-transform active:scale-95 cursor-pointer shadow-xs"
                >
                  Reserve Residence
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SIGNATURE BESPOKE EXPERIENCES */}
      <section id="experiences" className="bg-[#EFECE6]/50 py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#1B6B76]">
              Exclusive Guest Privileges
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Curated Coastal Experiences
            </h2>
            <p className="text-xs text-stone-600">
              Every stay includes access to our private yacht fleet, master culinary team, and bespoke excursion guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#1B6B76]">
                <Anchor className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Private Sunset Catamaran Charters
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Cruise from our private Nerul river moorings toward Aguada Fort and the open Arabian Sea. Complete with chilled prosecco and gourmet canapés.
              </p>
              <div className="pt-2 text-xs font-mono font-bold text-[#1B6B76]">
                From ₹32,000 / 3-hour charter
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#9a460c]">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                In-Villa Master Chef Seafood Feasts
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Fresh tiger prawns, red snapper, and Goan mud crabs caught by local fishermen that morning, charcoal-grilled on your private veranda with Recheado butter.
              </p>
              <div className="pt-2 text-xs font-mono font-bold text-[#9a460c]">
                From ₹12,500 / family dinner
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Private Yoga & Sound Bathing
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Sunrise meditation and Tibetan singing bowl therapy on your private pool deck, led by renowned Goan wellness masters.
              </p>
              <div className="pt-2 text-xs font-mono font-bold text-emerald-800">
                From ₹4,500 / private session
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LUXURY CONCIERGE BANNER */}
      <section id="concierge" className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-[#0F3A41] to-[#1B6B76] rounded-2xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] uppercase font-bold tracking-widest text-teal-200">
              24/7 Dedicated Concierge & Duty Manager
            </span>
            <h3 className="font-serif text-3xl font-bold leading-tight">
              Have Bespoke Requests or Group Buyouts?
            </h3>
            <p className="text-teal-100 text-xs leading-relaxed">
              Connect directly with Arjun Rao, General Manager, to arrange private jet airport transfers, customized wedding buyouts, or confidential VIP security escorts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+917798967689"
              className="px-6 py-3 bg-white text-[#0F3A41] hover:bg-stone-100 font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-colors"
            >
              <Phone className="w-4 h-4 text-[#1B6B76]" />
              <span>Call +91 77989 67689</span>
            </a>

            <button
              onClick={onSwitchToAdmin}
              className="px-6 py-3 bg-[#E27D42] hover:bg-[#d06e35] text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <span>Switch to Operations Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-[#111827] text-stone-400 text-xs py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="font-serif text-lg font-bold text-white tracking-wider">
              VILLAS GOA
            </div>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              Ultra-luxury private villa rentals, heritage mansions, and waterfront retreats across North & South Goa.
            </p>
            <div className="text-[10px] text-stone-500">
              Accredited by Goa Tourism Development Corporation (GTDC)
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-3">
              Coastal Enclaves
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>Candolim Beachfront Haven</li>
              <li>Coco Beach River Estate (Nerul)</li>
              <li>Casa Portuguesa (Assagao)</li>
              <li>Morjim Turtle Coast Pavilion</li>
              <li>Vagator Cliffside Mansions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-3">
              Signature Services
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>Full-Time Resident Private Chef</li>
              <li>24/7 Dedicated Estate Butler</li>
              <li>Innova Crysta Airport Transfers</li>
              <li>Private Luxury Yacht Charters</li>
              <li>High-Speed Starlink Connectivity</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-3">
              Operations & Reservations
            </h4>
            <p className="text-[11px] text-stone-400">
              General Manager Desk: +91 77989 67689
            </p>
            <p className="text-[11px] text-stone-400 mt-1">
              Email: reservations@villasgoa.com
            </p>
            <div className="mt-3">
              <button
                onClick={onSwitchToAdmin}
                className="text-[11px] text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Access Staff Operations Hub →
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-stone-800 text-[11px] flex flex-col sm:flex-row justify-between text-stone-500">
          <div>© {new Date().getFullYear()} Villas Goa Luxury Residences. All rights reserved.</div>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Estate Booking</span>
            <span>Coastal Zone Regulations</span>
          </div>
        </div>
      </footer>

      {/* Booking Checkout Modal */}
      {activeVillaForBooking && (
        <GuestBookingModal
          villa={activeVillaForBooking}
          onClose={() => setActiveVillaForBooking(null)}
          onBookingConfirmed={(booking) => {
            onNewBookingCreated(booking);
          }}
        />
      )}
    </div>
  );
};
