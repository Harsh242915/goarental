/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { AdminSidebar, AdminTab } from './components/admin/AdminSidebar';
import { ExecutiveOverview } from './components/admin/ExecutiveOverview';
import { VillaInventoryView } from './components/admin/VillaInventoryView';
import { BookingsCalendarView } from './components/admin/BookingsCalendarView';
import { GuestInquiriesView } from './components/admin/GuestInquiriesView';
import { TariffRevenueView } from './components/admin/TariffRevenueView';
import { GuestPortal } from './components/guest/GuestPortal';
import { VillaProduct } from './types';

export default function App() {
  const [currentMode, setCurrentMode] = useState<'admin' | 'guest'>('admin');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notificationCount, setNotificationCount] = useState<number>(3);
  const [lastBookingAlert, setLastBookingAlert] = useState<string | null>(null);

  const handleNewBookingCreated = (bookingData: {
    villa: VillaProduct;
    guestName: string;
    phone: string;
    email: string;
    checkIn: string;
    nights: number;
    totalAmount: number;
    addOns: string[];
  }) => {
    setNotificationCount((prev) => prev + 1);
    setLastBookingAlert(
      `New direct booking received: ${bookingData.guestName} booked ${bookingData.villa.title} (₹${bookingData.totalAmount.toLocaleString('en-IN')})`
    );
    setTimeout(() => setLastBookingAlert(null), 6000);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#141b2b] flex flex-col font-sans selection:bg-[#1B6B76]/20 selection:text-[#00525b]">
      {/* Top Notification Toast for Cross-Portal sync */}
      {lastBookingAlert && (
        <div className="bg-[#00525b] text-white px-4 py-2 text-xs flex items-center justify-between z-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{lastBookingAlert}</span>
          </div>
          <button
            onClick={() => {
              setCurrentMode('admin');
              setAdminTab('calendar');
              setLastBookingAlert(null);
            }}
            className="underline font-bold text-teal-200 hover:text-white cursor-pointer ml-4"
          >
            View in Admin Hub →
          </button>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        currentMode={currentMode}
        onModeChange={(mode) => setCurrentMode(mode)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        notificationCount={notificationCount}
      />

      {/* Body Viewport */}
      {currentMode === 'admin' ? (
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Admin Sidebar */}
          <AdminSidebar
            currentTab={adminTab}
            onTabChange={(tab) => {
              setAdminTab(tab);
              // Clear search if changing tabs
              if (searchQuery) setSearchQuery('');
            }}
          />

          {/* Active Admin View */}
          <main className="flex-1 overflow-x-hidden pb-12">
            {adminTab === 'overview' && (
              <ExecutiveOverview searchQuery={searchQuery} />
            )}
            {adminTab === 'inventory' && <VillaInventoryView />}
            {adminTab === 'calendar' && <BookingsCalendarView />}
            {adminTab === 'inquiries' && <GuestInquiriesView />}
            {adminTab === 'revenue' && <TariffRevenueView />}
          </main>
        </div>
      ) : (
        /* Guest Booking Portal */
        <GuestPortal
          onSwitchToAdmin={() => setCurrentMode('admin')}
          onNewBookingCreated={handleNewBookingCreated}
        />
      )}
    </div>
  );
}
