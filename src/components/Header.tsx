import React, { useState } from 'react';
import { Search, Bell, Phone, Compass, Calendar, Sparkles, Check, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentMode: 'admin' | 'guest';
  onModeChange: (mode: 'admin' | 'guest') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenNotifications?: () => void;
  notificationCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onModeChange,
  searchQuery,
  onSearchChange,
  notificationCount,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#EFECE6] px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 transition-all">
      {/* Left: Brand & Mode Switcher */}
      <div className="flex items-center gap-6">
        <div 
          onClick={() => onModeChange('admin')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          {/* Logo mark */}
          <div className="w-8 h-8 rounded-full bg-[#1B6B76]/10 border border-[#1B6B76]/20 flex items-center justify-center text-[#1B6B76] font-serif font-bold text-lg group-hover:scale-105 transition-transform">
            <span>⚜</span>
          </div>
          <div>
            <div className="font-serif font-bold tracking-wider text-base md:text-lg text-[#0F3A41] leading-none">
              VILLAS GOA
            </div>
            <div className="text-[9px] font-semibold tracking-widest text-[#1B6B76] uppercase mt-0.5">
              {currentMode === 'admin' ? 'OPERATIONS HUB' : 'LUXURY RESIDENCES'}
            </div>
          </div>
        </div>

        {/* Mode Switcher Pill */}
        <div className="flex items-center bg-[#EFECE6]/80 p-1 rounded-full border border-stone-200 text-xs font-semibold">
          <button
            onClick={() => onModeChange('guest')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              currentMode === 'guest'
                ? 'bg-white text-[#0F3A41] shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Guest Portal
          </button>
          <button
            onClick={() => onModeChange('admin')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              currentMode === 'admin'
                ? 'bg-[#1B6B76] text-white shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Admin Hub
          </button>
        </div>
      </div>

      {/* Middle / Right for Admin Hub */}
      {currentMode === 'admin' ? (
        <div className="flex items-center gap-4 flex-1 justify-end max-w-3xl">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md hidden sm:block">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search villas, guest folios, checkout dates..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 bg-[#F9F8F5] border border-stone-200 rounded-md text-xs placeholder:text-stone-400 focus:outline-hidden focus:border-[#1B6B76] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* System Live Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-50/80 border border-emerald-200/60 rounded-full text-xs text-emerald-800 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>System Live</span>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Operational Alerts"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-stone-200 p-3 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200 font-semibold text-stone-800">
                  <span>Live Operations Feed</span>
                  <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-mono">
                    {notificationCount} Alerts
                  </span>
                </div>
                <div className="space-y-2 mt-2 max-h-60 overflow-y-auto">
                  <div className="p-2 rounded bg-amber-50/70 border border-amber-200 text-amber-900">
                    <div className="font-semibold flex items-center justify-between">
                      <span>Innova Transfer Dispatched</span>
                      <span className="text-[10px] text-amber-700">10m ago</span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      Michael Chang (AI-842) driver Ramesh Naik has arrived at Mopa Airport.
                    </p>
                  </div>
                  <div className="p-2 rounded bg-stone-50 border border-stone-200 text-stone-800">
                    <div className="font-semibold flex items-center justify-between">
                      <span>Room 301 Sanitization</span>
                      <span className="text-[10px] text-stone-500">25m ago</span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      Housekeeping Team 2 reports 45 mins left for Portuguese Villa Casa.
                    </p>
                  </div>
                  <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <div className="font-semibold flex items-center justify-between">
                      <span>UPI Pre-Payment Cleared</span>
                      <span className="text-[10px] text-emerald-700">1h ago</span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      ₹64,000 received for Coco Beach Suite 202 via HDFC Merchant gateway.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-full mt-2 py-1.5 text-center text-[11px] font-semibold text-[#1B6B76] hover:bg-stone-50 rounded"
                >
                  Mark All Reviewed
                </button>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
            <div className="w-8 h-8 rounded-full bg-[#1B6B76] text-white flex items-center justify-center font-semibold text-xs shadow-xs">
              AR
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-stone-900 leading-tight">Arjun Rao</div>
              <div className="text-[10px] text-stone-500">General Manager</div>
            </div>
          </div>
        </div>
      ) : (
        /* Guest Portal Header Nav */
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wide text-stone-700">
            <a href="#villas" className="hover:text-[#1B6B76] transition-colors">The Residences</a>
            <a href="#experiences" className="hover:text-[#1B6B76] transition-colors">Curated Experiences</a>
            <a href="#chef" className="hover:text-[#1B6B76] transition-colors">Private Chef & Butler</a>
            <a href="#concierge" className="hover:text-[#1B6B76] transition-colors">Concierge Service</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+917798967689"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-md transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#1B6B76]" />
              <span>+91 77989 67689</span>
            </a>

            <a
              href="#villas"
              className="px-4 py-2 bg-[#E27D42] hover:bg-[#d06e35] text-white text-xs font-semibold rounded-md shadow-xs transition-transform active:scale-95"
            >
              Reserve A Villa
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
