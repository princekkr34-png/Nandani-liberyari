import React from 'react';
import { 
  BookOpen, 
  Phone, 
  MapPin, 
  Clock, 
  UserPlus, 
  LayoutGrid, 
  CreditCard, 
  Users, 
  Sparkles,
  MessageCircle,
  Globe
} from 'lucide-react';
import { LIBRARY_CONFIG } from '../data/initialData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  totalMembers: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  totalMembers
}) => {
  const isHindi = language === 'hi';

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      {/* Top Notification / Contact Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 py-1.5 px-4 text-xs font-medium text-blue-200 border-b border-blue-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              {isHindi ? "अचीवर्स चॉइस - अपने सामर्थ्य को सफलता में बदलें" : "Achiever's Choice — Convert your energy into success..."}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-rose-400" />
              {LIBRARY_CONFIG.address}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a 
              href={`tel:${LIBRARY_CONFIG.phone1}`} 
              className="flex items-center gap-1 text-blue-200 hover:text-white transition-colors bg-blue-950/60 px-2 py-0.5 rounded border border-blue-700/40"
              id="top-call-btn-1"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{LIBRARY_CONFIG.phone1}</span>
            </a>
            <a 
              href={`tel:${LIBRARY_CONFIG.phone2}`} 
              className="hidden sm:flex items-center gap-1 text-blue-200 hover:text-white transition-colors bg-blue-950/60 px-2 py-0.5 rounded border border-blue-700/40"
              id="top-call-btn-2"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{LIBRARY_CONFIG.phone2}</span>
            </a>
            <a 
              href={`https://wa.me/91${LIBRARY_CONFIG.phone1}?text=Hello%20Nandini%20Digital%20Library%20I%20want%20to%20inquire%20about%20admission`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-white transition-colors bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/40"
              id="top-whatsapp-btn"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(isHindi ? 'en' : 'hi')}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-amber-300 px-2 py-0.5 rounded border border-slate-700 text-xs font-semibold cursor-pointer transition-colors"
              id="lang-toggle-btn"
              title="Toggle Hindi / English"
            >
              <Globe className="w-3 h-3" />
              <span>{isHindi ? 'English' : 'हिन्दी'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
            id="brand-logo-btn"
          >
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-amber-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  {LIBRARY_CONFIG.branding}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline-block">Dudahi (Kushinagar)</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                {LIBRARY_CONFIG.name}
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block italic">
                {LIBRARY_CONFIG.tagline}
              </p>
            </div>
          </div>

          {/* Action Buttons & Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'home' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              id="nav-home-btn"
            >
              {isHindi ? 'मुख्य पृष्ठ' : 'Home & Facilities'}
            </button>

            <button
              onClick={() => setActiveTab('replica')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'replica' 
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30' 
                  : 'text-amber-400 hover:text-amber-300 hover:bg-slate-800'
              }`}
              id="nav-replica-btn"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isHindi ? 'हूबहू फोटो फॉर्म' : 'Photo Form Replica'}</span>
            </button>

            <button
              onClick={() => setActiveTab('register')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'register' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              id="nav-register-btn"
            >
              <UserPlus className="w-4 h-4 text-blue-400" />
              <span>{isHindi ? 'ऑनलाइन प्रवेश फॉर्म' : 'Online Form'}</span>
            </button>

            <button
              onClick={() => setActiveTab('seats')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'seats' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              id="nav-seats-btn"
            >
              <LayoutGrid className="w-4 h-4 text-blue-400" />
              <span>{isHindi ? 'सीट मैट्रिक्स' : 'Seat Matrix'}</span>
            </button>

            <button
              onClick={() => setActiveTab('idcard')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'idcard' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              id="nav-idcard-btn"
            >
              <CreditCard className="w-4 h-4 text-purple-400" />
              <span>{isHindi ? 'आईडी कार्ड / रसीद' : 'ID Card & Slip'}</span>
            </button>

            <button
              onClick={() => setActiveTab('directory')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'directory' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              id="nav-directory-btn"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>{isHindi ? 'छात्र रिकॉर्ड' : 'Members Directory'}</span>
              <span className="bg-slate-700 text-slate-200 text-xs px-1.5 py-0.2 rounded-full">
                {totalMembers}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('plans')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'plans' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              id="nav-plans-btn"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{isHindi ? 'शुल्क व शिफ्ट' : 'Fee Plans'}</span>
            </button>
          </nav>

          {/* Direct CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('register')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-500/25 flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              id="cta-admission-btn"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isHindi ? 'नया प्रवेश लें' : 'New Admission'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 mt-2 gap-1.5 border-t border-slate-800/80 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('replica')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 ${
              activeTab === 'replica' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-amber-300'
            }`}
            id="mobile-nav-replica"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isHindi ? 'हूबहू फॉर्म' : 'Photo Form'}
          </button>
          <button
            onClick={() => setActiveTab('home')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-medium ${
              activeTab === 'home' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
            id="mobile-nav-home"
          >
            {isHindi ? 'होम' : 'Home'}
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 ${
              activeTab === 'register' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
            }`}
            id="mobile-nav-register"
          >
            <UserPlus className="w-3.5 h-3.5" />
            {isHindi ? 'ऑनलाइन फॉर्म' : 'Online Form'}
          </button>
          <button
            onClick={() => setActiveTab('seats')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 ${
              activeTab === 'seats' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
            id="mobile-nav-seats"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            {isHindi ? 'सीट मैट्रिक्स' : 'Seats'}
          </button>
          <button
            onClick={() => setActiveTab('idcard')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 ${
              activeTab === 'idcard' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
            id="mobile-nav-idcard"
          >
            <CreditCard className="w-3.5 h-3.5" />
            {isHindi ? 'आईडी कार्ड' : 'ID Card'}
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 ${
              activeTab === 'directory' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
            id="mobile-nav-directory"
          >
            <Users className="w-3.5 h-3.5" />
            {isHindi ? 'सदस्य सूची' : 'Members'} ({totalMembers})
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-medium ${
              activeTab === 'plans' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
            id="mobile-nav-plans"
          >
            {isHindi ? 'शुल्क' : 'Fees'}
          </button>
        </div>
      </div>
    </header>
  );
};
