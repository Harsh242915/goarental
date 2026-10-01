/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LuxuryWebsite } from './components/luxury/LuxuryWebsite';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { VillaProduct } from './types';

export default function App() {
  // Determine initial mode based on URL hash, path, or query
  const getInitialMode = (): 'luxury' | 'admin' => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        hash.includes('admin') ||
        path.startsWith('/admin') ||
        search.includes('view=admin') ||
        search.includes('mode=admin')
      ) {
        return 'admin';
      }
    }
    return 'luxury';
  };

  const [currentMode, setCurrentMode] = useState<'luxury' | 'admin'>(getInitialMode);
  const [notificationCount, setNotificationCount] = useState<number>(3);
  const [lastBookingAlert, setLastBookingAlert] = useState<string | null>(null);

  // Sync mode with URL
  useEffect(() => {
    const handlePopState = () => {
      setCurrentMode(getInitialMode());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    // Keyboard shortcut for staff/admin to access admin dashboard (Ctrl+Alt+A or Cmd+Alt+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        switchToAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const switchToAdmin = () => {
    setCurrentMode('admin');
    window.history.pushState(null, '', '#admin');
  };

  const switchToLuxury = () => {
    setCurrentMode('luxury');
    window.history.pushState(null, '', window.location.pathname === '/admin' ? '/' : '#');
  };

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
      `New direct booking: ${bookingData.guestName} booked ${bookingData.villa.title} (₹${bookingData.totalAmount.toLocaleString('en-IN')})`
    );
    setTimeout(() => setLastBookingAlert(null), 8000);
  };

  return (
    <>
      {currentMode === 'admin' ? (
        /* SIMPLE & PROFESSIONAL ADMIN DASHBOARD */
        <AdminDashboard
          onPreviewWebsite={switchToLuxury}
          notificationCount={notificationCount}
        />
      ) : (
        /* ULTRA-LUXURY CUSTOMER WEBSITE (NO ADMIN SWITCHERS/BUTTONS) */
        <LuxuryWebsite onNewBookingCreated={handleNewBookingCreated} />
      )}
    </>
  );
}
