import React from 'react';
import {
  LayoutDashboard,
  Globe,
  BedDouble,
  UserPlus,
  Building2,
  CalendarCheck,
  MessageSquareQuote,
  TrendingUp,
  PhoneCall,
} from 'lucide-react';

export type AdminTab =
  | 'overview'
  | 'online_bookings'
  | 'occupied_rooms'
  | 'walkin'
  | 'inventory'
  | 'calendar'
  | 'inquiries'
  | 'revenue';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentTab, onTabChange }) => {
  const menuItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'overview',
      label: 'Executive Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'online_bookings',
      label: 'Online Bookings',
      icon: <Globe className="w-4 h-4" />,
      badge: 'Search / Check-in',
    },
    {
      id: 'occupied_rooms',
      label: 'Occupied Rooms',
      icon: <BedDouble className="w-4 h-4" />,
      badge: 'In-House',
    },
    {
      id: 'walkin',
      label: 'Walk-In & Offline Sales',
      icon: <UserPlus className="w-4 h-4" />,
      badge: 'Quick Desk',
    },
    {
      id: 'inventory',
      label: 'Villa Inventory',
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      id: 'calendar',
      label: 'Bookings & Calendar',
      icon: <CalendarCheck className="w-4 h-4" />,
      badge: 'Live',
    },
    {
      id: 'inquiries',
      label: 'Guest Inquiries',
      icon: <MessageSquareQuote className="w-4 h-4" />,
      badge: '3',
    },
    {
      id: 'revenue',
      label: 'Revenue & Rates',
      icon: <TrendingUp className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-stone-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-61px)]">
      {/* Navigation Links */}
      <div className="p-3 space-y-1">
        <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-wider text-stone-400">
          Admin Menu
        </div>
        {menuItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                isActive
                  ? 'bg-teal-50 text-[#1B6B76] font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? 'text-[#1B6B76]' : 'text-stone-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    isActive
                      ? 'bg-[#1B6B76] text-white'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Hotline / Support Info */}
      <div className="p-3 m-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-xs">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
              Staff Desk
            </div>
            <div className="font-bold text-xs text-stone-800 mt-0.5">
              +91 77989 67689
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-medium mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Online</span>
            </div>
          </div>
          <div className="p-2 bg-stone-200/70 rounded-full text-stone-600">
            <PhoneCall className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </aside>
  );
};
