import React from 'react';
import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  MessageSquareQuote,
  Compass,
  TrendingUp,
  PhoneCall,
  ShieldCheck,
} from 'lucide-react';

export type AdminTab =
  | 'overview'
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
      label: 'Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'inventory',
      label: 'Villa Inventory',
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      id: 'calendar',
      label: 'Bookings',
      icon: <CalendarCheck className="w-4 h-4" />,
      badge: 'Live',
    },
    {
      id: 'inquiries',
      label: 'Guest Inquiries',
      icon: <MessageSquareQuote className="w-4 h-4" />,
      badge: '3 New',
    },
    {
      id: 'revenue',
      label: 'Tariff & Revenue',
      icon: <TrendingUp className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-64 bg-[#FFFFFF] border-r border-[#EFECE6] flex flex-col justify-between shrink-0 min-h-[calc(100vh-65px)]">
      {/* Navigation Links */}
      <div className="p-3.5 space-y-1">
        <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-wider text-stone-400">
          Admin Menu
        </div>
        {menuItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#E7F3F4] text-[#1B6B76] font-bold shadow-xs'
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
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
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

      {/* Contact Card */}
      <div className="p-3.5 m-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
              Front Desk Hotline
            </div>
            <a
              href="tel:+917798967689"
              className="font-mono font-bold text-xs text-stone-800 hover:underline block mt-0.5"
            >
              +91 77989 67689
            </a>
            <div className="flex items-center gap-1.5 text-[10px] text-stone-500 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Duty Staff Active</span>
            </div>
          </div>
          <div className="p-2 bg-stone-200/60 rounded-full text-stone-600">
            <PhoneCall className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </aside>
  );
};
