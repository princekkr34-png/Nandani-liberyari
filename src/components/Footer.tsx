import React from 'react';
import { 
  BookOpen, 
  Phone, 
  MapPin, 
  Mail, 
  Heart, 
  Sparkles, 
  ShieldCheck,
  Award
} from 'lucide-react';
import { LIBRARY_CONFIG } from '../data/initialData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  language: 'en' | 'hi';
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, language }) => {
  const isHindi = language === 'hi';

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-amber-300">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base">
                {LIBRARY_CONFIG.name}
              </span>
            </div>
            <p className="text-amber-400 font-semibold italic text-xs">
              "{LIBRARY_CONFIG.tagline}"
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Dedicated self-study library center empowering aspirants of Dudahi, Kushinagar & surrounding regions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-blue-400 transition-colors">
                  Home & Facilities
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('register')} className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
                  Online Registration Form
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('seats')} className="hover:text-blue-400 transition-colors">
                  Live Seat Matrix
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('plans')} className="hover:text-blue-400 transition-colors">
                  Shifts & Fee Structure
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('directory')} className="hover:text-blue-400 transition-colors">
                  Member Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Shifts & Timings */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Shift Timings
            </h4>
            <ul className="space-y-1 text-[11px] text-slate-300 font-mono">
              <li>Morning: 06:00 AM - 12:00 PM</li>
              <li>Afternoon: 12:00 PM - 05:00 PM</li>
              <li>Evening: 05:00 PM - 10:00 PM</li>
              <li>Full Day: 06:00 AM - 10:00 PM</li>
              <li>Night Shift: 09:00 PM - 06:00 AM</li>
            </ul>
          </div>

          {/* Location & Helpline */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Contact & Helpline
            </h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>{LIBRARY_CONFIG.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{LIBRARY_CONFIG.phone1}, {LIBRARY_CONFIG.phone2}</span>
              </p>
              <p className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{LIBRARY_CONFIG.branding}</span>
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-wrap justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} {LIBRARY_CONFIG.name} (Achiever's Choice). Dudahi, Kushinagar U.P. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Powered by Digital Library Management System</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
