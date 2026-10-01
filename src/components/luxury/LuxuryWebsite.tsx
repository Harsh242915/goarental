import React, { useState, useEffect, useRef } from 'react';
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
    tag: 'Celebrity Stay',
    quote: 'An absolute masterpiece of hospitality. The private chef prepared the best Goan curry we have ever tasted, and having the beach just steps from our lawn was pure magic.',
  },
  {
    name: 'Vikram & Radhika Singhania',
    location: 'Mumbai, India',
    stay: 'Vagator Cliffside Mansions',
    rating: 5,
    tag: 'Couples Sanctuary',
    quote: 'The cliff views at sunset are breathtaking. Our estate butler took care of every single requirement without us even asking. We have already booked our return stay.',
  },
  {
    name: 'Ananya Birla & Family',
    location: 'Delhi NCR',
    stay: 'Coco Beach Estate (Nerul)',
    rating: 5,
    tag: 'Family Milestone',
    quote: 'Secluded, serene, and ultra-luxurious. The private jetty, sprawling verandahs, and spotless rooms made this our best family vacation in Goa to date.',
  },
  {
    name: 'Marcus & Elena Vance',
    location: 'Zurich, Switzerland',
    stay: 'Assagao Heritage Palacio',
    rating: 5,
    tag: 'Heritage Connoisseur',
    quote: 'The antique Portuguese architecture combined with contemporary 5-star amenities is sublime. The private breakfast on the courtyard was unforgettable.',
  },
  {
    name: 'Rohan & Meera Kapoor',
    location: 'Bengaluru, India',
    stay: 'Morjim White Pearl Villa',
    rating: 5,
    tag: 'Annual Rejuvenation',
    quote: 'Direct beach access to the quietest stretch of Morjim, infinity pool heated to perfection, and our private concierge arranged a sunset catamaran in 20 minutes.',
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
  const [heroProgress, setHeroProgress] = useState(0);

  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Beachfront' | 'Riverfront' | 'Heritage' | 'Private Pool'>('All');
  const [locationSearch, setLocationSearch] = useState('All Goa');
  const [guestsCount, setGuestsCount] = useState(2);
  const [checkInDate, setCheckInDate] = useState('2024-11-20');
  const [activeVillaForBooking, setActiveVillaForBooking] = useState<VillaProduct | null>(null);

  // Moving Carousel State & Mobile Swipe Ref for "Every Stay Curated" section
  const [activeExpIdx, setActiveExpIdx] = useState(0);
  const [expProgress, setExpProgress] = useState(0);
  const experiencesMobileCarouselRef = useRef<HTMLDivElement>(null);

  // Residences Carousel Ref & State
  const residencesCarouselRef = useRef<HTMLDivElement>(null);
  const [residencesActiveIndex, setResidencesActiveIndex] = useState(0);

  // Comments / Testimonials Carousel Ref & State
  const commentsCarouselRef = useRef<HTMLDivElement>(null);
  const [commentsActiveIndex, setCommentsActiveIndex] = useState(0);

  // Photo carousel index per villa card
  const [villaPhotoIndexes, setVillaPhotoIndexes] = useState<Record<string, number>>({});

  // Smooth Hero Slide Timer with Progress Bar (6.5s interval) - NEVER stops on hover
  useEffect(() => {
    const interval = 80; // ms
    const totalDuration = 6500; // ms
    const step = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setHeroProgress((prev) => {
        if (prev >= 100) {
          setCurrentHeroSlide((curr) => (curr + 1) % HERO_SLIDES.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Smooth Moving Carousel Timer for "Every Stay Curated" section (5.5s interval) - NEVER stops on hover
  useEffect(() => {
    const interval = 80; // ms
    const totalDuration = 5500; // ms
    const step = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setExpProgress((prev) => {
        if (prev >= 100) {
          setActiveExpIdx((curr) => {
            const nextIdx = (curr + 1) % CURATED_EXPERIENCES.length;
            if (experiencesMobileCarouselRef.current) {
              const card = experiencesMobileCarouselRef.current.children[nextIdx] as HTMLElement;
              if (card) {
                card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
              }
            }
            return nextIdx;
          });
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleNextHeroSlide = () => {
    setHeroProgress(0);
    setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevHeroSlide = () => {
    setHeroProgress(0);
    setCurrentHeroSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleSelectHeroSlide = (idx: number) => {
    setHeroProgress(0);
    setCurrentHeroSlide(idx);
  };

  // Curated Experiences Carousel Handlers with Mobile Swipe Synchronization
  const handleSelectExp = (idx: number) => {
    setExpProgress(0);
    setActiveExpIdx(idx);
    if (experiencesMobileCarouselRef.current) {
      const card = experiencesMobileCarouselRef.current.children[idx] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  const handleNextExp = () => {
    setExpProgress(0);
    const nextIdx = (activeExpIdx + 1) % CURATED_EXPERIENCES.length;
    handleSelectExp(nextIdx);
  };

  const handlePrevExp = () => {
    setExpProgress(0);
    const prevIdx = (activeExpIdx - 1 + CURATED_EXPERIENCES.length) % CURATED_EXPERIENCES.length;
    handleSelectExp(prevIdx);
  };

  const handleExperiencesMobileScroll = () => {
    if (experiencesMobileCarouselRef.current) {
      const { scrollLeft, clientWidth } = experiencesMobileCarouselRef.current;
      const cardWidth = clientWidth * 0.85;
      const idx = Math.round(scrollLeft / cardWidth);
      setActiveExpIdx(Math.min(Math.max(idx, 0), CURATED_EXPERIENCES.length - 1));
    }
  };

  // Carousel scroll handlers for Curated Residences
  const scrollVillasLeft = () => {
    if (residencesCarouselRef.current) {
      residencesCarouselRef.current.scrollBy({ left: -390, behavior: 'smooth' });
    }
  };

  const scrollVillasRight = () => {
    if (residencesCarouselRef.current) {
      residencesCarouselRef.current.scrollBy({ left: 390, behavior: 'smooth' });
    }
  };

  const handleCarouselScroll = () => {
    if (residencesCarouselRef.current) {
      const { scrollLeft } = residencesCarouselRef.current;
      const cardWidth = 390;
      const idx = Math.round(scrollLeft / cardWidth);
      setResidencesActiveIndex(idx);
    }
  };

  // Carousel scroll handlers for Comments / Testimonials
  const scrollCommentsLeft = () => {
    if (commentsCarouselRef.current) {
      commentsCarouselRef.current.scrollBy({ left: -390, behavior: 'smooth' });
    }
  };

  const scrollCommentsRight = () => {
    if (commentsCarouselRef.current) {
      commentsCarouselRef.current.scrollBy({ left: 390, behavior: 'smooth' });
    }
  };

  const handleCommentsScroll = () => {
    if (commentsCarouselRef.current) {
      const { scrollLeft } = commentsCarouselRef.current;
      const cardWidth = 390;
      const idx = Math.round(scrollLeft / cardWidth);
      setCommentsActiveIndex(idx);
    }
  };

  const filteredVillas = VILLA_PRODUCTS.filter((villa) => {
    if (selectedFilter === 'Beachfront') return villa.location.toLowerCase().includes('candolim') || villa.location.toLowerCase().includes('morjim') || villa.location.toLowerCase().includes('vagator');
    if (selectedFilter === 'Riverfront') return villa.location.toLowerCase().includes('nerul') || villa.region === 'Riverfront';
    if (selectedFilter === 'Heritage') return villa.region === 'Heritage Assagao';
    if (selectedFilter === 'Private Pool') return villa.amenities.some((a) => a.toLowerCase().includes('pool'));
    return true;
  });

  const activeExp = CURATED_EXPERIENCES[activeExpIdx] || CURATED_EXPERIENCES[0];

  return (
    <div className="min-h-screen bg-[#070B10] text-[#E5E7EB] font-sans selection:bg-[#D4AF37]/30 selection:text-[#D4AF37] relative overflow-x-hidden">
      {/* 1. LUXURY HEADER */}
      <LuxuryHeader onOpenBookingModal={() => setActiveVillaForBooking(VILLA_PRODUCTS[0])} />

      {/* 2. HERO SECTION WITH SILKY SMOOTH TRANSITIONS */}
      <section
        id="hero"
        className="relative min-h-[70vh] sm:min-h-[86vh] flex items-center justify-center overflow-hidden py-3 sm:py-14"
      >
        {/* Background Images with Continuous Smooth Scale & Dissolve */}
        {HERO_SLIDES.map((slide, sIdx) => (
          <div
            key={sIdx}
            className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${
              currentHeroSlide === sIdx ? 'opacity-100 z-1 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
                currentHeroSlide === sIdx ? 'scale-105' : 'scale-100'
              }`}
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
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-2 sm:py-8 text-center space-y-3 sm:space-y-6">
          {/* Permanent Grand Luxury Headline (Zero Disruption) */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.18] sm:leading-[1.12] drop-shadow-2xl">
            Where Arabian Sea Horizons Meet{' '}
            <span className="italic font-normal bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] bg-clip-text text-transparent">
              Bespoke Luxury
            </span>
          </h1>

          {/* Synchronized Smooth Slide Information */}
          <div className="relative h-20 sm:h-24 max-w-3xl mx-auto">
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 flex flex-col items-center justify-center space-y-2 sm:space-y-3 transition-all duration-700 ease-out ${
                  currentHeroSlide === idx
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                    : 'opacity-0 translate-y-2 scale-98 pointer-events-none'
                }`}
              >
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-stone-900/85 backdrop-blur-md border border-[#D4AF37]/40 text-[10px] sm:text-xs font-semibold tracking-wider sm:tracking-widest uppercase text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="truncate max-w-[280px] sm:max-w-none">
                    <span className="hidden sm:inline">{slide.tag} • </span>{slide.subtitle.split('•')[0].trim()}
                  </span>
                </div>
                <p className="text-xs sm:text-base text-stone-300 font-light leading-relaxed drop-shadow-md max-w-2xl text-center line-clamp-2 sm:line-clamp-none px-2">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>

          {/* Slide Indicators with Progress Bar & Navigation */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 pt-0 sm:pt-1">
            <button
              onClick={handlePrevHeroSlide}
              className="p-1.5 sm:p-2 rounded-full bg-black/50 border border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = currentHeroSlide === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectHeroSlide(idx)}
                    className={`relative px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all duration-500 cursor-pointer overflow-hidden flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-stone-900 border border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.35)] scale-105'
                        : 'bg-black/50 border border-white/20 text-stone-400 hover:text-white hover:border-white/40'
                    }`}
                  >
                    {/* Animated Progress Bar fill for active slide */}
                    {isActive && (
                      <span
                        className="absolute inset-0 bg-[#D4AF37]/25 pointer-events-none"
                        style={{ width: `${heroProgress}%`, transition: 'width 80ms linear' }}
                      />
                    )}
                    <span className="font-mono text-[#D4AF37]">0{idx + 1}</span>
                    <span className="relative z-10 hidden sm:inline">{slide.subtitle.split('•')[0].trim()}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNextHeroSlide}
              className="p-1.5 sm:p-2 rounded-full bg-black/50 border border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Floating Glassmorphic Search Console */}
          <div className="max-w-4xl mx-auto mt-3 sm:mt-6 glass-gold-card rounded-xl sm:rounded-2xl p-3 sm:p-6 text-left text-stone-200 transition-all duration-300">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 items-center">
              {/* Location */}
              <div className="col-span-2 sm:col-span-1 p-2 border-b sm:border-b-0 sm:border-r border-stone-700/60">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                  Location / Coastline
                </span>
                <div className="flex items-center gap-2 mt-1 sm:mt-1.5">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] shrink-0" />
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
              <div className="col-span-1 p-2 border-r border-stone-700/60">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                  Check-In Date
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] shrink-0" />
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-transparent font-semibold text-xs text-white focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="col-span-1 p-2 sm:border-r border-stone-700/60">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                  Guests & Suites
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] shrink-0" />
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-transparent font-semibold text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value={2} className="bg-stone-900 text-white">2 Guests</option>
                    <option value={4} className="bg-stone-900 text-white">4 Guests</option>
                    <option value={8} className="bg-stone-900 text-white">8 Guests</option>
                    <option value={16} className="bg-stone-900 text-white">16+ Guests</option>
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <div className="col-span-2 lg:col-span-1 pt-1 sm:pt-0">
                <a
                  href="#villas"
                  className="w-full py-2.5 sm:py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#e5c148] to-[#B89228] hover:from-[#f0cf5f] hover:to-[#D4AF37] text-black font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
                  <span>Explore Villas</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-1 sm:pt-2 flex items-center justify-center gap-3 sm:gap-12 text-[11px] sm:text-xs text-stone-400">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-stone-300 font-medium">4.98 ★ (1,420+ Stays)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-stone-300 font-medium">100% Verified</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-stone-300 font-medium">GTDC Certified</span>
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

      {/* 4. CURATED PRIVATE RESIDENCES - HORIZONTAL LUXURY CAROUSEL (EQUAL UNIFORM CARDS) */}
      <section id="villas" className="scroll-mt-24 py-24 max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
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

          {/* Carousel Navigation Controls & Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            {/* Filter Pills with horizontal scroll on mobile */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full">
              {(['All', 'Beachfront', 'Riverfront', 'Heritage', 'Private Pool'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setSelectedFilter(filter);
                    if (residencesCarouselRef.current) {
                      residencesCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedFilter === filter
                      ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-stone-700'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Left / Right Carousel Arrow Buttons */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <button
                onClick={scrollVillasLeft}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-900 border border-stone-700 hover:border-[#D4AF37] text-stone-300 hover:text-[#D4AF37] flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                aria-label="Previous Residences"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={scrollVillasRight}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-900 border border-stone-700 hover:border-[#D4AF37] text-stone-300 hover:text-[#D4AF37] flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                aria-label="Next Residences"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Slider: 100% Uniform Height & Width Cards with Edge Padding */}
        <div
          ref={residencesCarouselRef}
          onScroll={handleCarouselScroll}
          className="flex gap-4 sm:gap-7 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory"
        >
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
                className="w-[85vw] max-w-[360px] sm:w-[380px] lg:w-[410px] shrink-0 h-[640px] snap-center sm:snap-start bg-stone-900/80 rounded-3xl border border-stone-800 hover:border-[#D4AF37]/60 transition-all duration-300 group shadow-2xl hover:shadow-[0_20px_50px_rgba(212,175,55,0.14)] flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Photo Section with Height Constraint */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-950">
                    <img
                      src={allImages[currentImgIndex]}
                      alt={villa.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-black/20 to-black/30" />

                    {/* Left/Right Photo Carousel Arrows */}
                    <button
                      onClick={prevImg}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/90 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      aria-label="Previous Photo"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={nextImg}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/90 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      aria-label="Next Photo"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.5 bg-black/75 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {villa.region}
                      </span>
                      {villa.featured && (
                        <span className="px-2.5 py-0.5 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1 shadow-md">
                          <Sparkles className="w-3 h-3" />
                          <span>Signature</span>
                        </span>
                      )}
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 bg-black/75 backdrop-blur-md rounded-full border border-white/10 text-white text-[11px] font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                      <span>{villa.rating}</span>
                    </div>

                    {/* Bottom Image Bar */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between">
                      <div className="text-white">
                        <div className="text-xs font-medium text-stone-200 flex items-center gap-1 drop-shadow-md">
                          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span className="truncate max-w-[170px]">{villa.location}</span>
                        </div>
                      </div>

                      <div className="px-3 py-1 bg-black/85 backdrop-blur-md rounded-xl border border-[#D4AF37]/40 text-right shadow-lg">
                        <span className="font-mono text-sm font-bold text-[#D4AF37]">
                          ₹{villa.pricePerNight.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-stone-400">/n</span>
                      </div>
                    </div>

                    {/* Photo Dots Indicator */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1">
                      {allImages.map((_, dotIdx) => (
                        <span
                          key={dotIdx}
                          className={`h-1 rounded-full transition-all ${
                            currentImgIndex === dotIdx ? 'bg-[#D4AF37] w-3' : 'bg-white/40 w-1'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Body Details (Exact Uniform Heights) */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors truncate">
                        {villa.title}
                      </h3>
                      <p className="text-stone-400 text-xs mt-1 font-light leading-relaxed line-clamp-2">
                        {villa.description}
                      </p>
                    </div>

                    {/* Specifications Bar */}
                    <div className="flex items-center justify-between text-[11px] text-stone-300 py-2.5 px-3 bg-stone-950/60 rounded-xl border border-stone-800">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{villa.maxGuests} Guests</span>
                      </div>
                      <span>•</span>
                      <span>{villa.bedrooms} BHK Suites</span>
                      <span>•</span>
                      <span>{villa.bathrooms} Luxury Baths</span>
                    </div>

                    {/* Amenities Highlights (Clamped to 2 for uniform layout) */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-1.5">
                        {villa.signatureHighlights.slice(0, 2).map((highlight, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-stone-800/90 border border-stone-700/60 rounded-md text-[10px] text-stone-200 flex items-center gap-1"
                          >
                            <Check className="w-2.5 h-2.5 text-[#D4AF37]" />
                            <span className="truncate">{highlight}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="p-5 sm:p-6 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => setActiveVillaForBooking(villa)}
                    className="flex-1 py-3 bg-gradient-to-r from-[#D4AF37] via-[#e5c148] to-[#B89228] hover:from-[#f0cf5f] hover:to-[#D4AF37] text-black font-bold rounded-xl text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Instant Direct Booking</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href="tel:+917798967689"
                    className="px-3.5 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors border border-stone-700"
                    title="Speak with Reservations Desk"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Dots Tracker */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {filteredVillas.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => {
                if (residencesCarouselRef.current) {
                  residencesCarouselRef.current.scrollTo({
                    left: dotIdx * 430,
                    behavior: 'smooth',
                  });
                }
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                residencesActiveIndex === dotIdx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-stone-700 hover:bg-stone-500'
              }`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 5. BESPOKE EXPERIENCES & PRIVATE DINING (TARGET FOR BOTH #experiences AND #chef) */}
      <section
        id="experiences"
        className="scroll-mt-24 py-16 sm:py-24 bg-[#0A1017] border-t border-[#D4AF37]/20 relative overflow-hidden"
      >
        {/* Anchor point for #chef navbar link */}
        <div id="chef" className="scroll-mt-24" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Hospitality</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white">
              Every Stay Curated to Perfection
            </h2>
            <p className="text-stone-400 text-xs sm:text-base font-light">
              Experience the pinnacle of Goan hospitality with on-demand gourmet dining, around-the-clock estate butlers, and sanitized private infinity pools.
            </p>
          </div>

          {/* MOBILE VIEW: Swipeable Carousel with Snap (like Curated Private Residences) */}
          <div className="block md:hidden space-y-4">
            {/* Mobile Carousel Switcher & Arrows */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-1.5">
                {CURATED_EXPERIENCES.map((exp, idx) => {
                  const isActive = activeExpIdx === idx;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => handleSelectExp(idx)}
                      className={`relative px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer overflow-hidden flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-stone-900 border border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.35)] scale-102'
                          : 'bg-stone-950 border border-stone-800 text-stone-400'
                      }`}
                    >
                      {isActive && (
                        <span
                          className="absolute inset-0 bg-[#D4AF37]/25 pointer-events-none"
                          style={{ width: `${expProgress}%`, transition: 'width 80ms linear' }}
                        />
                      )}
                      <span className="font-mono text-[#D4AF37]">0{idx + 1}</span>
                      <span className="relative z-10">{exp.title.split(' ')[1] || exp.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next mobile arrows */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handlePrevExp}
                  className="w-8 h-8 rounded-full bg-stone-900 border border-stone-700 text-stone-300 hover:text-[#D4AF37] flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                  aria-label="Previous Experience"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextExp}
                  className="w-8 h-8 rounded-full bg-stone-900 border border-stone-700 text-stone-300 hover:text-[#D4AF37] flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                  aria-label="Next Experience"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Native Swipeable Track with Center Snap */}
            <div
              ref={experiencesMobileCarouselRef}
              onScroll={handleExperiencesMobileScroll}
              className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-1 snap-x snap-mandatory"
            >
              {CURATED_EXPERIENCES.map((exp) => (
                <div
                  key={exp.id}
                  className="w-[85vw] max-w-[340px] shrink-0 snap-center glass-gold-card rounded-2xl overflow-hidden p-5 flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-3.5">
                    {/* Photo header */}
                    <div className="h-48 rounded-xl overflow-hidden relative shadow-md">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block">
                          {exp.shortTag}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-white leading-tight">
                          {exp.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-stone-300 text-xs leading-relaxed font-light">
                      {exp.description}
                    </p>

                    <div className="space-y-2 pt-1">
                      {exp.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-stone-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3">
                    <a
                      href="#villas"
                      className="w-full py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#e5c148] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span>Book Experience With Villa</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {CURATED_EXPERIENCES.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => handleSelectExp(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeExpIdx === dotIdx ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-stone-700'
                  }`}
                  aria-label={`Go to experience ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* DESKTOP VIEW: All 3 sections visible simultaneously in an elegant 3-column layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            {CURATED_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="glass-gold-card rounded-3xl overflow-hidden p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#D4AF37]/60 group hover:shadow-[0_20px_45px_rgba(212,175,55,0.18)]"
              >
                <div className="space-y-4">
                  {/* Photo at top */}
                  <div className="h-56 rounded-2xl overflow-hidden relative shadow-lg">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                      {exp.shortTag}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {exp.title}
                    </h3>
                    <p className="text-stone-300 text-xs mt-2 leading-relaxed font-light line-clamp-3">
                      {exp.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-stone-800">
                    {exp.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-stone-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <a
                    href="#villas"
                    className="w-full py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#e5c148] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                  >
                    <span>Reserve With Villa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GUEST COMMENTS & TESTIMONIALS - INFINITE CAROUSEL */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center space-y-2">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#D4AF37] block">
            Guest Impressions & Testimonials
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
            Unforgettable Memories in Goa
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm font-light max-w-xl mx-auto">
            Continuous impressions from verified discerning travelers, international guests, and families.
          </p>
        </div>

        {/* Infinite Carousel Container with Edge Vignette Masks */}
        <div className="relative w-full overflow-hidden">
          {/* Edge Fade Gradients */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-[#070B10] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-[#070B10] to-transparent z-10" />

          {/* Continuous Gliding Infinite Track */}
          <div className="animate-infinite-scroll flex gap-5 sm:gap-6 py-4 px-4 cursor-grab active:cursor-grabbing">
            {[...GUEST_TESTIMONIALS, ...GUEST_TESTIMONIALS, ...GUEST_TESTIMONIALS].map((t, idx) => (
              <div
                key={idx}
                className="w-[300px] sm:w-[380px] lg:w-[410px] shrink-0 bg-stone-900/80 rounded-3xl border border-stone-800 hover:border-[#D4AF37]/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl relative overflow-hidden group hover:shadow-[0_15px_40px_rgba(212,175,55,0.14)] select-none"
              >
                {/* Subtle Luxury Quotation Watermark */}
                <div className="absolute top-4 right-4 text-5xl font-serif text-[#D4AF37]/10 select-none pointer-events-none group-hover:text-[#D4AF37]/20 transition-colors">
                  ❝
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, rIdx) => (
                        <Star key={rIdx} className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[9px] uppercase tracking-wider font-bold text-[#D4AF37]">
                      {t.tag}
                    </span>
                  </div>

                  <p className="text-stone-300 text-xs sm:text-sm font-light italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800/80 mt-4 flex items-center justify-between">
                  <div>
                    <div className="font-serif font-bold text-sm text-white">{t.name}</div>
                    <div className="text-[11px] text-stone-400 mt-0.5">{t.location} • {t.stay}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-stone-800 border border-[#D4AF37]/40 flex items-center justify-center text-[10px] font-bold text-[#D4AF37]">
                    {t.name.split(' ')[0][0]}{t.name.split(' ')[1] ? t.name.split(' ')[1][0] : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FLOATING WHATSAPP / RESERVATION CONCIERGE BUTTON */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <a
          href="https://api.whatsapp.com/send?phone=917798967689&text=Hello%20Villas%20Goa,%20I%20would%20like%20to%20inquire%20about%20villa%20availability"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 sm:gap-3 p-3 sm:px-5 sm:py-3 rounded-full bg-stone-900 border border-[#D4AF37] text-white shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:scale-105 hover:bg-stone-800 transition-all group"
          title="Direct WhatsApp Concierge"
        >
          <div className="relative">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 animate-ping absolute" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 relative" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-[10px] text-[#D4AF37] uppercase font-bold block leading-none">
              Direct Concierge
            </span>
            <span className="text-xs font-semibold text-stone-100">WhatsApp Inquire</span>
          </div>
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
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
