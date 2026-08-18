import React from 'react';
import { 
  Check, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  UserPlus,
  Zap
} from 'lucide-react';
import { FEE_PLANS, SHIFTS_DATA, LIBRARY_CONFIG } from '../data/initialData';

interface PricingPlansProps {
  onSelectPlan: (shift: string) => void;
  language: 'en' | 'hi';
}

export const PricingPlans: React.FC<PricingPlansProps> = ({ onSelectPlan, language }) => {
  const isHindi = language === 'hi';

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Affordable Self-Study Packages
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          {isHindi ? "पारदर्शी शुल्क एवं शिफ्ट योजनाएं" : "Transparent Fee Structure & Flexible Shifts"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Choose the shift timing that matches your study schedule. Special long-term discounts available.
        </p>
      </div>

      {/* Shifts Breakdown Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEE_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl p-6 flex flex-col justify-between transition-all border relative ${
              plan.popular
                ? 'bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 border-amber-400/80 shadow-2xl ring-1 ring-amber-400/50'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-xl'
            }`}
            id={`plan-card-${plan.id}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Most Popular / छात्रों की पहली पसंद</span>
              </div>
            )}

            <div>
              <div className="border-b border-slate-800 pb-4 mb-4">
                <h3 className="text-lg font-black text-white">{isHindi ? plan.nameHindi : plan.name}</h3>
                <p className="text-xs text-blue-300 font-mono flex items-center gap-1 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{plan.timing}</span>
                </p>
              </div>

              {/* Price display */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-amber-400">₹{plan.monthlyFee}</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <div className="mt-2 text-[11px] text-slate-400 space-y-0.5 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                  <div className="flex justify-between">
                    <span>3 Months Pass:</span>
                    <strong className="text-emerald-400">₹{plan.quarterlyFee}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>6 Months Pass:</span>
                    <strong className="text-emerald-400">₹{plan.halfYearlyFee}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>1 Year Pass:</span>
                    <strong className="text-amber-300">₹{plan.yearlyFee}</strong>
                  </div>
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action */}
            <button
              onClick={() => onSelectPlan(plan.name)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                plan.popular
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
              }`}
              id={`choose-plan-btn-${plan.id}`}
            >
              <span>{isHindi ? "यह प्लान चुनें" : "Select Shift & Register"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Note on Free Facilities */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center space-y-2 max-w-4xl mx-auto">
        <h4 className="text-sm font-bold text-amber-300">
          All Plans Include Free Access To:
        </h4>
        <p className="text-xs text-slate-300">
          High Speed Unlimited 5G Wi-Fi • 100% Fully Air-Conditioned Hall • Personal Desk Power Sockets • RO Hot/Cold Filtered Water • Daily Current Affairs Magazines & Newspapers • 24x7 Silent Diesel Generator Power Backup
        </p>
      </div>

    </div>
  );
};
