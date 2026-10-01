import React, { useState } from 'react';
import { Search, Bell, ExternalLink, ShieldCheck, User, CheckCircle2, ChevronDown, LogOut } from 'lucide-react';

interface AdminHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  notificationCount: number;
  onPreviewWebsite: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  searchQuery,
  onSearchChange,
  notificationCount,
  onPreviewWebsite,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-stone-200 px-6 py-3 flex items-center justify-between gap-4 shadow-2xs">
      {/* Left: Admin Brand */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0F3A41] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <span>VG</span>
          </div>
          <div>
            <div className="font-bold text-stone-900 text-sm tracking-tight leading-none flex items-center gap-2">
              <span>VILLAS GOA</span>
              <span className="text-[10px] px-2 py-0.5 bg-stone-100 text-stone-600 rounded font-semibold border border-stone-200">
                Admin Panel
              </span>
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">
              Operations & Reservation Hub
            </div>
          </div>
        </div>
      </div>

      {/* Middle: Search Bar */}
      <div className="flex-1 max-w-lg hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search bookings, guest folios, rooms, phone numbers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9.5 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#1B6B76] focus:bg-white transition-all"
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
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Live occupancy status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs text-emerald-800 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>84% Occupancy • Live</span>
        </div>

        {/* Preview Public Website Button */}
        <button
          onClick={onPreviewWebsite}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 rounded-lg text-xs font-semibold transition-colors cursor-pointer border border-stone-200"
          title="Open guest website view"
        >
          <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
          <span className="hidden sm:inline">Preview Live Website</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors relative cursor-pointer"
            title="Operational Alerts"
          >
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-stone-200 p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 font-semibold text-stone-800">
                <span>Operations Alerts</span>
                <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-mono">
                  {notificationCount} Active
                </span>
              </div>
              <div className="space-y-2 mt-2 max-h-60 overflow-y-auto">
                <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900">
                  <div className="font-semibold flex items-center justify-between">
                    <span>Innova Transfer Dispatched</span>
                    <span className="text-[10px] text-amber-700">10m ago</span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Michael Chang (AI-842) driver Ramesh Naik has arrived at Mopa Airport.
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-stone-800">
                  <div className="font-semibold flex items-center justify-between">
                    <span>Room 301 Sanitization</span>
                    <span className="text-[10px] text-stone-500">25m ago</span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Housekeeping Team 2 reports 45 mins left for Portuguese Villa Casa.
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <div className="font-semibold flex items-center justify-between">
                    <span>Direct Payment Cleared</span>
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
                Close Drawer
              </button>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
          <div className="w-8 h-8 rounded-full bg-[#1B6B76] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            AR
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-stone-900 leading-tight">Arjun Rao</div>
            <div className="text-[10px] text-stone-500">General Manager</div>
          </div>
        </div>
      </div>
    </header>
  );
};
