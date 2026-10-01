import React from 'react';
import { TrendingUp, CreditCard, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const TariffRevenueView: React.FC = () => {
  return (
    <div className="flex-1 p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-stone-900">
          Revenue & Rates
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Overview of monthly revenue, average rates, and payment settlements.
        </p>
      </div>

      {/* Top Financial Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-stone-400 font-bold uppercase text-[10px] tracking-wider block">
            Month Revenue
          </span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-2xl font-bold text-stone-900">₹14,82,400</span>
            <span className="text-emerald-700 text-xs font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18%
            </span>
          </div>
          <span className="text-stone-500 text-[11px] block mt-1">Target: ₹12,50,000</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-stone-400 font-bold uppercase text-[10px] tracking-wider block">
            Average Daily Rate (ADR)
          </span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-2xl font-bold text-stone-900">₹32,650</span>
            <span className="text-emerald-700 text-xs font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +8%
            </span>
          </div>
          <span className="text-stone-500 text-[11px] block mt-1">Season rate active</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-stone-400 font-bold uppercase text-[10px] tracking-wider block">
            RevPAR
          </span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-2xl font-bold text-[#1B6B76]">₹28,568</span>
            <span className="text-emerald-700 text-xs font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14%
            </span>
          </div>
          <span className="text-stone-500 text-[11px] block mt-1">87% occupancy yield</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-stone-400 font-bold uppercase text-[10px] tracking-wider block">
            Security Holds
          </span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-2xl font-bold text-stone-900">₹3,45,000</span>
            <span className="text-stone-500 text-xs font-medium">Secured</span>
          </div>
          <span className="text-stone-500 text-[11px] block mt-1">Active guest holds</span>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-stone-900">
            Channel Distribution
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1 text-stone-700">
                <span>Direct Brand Website</span>
                <span className="font-bold text-emerald-700">68% (₹10,08,000)</span>
              </div>
              <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#1B6B76] rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1 text-stone-700">
                <span>Travel Agents & Luxury Portals</span>
                <span className="font-bold text-stone-700">22% (₹3,26,000)</span>
              </div>
              <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-600 rounded-full" style={{ width: '22%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1 text-stone-700">
                <span>Online Travel Agencies</span>
                <span className="font-bold text-stone-700">10% (₹1,48,400)</span>
              </div>
              <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-400 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-stone-900">
            Payment Settlements
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-stone-50 rounded-lg flex items-center justify-between border border-stone-200">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-emerald-700" />
                <div>
                  <div className="font-semibold text-stone-900">UPI / Direct NetBanking</div>
                  <div className="text-[10px] text-stone-500">Instant settlement</div>
                </div>
              </div>
              <span className="font-bold text-stone-900">₹8,92,000</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg flex items-center justify-between border border-stone-200">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-blue-700" />
                <div>
                  <div className="font-semibold text-stone-900">Credit Cards (Visa / MC / AMEX)</div>
                  <div className="text-[10px] text-stone-500">Merchant gateway</div>
                </div>
              </div>
              <span className="font-bold text-stone-900">₹4,40,400</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg flex items-center justify-between border border-stone-200">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <div>
                  <div className="font-semibold text-stone-900">Direct Bank Wire (RTGS / NEFT)</div>
                  <div className="text-[10px] text-stone-500">High-ticket estate buyouts</div>
                </div>
              </div>
              <span className="font-bold text-stone-900">₹1,50,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
