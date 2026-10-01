import React, { useState } from 'react';
import { Calendar, Search, Filter, CheckCircle2, Clock, User, Phone, MapPin } from 'lucide-react';
import { INITIAL_ROOMS } from '../../data/mockData';

export const BookingsCalendarView: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');

  const bookingsList = [
    {
      id: 'BK-101',
      guest: 'Rohan Sharma',
      villa: 'Candolim Master Suite 101',
      cluster: 'Candolim Beachfront Haven',
      checkIn: 'Nov 11, 2024',
      checkOut: 'Nov 14, 2024',
      pax: 4,
      amount: '₹78,400',
      status: 'In-House',
      phone: '+91 98112 04910',
      source: 'Direct Website',
    },
    {
      id: 'BK-102',
      guest: 'Priya & Vikram Patel',
      villa: 'Candolim Garden Suite 102',
      cluster: 'Candolim Beachfront Haven',
      checkIn: 'Nov 12, 2024',
      checkOut: 'Nov 16, 2024',
      pax: 2,
      amount: '₹74,500',
      status: 'In-House',
      phone: '+91 97230 44102',
      source: 'Direct Phone Concierge',
    },
    {
      id: 'BK-202',
      guest: 'Michael Chang',
      villa: 'Coco Beach Suite 202',
      cluster: 'Coco Beach Estate',
      checkIn: 'Nov 12, 2024',
      checkOut: 'Nov 15, 2024',
      pax: 3,
      amount: '₹64,000',
      status: 'Arriving Today',
      phone: '+91 98201 54312',
      source: 'Direct VIP Desk',
    },
    {
      id: 'BK-201',
      guest: 'Dr. Alistair & Family',
      villa: 'Coco River Suite 201',
      cluster: 'Coco Beach Estate',
      checkIn: 'Nov 14, 2024',
      checkOut: 'Nov 18, 2024',
      pax: 4,
      amount: '₹90,000',
      status: 'Confirmed Future',
      phone: '+44 7911 123456',
      source: 'Mr & Mrs Smith',
    },
    {
      id: 'BK-301',
      guest: 'Goa Wellness Retreat Group',
      villa: 'Portuguese Villa Casa 301',
      cluster: 'Anjuna Palm Grove & Assagao',
      checkIn: 'Nov 13, 2024',
      checkOut: 'Nov 18, 2024',
      pax: 8,
      amount: '₹1,40,000',
      status: 'Deposit Cleared',
      phone: '+91 98920 11990',
      source: 'Corporate Retreat',
    },
    {
      id: 'BK-104',
      guest: 'Kapoor Wedding Family',
      villa: 'Candolim Beachfront Haven (Entire Estate)',
      cluster: 'Candolim Beachfront Haven',
      checkIn: 'Nov 15, 2024',
      checkOut: 'Nov 19, 2024',
      pax: 16,
      amount: '₹3,84,000',
      status: 'Confirmed Buyout',
      phone: '+91 98200 44332',
      source: 'Luxury Escapes Agency',
    },
  ];

  const filtered = bookingsList.filter((b) => {
    const q = filterQuery.toLowerCase();
    return (
      b.guest.toLowerCase().includes(q) ||
      b.villa.toLowerCase().includes(q) ||
      b.cluster.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Bookings
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            View and manage all guest reservations.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search booking ID, guest, villa..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs focus:outline-hidden focus:border-[#1B6B76]"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F8F9] text-stone-600 font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Guest</th>
                <th className="py-3 px-4">Villa</th>
                <th className="py-3 px-4">Dates</th>
                <th className="py-3 px-4">Guests</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-teal-800">{item.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-stone-900">{item.guest}</div>
                    <div className="text-[11px] text-stone-500 font-mono">{item.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-stone-800">{item.villa}</div>
                    <div className="text-[11px] text-stone-400">{item.cluster}</div>
                  </td>
                  <td className="py-3 px-4 text-stone-600 font-medium">
                    {item.checkIn} – {item.checkOut}
                  </td>
                  <td className="py-3 px-4 text-stone-700">{item.pax} Guests</td>
                  <td className="py-3 px-4 font-mono font-bold text-stone-900">{item.amount}</td>
                  <td className="py-3 px-4 text-stone-500">{item.source}</td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                        item.status === 'In-House'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'Arriving Today'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-teal-50 text-teal-800 border border-teal-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
