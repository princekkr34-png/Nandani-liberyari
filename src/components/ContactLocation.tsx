import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  Navigation, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { LIBRARY_CONFIG } from '../data/initialData';

interface ContactLocationProps {
  language: 'en' | 'hi';
}

export const ContactLocation: React.FC<ContactLocationProps> = ({ language }) => {
  const isHindi = language === 'hi';
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryShift, setInquiryShift] = useState('Full Day');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;

    // Send via WhatsApp or direct local notification
    const textMsg = `Hello Nandini Digital Library (Dudahi), my name is ${inquiryName} (Ph: ${inquiryPhone}). I am interested in ${inquiryShift} shift. Message: ${inquiryMessage || 'Please share admission details'}.`;
    const waUrl = `https://wa.me/91${LIBRARY_CONFIG.phone1}?text=${encodeURIComponent(textMsg)}`;
    
    setSentSuccess(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Visit Us In Person
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          {isHindi ? "संपर्क करें एवं पता (दुदही, कुशीनगर)" : "Contact Details & Library Location"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Have questions or want a free demo visit? Reach out via call, WhatsApp, or drop by our center.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 5 Cols: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Address Card */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Library Address</h4>
                <p className="text-xs text-slate-300 font-medium">{LIBRARY_CONFIG.address}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Conveniently located near public transit and market in Dudahi, Kushinagar district.
            </p>
          </div>

          {/* Phone Numbers Card */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Call & WhatsApp Hotlines</h4>
                <p className="text-xs text-slate-300">Direct admission guidance line</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${LIBRARY_CONFIG.phone1}`}
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 p-2.5 rounded-xl text-xs font-mono font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                id="contact-call-btn-1"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{LIBRARY_CONFIG.phone1}</span>
              </a>

              <a
                href={`tel:${LIBRARY_CONFIG.phone2}`}
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 p-2.5 rounded-xl text-xs font-mono font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                id="contact-call-btn-2"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{LIBRARY_CONFIG.phone2}</span>
              </a>
            </div>

            <a
              href={`https://wa.me/91${LIBRARY_CONFIG.phone1}?text=Hello%20Nandini%20Digital%20Library%20Dudahi`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-colors"
              id="whatsapp-chat-direct"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isHindi ? "सीधे व्हाट्सएप पर बात करें" : "Chat Directly on WhatsApp"}</span>
            </a>
          </div>

          {/* Operating Hours */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-3 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Operating Timings</h4>
              <p className="text-xs text-emerald-400 font-semibold">{LIBRARY_CONFIG.openingHours}</p>
              <span className="text-[11px] text-slate-400">Open 365 days including Sundays & festivals</span>
            </div>
          </div>

        </div>

        {/* Right 7 Cols: Quick Admission Inquiry Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Quick Connect
            </span>
            <h3 className="text-xl font-black text-white">
              {isHindi ? "प्रवेश अथवा सीट संबंधी त्वरित पूछताछ" : "Quick Admission & Seat Inquiry"}
            </h3>
            <p className="text-xs text-slate-400">
              Fill out your details to get an instant callback from the library desk.
            </p>
          </div>

          {sentSuccess ? (
            <div className="p-6 bg-emerald-950/70 border border-emerald-500/60 rounded-xl text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Inquiry Sent Successfully!</h4>
              <p className="text-xs text-emerald-300">
                Opening WhatsApp to connect directly with the library desk at Dudahi.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendInquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name / आपका नाम <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Prince Kumar"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                    id="inquiry-name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile Number / मोबाइल नंबर <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="9628321238"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                    id="inquiry-phone"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Interested Shift / पसंदीदा शिफ्ट
                </label>
                <select
                  value={inquiryShift}
                  onChange={(e) => setInquiryShift(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                  id="inquiry-shift-select"
                >
                  <option value="Morning (06:00 AM - 12:00 PM)">Morning (06:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 05:00 PM)">Afternoon (12:00 PM - 05:00 PM)</option>
                  <option value="Evening (05:00 PM - 10:00 PM)">Evening (05:00 PM - 10:00 PM)</option>
                  <option value="Full Day (06:00 AM - 10:00 PM)">Full Day (06:00 AM - 10:00 PM)</option>
                  <option value="Night Shift (09:00 PM - 06:00 AM)">Night Shift (09:00 PM - 06:00 AM)</option>
                  <option value="24x7 Unlimited Access">24x7 Unlimited Access</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Exam or Question / संदेश
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Preparing for UPSC / UPPSC, want a quiet corner seat..."
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none resize-none"
                  id="inquiry-msg"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                id="submit-inquiry-btn"
              >
                <Send className="w-4 h-4" />
                <span>{isHindi ? "पूछताछ भेजें (WhatsApp पर खोलें)" : "Submit Inquiry via WhatsApp"}</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
