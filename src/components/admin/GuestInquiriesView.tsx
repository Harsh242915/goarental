import React, { useState } from 'react';
import { MessageSquareQuote, Check, Send, Phone, User, Calendar } from 'lucide-react';

export const GuestInquiriesView: React.FC = () => {
  const [inquiries, setInquiries] = useState([
    {
      id: 'INQ-1',
      guestName: 'Ananya Birla',
      email: 'a.birla@ventures.in',
      phone: '+91 98199 00112',
      villaInterest: 'Candolim Beachfront Haven (Entire 8 Suites)',
      dates: 'Dec 28 - Jan 03 (New Year Buyout)',
      pax: 16,
      message: 'Looking for complete private buyout for New Year celebrations. We require private DJ setup clearance and bespoke sundowner bar.',
      status: 'New Inquiry',
      budget: '₹22,00,000',
    },
    {
      id: 'INQ-2',
      guestName: 'Sir David Sterling',
      email: 'david@sterlingcapital.co.uk',
      phone: '+44 7700 900123',
      villaInterest: 'Casa Portuguesa Palacio (Assagao)',
      dates: 'Jan 10 - Jan 22 (12 Nights)',
      pax: 4,
      message: 'Interested in quiet heritage stay with private Goan chef. Can you arrange daily yoga instructor and private driver with Mercedes V-Class?',
      status: 'Quotation Sent',
      budget: '₹6,80,000',
    },
    {
      id: 'INQ-3',
      guestName: 'Tarun Tahiliani Studio',
      email: 'events@tahiliani.com',
      phone: '+91 99100 23456',
      villaInterest: 'Coco Beach Estate & River Gazebo',
      dates: 'Nov 24 - Nov 26',
      pax: 12,
      message: 'Intimate destination fashion shoot and dinner. Need riverside lawn access from 6:00 AM.',
      status: 'Under Review',
      budget: '₹3,50,000',
    },
  ]);

  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [sentStatus, setSentStatus] = useState<{ [key: string]: boolean }>({});

  const handleSendReply = (id: string) => {
    setSentStatus({ ...sentStatus, [id]: true });
    setTimeout(() => {
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: 'Replied & Quotation Sent' } : inq))
      );
    }, 1000);
  };

  return (
    <div className="flex-1 p-6 max-w-[1600px] mx-auto space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          Guest Inquiries
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Inquiries and booking requests from guests.
        </p>
      </div>

      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div
            key={inq.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-stone-900">{inq.guestName}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    {inq.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-500 mt-0.5">
                  <span className="font-mono">{inq.phone}</span>
                  <span>•</span>
                  <span>{inq.email}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">
                  Estimated Budget
                </span>
                <span className="font-mono font-bold text-[#1B6B76] text-sm">{inq.budget}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-stone-50 p-3 rounded-lg text-xs">
              <div>
                <span className="text-stone-400 font-semibold text-[10px] uppercase block">
                  Villa Requested
                </span>
                <span className="font-semibold text-stone-800">{inq.villaInterest}</span>
              </div>
              <div>
                <span className="text-stone-400 font-semibold text-[10px] uppercase block">
                  Proposed Dates
                </span>
                <span className="font-medium text-stone-800">{inq.dates}</span>
              </div>
              <div>
                <span className="text-stone-400 font-semibold text-[10px] uppercase block">
                  Guest Count
                </span>
                <span className="font-medium text-stone-800">{inq.pax} Guests</span>
              </div>
            </div>

            <div className="text-xs text-stone-700 bg-[#FDFBF7] p-3 rounded border border-stone-200">
              <span className="font-semibold text-stone-900">Guest Note: </span>
              {inq.message}
            </div>

            {/* Quick Reply Form */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Type a reply to guest..."
                value={replyText[inq.id] || ''}
                onChange={(e) => setReplyText({ ...replyText, [inq.id]: e.target.value })}
                className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-hidden focus:border-[#1B6B76] focus:bg-white"
              />
              <button
                onClick={() => handleSendReply(inq.id)}
                className="px-4 py-2 bg-[#1B6B76] hover:bg-[#14535c] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {sentStatus[inq.id] ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" /> Sent
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Send Reply
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
