import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  QrCode, 
  BookOpen, 
  Phone, 
  MapPin, 
  Sparkles,
  Calendar,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { RegistrationData } from '../types';
import { LIBRARY_CONFIG } from '../data/initialData';

interface IdCardModalProps {
  member: RegistrationData | null;
  onClose: () => void;
  language: 'en' | 'hi';
}

export const IdCardModal: React.FC<IdCardModalProps> = ({
  member,
  onClose,
  language
}) => {
  const isHindi = language === 'hi';
  const printRef = useRef<HTMLDivElement>(null);

  if (!member) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          id="close-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {LIBRARY_CONFIG.branding}
            </span>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              {isHindi ? "डिजिटल स्मार्ट आईडी कार्ड एवं प्रवेश पर्ची" : "Official Smart ID Card & Admission Pass"}
            </h2>
            <p className="text-xs text-slate-400">
              Reg No: <span className="text-blue-300 font-mono font-bold">{member.formNo}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-600/30 cursor-pointer"
              id="print-idcard-modal-btn"
            >
              <Printer className="w-4 h-4" />
              <span>{isHindi ? "प्रिंट करें" : "Print Pass"}</span>
            </button>
          </div>
        </div>

        {/* The Smart ID Card Canvas Preview */}
        <div ref={printRef} className="space-y-6">
          
          {/* Card Front */}
          <div className="relative mx-auto max-w-md bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-2 border-amber-400/80 rounded-2xl p-5 shadow-2xl overflow-hidden text-slate-100 print-card">
            
            {/* Background Hologram watermark effect */}
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
              <BookOpen className="w-48 h-48 text-white" />
            </div>

            {/* Header */}
            <div className="text-center border-b border-blue-500/30 pb-3 relative z-10">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                {LIBRARY_CONFIG.branding}
              </span>
              <h3 className="text-lg font-black text-white tracking-wide">
                {LIBRARY_CONFIG.name}
              </h3>
              <p className="text-[10px] text-blue-200 italic font-medium">
                "{LIBRARY_CONFIG.tagline}"
              </p>
              <p className="text-[9px] text-slate-400 mt-0.5">
                {LIBRARY_CONFIG.address} | Ph: {LIBRARY_CONFIG.phone1}
              </p>
            </div>

            {/* Card Badge */}
            <div className="flex justify-between items-center my-3 bg-blue-900/50 px-3 py-1 rounded-lg border border-blue-700/40 text-[11px]">
              <span className="text-amber-300 font-bold">STUDENT IDENTITY CARD</span>
              <span className="font-mono text-white font-bold">{member.formNo}</span>
            </div>

            {/* Main Details Grid */}
            <div className="grid grid-cols-3 gap-3 items-center">
              
              {/* Photo & QR */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-24 h-28 rounded-lg overflow-hidden border-2 border-amber-400 shadow-md bg-slate-800">
                  <img
                    src={member.photoUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80"}
                    alt={member.fullNameEnglish}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/50">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>VERIFIED</span>
                </div>
              </div>

              {/* Info Details */}
              <div className="col-span-2 space-y-1 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block leading-tight">Student Name</span>
                  <span className="text-white font-black text-sm tracking-wide block">{member.fullNameEnglish}</span>
                  <span className="text-[11px] text-blue-300 block font-medium">{member.fullNameHindi}</span>
                </div>

                <div className="grid grid-cols-2 gap-1 pt-1 text-[11px]">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Father's Name</span>
                    <span className="text-slate-200 font-semibold truncate block">{member.fatherNameEnglish}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">Contact</span>
                    <span className="text-amber-300 font-mono font-bold block">{member.mobileNumber}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 pt-1 text-[11px]">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Seat Assigned</span>
                    <span className="text-amber-300 font-black font-mono block">{member.seatNumber}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">Shift Timing</span>
                    <span className="text-blue-300 font-semibold block">{member.shift}</span>
                  </div>
                </div>

                <div className="pt-1 text-[10px]">
                  <span className="text-[9px] text-slate-400 block">Validity</span>
                  <span className="text-emerald-400 font-mono font-bold block">
                    {member.validFrom} to {member.validUpto}
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Bar with Signature & QR */}
            <div className="mt-4 pt-2 border-t border-slate-800 flex justify-between items-end text-[10px]">
              <div className="flex items-center gap-1.5 text-slate-400">
                <div className="w-8 h-8 bg-white p-0.5 rounded flex items-center justify-center">
                  <QrCode className="w-7 h-7 text-black" />
                </div>
                <span className="text-[8px] leading-tight text-slate-400">
                  Scan to verify<br />Library Access
                </span>
              </div>

              <div className="text-right">
                <div className="h-6 flex items-end justify-end">
                  <span className="font-serif italic text-amber-300 text-xs font-bold border-b border-dashed border-slate-600 pb-0.5">
                    Authorized Signatory
                  </span>
                </div>
                <span className="text-[8px] text-slate-500 block">Nandini Digital Library</span>
              </div>
            </div>

          </div>

          {/* Detailed Admission Receipt (Printable A4 section) */}
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700 text-xs space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Full Admission Summary / प्रवेश विवरण</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800 text-slate-300">
              <div>
                <span className="text-slate-400 block text-[10px]">Candidate Full Name</span>
                <strong className="text-white">{member.fullNameEnglish}</strong>
                <span className="text-slate-400 text-[11px] block">{member.fullNameHindi}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Mother's Name</span>
                <strong className="text-white">{member.motherNameEnglish}</strong>
                <span className="text-slate-400 text-[11px] block">{member.motherNameHindi}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Father's Name</span>
                <strong className="text-white">{member.fatherNameEnglish}</strong>
                <span className="text-slate-400 text-[11px] block">{member.fatherNameHindi}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Target Exam</span>
                <span className="text-blue-300 font-semibold">{member.targetExam}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Address</span>
                <span className="text-slate-200">{member.fullAddress || 'Dudahi, Kushinagar'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Fee Payment</span>
                <span className="text-emerald-400 font-bold">₹{member.amountPaid} ({member.paymentMode} - {member.paymentStatus})</span>
              </div>
            </div>

            <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-800/40 text-[11px] text-blue-200">
              <strong>Library Rules Notice:</strong> 1. Maintain complete silence in reading zone. 2. Phone must be strictly on silent/vibrate mode. 3. Carry this ID card at all times.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
