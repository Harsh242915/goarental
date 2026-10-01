import React, { useState } from 'react';
import { Building2, Plus, Edit, Eye, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { VILLA_PRODUCTS } from '../../data/mockData';
import { VillaProduct } from '../../types';

export const VillaInventoryView: React.FC = () => {
  const [villas, setVillas] = useState<VillaProduct[]>(VILLA_PRODUCTS);
  const [selectedVilla, setSelectedVilla] = useState<VillaProduct | null>(null);
  const [editingTariffId, setEditingTariffId] = useState<string | null>(null);
  const [newTariffValue, setNewTariffValue] = useState<number>(0);
  const [notification, setNotification] = useState<string | null>(null);

  const handleUpdateTariff = (villaId: string) => {
    setVillas((prev) =>
      prev.map((v) => (v.id === villaId ? { ...v, pricePerNight: newTariffValue } : v))
    );
    setEditingTariffId(null);
    setNotification('Rate updated successfully.');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex-1 p-6 max-w-[1600px] mx-auto space-y-6">
      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Villa Inventory
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Manage villas, room rates, and availability.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setNotification('Inventory exported to CSV.');
              setTimeout(() => setNotification(null), 3000);
            }}
            className="px-3.5 py-2 border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Villa Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {villas.map((villa) => (
          <div
            key={villa.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-stone-100">
                <img
                  src={villa.imageUrl}
                  alt={villa.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider rounded">
                  {villa.location}
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-bold rounded">
                  ★ {villa.rating} ({villa.reviewCount})
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900">{villa.title}</h3>
                <p className="text-xs text-stone-500 line-clamp-2">{villa.subtitle}</p>

                <div className="flex items-center gap-2 text-[11px] text-stone-600 pt-2 border-t border-stone-100">
                  <span>{villa.bedrooms} Bedrooms</span>
                  <span>•</span>
                  <span>{villa.bathrooms} Baths</span>
                  <span>•</span>
                  <span>Up to {villa.maxGuests} Pax</span>
                </div>

                <div className="pt-2 flex flex-wrap gap-1">
                  {villa.amenities.slice(0, 3).map((amenity, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold block">
                  Nightly Base Rate
                </span>
                {editingTariffId === villa.id ? (
                  <div className="flex items-center gap-1 mt-0.5">
                    <input
                      type="number"
                      value={newTariffValue}
                      onChange={(e) => setNewTariffValue(Number(e.target.value))}
                      className="w-20 px-1 py-0.5 border border-teal-600 rounded text-xs font-mono font-bold"
                    />
                    <button
                      onClick={() => handleUpdateTariff(villa.id)}
                      className="px-1.5 py-0.5 bg-teal-700 text-white rounded text-[10px] font-bold"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono font-bold text-stone-900 text-sm">
                      ₹{villa.pricePerNight.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => {
                        setEditingTariffId(villa.id);
                        setNewTariffValue(villa.pricePerNight);
                      }}
                      className="text-stone-400 hover:text-stone-800 cursor-pointer"
                      title="Quick Adjust Tariff"
                    >
                      <Edit className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedVilla(villa)}
                className="px-3 py-1.5 bg-[#1B6B76] hover:bg-[#14535c] text-white rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Inspector Modal */}
      {selectedVilla && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl border border-stone-200 text-stone-800">
            <div className="relative h-56 bg-stone-100">
              <img
                src={selectedVilla.imageUrl}
                alt={selectedVilla.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedVilla(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 cursor-pointer"
              >
                ✕
              </button>
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded text-xs">
                {selectedVilla.location}
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                {selectedVilla.title}
              </h3>
              <p className="text-stone-600 leading-relaxed">{selectedVilla.description}</p>

              <div>
                <h4 className="font-semibold text-stone-800 uppercase tracking-wider text-[11px] mb-2">
                  Estate Features & Inclusions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedVilla.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-stone-800 uppercase tracking-wider text-[11px] mb-2">
                  Curated Signatures
                </h4>
                <div className="space-y-1 bg-amber-50/60 p-3 rounded border border-amber-200 text-amber-900">
                  {selectedVilla.signatureHighlights.map((sig, idx) => (
                    <div key={idx}>• {sig}</div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedVilla(null)}
                  className="px-4 py-2 bg-stone-900 text-white font-semibold rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Close Specification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
