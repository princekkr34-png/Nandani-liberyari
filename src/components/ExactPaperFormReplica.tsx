import React, { useState, useRef } from 'react';
import { 
  Printer, 
  Download, 
  Sparkles, 
  RotateCcw, 
  Upload, 
  Check, 
  FileText, 
  Edit3, 
  Eye, 
  CheckCircle2,
  Camera,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RegistrationData, ShiftType } from '../types';
import { LIBRARY_CONFIG, SHIFTS_DATA } from '../data/initialData';
import { transliterateEnglishToHindi } from '../utils/hindiTransliterate';

interface ExactPaperFormReplicaProps {
  onSaveRegistration?: (data: RegistrationData) => void;
  language: 'en' | 'hi';
}

export const ExactPaperFormReplica: React.FC<ExactPaperFormReplicaProps> = ({
  onSaveRegistration,
  language
}) => {
  const isHindi = language === 'hi';
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Mode: 'filled' (handwritten as in photo) | 'custom' (user typing) | 'blank' (for paper print)
  const [formMode, setFormMode] = useState<'filled' | 'custom' | 'blank'>('filled');
  
  // Font style for filled letters: 'handwritten' (looks like written by pen) or 'printed' (clean block caps)
  const [letterStyle, setLetterStyle] = useState<'handwritten' | 'printed'>('handwritten');

  // Form State
  const [formNumber, setFormNumber] = useState('NDL-2026-0842');
  const [formDate, setFormDate] = useState('18/08/2026');
  
  const [nameEnglish, setNameEnglish] = useState('PRINCE KUMAR');
  const [nameHindi, setNameHindi] = useState('प्रिंस कुमार');
  
  const [motherEnglish, setMotherEnglish] = useState('PREMSHILA DEVI');
  const [motherHindi, setMotherHindi] = useState('प्रेमशिला देवी');
  
  const [fatherEnglish, setFatherEnglish] = useState('SHARMA MADDHESHIYA');
  const [fatherHindi, setFatherHindi] = useState('शर्मा मद्धेशिया');

  const [dob, setDob] = useState('14/05/2002');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [mobile, setMobile] = useState('9628321238');
  const [altMobile, setAltMobile] = useState('9721988864');
  const [aadhaar, setAadhaar] = useState('7845 2310 9941');
  const [address, setAddress] = useState('Main Market Road, Near Post Office, Dudahi (Kushinagar) U.P.');
  const [exam, setExam] = useState('UPSC / UPPSC Civil Services');
  const [shift, setShift] = useState<ShiftType>('FullDay');
  const [seatNo, setSeatNo] = useState('Desk-14');
  const [duration, setDuration] = useState('3 Months');
  const [feePaid, setFeePaid] = useState('2100');
  
  const [photoUrl, setPhotoUrl] = useState<string>('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80');

  // Reset to photo sample data
  const handleLoadPhotoData = () => {
    setFormMode('filled');
    setNameEnglish('PRINCE KUMAR');
    setNameHindi('प्रिंस कुमार');
    setMotherEnglish('PREMSHILA DEVI');
    setMotherHindi('प्रेमशिला देवी');
    setFatherEnglish('SHARMA MADDHESHIYA');
    setFatherHindi('शर्मा मद्धेशिया');
    setMobile('9628321238');
    setAltMobile('9721988864');
    setAddress('Main Market Road, Near Post Office, Dudahi (Kushinagar) U.P.');
    setExam('UPSC / UPPSC Civil Services');
    setShift('FullDay');
    setSeatNo('Desk-14');
    setPhotoUrl('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80');
  };

  // Reset to blank for printing
  const handleSetBlank = () => {
    setFormMode('blank');
    setNameEnglish('');
    setNameHindi('');
    setMotherEnglish('');
    setMotherHindi('');
    setFatherEnglish('');
    setFatherHindi('');
    setMobile('');
    setAltMobile('');
    setAadhaar('');
    setAddress('');
    setExam('');
    setPhotoUrl('');
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Render authentic connected character boxes as in physical form
  const renderConnectedBoxes = (
    text: string, 
    onChangeText: (val: string) => void, 
    boxCount = 24, 
    fieldId: string
  ) => {
    const isBlank = formMode === 'blank';
    const cleanText = isBlank ? '' : text.toUpperCase();
    const chars = cleanText.padEnd(boxCount, ' ').slice(0, boxCount).split('');

    return (
      <div className="w-full">
        {/* Hidden or direct input for typing */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          
          {/* Connected Boxes Container */}
          <div className="flex border border-slate-700 bg-white rounded-none shadow-xs overflow-x-auto w-full">
            {chars.map((char, index) => {
              const hasChar = char !== ' ';
              return (
                <div
                  key={index}
                  className={`flex-1 min-w-[20px] max-w-[28px] h-8 sm:h-9 border-r border-slate-700 last:border-r-0 flex items-center justify-center select-none ${
                    hasChar ? 'bg-blue-50/30' : 'bg-white'
                  }`}
                >
                  <span 
                    className={`text-base sm:text-lg font-bold ${
                      letterStyle === 'handwritten' 
                        ? 'font-["Caveat",cursive] text-blue-900 font-black text-xl leading-none pt-0.5' 
                        : 'font-mono text-slate-900 font-bold'
                    }`}
                  >
                    {isBlank ? '' : (char === ' ' ? '' : char)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Edit Input in custom mode */}
          {formMode !== 'blank' && (
            <input
              type="text"
              value={text}
              onChange={(e) => onChangeText(e.target.value.toUpperCase())}
              placeholder="Type here to update boxes..."
              className="no-print w-full sm:w-56 bg-slate-800 text-amber-300 font-mono text-xs px-2.5 py-1.5 rounded border border-slate-700 focus:outline-none focus:border-blue-500 uppercase"
              id={`quick-edit-${fieldId}`}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Toolbar / Mode Selector */}
      <div className="no-print bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Exact Photo Replica / हूबहू फोटो रूप</span>
          </span>
          <span className="text-xs text-slate-300 hidden sm:inline">
            100% Matching "Nandini Digital Library" Physical Paper Form
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Preset Buttons */}
          <button
            onClick={handleLoadPhotoData}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              formMode === 'filled'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            id="photo-preset-btn"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Photo Data (Prince Kumar)</span>
          </button>

          <button
            onClick={() => setFormMode('custom')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              formMode === 'custom'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            id="custom-mode-btn"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Interactive Edit Mode</span>
          </button>

          <button
            onClick={handleSetBlank}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              formMode === 'blank'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            id="blank-mode-btn"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Blank Paper Form</span>
          </button>

          {/* Letter style toggle */}
          <button
            onClick={() => setLetterStyle(letterStyle === 'handwritten' ? 'printed' : 'handwritten')}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-xl text-xs border border-slate-700 cursor-pointer"
            id="letter-style-toggle"
            title="Toggle Handwritten pen style / block print"
          >
            Font: <span className="text-amber-300 font-bold">{letterStyle === 'handwritten' ? 'Pen / Cursive' : 'Block Print'}</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-4 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-blue-600/30 cursor-pointer"
            id="print-replica-btn"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Form (A4)</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* THE EXACT 1:1 PAPER FORM REPLICA CANVAS (Matches the physical photo) */}
      {/* ==================================================================== */}
      <div 
        id="physical-paper-form"
        className="bg-white text-slate-900 p-6 sm:p-10 rounded-xl shadow-2xl border-2 border-slate-400 font-['Outfit',sans-serif] relative overflow-hidden transition-all print-card"
        style={{ minHeight: '850px' }}
      >
        
        {/* Top Header Section */}
        <div className="relative border-b-2 border-slate-800 pb-4 mb-4">
          
          {/* Top Left: Stylized Cursive Sub-heading "Achiever's Choice" */}
          <div className="text-left">
            <span 
              className="text-lg sm:text-2xl font-bold italic tracking-wide text-slate-800 block"
              style={{ fontFamily: "'Caveat', 'Dancing Script', cursive" }}
            >
              Achiever's Choice
            </span>
          </div>

          {/* Main Huge Blue Title: "Nandini Digital Library" */}
          <div className="text-left mt-0.5">
            <h1 
              className="text-3xl sm:text-5xl font-black tracking-tight"
              style={{ color: '#1e4b8a', fontFamily: "'Outfit', sans-serif" }}
            >
              Nandini Digital Library
            </h1>
          </div>

          {/* Tagline & Contact Details */}
          <div className="text-center mt-2 space-y-1">
            <p className="text-xs sm:text-sm text-slate-700 italic font-medium">
              Convert your energy into success...
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              Add.: Dudahi (Kushinagar) U.P.
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-900 tracking-wide">
              Cell : 9628321238, 9721988864
            </p>
          </div>

          {/* Centered Pill Capsule Badge: "Registration Form" */}
          <div className="text-center mt-3">
            <div 
              className="inline-block px-8 py-1.5 rounded-2xl border-2 border-slate-800 bg-white shadow-xs"
            >
              <h2 className="text-base sm:text-xl font-bold text-slate-900 tracking-wide">
                Registration Form
              </h2>
            </div>
          </div>

          {/* Top Right: "Photo" Box as in the photo */}
          <div className="absolute top-2 right-0 flex flex-col items-center">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-24 sm:w-28 h-28 sm:h-36 border-2 border-slate-600 rounded-lg flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden cursor-pointer hover:bg-slate-100 transition-colors group"
            >
              {photoUrl && formMode !== 'blank' ? (
                <>
                  <img 
                    src={photoUrl} 
                    alt="Student Photo" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="no-print absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] transition-opacity">
                    <Camera className="w-4 h-4 mb-1" />
                    <span>Change</span>
                  </div>
                </>
              ) : (
                <div className="text-center p-2">
                  <span className="text-sm sm:text-base font-semibold text-slate-600 block">Photo</span>
                  <span className="text-[10px] text-slate-400 block no-print mt-1">Click to add</span>
                </div>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              className="hidden" 
            />
          </div>

        </div>

        {/* Top Meta Line: No. / Date */}
        <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-slate-800 mb-6 pt-1">
          <div className="flex items-baseline gap-2">
            <span>No.</span>
            <div className="border-b border-slate-800 w-44 sm:w-56 pb-0.5 px-2 font-mono font-bold text-blue-900">
              {formMode === 'blank' ? '' : formNumber}
            </div>
          </div>

          <div className="flex items-baseline gap-2 pr-2">
            <span>Date :</span>
            <div className="border-b border-slate-800 w-28 sm:w-36 pb-0.5 px-2 font-mono font-semibold text-slate-800">
              {formMode === 'blank' ? '' : formDate}
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* ROW 1: NAME (IN ENGLISH) & (हिंदी में) */}
        {/* ==================================================================== */}
        <div className="space-y-2 mb-6">
          
          {/* Label + English Boxes */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap min-w-[170px]">
              Name (in English) :
            </span>
            <div className="flex-1 w-full">
              {renderConnectedBoxes(nameEnglish, setNameEnglish, 24, 'name-eng')}
            </div>
          </div>

          {/* Hindi Dotted Line */}
          <div className="flex items-baseline gap-2 pl-2">
            <span className="text-xs sm:text-sm font-bold text-slate-800 whitespace-nowrap">
              (हिंदी में) :
            </span>
            <div className="flex-1 border-b border-dotted border-slate-700 pb-0.5 px-2">
              <span className={`text-sm sm:text-base font-bold ${letterStyle === 'handwritten' ? 'font-["Kalam",sans-serif] text-blue-900 text-lg' : 'text-slate-900'}`}>
                {formMode === 'blank' ? '' : nameHindi}
              </span>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* ROW 2: MOTHER'S NAME (IN ENGLISH) & (हिंदी में) */}
        {/* ==================================================================== */}
        <div className="space-y-2 mb-6">
          
          {/* Label + English Boxes */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap min-w-[170px]">
              Mother's Name (in English) :
            </span>
            <div className="flex-1 w-full">
              {renderConnectedBoxes(motherEnglish, setMotherEnglish, 24, 'mother-eng')}
            </div>
          </div>

          {/* Hindi Dotted Line */}
          <div className="flex items-baseline gap-2 pl-2">
            <span className="text-xs sm:text-sm font-bold text-slate-800 whitespace-nowrap">
              (हिंदी में) :
            </span>
            <div className="flex-1 border-b border-dotted border-slate-700 pb-0.5 px-2">
              <span className={`text-sm sm:text-base font-bold ${letterStyle === 'handwritten' ? 'font-["Kalam",sans-serif] text-blue-900 text-lg' : 'text-slate-900'}`}>
                {formMode === 'blank' ? '' : motherHindi}
              </span>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* ROW 3: FATHER'S NAME (IN ENGLISH) & (हिंदी में) */}
        {/* ==================================================================== */}
        <div className="space-y-2 mb-6">
          
          {/* Label + English Boxes */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap min-w-[170px]">
              Father's Name (in English) :
            </span>
            <div className="flex-1 w-full">
              {renderConnectedBoxes(fatherEnglish, setFatherEnglish, 24, 'father-eng')}
            </div>
          </div>

          {/* Hindi Dotted Line */}
          <div className="flex items-baseline gap-2 pl-2">
            <span className="text-xs sm:text-sm font-bold text-slate-800 whitespace-nowrap">
              (हिंदी में) :
            </span>
            <div className="flex-1 border-b border-dotted border-slate-700 pb-0.5 px-2">
              <span className={`text-sm sm:text-base font-bold ${letterStyle === 'handwritten' ? 'font-["Kalam",sans-serif] text-blue-900 text-lg' : 'text-slate-900'}`}>
                {formMode === 'blank' ? '' : fatherHindi}
              </span>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* ROW 4: D.O.B., GENDER, AADHAAR */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap">
              Date of Birth :
            </span>
            <div className="flex-1 border-b border-dotted border-slate-700 pb-0.5 px-2 font-mono font-bold text-blue-900 text-xs sm:text-sm">
              {formMode === 'blank' ? '' : dob}
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap">
              Gender :
            </span>
            <div className="flex-1 border-b border-dotted border-slate-700 pb-0.5 px-2 font-bold text-blue-900 text-xs sm:text-sm">
              {formMode === 'blank' ? '' : gender}
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap">
              Aadhaar No. :
            </span>
            <div className="flex-1 border-b border-dotted border-slate-700 pb-0.5 px-2 font-mono font-bold text-blue-900 text-xs sm:text-sm">
              {formMode === 'blank' ? '' : aadhaar}
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* ROW 5: MOBILE & ALT MOBILE */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div className="flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap">
              Mobile No. / मोबाइल :
            </span>
            <div className="flex-1 border-b border-dotted border-slate-700 pb-0.5 px-2 font-mono font-bold text-blue-900 text-xs sm:text-sm">
              {formMode === 'blank' ? '' : mobile}
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap">
              Alt. / Parent Mobile :
            </span>
            <div className="flex-1 border-b border-dotted border-slate-700 pb-0.5 px-2 font-mono font-bold text-blue-900 text-xs sm:text-sm">
              {formMode === 'blank' ? '' : altMobile}
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* ROW 6: FULL ADDRESS & TARGET EXAM */}
        {/* ==================================================================== */}
        <div className="space-y-4 mb-5">
          <div className="flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap">
              Full Address (स्थायी पता) :
            </span>
            <div className="flex-1 border-b border-dotted border-slate-700 pb-0.5 px-2 text-xs sm:text-sm font-semibold text-slate-800">
              {formMode === 'blank' ? '' : address}
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap">
              Target Exam (तैयारी हेतु परीक्षा) :
            </span>
            <div className="flex-1 border-b border-dotted border-slate-700 pb-0.5 px-2 text-xs sm:text-sm font-bold text-blue-900">
              {formMode === 'blank' ? '' : exam}
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* ROW 7: SHIFT TIMING, SEAT & FEE DETAILS */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6 bg-slate-50 p-3 rounded-lg border border-slate-300 text-xs">
          <div>
            <span className="font-bold text-slate-700 block">Shift Timing:</span>
            <span className="font-bold text-blue-900 text-xs sm:text-sm">
              {formMode === 'blank' ? '_____________________' : `${shift} (06:00 AM - 10:00 PM)`}
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-700 block">Desk / Seat No.:</span>
            <span className="font-mono font-bold text-amber-700 text-xs sm:text-sm">
              {formMode === 'blank' ? '________' : seatNo}
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-700 block">Duration:</span>
            <span className="font-bold text-slate-800 text-xs sm:text-sm">
              {formMode === 'blank' ? '________' : duration}
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-700 block">Total Fee:</span>
            <span className="font-bold text-emerald-800 text-xs sm:text-sm">
              {formMode === 'blank' ? '________' : `₹${feePaid} (Paid)`}
            </span>
          </div>
        </div>

        {/* Rules & Declarations */}
        <div className="text-[10px] sm:text-xs text-slate-600 space-y-1 mb-8 border-t border-slate-300 pt-3">
          <p className="font-bold text-slate-800">नियम व घोषणा (Rules & Declaration):</p>
          <p>1. लाइब्रेरी परिसर में 100% शांति (Pin-Drop Silence) बनाए रखना अनिवार्य है। मोबाइल फोन साइलेंट पर रखें।</p>
          <p>2. आवंटित सीट एवं सामग्री की सुरक्षा स्वयं की जिम्मेदारी होगी।</p>
          <p>3. मैं घोषणा करता/करती हूँ कि ऊपर दी गई सभी जानकारी पूर्णतः सत्य है।</p>
        </div>

        {/* Bottom Signatures Box */}
        <div className="flex justify-between items-end pt-6 border-t-2 border-slate-400 text-xs font-bold text-slate-800">
          <div className="text-center">
            <div className="w-36 sm:w-48 border-b-2 border-slate-700 pb-1 mb-1">
              <span className={`text-base sm:text-lg italic font-["Caveat",cursive] text-blue-900 ${formMode === 'blank' ? 'invisible' : ''}`}>
                Prince Kumar
              </span>
            </div>
            <span>Signature of Candidate (छात्र के हस्ताक्षर)</span>
          </div>

          <div className="text-center">
            <div className="w-36 sm:w-48 border-b-2 border-slate-700 pb-1 mb-1 flex items-center justify-center">
              <span className={`text-xs sm:text-sm italic font-serif text-slate-700 font-bold ${formMode === 'blank' ? 'invisible' : ''}`}>
                Nandini Digital Library
              </span>
            </div>
            <span>Authorized Signatory (प्रबंधक/निदेशक)</span>
          </div>
        </div>

      </div>

    </div>
  );
};
