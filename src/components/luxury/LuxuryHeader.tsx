import React, { useState } from 'react';
import { Phone, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';

interface LuxuryHeaderProps {
  onOpenBookingModal?: () => void;
}

export const LuxuryHeader: React.FC<LuxuryHeaderProps> = ({ onOpenBookingModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#070B10]/95 backdrop-blur-xl border-b border-[#D4AF37]/20 text-white transition-all shadow-2xl">
      {/* Animated Gold Shimmer Line */}
      <div className="h-[2px] w-full animate-gold-sheen" />

      {/* Top micro announcement bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 bg-[#04070A] text-[11px] text-stone-400 border-b border-stone-900">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            Live Availability:
          </span>
          <span>4 Luxury Suites & 2 Private Mansions open for immediate reservation this week</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-stone-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            Direct Booking Guaranteed Best Rates & Complimentary Chef Welcome Dinner
          </span>
          <span className="text-stone-600">|</span>
          <span className="text-stone-400">GTDC Accredited Luxury Collection</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with Glow Aura */}
        <a href="#hero" className="flex items-center gap-3.5 group cursor-pointer">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37]/30 via-[#E27D42]/20 to-transparent border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] font-serif font-bold text-2xl group-hover:scale-105 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300">
              <span className="group-hover:rotate-12 transition-transform duration-300">⚜</span>
            </div>
            <div className="absolute -inset-1 rounded-full bg-[#D4AF37]/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <div className="font-serif font-bold tracking-[0.2em] text-lg md:text-xl text-stone-100 group-hover:text-[#D4AF37] transition-colors leading-none">
              VILLAS GOA
            </div>
            <div className="text-[9px] font-bold tracking-[0.3em] text-[#D4AF37]/90 uppercase mt-1">
              Private Residences & Palacios
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-stone-300">
          <a
            href="#villas"
            className="hover:text-[#D4AF37] transition-colors py-2 relative group"
          >
            <span>The Residences</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#chef"
            className="hover:text-[#D4AF37] transition-colors py-2 relative group"
          >
            <span>Private Chef & Dining</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#experiences"
            className="hover:text-[#D4AF37] transition-colors py-2 relative group"
          >
            <span>Bespoke Experiences</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
          </a>
        </nav>

        {/* Right Action Hotline & CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:+917798967689"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 border border-stone-800 text-stone-300 hover:text-white hover:border-[#D4AF37]/50 text-xs font-medium transition-all hover:bg-stone-800/80 group"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-mono tracking-tight font-semibold">+91 77989 67689</span>
          </a>

          <a
            href="#villas"
            className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#e5c148] to-[#B89228] text-black text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Reserve A Stay</span>
            </span>
            <div className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="#villas"
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B89228] text-black text-xs font-bold uppercase tracking-wider shadow-md"
          >
            Reserve
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-300 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A1017] border-b border-[#D4AF37]/30 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-3 text-sm font-medium tracking-wide">
            <a
              href="#villas"
              onClick={() => setMobileMenuOpen(false)}
              className="text-stone-300 hover:text-[#D4AF37] py-2 border-b border-stone-800 flex items-center justify-between"
            >
              <span>The Residences & Villas</span>
              <span className="text-xs text-[#D4AF37]">5 Estates</span>
            </a>
            <a
              href="#chef"
              onClick={() => setMobileMenuOpen(false)}
              className="text-stone-300 hover:text-[#D4AF37] py-2 border-b border-stone-800 flex items-center justify-between"
            >
              <span>Private Chef & Dining</span>
              <span className="text-xs text-stone-500">Gourmet Menus</span>
            </a>
            <a
              href="#experiences"
              onClick={() => setMobileMenuOpen(false)}
              className="text-stone-300 hover:text-[#D4AF37] py-2 flex items-center justify-between"
            >
              <span>Bespoke Experiences</span>
              <span className="text-xs text-stone-500">24/7 Butler</span>
            </a>
          </nav>
          <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
            <a
              href="tel:+917798967689"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-900 border border-[#D4AF37]/30 text-stone-100 text-xs font-semibold shadow-lg"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Call Reservations: +91 77989 67689</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
