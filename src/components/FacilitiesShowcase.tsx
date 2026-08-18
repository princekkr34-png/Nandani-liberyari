import React from 'react';
import { 
  Wifi, 
  AirVent, 
  Armchair, 
  Zap, 
  BatteryCharging, 
  Droplets, 
  ShieldAlert, 
  Newspaper, 
  Lock, 
  VolumeX,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { FACILITIES_LIST, LIBRARY_CONFIG } from '../data/initialData';

const ICON_MAP: Record<string, React.ElementType> = {
  Wifi,
  AirVent,
  Armchair,
  Zap,
  BatteryCharging,
  Droplets,
  ShieldAlert,
  Newspaper,
  Lock,
  VolumeX
};

interface FacilitiesShowcaseProps {
  language: 'en' | 'hi';
}

export const FacilitiesShowcase: React.FC<FacilitiesShowcaseProps> = ({ language }) => {
  const isHindi = language === 'hi';

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          World-Class Study Environment
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          {isHindi ? "नंदिनी डिजिटल लाइब्रेरी की आधुनिक सुविधाएं" : "Premium Amenities & Facilities at Nandini Digital Library"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {isHindi 
            ? "दुदही एवं कुशीनगर के छात्रों के लिए सर्वोत्तम शांत एवं अनुशासित वातावरण" 
            : "Engineered specifically to maximize concentration, productivity, and exam cracking success."}
        </p>
      </div>

      {/* Grid of facilities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FACILITIES_LIST.map((fac, idx) => {
          const IconComp = ICON_MAP[fac.icon] || Sparkles;

          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl transition-all hover:bg-slate-800/60 group shadow-lg"
              id={`facility-card-${idx}`}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-700/50 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <IconComp className="w-6 h-6" />
              </div>

              <h3 className="text-base font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                {isHindi ? fac.titleHindi : fac.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {fac.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Rules Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-blue-700/40 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <VolumeX className="w-4 h-4 text-rose-400" />
            <span>Strict Zero Noise & Discipline Policy (100% शांति का नियम)</span>
          </h4>
          <p className="text-xs text-slate-300">
            Phones must be on silent. Discussion allowed only in designated discussion area outside the silent study hall.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/40">
          <CheckCircle2 className="w-4 h-4" />
          <span>Biometric & CCTV Monitored</span>
        </div>
      </div>
    </div>
  );
};
