import React, { useState } from 'react';
import { Phone, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';

interface LuxuryHeaderProps {
  onOpenBookingModal?: () => void;
}

export const LuxuryHeader: React.FC<LuxuryHeaderProps> = ({ onOpenBookingModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-amber-200/60 text-slate-800 transition-all shadow-[0_4px_20px_rgba(180,83,9,0.06)]">
      {/* Animated Gold Shimmer Line */}
      <div className="h-[2.5px] w-full animate-gold-sheen" />

      {/* Top micro announcement bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-2 bg-gradient-to-r from-amber-50/80 via-orange-50/60 to-emerald-50/70 text-[11px] text-slate-600 border-b border-amber-100/80">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-amber-800 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            Live Availability:
          </span>
          <span className="font-medium text-slate-700">4 Luxury Suites & 2 Private Mansions open for immediate reservation this week</span>
        </div>

        <div className="flex items-center gap-6 font-medium">
          <span className="flex items-center gap-1.5 text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            Direct Booking Guaranteed Best Rates & Complimentary Chef Welcome Dinner
          </span>
          <span className="text-amber-200">|</span>
          <span className="text-slate-500">GTDC Accredited Luxury Collection</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo with Glow Aura */}
        <a href="#hero" className="flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer">
          <div className="relative">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-400/25 via-amber-500/15 to-transparent border border-amber-500/40 flex items-center justify-center text-amber-600 font-serif font-bold text-xl sm:text-2xl group-hover:scale-105 group-hover:border-amber-500 group-hover:shadow-[0_0_20px_rgba(217,119,6,0.25)] transition-all duration-300">
              <span className="group-hover:rotate-12 transition-transform duration-300">⚜</span>
            </div>
            <div className="absolute -inset-1 rounded-full bg-amber-400/15 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <div className="font-serif font-bold tracking-[0.15em] sm:tracking-[0.2em] text-base sm:text-xl text-slate-900 group-hover:text-amber-600 transition-colors leading-none">
              VILLAS GOA
            </div>
            <div className="text-[8px] sm:text-[9px] font-bold tracking-[0.22em] sm:tracking-[0.3em] text-amber-700 uppercase mt-0.5 sm:mt-1">
              Private Residences & Palacios
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-bold text-slate-700">
          <a
            href="#villas"
            className="hover:text-amber-600 transition-colors py-2 relative group"
          >
            <span>The Residences</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#chef"
            className="hover:text-amber-600 transition-colors py-2 relative group"
          >
            <span>Private Chef & Dining</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#experiences"
            className="hover:text-amber-600 transition-colors py-2 relative group"
          >
            <span>Bespoke Experiences</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300" />
          </a>
        </nav>

        {/* Right Action Hotline & CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:+917798967689"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50/60 border border-amber-200/80 text-slate-700 hover:text-slate-900 hover:border-amber-400 text-xs font-semibold transition-all hover:bg-amber-100/50 group shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-mono tracking-tight font-bold">+91 77989 67689</span>
          </a>

          <a
            href="#villas"
            className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(217,119,6,0.3)] hover:shadow-[0_6px_22px_rgba(217,119,6,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Reserve A Stay</span>
            </span>
            <div className="absolute inset-0 bg-white/35 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </a>
        </div>

        {/* Mobile Menu Button & Reserve Action */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="#villas"
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[11px] font-bold uppercase tracking-wider shadow-md"
          >
            Reserve
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-700 hover:text-amber-600 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-600" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-amber-200/80 px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-3 text-sm font-semibold tracking-wide">
            <a
              href="#villas"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 hover:text-amber-600 py-2.5 border-b border-stone-100 flex items-center justify-between"
            >
              <span>The Residences & Villas</span>
              <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full">5 Estates</span>
            </a>
            <a
              href="#chef"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 hover:text-amber-600 py-2.5 border-b border-stone-100 flex items-center justify-between"
            >
              <span>Private Chef & Dining</span>
              <span className="text-xs text-slate-500">Gourmet Menus</span>
            </a>
            <a
              href="#experiences"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 hover:text-amber-600 py-2.5 flex items-center justify-between"
            >
              <span>Bespoke Experiences</span>
              <span className="text-xs text-slate-500">24/7 Butler</span>
            </a>
          </nav>
          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <a
              href="tel:+917798967689"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-50 border border-amber-200 text-slate-900 text-xs font-bold shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>Call Reservations: +91 77989 67689</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
