import React from 'react';
import { TrendingUp, IndianRupee, CreditCard, ArrowUpRight, BarChart3, PieChart, ShieldCheck } from 'lucide-react';

export const TariffRevenueView: React.FC = () => {
  return (
    <div className="flex-1 p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          Tariff & Revenue
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Overview of monthly revenue, average rates, and payment settlements.
        </p>
      </div>

      {/* Top Financial Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-stone-400 font-bold uppercase text-[10px] tracking-wider block">
            Month Revenue
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif text-2xl font-bold text-stone-900">₹14,82,400</span>
            <span className="text-emerald-700 text-xs font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.4%
            </span>
          </div>
          <span className="text-stone-500 text-[11px] block mt-1">Target: ₹12,50,000</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-stone-400 font-bold uppercase text-[10px] tracking-wider block">
            Average Daily Rate (ADR)
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif text-2xl font-bold text-stone-900">₹32,650</span>
            <span className="text-emerald-700 text-xs font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +8.2%
            </span>
          </div>
          <span className="text-stone-500 text-[11px] block mt-1">Season rate applied</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-stone-400 font-bold uppercase text-[10px] tracking-wider block">
            RevPAR
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif text-2xl font-bold text-[#1B6B76]">₹28,568</span>
            <span className="text-emerald-700 text-xs font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14.1%
            </span>
          </div>
          <span className="text-stone-500 text-[11px] block mt-1">87.5% occupancy</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-stone-400 font-bold uppercase text-[10px] tracking-wider block">
            Deposits Held
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif text-2xl font-bold text-stone-900">₹3,45,000</span>
            <span className="text-stone-500 text-xs font-medium">100% Held</span>
          </div>
          <span className="text-stone-500 text-[11px] block mt-1">Active guest holds</span>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
          <h3 className="font-serif font-bold text-base text-stone-900">
            Channel Distribution & Direct Bookings
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1 text-stone-700">
                <span>Direct Brand Website & VIP Desk</span>
                <span className="font-mono text-emerald-700">68% (₹10,08,000)</span>
              </div>
              <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#1B6B76] rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1 text-stone-700">
                <span>Luxury Escapes & Mr & Mrs Smith</span>
                <span className="font-mono text-stone-700">22% (₹3,26,000)</span>
              </div>
              <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-600 rounded-full" style={{ width: '22%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1 text-stone-700">
                <span>Airbnb Luxe & OTAs</span>
                <span className="font-mono text-stone-700">10% (₹1,48,400)</span>
              </div>
              <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-400 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
          <h3 className="font-serif font-bold text-base text-stone-900">
            Settlement Gateway Clearances
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-stone-50 rounded-lg flex items-center justify-between border border-stone-200">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-700" />
                <div>
                  <div className="font-semibold text-stone-900">UPI / Direct NetBanking</div>
                  <div className="text-[10px] text-stone-500">Instant T+0 settlement • Zero MDR</div>
                </div>
              </div>
              <span className="font-mono font-bold text-stone-900">₹8,92,000</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg flex items-center justify-between border border-stone-200">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-700" />
                <div>
                  <div className="font-semibold text-stone-900">AMEX & International Visa/MasterCard</div>
                  <div className="text-[10px] text-stone-500">Stripe / HDFC Gateway (T+2)</div>
                </div>
              </div>
              <span className="font-mono font-bold text-stone-900">₹4,40,400</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg flex items-center justify-between border border-stone-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <div>
                  <div className="font-semibold text-stone-900">Direct Bank Wire (RTGS / SWIFT)</div>
                  <div className="text-[10px] text-stone-500">High-ticket wedding buyouts</div>
                </div>
              </div>
              <span className="font-mono font-bold text-stone-900">₹1,50,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
