import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  UserPlus, 
  LayoutGrid, 
  ShieldCheck, 
  Wifi, 
  AirVent, 
  Zap, 
  Clock, 
  Phone, 
  MapPin,
  CheckCircle,
  Award,
  BookMarked
} from 'lucide-react';
import { LIBRARY_CONFIG, SHIFTS_DATA } from '../data/initialData';

interface HeroBannerProps {
  onRegisterClick: () => void;
  onSeatMatrixClick: () => void;
  language: 'en' | 'hi';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onRegisterClick,
  onSeatMatrixClick,
  language
}) => {
  const isHindi = language === 'hi';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-600/30 p-6 sm:p-10 shadow-2xl">
      
      {/* Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Headlines & Call to actions */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              {LIBRARY_CONFIG.branding}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-300 text-xs bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
              <MapPin className="w-3 h-3 text-rose-400" />
              Dudahi (Kushinagar) U.P.
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
              {LIBRARY_CONFIG.name}
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-amber-300 italic">
              "{LIBRARY_CONFIG.tagline}"
            </p>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {isHindi 
                ? "कुशीनगर (दुदही) का सबसे आधुनिक, वातानुकूलित एवं 100% शांत अध्ययन केंद्र। UPSC, UPPSC, SSC, NEET, JEE, Railway और अन्य प्रतियोगी परीक्षाओं की समर्पित तैयारी के लिए विशेष सुविधा।"
                : "The premier air-conditioned silent digital library & self-study paradise in Dudahi (Kushinagar). High-speed 5G Wi-Fi, personal charging cabins, ergonomic seating, and power backup."
              }
            </p>
          </div>

          {/* Quick Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-xl text-xs flex items-center gap-2">
              <Wifi className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-slate-200 font-medium">5G High-Speed WiFi</span>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-xl text-xs flex items-center gap-2">
              <AirVent className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-200 font-medium">Fully Air Conditioned</span>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-xl text-xs flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-slate-200 font-medium">24x7 Power Backup</span>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-xl text-xs flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200 font-medium">Daily Newspapers</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onRegisterClick}
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black px-6 py-3 rounded-xl text-sm shadow-xl shadow-amber-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              id="hero-register-btn"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isHindi ? "ऑनलाइन प्रवेश फॉर्म भरें" : "Fill Online Admission Form"}</span>
            </button>

            <button
              onClick={onSeatMatrixClick}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-3 rounded-xl text-sm border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
              id="hero-seats-btn"
            >
              <LayoutGrid className="w-4 h-4 text-blue-400" />
              <span>{isHindi ? "सीट मैट्रिक्स देखें" : "View Live Seat Matrix"}</span>
            </button>
          </div>

        </div>

        {/* Right Column: Interactive Digital Admission Highlight Card */}
        <div className="lg:col-span-5">
          <div className="bg-slate-800/80 border border-blue-500/40 rounded-2xl p-6 shadow-2xl space-y-4 backdrop-blur-md relative">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                Admission Counter 2026
              </span>
              <span className="text-xs text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 font-mono">
                Admissions Open
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-300">Shifts Available:</span>
                <span className="font-bold text-white">Morning / Afternoon / Evening / Full Day / Night</span>
              </div>
              <div className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-300">Starting Fee:</span>
                <span className="font-black text-amber-400 text-sm">₹550 / month</span>
              </div>
              <div className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-300">Location:</span>
                <span className="font-semibold text-blue-300">Dudahi (Kushinagar) U.P.</span>
              </div>
            </div>

            {/* Helpline Buttons */}
            <div className="pt-2 border-t border-slate-700 space-y-2">
              <span className="text-[11px] text-slate-400 block">Direct Inquiry & Admission Hotline:</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${LIBRARY_CONFIG.phone1}`}
                  className="bg-blue-950/80 hover:bg-blue-900/80 text-blue-200 p-2 rounded-lg border border-blue-700/50 flex items-center justify-center gap-1.5 font-bold font-mono transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{LIBRARY_CONFIG.phone1}</span>
                </a>
                <a
                  href={`tel:${LIBRARY_CONFIG.phone2}`}
                  className="bg-blue-950/80 hover:bg-blue-900/80 text-blue-200 p-2 rounded-lg border border-blue-700/50 flex items-center justify-center gap-1.5 font-bold font-mono transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{LIBRARY_CONFIG.phone2}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
