import React, { useState, useRef } from 'react';
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Upload, 
  Camera, 
  CheckCircle, 
  Sparkles, 
  Printer, 
  CreditCard, 
  Clock, 
  Shield, 
  BookOpen,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RegistrationData, ShiftType, PlanDuration, PaymentMode } from '../types';
import { LIBRARY_CONFIG, SHIFTS_DATA } from '../data/initialData';
import { transliterateEnglishToHindi } from '../utils/hindiTransliterate';

interface RegistrationFormProps {
  onRegisterSuccess: (data: RegistrationData) => void;
  language: 'en' | 'hi';
  onViewIdCard: (data: RegistrationData) => void;
  availableSeats: string[];
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onRegisterSuccess,
  language,
  onViewIdCard,
  availableSeats
}) => {
  const isHindi = language === 'hi';
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form State
  const [formNo, setFormNo] = useState(`NDL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  const [regDate, setRegDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [fullNameEnglish, setFullNameEnglish] = useState('');
  const [fullNameHindi, setFullNameHindi] = useState('');
  
  const [motherNameEnglish, setMotherNameEnglish] = useState('');
  const [motherNameHindi, setMotherNameHindi] = useState('');
  
  const [fatherNameEnglish, setFatherNameEnglish] = useState('');
  const [fatherNameHindi, setFatherNameHindi] = useState('');
  
  const [dob, setDob] = useState('2002-05-14');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [aadhaarNo, setAadhaarNo] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [altMobileNumber, setAltMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [city, setCity] = useState('Dudahi (Kushinagar)');
  const [state, setState] = useState('Uttar Pradesh');
  const [pincode, setPincode] = useState('274302');
  
  const [targetExam, setTargetExam] = useState('UPSC / UPPSC Civil Services');
  const [qualification, setQualification] = useState('Graduate');
  const [collegeOrSchool, setCollegeOrSchool] = useState('');
  
  const [shift, setShift] = useState<ShiftType>('FullDay');
  const [seatNumber, setSeatNumber] = useState(availableSeats[0] || 'Desk-14');
  const [planDuration, setPlanDuration] = useState<PlanDuration>('3 Months');
  const [lockerRequired, setLockerRequired] = useState(true);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('UPI / QR');
  const [notes, setNotes] = useState('');
  
  const [photoUrl, setPhotoUrl] = useState<string>('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80');
  const [submittedData, setSubmittedData] = useState<RegistrationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Auto-transliterate on English input change
  const handleNameEngChange = (val: string) => {
    const upper = val.toUpperCase();
    setFullNameEnglish(upper);
    if (!fullNameHindi || fullNameHindi === transliterateEnglishToHindi(fullNameEnglish)) {
      setFullNameHindi(transliterateEnglishToHindi(upper));
    }
  };

  const handleMotherEngChange = (val: string) => {
    const upper = val.toUpperCase();
    setMotherNameEnglish(upper);
    if (!motherNameHindi || motherNameHindi === transliterateEnglishToHindi(motherNameEnglish)) {
      setMotherNameHindi(transliterateEnglishToHindi(upper));
    }
  };

  const handleFatherEngChange = (val: string) => {
    const upper = val.toUpperCase();
    setFatherNameEnglish(upper);
    if (!fatherNameHindi || fatherNameHindi === transliterateEnglishToHindi(fatherNameEnglish)) {
      setFatherNameHindi(transliterateEnglishToHindi(upper));
    }
  };

  // Quick fill from the physical photo uploaded by user
  const loadPhotoSampleData = () => {
    setFullNameEnglish('PRINCE KUMAR');
    setFullNameHindi('प्रिंस कुमार');
    setMotherNameEnglish('PREMSHILA DEVI');
    setMotherNameHindi('प्रेमशिला देवी');
    setFatherNameEnglish('SHARMA MADDHESHIYA');
    setFatherNameHindi('शर्मा मद्धेशिया');
    setMobileNumber('9628321238');
    setAltMobileNumber('9721988864');
    setFullAddress('Main Market Road, Near Post Office, Dudahi');
    setCity('Dudahi (Kushinagar)');
    setState('Uttar Pradesh');
    setPincode('274302');
    setTargetExam('UPSC / UPPSC Civil Services');
    setQualification('B.Sc. Graduate');
    setCollegeOrSchool('DDU Gorakhpur University');
    setShift('FullDay');
    setPlanDuration('3 Months');
    setLockerRequired(true);
    setPhotoUrl('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80');
    setSeatNumber('Desk-14');
  };

  // Calculate Fee
  const calculateTotalFee = (): number => {
    const currentShift = SHIFTS_DATA.find(s => s.type === shift);
    const baseMonthly = currentShift ? currentShift.fee : 600;
    
    let multiplier = 1;
    let discount = 0;
    if (planDuration === '1 Month') {
      multiplier = 1;
      discount = 0;
    } else if (planDuration === '3 Months') {
      multiplier = 3;
      discount = 200;
    } else if (planDuration === '6 Months') {
      multiplier = 6;
      discount = 600;
    } else if (planDuration === '1 Year') {
      multiplier = 12;
      discount = 1800;
    }

    const lockerFee = lockerRequired ? (planDuration === '1 Month' ? 100 : planDuration === '3 Months' ? 250 : 500) : 0;
    return Math.max(0, (baseMonthly * multiplier) - discount + lockerFee);
  };

  // Handle Photo Upload
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

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullNameEnglish.trim()) {
      alert(isHindi ? 'कृपया छात्र का नाम (अंग्रेजी में) भरें' : 'Please fill Full Name in English');
      return;
    }
    if (!mobileNumber.trim()) {
      alert(isHindi ? 'कृपया मोबाइल नंबर भरें' : 'Please fill Mobile Number');
      return;
    }

    setIsSubmitting(true);

    const validFromDate = new Date(regDate);
    const validUptoDate = new Date(regDate);
    const monthsToAdd = planDuration === '1 Month' ? 1 : planDuration === '3 Months' ? 3 : planDuration === '6 Months' ? 6 : 12;
    validUptoDate.setMonth(validUptoDate.getMonth() + monthsToAdd);

    const selectedShiftObj = SHIFTS_DATA.find(s => s.type === shift);

    const newRecord: RegistrationData = {
      id: `reg-${Date.now()}`,
      formNo,
      registrationDate: regDate,
      fullNameEnglish: fullNameEnglish.toUpperCase(),
      fullNameHindi: fullNameHindi || transliterateEnglishToHindi(fullNameEnglish),
      motherNameEnglish: motherNameEnglish.toUpperCase(),
      motherNameHindi: motherNameHindi || transliterateEnglishToHindi(motherNameEnglish),
      fatherNameEnglish: fatherNameEnglish.toUpperCase(),
      fatherNameHindi: fatherNameHindi || transliterateEnglishToHindi(fatherNameEnglish),
      dob,
      gender,
      aadhaarNo: aadhaarNo || '7845 2310 9941',
      mobileNumber,
      altMobileNumber,
      email: email || `${fullNameEnglish.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      fullAddress: fullAddress || 'Dudahi, Kushinagar, Uttar Pradesh',
      city,
      state,
      pincode,
      targetExam,
      qualification,
      collegeOrSchool,
      shift,
      shiftTiming: selectedShiftObj ? `${selectedShiftObj.timing} (${selectedShiftObj.hours})` : 'Full Day 06:00 AM - 10:00 PM',
      seatNumber: seatNumber || 'Desk-14',
      planDuration,
      amountPaid: calculateTotalFee(),
      paymentMode,
      paymentStatus: 'Paid',
      validFrom: validFromDate.toISOString().split('T')[0],
      validUpto: validUptoDate.toISOString().split('T')[0],
      lockerRequired,
      lockerNumber: lockerRequired ? `L-${seatNumber.replace(/\D/g, '') || '14'}` : undefined,
      photoUrl,
      notes,
      status: 'Active',
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      onRegisterSuccess(newRecord);
      setSubmittedData(newRecord);
      setIsSubmitting(false);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log(err);
      }
    }, 500);
  };

  // Render individual character box preview (as on physical paper form)
  const renderCharacterBoxes = (text: string, maxBoxes = 22) => {
    const chars = text.padEnd(maxBoxes, ' ').slice(0, maxBoxes).split('');
    return (
      <div className="flex flex-wrap gap-1 mt-1 font-mono text-xs overflow-x-auto py-1">
        {chars.map((ch, idx) => (
          <span 
            key={idx} 
            className={`w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center border text-sm font-bold uppercase rounded-sm ${
              ch !== ' ' 
                ? 'bg-blue-950/80 border-blue-400 text-blue-200 shadow-xs' 
                : 'bg-slate-900/50 border-slate-700 text-transparent'
            }`}
          >
            {ch === ' ' ? '·' : ch}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Banner & Quick Loader */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border border-blue-700/40 p-4 sm:p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              {LIBRARY_CONFIG.branding}
            </span>
            <span className="text-xs text-blue-300 font-medium">Digital Form System</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-400" />
            {isHindi ? "नंदिनी डिजिटल लाइब्रेरी - छात्र प्रवेश फॉर्म" : "Nandini Digital Library - Student Admission Form"}
          </h2>
          <p className="text-xs text-slate-300">
            {isHindi ? "दिए गए फॉर्म को भरें या फोटो से सीधा डेटा लोड करें" : "Digitized version of physical registration form. Fill details below or load from sample photo."}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={loadPhotoSampleData}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            id="load-sample-photo-btn"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{isHindi ? "फोटो से डेटा भरें (प्रिंस कुमार)" : "Pre-fill From Photo (Prince Kumar)"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setFullNameEnglish('');
              setFullNameHindi('');
              setMotherNameEnglish('');
              setMotherNameHindi('');
              setFatherNameEnglish('');
              setFatherNameHindi('');
              setMobileNumber('');
              setSubmittedData(null);
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-xl text-xs border border-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
            id="reset-form-btn"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isHindi ? "खाली करें" : "Clear"}</span>
          </button>
        </div>
      </div>

      {/* Success Modal / State Banner if submitted */}
      {submittedData && (
        <div className="bg-emerald-950/70 border-2 border-emerald-500/80 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {isHindi ? "प्रवेश सफलतापूर्वक दर्ज हुआ!" : "Admission Registered Successfully!"}
                </h3>
                <p className="text-xs text-emerald-300">
                  Form No: <strong className="text-white font-mono">{submittedData.formNo}</strong> | Member: <strong className="text-white">{submittedData.fullNameEnglish}</strong> ({submittedData.fullNameHindi})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onViewIdCard(submittedData)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-blue-600/30 cursor-pointer"
                id="view-idcard-btn"
              >
                <CreditCard className="w-4 h-4" />
                <span>{isHindi ? "डिजिटल आईडी कार्ड देखें" : "View Official ID Card"}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                id="print-form-btn"
              >
                <Printer className="w-4 h-4" />
                <span>{isHindi ? "प्रवेश पर्ची प्रिंट करें" : "Print Admission Slip"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block">Assigned Seat</span>
              <span className="text-amber-300 font-bold font-mono text-sm">{submittedData.seatNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Shift Timing</span>
              <span className="text-blue-300 font-semibold">{submittedData.shiftTiming}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Plan Validity</span>
              <span className="text-emerald-300 font-semibold">{submittedData.validFrom} to {submittedData.validUpto}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Total Fee Paid</span>
              <span className="text-emerald-400 font-black text-sm">₹{submittedData.amountPaid}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Authentic Physical-Form Themed Container */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header Header exactly matching the physical form in the photo */}
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-6 sm:p-8 border-b-2 border-blue-500/30 text-center relative">
          
          <div className="absolute top-4 left-4 hidden sm:block">
            <span className="text-xs text-slate-400 font-mono">Form No: {formNo}</span>
          </div>

          <div className="max-w-2xl mx-auto space-y-1">
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-amber-400 uppercase">
              {LIBRARY_CONFIG.branding}
            </p>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-400 tracking-tight">
              {LIBRARY_CONFIG.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 italic font-medium">
              "{LIBRARY_CONFIG.tagline}"
            </p>
            <p className="text-xs text-slate-400 pt-1">
              <strong>Add.:</strong> {LIBRARY_CONFIG.address} &nbsp;|&nbsp; <strong>Cell :</strong> {LIBRARY_CONFIG.phone1}, {LIBRARY_CONFIG.phone2}
            </p>
          </div>

          {/* Bordered Pill Header: "Registration Form" as seen in the photo */}
          <div className="mt-4 inline-block">
            <div className="px-6 py-1.5 rounded-2xl border-2 border-blue-400/80 bg-blue-950/60 shadow-md">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Registration Form
              </h2>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">

          {/* Top Form Meta & Photo Slot */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            
            {/* Meta Inputs (Form No, Date, Aadhaar) */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Form No. / पंजीकरण संख्या <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formNo}
                  onChange={(e) => setFormNo(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-amber-300 font-bold focus:border-blue-500 focus:outline-none"
                  required
                  id="input-form-no"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Date / दिनांक <span className="text-rose-400">*</span>
                </label>
                <input
                  type="date"
                  value={regDate}
                  onChange={(e) => setRegDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                  required
                  id="input-reg-date"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Aadhaar No. / आधार नंबर
                </label>
                <input
                  type="text"
                  placeholder="XXXX XXXX XXXX"
                  value={aadhaarNo}
                  onChange={(e) => setAadhaarNo(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                  id="input-aadhaar"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Date of Birth / जन्मतिथि
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                  id="input-dob"
                />
              </div>
            </div>

            {/* Photo Box (Just as framed on the physical registration sheet) */}
            <div className="flex flex-col items-center justify-center p-3 bg-slate-800/60 rounded-xl border border-slate-700">
              <div className="w-28 h-36 border-2 border-dashed border-slate-500 rounded-lg flex flex-col items-center justify-center relative overflow-hidden bg-slate-900 group">
                {photoUrl ? (
                  <>
                    <img 
                      src={photoUrl} 
                      alt="Student Candidate" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-[10px] p-1 text-center">
                      <Camera className="w-4 h-4 mb-1" />
                      <span>Change Photo</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-2">
                    <User className="w-8 h-8 text-slate-500 mx-auto mb-1" />
                    <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Photo</span>
                    <span className="text-[9px] text-slate-500 block">Passport Size</span>
                  </div>
                )}
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handlePhotoUpload} 
                className="hidden" 
                id="file-photo-input"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-[11px] font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded border border-slate-700 transition-colors cursor-pointer"
                id="btn-upload-photo"
              >
                <Upload className="w-3 h-3" />
                <span>{photoUrl ? 'Update Photo' : 'Upload Photo'}</span>
              </button>
            </div>
          </div>

          {/* Section 1: Candidate Name & Parents Names (With Character Grid Box Visualizer as seen in photo) */}
          <div className="space-y-6 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>1. Student & Family Information (छात्र एवं पारिवारिक विवरण)</span>
            </h3>

            {/* Field 1: Name */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <label className="text-xs sm:text-sm font-bold text-slate-200">
                  Name (in English / अंग्रेजी में) : <span className="text-rose-400">*</span>
                </label>
                <span className="text-[11px] text-slate-400">Block Letters (CAPITAL ONLY)</span>
              </div>
              
              <input
                type="text"
                placeholder="e.g. PRINCE KUMAR"
                value={fullNameEnglish}
                onChange={(e) => handleNameEngChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm font-mono uppercase tracking-wider text-white font-bold focus:border-blue-400 focus:outline-none"
                required
                id="input-name-english"
              />

              {/* Character Box Visualization */}
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Box Format / फॉर्म ग्रिड दृश्य:</span>
                {renderCharacterBoxes(fullNameEnglish || 'PRINCE KUMAR')}
              </div>

              {/* Name in Hindi */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  (हिंदी में) :
                </label>
                <input
                  type="text"
                  placeholder="उदा. प्रिंस कुमार"
                  value={fullNameHindi}
                  onChange={(e) => setFullNameHindi(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-blue-200 focus:border-blue-400 focus:outline-none"
                  id="input-name-hindi"
                />
              </div>
            </div>

            {/* Field 2: Mother's Name */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <label className="text-xs sm:text-sm font-bold text-slate-200">
                  Mother's Name (in English / माता का नाम अंग्रेजी में) :
                </label>
                <span className="text-[11px] text-slate-400">Block Letters</span>
              </div>
              
              <input
                type="text"
                placeholder="e.g. PREMSHILA DEVI"
                value={motherNameEnglish}
                onChange={(e) => handleMotherEngChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm font-mono uppercase tracking-wider text-white font-bold focus:border-blue-400 focus:outline-none"
                id="input-mother-english"
              />

              {/* Character Box Visualization */}
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Box Format / फॉर्म ग्रिड दृश्य:</span>
                {renderCharacterBoxes(motherNameEnglish || 'PREMSHILA DEVI')}
              </div>

              {/* Mother's Name in Hindi */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  (हिंदी में) :
                </label>
                <input
                  type="text"
                  placeholder="उदा. प्रेमशिला देवी"
                  value={motherNameHindi}
                  onChange={(e) => setMotherNameHindi(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-blue-200 focus:border-blue-400 focus:outline-none"
                  id="input-mother-hindi"
                />
              </div>
            </div>

            {/* Field 3: Father's Name */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <label className="text-xs sm:text-sm font-bold text-slate-200">
                  Father's Name (in English / पिता का नाम अंग्रेजी में) :
                </label>
                <span className="text-[11px] text-slate-400">Block Letters</span>
              </div>
              
              <input
                type="text"
                placeholder="e.g. SHARMA MADDHESHIYA"
                value={fatherNameEnglish}
                onChange={(e) => handleFatherEngChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm font-mono uppercase tracking-wider text-white font-bold focus:border-blue-400 focus:outline-none"
                id="input-father-english"
              />

              {/* Character Box Visualization */}
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Box Format / फॉर्म ग्रिड दृश्य:</span>
                {renderCharacterBoxes(fatherNameEnglish || 'SHARMA MADDHESHIYA')}
              </div>

              {/* Father's Name in Hindi */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  (हिंदी में) :
                </label>
                <input
                  type="text"
                  placeholder="उदा. शर्मा मद्धेशिया"
                  value={fatherNameHindi}
                  onChange={(e) => setFatherNameHindi(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-blue-200 focus:border-blue-400 focus:outline-none"
                  id="input-father-hindi"
                />
              </div>
            </div>

          </div>

          {/* Section 2: Contact Details & Address */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>2. Contact Details & Address (संपर्क एवं पता)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Mobile Number / मोबाइल नंबर <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="9628321238"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                  required
                  id="input-mobile"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Alternate / Parent Mobile / अभिभावक नंबर
                </label>
                <input
                  type="tel"
                  placeholder="9721988864"
                  value={altMobileNumber}
                  onChange={(e) => setAltMobileNumber(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                  id="input-alt-mobile"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address / ईमेल
                </label>
                <input
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                  id="input-email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Address / पूरा स्थायी पता
                </label>
                <input
                  type="text"
                  placeholder="Village / Ward / Street / Landmark"
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                  id="input-address"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  City / District
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                  id="input-city"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                  id="input-pincode"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Academic Goal & Preparation */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>3. Target Exam & Academic Qualification (लक्ष्य व योग्यता)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Exam / किस परीक्षा की तैयारी है?
                </label>
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                  id="select-target-exam"
                >
                  <option value="UPSC / UPPSC Civil Services">UPSC / UPPSC Civil Services</option>
                  <option value="SSC CGL / CHSL / MTS">SSC CGL / CHSL / MTS</option>
                  <option value="NEET / Medical Entrance">NEET / Medical Entrance</option>
                  <option value="JEE Main / Advanced">JEE Main / Advanced (Engineering)</option>
                  <option value="Banking / IBPS / SBI PO">Banking / IBPS / SBI PO</option>
                  <option value="Railway NTPC / Group D">Railway NTPC / Group D</option>
                  <option value="UP Police / SI / Constable">UP Police / SI / Constable</option>
                  <option value="Defense / NDA / CDS / AFCAT">Defense / NDA / CDS / AFCAT</option>
                  <option value="Academic / College / Board Exams">Academic / College / Board Exams</option>
                  <option value="CA / CS / Commerce">CA / CS / Commerce</option>
                  <option value="Other Self-Study">Other Competitive / Self Study</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Highest Qualification / उच्चतम योग्यता
                </label>
                <input
                  type="text"
                  placeholder="e.g. B.Sc. / 12th Pass / B.Tech"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                  id="input-qualification"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  College / Institute / School
                </label>
                <input
                  type="text"
                  placeholder="e.g. DDU Gorakhpur University"
                  value={collegeOrSchool}
                  onChange={(e) => setCollegeOrSchool(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                  id="input-college"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Shift Selection & Seat Assignment */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>4. Shift, Seat & Membership Plan (शिफ्ट व प्लान चयन)</span>
            </h3>

            {/* Shift Radio Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SHIFTS_DATA.map((s) => (
                <div
                  key={s.type}
                  onClick={() => setShift(s.type)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    shift === s.type
                      ? 'bg-blue-950/70 border-blue-400 ring-2 ring-blue-500/40 shadow-lg'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                  id={`shift-option-${s.type.toLowerCase()}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-white">{isHindi ? s.labelHindi : s.label}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{s.timing}</p>
                      <span className="text-[11px] text-blue-300 inline-block font-medium">{s.hours}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-amber-400">₹{s.fee}</span>
                      <span className="text-[10px] text-slate-400 block">/month</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Plan Duration & Desk Assignment */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Membership Duration / अवधि
                </label>
                <select
                  value={planDuration}
                  onChange={(e) => setPlanDuration(e.target.value as PlanDuration)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                  id="select-plan-duration"
                >
                  <option value="1 Month">1 Month (1 महीना)</option>
                  <option value="3 Months">3 Months (3 महीने) - Special Discount</option>
                  <option value="6 Months">6 Months (6 महीने) - Best Value</option>
                  <option value="1 Year">1 Year (वार्षिक पास) - Maximum Savings</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Seat / पसंदीदा डेस्क नंबर
                </label>
                <select
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-amber-300 font-bold focus:border-blue-500 focus:outline-none"
                  id="select-seat-number"
                >
                  {availableSeats.map(seat => (
                    <option key={seat} value={seat}>{seat} (Available)</option>
                  ))}
                  <option value="Desk-14">Desk-14 (Prime AC Zone)</option>
                  <option value="Desk-08">Desk-08 (Deluxe Cabin)</option>
                  <option value="Desk-21">Desk-21 (Power Desk)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Payment Mode / भुगतान विधि
                </label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value as PaymentMode)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                  id="select-payment-mode"
                >
                  <option value="UPI / QR">UPI / QR (GooglePay, PhonePe, Paytm)</option>
                  <option value="Cash">Cash at Reception Counter</option>
                  <option value="Card">Debit / Credit Card</option>
                  <option value="NetBanking">Net Banking</option>
                </select>
              </div>
            </div>

            {/* Locker Checkbox */}
            <div className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-xl border border-slate-700/60">
              <input
                type="checkbox"
                id="locker-check"
                checked={lockerRequired}
                onChange={(e) => setLockerRequired(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="locker-check" className="text-xs text-slate-200 cursor-pointer">
                <strong>Require Personal Book Storage Locker (व्यक्तिगत लॉकर चाहिए)</strong>
                <span className="text-slate-400 block text-[11px]">Free with 3+ Months Pass, ₹100/mo for 1 Month.</span>
              </label>
            </div>

          </div>

          {/* Fee Calculation Summary Box */}
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-5 rounded-xl border border-blue-500/30 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block">Total Admission & Library Fee</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-amber-400">₹{calculateTotalFee()}</span>
                <span className="text-xs text-slate-400">for {planDuration} ({shift} shift)</span>
              </div>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                <CheckCircle className="w-3 h-3" />
                <span>Includes High Speed 5G WiFi, AC Cabin, RO Water & Daily Newspapers</span>
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Library Help Desk</span>
              <span className="text-xs text-blue-300 font-mono font-bold">{LIBRARY_CONFIG.phone1} / {LIBRARY_CONFIG.phone2}</span>
            </div>
          </div>

          {/* Terms & Submit Button */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="terms-check"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-600 cursor-pointer"
              />
              <label htmlFor="terms-check" className="text-xs text-slate-400 cursor-pointer">
                I hereby declare that all information given above is true. I agree to maintain absolute pin-drop silence and follow all rules of <strong className="text-slate-200">Nandini Digital Library, Dudahi</strong>.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !agreedTerms}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              id="submit-admission-btn"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Processing Admission...</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-5 h-5 text-amber-300" />
                  <span>{isHindi ? "प्रवेश फॉर्म जमा करें एवं आईडी कार्ड जनरेट करें" : "Submit Registration & Generate Digital ID Card"}</span>
                </>
              )}
            </button>
          </div>

        </div>

      </form>

    </div>
  );
};
