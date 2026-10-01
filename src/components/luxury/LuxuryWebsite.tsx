import React, { useState, useEffect } from 'react';
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Waves,
  Sparkles,
  Phone,
  ArrowRight,
  ShieldCheck,
  Star,
  Check,
  UtensilsCrossed,
  Award,
  Shield,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageCircle,
  Clock,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { VILLA_PRODUCTS } from '../../data/mockData';
import { VillaProduct } from '../../types';
import { GuestBookingModal } from '../guest/GuestBookingModal';
import { LuxuryHeader } from './LuxuryHeader';

// Hero Background Slides
const HERO_SLIDES = [
  {
    title: 'Where Arabian Sea Horizons Meet Bespoke Luxury',
    subtitle: 'Candolim Beachfront Haven • North Goa',
    description: 'Secluded beachfront sanctuaries with private infinity pools, master chefs, and 24/7 dedicated estate butlers.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2000&q=90',
    tag: 'Signature Beachfront Sanctuary',
  },
  {
    title: 'Cliffside Panoramas & Sunset Champagne Decks',
    subtitle: 'Vagator Cliffside Mansions • Ozran Heights',
    description: 'Perched 100 feet above the crashing waves with heated jacuzzi tubs and floor-to-ceiling glass pavilions.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=90',
    tag: 'Private Ocean Cliffside',
  },
  {
    title: 'Riverfront Serenity with Private Boat Jetty',
    subtitle: 'Coco Beach Estate • Nerul Riverfront',
    description: 'Tranquil mangrove-facing estate with sunset dining gazebos, resident chefs, and immediate river access.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90',
    tag: 'Riverside Heritage Haven',
  },
];

const CURATED_EXPERIENCES = [
  {
    id: 'chef',
    title: 'Private Master Chef Dining',
    shortTag: 'Gourmet In-Villa Dining',
    description: 'Wake up to fresh coastal breakfasts and savor evening Goan fish curry, tiger prawn grills, and Portuguese specialties customized to your palate on your poolside deck.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    bullets: [
      'Daily morning market seafood sourcing',
      'Poolside sunset barbecue dinners',
      'Full Vegan, Jain & Gluten-free customization',
      'Complimentary evening tea & fresh bakery treats',
    ],
  },
  {
    id: 'butler',
    title: '24/7 Dedicated Estate Butler',
    shortTag: 'Personalized Concierge',
    description: 'From luggage unpacking and cocktail mixing to arranging beach sunbed setups and private dinner reservations, your butler handles every detail with discreet perfection.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    bullets: [
      'Discreet round-the-clock estate management',
      'Daily luxury housekeeping & aromatherapy turndown',
      'Direct WhatsApp concierge response under 2 minutes',
      'Priority access to Goa’s finest dining venues',
    ],
  },
  {
    id: 'pool',
    title: 'Private Infinity Pools & Sanctuaries',
    shortTag: 'Secluded Wellness',
    description: 'Submerge in crystal-clear temperature-controlled pools surrounded by antique Portuguese arches, swaying palms, and plush teak sunloungers with complete privacy.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
    bullets: [
      'Sanitized dual-filtered infinity pools',
      'Private pool deck champagne coolers',
      'Outdoor rain showers & jacuzzi jets',
      'High-privacy gated estate perimeters',
    ],
  },
];

const GUEST_TESTIMONIALS = [
  {
    name: 'Sir David & Lady Sterling',
    location: 'London, UK',
    stay: 'Candolim Beachfront Haven',
    rating: 5,
    quote: 'An absolute masterpiece of hospitality. The private chef prepared the best Goan curry we have ever tasted, and having the beach just steps from our lawn was pure magic.',
  },
  {
    name: 'Vikram & Radhika Singhania',
    location: 'Mumbai, India',
    stay: 'Vagator Cliffside Mansions',
    rating: 5,
    quote: 'The cliff views at sunset are breathtaking. Our estate butler took care of every single requirement without us even asking. We have already booked our return stay.',
  },
  {
    name: 'Ananya Birla & Family',
    location: 'Delhi NCR',
    stay: 'Coco Beach Estate (Nerul)',
    rating: 5,
    quote: 'Secluded, serene, and ultra-luxurious. The private jetty, sprawling verandahs, and spotless rooms made this our best family vacation in Goa to date.',
  },
];

