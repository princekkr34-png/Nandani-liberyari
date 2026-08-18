import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ExactPaperFormReplica } from './components/ExactPaperFormReplica';
import { RegistrationForm } from './components/RegistrationForm';
import { SeatMatrixView } from './components/SeatMatrixView';
import { AdminDirectory } from './components/AdminDirectory';
import { FacilitiesShowcase } from './components/FacilitiesShowcase';
import { PricingPlans } from './components/PricingPlans';
import { NoticeBoard } from './components/NoticeBoard';
import { ContactLocation } from './components/ContactLocation';
import { IdCardModal } from './components/IdCardModal';
import { Footer } from './components/Footer';
import { RegistrationData, LibrarySeat, ShiftType } from './types';
import { INITIAL_REGISTRATIONS, INITIAL_SEATS, LIBRARY_CONFIG } from './data/initialData';
import { Sparkles, CheckCircle2, UserPlus, LayoutGrid, CreditCard, Shield, FileText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('replica');
  const [language, setLanguage] = useState<'en' | 'hi'>('hi');
  
  // Persistence with localStorage
  const [registrations, setRegistrations] = useState<RegistrationData[]>(() => {
    const saved = localStorage.getItem('ndl_registrations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_REGISTRATIONS;
  });

  const [seats, setSeats] = useState<LibrarySeat[]>(() => {
    const saved = localStorage.getItem('ndl_seats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_SEATS;
  });

  const [selectedMemberForIdCard, setSelectedMemberForIdCard] = useState<RegistrationData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ndl_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('ndl_seats', JSON.stringify(seats));
  }, [seats]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handle new student registration submission
  const handleRegisterSuccess = (newRecord: RegistrationData) => {
    setRegistrations(prev => [newRecord, ...prev]);

    // Update Seat Status
    setSeats(prev => prev.map(seat => {
      if (seat.seatNumber === newRecord.seatNumber) {
        return {
          ...seat,
          status: 'Occupied',
          currentOccupant: {
            name: newRecord.fullNameEnglish,
            formNo: newRecord.formNo,
            shift: newRecord.shift
          }
        };
      }
      return seat;
    }));

    showToast(`Admission successfully recorded for ${newRecord.fullNameEnglish}! Seat ${newRecord.seatNumber} reserved.`);
  };

  // Seat selection from matrix
  const handleSelectSeatForAdmission = (seatNum: string) => {
    setActiveTab('register');
  };

  // Plan selection from pricing
  const handleSelectPlan = (planShift: string) => {
    setActiveTab('register');
  };

  const availableSeatList = seats.filter(s => s.status === 'Available').map(s => s.seatNumber);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        totalMembers={registrations.length}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 border border-emerald-400/50">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-12">
        
        {/* Tab 1: Home & Facilities Overview */}
        {activeTab === 'home' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <HeroBanner
              onRegisterClick={() => setActiveTab('register')}
              onSeatMatrixClick={() => setActiveTab('seats')}
              language={language}
            />

            {/* Quick Action Navigation Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
              <button
                onClick={() => setActiveTab('replica')}
                className="bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border-2 border-amber-400/80 p-4 rounded-2xl text-left transition-all group cursor-pointer shadow-xl ring-1 ring-amber-400/30"
                id="quick-nav-replica"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-black text-amber-300">Photo Replica</h4>
                <p className="text-[11px] text-slate-300">हूबहू 100% फोटो वाला फॉर्म</p>
              </button>

              <button
                onClick={() => setActiveTab('register')}
                className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 p-4 rounded-2xl text-left transition-all group cursor-pointer shadow-lg"
                id="quick-nav-form"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-300">Admission Form</h4>
                <p className="text-[11px] text-slate-400">Online registration system</p>
              </button>

              <button
                onClick={() => setActiveTab('seats')}
                className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 p-4 rounded-2xl text-left transition-all group cursor-pointer shadow-lg"
                id="quick-nav-seats"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-300">Seat Matrix</h4>
                <p className="text-[11px] text-slate-400">48 AC study cabins</p>
              </button>

              <button
                onClick={() => {
                  setSelectedMemberForIdCard(registrations[0] || null);
                  setActiveTab('idcard');
                }}
                className="bg-slate-900 border border-slate-800 hover:border-purple-500/50 p-4 rounded-2xl text-left transition-all group cursor-pointer shadow-lg"
                id="quick-nav-idcard"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-purple-300">Smart ID Card</h4>
                <p className="text-[11px] text-slate-400">Generate & print pass</p>
              </button>

              <button
                onClick={() => setActiveTab('directory')}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-2xl text-left transition-all group cursor-pointer shadow-lg"
                id="quick-nav-directory"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300">Directory</h4>
                <p className="text-[11px] text-slate-400">{registrations.length} Students</p>
              </button>
            </div>

            {/* Facilities Section */}
            <FacilitiesShowcase language={language} />

            {/* Notice Board & Pricing summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6">
                <NoticeBoard language={language} />
              </div>
              <div className="lg:col-span-6">
                <PricingPlans onSelectPlan={handleSelectPlan} language={language} />
              </div>
            </div>

            {/* Contact & Location */}
            <ContactLocation language={language} />
          </div>
        )}

        {/* Tab 0: Exact Paper Form Replica */}
        {activeTab === 'replica' && (
          <div className="animate-in fade-in duration-300">
            <ExactPaperFormReplica
              onSaveRegistration={handleRegisterSuccess}
              language={language}
            />
          </div>
        )}

        {/* Tab 2: Digitized Physical Registration Form */}
        {activeTab === 'register' && (
          <div className="animate-in fade-in duration-300">
            <RegistrationForm
              onRegisterSuccess={handleRegisterSuccess}
              language={language}
              onViewIdCard={(rec) => {
                setSelectedMemberForIdCard(rec);
              }}
              availableSeats={availableSeatList}
            />
          </div>
        )}

        {/* Tab 3: Seat Matrix & Live Desk Booking */}
        {activeTab === 'seats' && (
          <div className="animate-in fade-in duration-300">
            <SeatMatrixView
              seats={seats}
              onSelectSeatForAdmission={handleSelectSeatForAdmission}
              language={language}
            />
          </div>
        )}

        {/* Tab 4: Member ID Card & Slip Generator */}
        {activeTab === 'idcard' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-wrap justify-between items-center gap-4">
              <div>
                <h3 className="text-xl font-black text-white">
                  {language === 'hi' ? "सदस्य आईडी कार्ड एवं प्रवेश पर्ची दर्शक" : "Member Smart ID Card & Admission Pass"}
                </h3>
                <p className="text-xs text-slate-400">
                  Select any registered member below to preview or print their official library identity card.
                </p>
              </div>

              {/* Selector */}
              <select
                value={selectedMemberForIdCard?.id || registrations[0]?.id || ''}
                onChange={(e) => {
                  const m = registrations.find(r => r.id === e.target.value);
                  if (m) setSelectedMemberForIdCard(m);
                }}
                className="bg-slate-800 border border-slate-700 text-amber-300 font-bold text-xs rounded-xl px-4 py-2 focus:outline-none"
                id="select-member-for-id"
              >
                {registrations.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.fullNameEnglish} ({r.formNo} - {r.seatNumber})
                  </option>
                ))}
              </select>
            </div>

            {/* Render ID Card direct container */}
            <IdCardModal
              member={selectedMemberForIdCard || registrations[0] || null}
              onClose={() => {}}
              language={language}
            />
          </div>
        )}

        {/* Tab 5: Admin & Member Directory */}
        {activeTab === 'directory' && (
          <div className="animate-in fade-in duration-300">
            <AdminDirectory
              registrations={registrations}
              onViewIdCard={(rec) => {
                setSelectedMemberForIdCard(rec);
                setActiveTab('idcard');
              }}
              onAddNewAdmission={() => setActiveTab('register')}
              language={language}
            />
          </div>
        )}

        {/* Tab 6: Pricing & Shifts */}
        {activeTab === 'plans' && (
          <div className="animate-in fade-in duration-300">
            <PricingPlans onSelectPlan={handleSelectPlan} language={language} />
          </div>
        )}

        {/* Tab 7: Contact & Location */}
        {activeTab === 'contact' && (
          <div className="animate-in fade-in duration-300">
            <ContactLocation language={language} />
          </div>
        )}

      </main>

      {/* Floating ID Card Modal if open from other tabs */}
      {selectedMemberForIdCard && activeTab !== 'idcard' && (
        <IdCardModal
          member={selectedMemberForIdCard}
          onClose={() => setSelectedMemberForIdCard(null)}
          language={language}
        />
      )}

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} language={language} />

    </div>
  );
}
