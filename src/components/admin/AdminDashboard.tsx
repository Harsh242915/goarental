import React, { useState } from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { ExecutiveOverview } from './ExecutiveOverview';
import { WalkInSalesView } from './WalkInSalesView';
import { VillaInventoryView } from './VillaInventoryView';
import { BookingsCalendarView } from './BookingsCalendarView';
import { GuestInquiriesView } from './GuestInquiriesView';
import { TariffRevenueView } from './TariffRevenueView';

interface AdminDashboardProps {
  onPreviewWebsite: () => void;
  notificationCount: number;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onPreviewWebsite,
  notificationCount,
}) => {
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#141b2b] flex flex-col font-sans">
      {/* Simple Admin Header */}
      <AdminHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        notificationCount={notificationCount}
        onPreviewWebsite={onPreviewWebsite}
      />

      {/* Main Admin Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        <AdminSidebar
          currentTab={adminTab}
          onTabChange={(tab) => {
            setAdminTab(tab);
            if (searchQuery) setSearchQuery('');
          }}
        />

        <main className="flex-1 overflow-x-hidden pb-12">
          {adminTab === 'overview' && (
            <ExecutiveOverview searchQuery={searchQuery} focusedSection="all" />
          )}
          {adminTab === 'online_bookings' && (
            <ExecutiveOverview searchQuery={searchQuery} focusedSection="online_bookings" />
          )}
          {adminTab === 'occupied_rooms' && (
            <ExecutiveOverview searchQuery={searchQuery} focusedSection="occupied" />
          )}
          {adminTab === 'walkin' && <WalkInSalesView />}
          {adminTab === 'inventory' && <VillaInventoryView />}
          {adminTab === 'calendar' && <BookingsCalendarView />}
          {adminTab === 'inquiries' && <GuestInquiriesView />}
          {adminTab === 'revenue' && <TariffRevenueView />}
        </main>
      </div>
    </div>
  );
};