interface LuxuryWebsiteProps {
  onNewBookingCreated?: (bookingData: {
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

export const LuxuryWebsite: React.FC<LuxuryWebsiteProps> = ({ onNewBookingCreated }) => {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Beachfront' | 'Riverfront' | 'Heritage' | 'Private Pool'>('All');
  const [locationSearch, setLocationSearch] = useState('All Goa');
  const [guestsCount, setGuestsCount] = useState(2);
  const [checkInDate, setCheckInDate] = useState('2024-11-20');
  const [activeVillaForBooking, setActiveVillaForBooking] = useState<VillaProduct | null>(null);
  const [activeExperienceTab, setActiveExperienceTab] = useState<'chef' | 'butler' | 'pool'>('chef');

  // Photo carousel index per villa card
  const [villaPhotoIndexes, setVillaPhotoIndexes] = useState<Record<string, number>>({});

  // Auto rotate hero slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleNextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const filteredVillas = VILLA_PRODUCTS.filter((villa) => {
    if (selectedFilter === 'Beachfront') return villa.location.toLowerCase().includes('candolim') || villa.location.toLowerCase().includes('morjim') || villa.location.toLowerCase().includes('vagator');
    if (selectedFilter === 'Riverfront') return villa.location.toLowerCase().includes('nerul') || villa.region === 'Riverfront';
    if (selectedFilter === 'Heritage') return villa.region === 'Heritage Assagao';
    if (selectedFilter === 'Private Pool') return villa.amenities.some((a) => a.toLowerCase().includes('pool'));
    return true;
  });

  const activeExp = CURATED_EXPERIENCES.find((e) => e.id === activeExperienceTab) || CURATED_EXPERIENCES[0];

  return (
    <div className="min-h-screen bg-[#070B10] text-[#E5E7EB] font-sans selection:bg-[#D4AF37]/30 selection:text-[#D4AF37] relative overflow-x-hidden">
      {/* 1. LUXURY HEADER */}
      <LuxuryHeader onOpenBookingModal={() => setActiveVillaForBooking(VILLA_PRODUCTS[0])} />

      {/* 2. HERO SECTION WITH KEN BURNS & SLIDER */}
      <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Images with Crossfade & Ken Burns */}
        {HERO_SLIDES.map((slide, sIdx) => (
          <div
            key={sIdx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentHeroSlide === sIdx ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover ${currentHeroSlide === sIdx ? 'animate-kenburns' : ''}`}
            />
            {/* Deep luxury vignette gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B10] via-[#070B10]/60 to-[#070B10]/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#070B10_85%)]" />
          </div>
        ))}

        {/* Ambient Floating Glow Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#1B6B76]/15 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '-2.5s' }} />

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center space-y-7">
          {/* Permanent Grand Luxury Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.12] drop-shadow-2xl">
            Where Arabian Sea Horizons Meet{' '}
            <span className="italic font-normal bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] bg-clip-text text-transparent">
              Bespoke Luxury
            </span>
          </h1>

          {/* Synchronized Smooth Crossfading Slide Information */}
          <div className="relative h-28 sm:h-24 max-w-3xl mx-auto">
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 flex flex-col items-center justify-center space-y-3 transition-all duration-1000 ease-in-out ${
                  currentHeroSlide === idx
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/85 backdrop-blur-md border border-[#D4AF37]/40 text-xs font-semibold tracking-widest uppercase text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{slide.tag} • {slide.subtitle}</span>
                </div>
                <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed drop-shadow-md max-w-2xl text-center">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>

          {/* Slide Indicators with Titles & Controls */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <button
              onClick={handlePrevHeroSlide}
              className="p-2 rounded-full bg-black/50 border border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroSlide(idx)}
                  className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all duration-500 cursor-pointer flex items-center gap-1.5 ${
                    currentHeroSlide === idx
                      ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105'
                      : 'bg-black/50 border border-white/20 text-stone-400 hover:text-white hover:border-white/40'
                  }`}
                >
                  <span className="font-mono">0{idx + 1}</span>
                  <span className="hidden sm:inline">{slide.subtitle.split('•')[0].trim()}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleNextHeroSlide}
              className="p-2 rounded-full bg-black/50 border border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Floating Glassmorphic Search Console */}
          <div className="max-w-4xl mx-auto mt-6 glass-gold-card rounded-2xl p-4 sm:p-6 text-left text-stone-200 transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              {/* Location */}
              <div className="p-2 sm:border-r border-stone-700/60">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                  Location / Coastline
                </span>
                <div className="flex items-center gap-2 mt-1.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <select
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="w-full bg-transparent font-semibold text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="All Goa" className="bg-stone-900 text-white">All 5 Luxury Estates</option>
                    <option value="Candolim" className="bg-stone-900 text-white">Candolim Beachfront</option>
                    <option value="Nerul River" className="bg-stone-900 text-white">Nerul Riverfront</option>
                    <option value="Assagao Heritage" className="bg-stone-900 text-white">Assagao Heritage Palacio</option>
                    <option value="Morjim" className="bg-stone-900 text-white">Morjim Turtle Coast</option>
                    <option value="Vagator" className="bg-stone-900 text-white">Vagator Cliffside</option>
                  </select>
                </div>
              </div>

              {/* Check-In */}
              <div className="p-2 sm:border-r border-stone-700/60">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                  Check-In Date
                </span>
                <div className="flex items-center gap-2 mt-1.5">
                  <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-transparent font-semibold text-xs text-white focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="p-2 sm:border-r border-stone-700/60">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                  Guests & Suites
                </span>
                <div className="flex items-center gap-2 mt-1.5">
                  <Users className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-transparent font-semibold text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value={2} className="bg-stone-900 text-white">2 Guests (Couples Suite)</option>
                    <option value={4} className="bg-stone-900 text-white">4 Guests (Family Suite)</option>
                    <option value={8} className="bg-stone-900 text-white">8 Guests (Private Villa)</option>
                    <option value={16} className="bg-stone-900 text-white">16+ Guests (Full Estate)</option>
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <a
                  href="#villas"
                  className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#e5c148] to-[#B89228] hover:from-[#f0cf5f] hover:to-[#D4AF37] text-black font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-black" />
                  <span>Explore Villas</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-stone-300 font-medium">4.98 Rating (1,420+ Luxury Stays)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-stone-300 font-medium">100% Direct Estate Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-stone-300 font-medium">GTDC Tourism Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INFINITE GOLD MARQUEE BANNER */}
      <div className="py-4 bg-[#0B1118] border-y border-[#D4AF37]/25 overflow-hidden relative shadow-inner">
        <div className="animate-marquee whitespace-nowrap text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]/90 flex items-center gap-12">
          <span>⚜ PRIVATE CHEF DINING INCLUDED</span>
          <span>•</span>
          <span>24/7 DEDICATED ESTATE BUTLER</span>
          <span>•</span>
          <span>SECLUDED BEACHFRONT & RIVERFRONT HAVENS</span>
          <span>•</span>
          <span>TEMPERATURE-CONTROLLED INFINITY POOLS</span>
          <span>•</span>
          <span>AIRPORT DISPATCH INNOVA CHAUFFEUR</span>
          <span>•</span>
          <span>GTDC ACCREDITED PRIVATE LUXURY RESIDENCES</span>
          <span>•</span>
          <span>⚜ PRIVATE CHEF DINING INCLUDED</span>
          <span>•</span>
          <span>24/7 DEDICATED ESTATE BUTLER</span>
          <span>•</span>
          <span>SECLUDED BEACHFRONT & RIVERFRONT HAVENS</span>
          <span>•</span>
          <span>TEMPERATURE-CONTROLLED INFINITY POOLS</span>
          <span>•</span>
          <span>AIRPORT DISPATCH INNOVA CHAUFFEUR</span>
          <span>•</span>
          <span>GTDC ACCREDITED PRIVATE LUXURY RESIDENCES</span>
        </div>
      </div>

      {/* 4. RESIDENCES COLLECTION WITH IN-CARD PHOTO CAROUSELS */}
      <section id="villas" className="py-24 max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">
              <Waves className="w-3.5 h-3.5" />
              <span>Exclusive Portfolio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Curated Private Residences
            </h2>
            <p className="text-stone-400 text-sm md:text-base mt-2 font-light">
              Every villa features a dedicated resident master chef, housekeeping team, and private infinity pool.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Beachfront', 'Riverfront', 'Heritage', 'Private Pool'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-stone-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Villa Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredVillas.map((villa) => {
            const allImages = [
              villa.imageUrl,
              ...(villa.gallery && villa.gallery.length > 0
                ? villa.gallery
                : [
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
                  ]),
            ];
            const currentImgIndex = villaPhotoIndexes[villa.id] || 0;

            const nextImg = (e: React.MouseEvent) => {
              e.stopPropagation();
              setVillaPhotoIndexes((prev) => ({
                ...prev,
                [villa.id]: (currentImgIndex + 1) % allImages.length,
              }));
            };

            const prevImg = (e: React.MouseEvent) => {
              e.stopPropagation();
              setVillaPhotoIndexes((prev) => ({
                ...prev,
                [villa.id]: (currentImgIndex - 1 + allImages.length) % allImages.length,
              }));
            };

            return (
              <div
                key={villa.id}
                className="bg-stone-900/70 rounded-3xl border border-stone-800 hover:border-[#D4AF37]/60 transition-all duration-500 group shadow-2xl hover:shadow-[0_20px_50px_rgba(212,175,55,0.12)] flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Interactive In-Card Photo Carousel */}
                  <div className="relative h-72 sm:h-84 overflow-hidden bg-stone-950">
                    <img
                      src={allImages[currentImgIndex]}
                      alt={villa.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-black/20 to-black/30" />

                    {/* Left/Right Photo Carousel Arrows */}
                    <button
                      onClick={prevImg}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/90 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      aria-label="Previous Photo"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextImg}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/90 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      aria-label="Next Photo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-black/75 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {villa.region}
                      </span>
                      {villa.featured && (
                        <span className="px-3 py-1 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1 shadow-md">
                          <Sparkles className="w-3 h-3" />
                          <span>Signature Estate</span>
                        </span>
                      )}
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/75 backdrop-blur-md rounded-full border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                      <span>{villa.rating}</span>
                      <span className="text-stone-400 text-[10px]">({villa.reviewCount})</span>
                    </div>

                    {/* Bottom Image Bar */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div className="text-white">
                        <div className="text-xs font-medium text-stone-200 flex items-center gap-1.5 drop-shadow-md">
                          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{villa.location}</span>
                        </div>
                      </div>

                      <div className="px-3.5 py-1.5 bg-black/85 backdrop-blur-md rounded-xl border border-[#D4AF37]/40 text-right shadow-lg">
                        <span className="text-[10px] text-stone-400 block font-light">From</span>
                        <span className="font-mono text-base font-bold text-[#D4AF37]">
                          ₹{villa.pricePerNight.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-stone-400"> / night</span>
                      </div>
                    </div>

                    {/* Photo Dots Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                      {allImages.map((_, dotIdx) => (
                        <span
                          key={dotIdx}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            currentImgIndex === dotIdx ? 'bg-[#D4AF37] w-4' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Villa Details */}
                  <div className="p-6 sm:p-8 space-y-5">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                        {villa.title}
                      </h3>
                      <p className="text-stone-400 text-xs sm:text-sm mt-1.5 font-light leading-relaxed">
                        {villa.description}
                      </p>
                    </div>

                    {/* Specifications */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 py-3 border-y border-stone-800">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#D4AF37]" />
                        <span>Up to {villa.maxGuests} Guests</span>
                      </div>
                      <span>•</span>
                      <div>
                        <span>{villa.bedrooms} Master Bedrooms</span>
                      </div>
                      <span>•</span>
                      <div>
                        <span>{villa.bathrooms} Luxury Baths</span>
                      </div>
                    </div>

                    {/* Amenities Highlights */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                        Signature Inclusions:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {villa.signatureHighlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-stone-800/90 border border-stone-700/60 rounded-lg text-[11px] text-stone-200 flex items-center gap-1.5"
                          >
                            <Check className="w-3 h-3 text-[#D4AF37]" />
                            <span>{highlight}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 sm:p-8 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => setActiveVillaForBooking(villa)}
                    className="flex-1 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#e5c148] to-[#B89228] hover:from-[#f0cf5f] hover:to-[#D4AF37] text-black font-bold rounded-xl text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Instant Direct Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="tel:+917798967689"
                    className="px-4 py-3.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-stone-700"
                    title="Speak with Reservations Desk"
                  >
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <span className="hidden sm:inline">Inquire</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. INTERACTIVE BESPOKE SERVICES & PRIVATE DINING TABS */}
      <section id="chef" className="py-24 bg-[#0A1017] border-t border-[#D4AF37]/20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Hospitality</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Every Stay Curated to Perfection
            </h2>
            <p className="text-stone-400 text-sm sm:text-base font-light">
              Experience the pinnacle of Goan hospitality with on-demand gourmet dining, around-the-clock estate butlers, and sanitized private infinity pools.
            </p>
          </div>

          {/* Interactive Experience Switcher Tabs */}
          <div className="flex justify-center gap-3">
            {CURATED_EXPERIENCES.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveExperienceTab(exp.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  activeExperienceTab === exp.id
                    ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-stone-700'
                }`}
              >
                {exp.id === 'chef' && <UtensilsCrossed className="w-4 h-4" />}
                {exp.id === 'butler' && <HeartHandshake className="w-4 h-4" />}
                {exp.id === 'pool' && <Waves className="w-4 h-4" />}
                <span>{exp.title}</span>
              </button>
            ))}
          </div>

          {/* Active Experience Showcase Card */}
          <div className="glass-gold-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 transition-all duration-500">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block">
                {activeExp.shortTag}
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                {activeExp.title}
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed font-light">
                {activeExp.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                {activeExp.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 text-xs text-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a
                  href="#villas"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#e5c148] transition-all shadow-lg"
                >
                  <span>Book Experience With Villa</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 sm:h-96 rounded-2xl overflow-hidden relative shadow-2xl">
              <img
                src={activeExp.image}
                alt={activeExp.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. GUEST TESTIMONIALS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            Guest Impressions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Unforgettable Memories in Goa
          </h2>
          <p className="text-stone-400 text-sm font-light">
            Read verified reviews from discerning travelers, corporate leaders, and families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GUEST_TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-stone-900/60 p-8 rounded-3xl border border-stone-800/80 hover:border-[#D4AF37]/40 transition-all duration-300 space-y-4 relative flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, rIdx) => (
                    <Star key={rIdx} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-stone-300 text-xs sm:text-sm font-light italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80">
                <div className="font-serif font-bold text-sm text-white">{t.name}</div>
                <div className="text-[11px] text-stone-400">{t.location} • {t.stay}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FLOATING WHATSAPP / RESERVATION CONCIERGE BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://api.whatsapp.com/send?phone=917798967689&text=Hello%20Villas%20Goa,%20I%20would%20like%20to%20inquire%20about%20villa%20availability"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-5 py-3 rounded-full bg-stone-900 border border-[#D4AF37] text-white shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:scale-105 hover:bg-stone-800 transition-all group"
          title="Direct WhatsApp Concierge"
        >
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute" />
            <div className="w-3 h-3 rounded-full bg-emerald-400 relative" />
          </div>
          <div className="text-left">
            <span className="text-[10px] text-[#D4AF37] uppercase font-bold block leading-none">
              Direct Concierge
            </span>
            <span className="text-xs font-semibold text-stone-100">WhatsApp Inquire</span>
          </div>
          <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
        </a>
      </div>

      {/* 8. LUXURY FOOTER (NO ADMIN LINKS) */}
      <footer className="bg-[#04070A] text-stone-400 text-xs py-16 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div className="space-y-3">
            <div className="font-serif text-xl font-bold text-white tracking-widest">
              VILLAS GOA
            </div>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              Ultra-luxury private estate rentals, heritage Portuguese palacios, and waterfront sanctuaries across North & South Goa.
            </p>
            <div className="text-[10px] text-[#D4AF37] font-medium">
              Accredited by Goa Tourism Development Corporation (GTDC)
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-3 text-[#D4AF37]">
              Coastal Enclaves
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>Candolim Beachfront Haven</li>
              <li>Coco Beach River Estate (Nerul)</li>
              <li>Casa Portuguesa (Assagao Valley)</li>
              <li>Morjim Turtle Coast Pavilion</li>
              <li>Vagator Cliffside Mansions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-3 text-[#D4AF37]">
              Direct Reservations Hotline
            </h4>
            <p className="text-[11px] text-stone-300 font-semibold">
              Hotline: +91 77989 67689
            </p>
            <p className="text-[11px] text-stone-400 mt-1">
              Email: reservations@villasgoa.com
            </p>
            <p className="text-[10px] text-stone-500 mt-3">
              Office: Candolim Beach Road, North Goa, 403515
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-stone-900 text-[11px] flex flex-col sm:flex-row justify-between text-stone-600">
          <div>© {new Date().getFullYear()} Villas Goa Luxury Private Residences. All rights reserved.</div>
          <div className="flex gap-4 mt-2 sm:mt-0 text-stone-500">
            <span>Privacy Policy</span>
            <span>Terms of Luxury Booking</span>
            <span>Coastal Zone Regulations</span>
          </div>
        </div>
      </footer>

      {/* Direct Booking Modal */}
      {activeVillaForBooking && (
        <GuestBookingModal
          villa={activeVillaForBooking}
          onClose={() => setActiveVillaForBooking(null)}
          onBookingConfirmed={(data) => {
            if (onNewBookingCreated) {
              onNewBookingCreated(data);
            }
            setActiveVillaForBooking(null);
          }}
        />
      )}
    </div>
  );
};
