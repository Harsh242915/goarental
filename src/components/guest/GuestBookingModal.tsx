import React, { useState } from 'react';
import { X, Check, ShieldCheck, Calendar, Users, Sparkles, CreditCard, Heart, ArrowRight } from 'lucide-react';
import { VillaProduct } from '../../types';

interface GuestBookingModalProps {
  villa: VillaProduct;
  onClose: () => void;
  onBookingConfirmed: (bookingData: {
    villa: VillaProduct;
    guestName: string;
    phone: string;
    email: string;
    checkIn: string;
    nights: number;
    totalAmount: number;
    addOns: string[];
  }) => void;
}

export const GuestBookingModal: React.FC<GuestBookingModalProps> = ({
  villa,
  onClose,
  onBookingConfirmed,
}) => {
  const [checkInDate, setCheckInDate] = useState('2024-11-20');
  const [nights, setNights] = useState(3);
  const [guestsCount, setGuestsCount] = useState(4);
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Bespoke Add-ons
  const [addOns, setAddOns] = useState<{ [key: string]: boolean }>({
    catamaran: false,
    seafoodFeast: true,
    airportChauffeur: true,
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const villaBaseTotal = villa.pricePerNight * nights;
  const catamaranPrice = addOns.catamaran ? 32000 : 0;
  const seafoodPrice = addOns.seafoodFeast ? 12500 : 0;
  const chauffeurPrice = addOns.airportChauffeur ? 6000 : 0;
  const addOnsTotal = catamaranPrice + seafoodPrice + chauffeurPrice;
  const subtotal = villaBaseTotal + addOnsTotal;
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !phone) return;

    const ref = `VG-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setBookingSuccess(true);

    const selectedAddOnNames: string[] = [];
    if (addOns.catamaran) selectedAddOnNames.push('Sunset Catamaran Cruise');
    if (addOns.seafoodFeast) selectedAddOnNames.push('5-Course Seafood Feast');
    if (addOns.airportChauffeur) selectedAddOnNames.push('Mercedes Airport Chauffeur');

    onBookingConfirmed({
      villa,
      guestName,
      phone,
      email,
      checkIn: checkInDate,
      nights,
      totalAmount: grandTotal,
      addOns: selectedAddOnNames,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#F9F8F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-800 flex items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {bookingSuccess ? (
          /* Confirmation Screen */
          <div className="p-8 md:p-12 text-center bg-white space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1B6B76]">
                Reservation Confirmed
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
                Your Coastal Sanctuary Awaits
              </h2>
              <p className="text-sm text-stone-600 max-w-md mx-auto mt-2">
                Thank you, <span className="font-semibold text-stone-900">{guestName}</span>. Your stay at{' '}
                <span className="font-semibold text-stone-900">{villa.title}</span> has been confirmed.
              </p>
            </div>

            <div className="max-w-md mx-auto p-5 bg-[#F9F8F5] border border-stone-200 rounded-xl text-left text-xs space-y-2.5">
              <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                <span className="text-stone-500 uppercase font-semibold text-[10px]">Booking Reference</span>
                <span className="font-mono font-bold text-base text-[#1B6B76]">{bookingRef}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Residence:</span>
                <span className="font-semibold text-stone-900">{villa.title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Check-In:</span>
                <span className="font-medium text-stone-900">{checkInDate} ({nights} Nights)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Total Settled:</span>
                <span className="font-mono font-bold text-stone-900 text-sm">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl max-w-md mx-auto text-xs text-teal-900 text-left">
              <p className="font-semibold">What happens next?</p>
              <p className="text-teal-800 text-[11px] mt-1">
                Your assigned estate duty manager has received this booking in the Villas Goa Operations Hub. A personalized WhatsApp concierge will reach out within 15 minutes to confirm flight numbers and dietary preferences.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#1B6B76] hover:bg-[#14535c] text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Return to Residences
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form & Villa Details */
          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
            {/* Left 7 cols: Villa Visuals & Specs */}
            <div className="md:col-span-7 p-6 space-y-5 border-b md:border-b-0 md:border-r border-stone-200">
              {/* Photo Showcase */}
              <div className="space-y-2">
                <div className="relative h-64 md:h-72 rounded-xl overflow-hidden bg-stone-200">
                  <img
                    src={villa.gallery[activePhotoIdx] || villa.imageUrl}
                    alt={villa.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider rounded-md">
                    {villa.location}
                  </div>
                </div>

                {/* Thumbnails */}
                {villa.gallery.length > 1 && (
                  <div className="flex gap-2">
                    {villa.gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePhotoIdx(i)}
                        className={`h-14 w-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                          activePhotoIdx === i ? 'border-[#1B6B76] scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Villa Info */}
              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-widest text-[#1B6B76] font-semibold">
                  {villa.region} • Private Sanctuary
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                  {villa.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">{villa.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="text-[11px] uppercase font-bold tracking-wider text-stone-500 mb-2">
                  Complimentary Signature Perks
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-stone-700">
                  {villa.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B6B76]"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Rate & Reservation Form */}
            <div className="md:col-span-5 p-6 bg-white flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-baseline justify-between border-b border-stone-200 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Nightly Tariff</span>
                    <span className="font-serif text-2xl font-bold text-stone-900">
                      ₹{villa.pricePerNight.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-500"> / night</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-800">★ {villa.rating}</span>
                    <span className="text-[10px] text-stone-400 block">{villa.reviewCount} verified reviews</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5 mt-4 text-xs">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Check-In Date
                      </label>
                      <input
                        type="date"
                        required
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-stone-300 rounded text-xs focus:outline-hidden focus:border-[#1B6B76]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Nights
                      </label>
                      <select
                        value={nights}
                        onChange={(e) => setNights(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 border border-stone-300 rounded text-xs focus:outline-hidden focus:border-[#1B6B76]"
                      >
                        <option value={2}>2 Nights</option>
                        <option value={3}>3 Nights</option>
                        <option value={4}>4 Nights</option>
                        <option value={5}>5 Nights</option>
                        <option value={7}>7 Nights (Weekly)</option>
                      </select>
                    </div>
                  </div>

                  {/* Guest Contact Details */}
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Guest Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikramaditya Singhania"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full px-3 py-1.5 border border-stone-300 rounded text-xs focus:outline-hidden focus:border-[#1B6B76]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                          Phone (+91) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98201 54312"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3 py-1.5 border border-stone-300 rounded text-xs font-mono focus:outline-hidden focus:border-[#1B6B76]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="guest@voyage.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-1.5 border border-stone-300 rounded text-xs focus:outline-hidden focus:border-[#1B6B76]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bespoke Add-ons */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                      Enhance Your Stay (Optional)
                    </span>
                    
                    <label className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-200 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={addOns.seafoodFeast}
                          onChange={(e) => setAddOns({ ...addOns, seafoodFeast: e.target.checked })}
                          className="accent-[#1B6B76]"
                        />
                        <span className="text-[11px] text-stone-700">5-Course Goan Seafood Dinner</span>
                      </div>
                      <span className="font-mono text-[11px] text-stone-900">+₹12,500</span>
                    </label>

                    <label className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-200 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={addOns.airportChauffeur}
                          onChange={(e) => setAddOns({ ...addOns, airportChauffeur: e.target.checked })}
                          className="accent-[#1B6B76]"
                        />
                        <span className="text-[11px] text-stone-700">Luxury Airport Chauffeur</span>
                      </div>
                      <span className="font-mono text-[11px] text-stone-900">+₹6,000</span>
                    </label>

                    <label className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-200 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={addOns.catamaran}
                          onChange={(e) => setAddOns({ ...addOns, catamaran: e.target.checked })}
                          className="accent-[#1B6B76]"
                        />
                        <span className="text-[11px] text-stone-700">Private Sunset Catamaran Cruise</span>
                      </div>
                      <span className="font-mono text-[11px] text-stone-900">+₹32,000</span>
                    </label>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-2 border-t border-stone-200 space-y-1 text-[11px]">
                    <div className="flex justify-between text-stone-600">
                      <span>{nights} Nights × ₹{villa.pricePerNight.toLocaleString('en-IN')}</span>
                      <span className="font-mono">₹{villaBaseTotal.toLocaleString('en-IN')}</span>
                    </div>
                    {addOnsTotal > 0 && (
                      <div className="flex justify-between text-stone-600">
                        <span>Curated Add-Ons</span>
                        <span className="font-mono">₹{addOnsTotal.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-stone-500">
                      <span>GST & Luxury Hospitality Tax (18%)</span>
                      <span className="font-mono">₹{gst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="pt-1.5 flex justify-between font-bold text-stone-900 text-sm">
                      <span>Grand Total</span>
                      <span className="font-mono text-[#E27D42] text-base">
                        ₹{grandTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#E27D42] hover:bg-[#d06e35] text-white font-bold rounded-lg text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>Instant Reserve & Pay at Check-In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-center text-[10px] text-stone-400 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Free cancellation up to 72 hours before arrival • No card fee</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
