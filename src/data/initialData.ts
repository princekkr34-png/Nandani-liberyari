import { RegistrationData, LibrarySeat, FeePlan, LibraryNotice, ShiftType } from '../types';

export const LIBRARY_CONFIG = {
  name: "Nandini Digital Library",
  tagline: "Convert your energy into success...",
  branding: "Achiever's Choice",
  address: "Dudahi (Kushinagar) U.P. - 274302",
  phone1: "9628321238",
  phone2: "9721988864",
  email: "nandinidigitallibrary@gmail.com",
  openingHours: "Open 24 Hours / 7 Days a Week",
  established: "2024",
  googleMapsQuery: "Dudahi Kushinagar Uttar Pradesh",
};

export const INITIAL_REGISTRATIONS: RegistrationData[] = [
  {
    id: "reg-001",
    formNo: "NDL-2026-0842",
    registrationDate: "2026-08-15",
    fullNameEnglish: "PRINCE KUMAR",
    fullNameHindi: "प्रिंस कुमार",
    motherNameEnglish: "PREMSHILA DEVI",
    motherNameHindi: "प्रेमशिला देवी",
    fatherNameEnglish: "SHARMA MADDHESHIYA",
    fatherNameHindi: "शर्मा मद्धेशिया",
    dob: "2002-05-14",
    gender: "Male",
    aadhaarNo: "7845 2310 9941",
    mobileNumber: "9628321238",
    altMobileNumber: "9721988864",
    email: "princekkr34@gmail.com",
    fullAddress: "Main Market Road, Near Post Office, Dudahi",
    city: "Dudahi (Kushinagar)",
    state: "Uttar Pradesh",
    pincode: "274302",
    targetExam: "UPSC / UPPSC Civil Services",
    qualification: "B.Sc. (Graduate)",
    collegeOrSchool: "DDU Gorakhpur University",
    shift: "FullDay",
    shiftTiming: "06:00 AM - 10:00 PM (16 Hrs)",
    seatNumber: "Desk-14",
    planDuration: "3 Months",
    amountPaid: 2100,
    paymentMode: "UPI / QR",
    paymentStatus: "Paid",
    validFrom: "2026-08-15",
    validUpto: "2026-11-15",
    lockerRequired: true,
    lockerNumber: "L-14",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    notes: "Physical Registration Form verified on spot. Dedicated student desk assigned.",
    status: "Active",
    createdAt: "2026-08-15T10:30:00Z"
  },
  {
    id: "reg-002",
    formNo: "NDL-2026-0843",
    registrationDate: "2026-08-16",
    fullNameEnglish: "ANANYA SINGH",
    fullNameHindi: "अनन्या सिंह",
    motherNameEnglish: "SUNITA SINGH",
    motherNameHindi: "सुनीता सिंह",
    fatherNameEnglish: "RAJESH SINGH",
    fatherNameHindi: "राजेश सिंह",
    dob: "2003-09-22",
    gender: "Female",
    aadhaarNo: "6541 8920 3312",
    mobileNumber: "9838124578",
    altMobileNumber: "9450321122",
    email: "ananya.singh@example.com",
    fullAddress: "Station Road, Dudahi",
    city: "Kushinagar",
    state: "Uttar Pradesh",
    pincode: "274302",
    targetExam: "NEET / Medical Entrance",
    qualification: "Class 12th (PCB)",
    collegeOrSchool: "St. Xavier Dudahi",
    shift: "Morning",
    shiftTiming: "06:00 AM - 12:00 PM (6 Hrs)",
    seatNumber: "Desk-08",
    planDuration: "1 Month",
    amountPaid: 600,
    paymentMode: "Cash",
    paymentStatus: "Paid",
    validFrom: "2026-08-16",
    validUpto: "2026-09-16",
    lockerRequired: false,
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    status: "Active",
    createdAt: "2026-08-16T11:15:00Z"
  },
  {
    id: "reg-003",
    formNo: "NDL-2026-0844",
    registrationDate: "2026-08-17",
    fullNameEnglish: "AMIT YADAV",
    fullNameHindi: "अमित यादव",
    motherNameEnglish: "GEETA DEVI",
    motherNameHindi: "गीता देवी",
    fatherNameEnglish: "RAMESH YADAV",
    fatherNameHindi: "रमेश यादव",
    dob: "2001-11-05",
    gender: "Male",
    aadhaarNo: "4521 9874 1236",
    mobileNumber: "8765432190",
    fullAddress: "Vill - Rampur, Post - Dudahi",
    city: "Kushinagar",
    state: "Uttar Pradesh",
    pincode: "274302",
    targetExam: "SSC CGL / Railway",
    qualification: "B.Com",
    shift: "Evening",
    shiftTiming: "04:00 PM - 10:00 PM (6 Hrs)",
    seatNumber: "Desk-21",
    planDuration: "6 Months",
    amountPaid: 3200,
    paymentMode: "UPI / QR",
    paymentStatus: "Paid",
    validFrom: "2026-08-17",
    validUpto: "2027-02-17",
    lockerRequired: true,
    lockerNumber: "L-21",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    status: "Active",
    createdAt: "2026-08-17T14:40:00Z"
  }
];

export const SHIFTS_DATA: { type: ShiftType; label: string; labelHindi: string; timing: string; hours: string; fee: number; iconName: string; color: string }[] = [
  {
    type: "Morning",
    label: "Morning Shift",
    labelHindi: "सुबह की शिफ्ट",
    timing: "06:00 AM - 12:00 PM",
    hours: "6 Hours",
    fee: 600,
    iconName: "Sunrise",
    color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30"
  },
  {
    type: "Afternoon",
    label: "Afternoon Shift",
    labelHindi: "दोपहर की शिफ्ट",
    timing: "12:00 PM - 05:00 PM",
    hours: "5 Hours",
    fee: 550,
    iconName: "Sun",
    color: "from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/30"
  },
  {
    type: "Evening",
    label: "Evening Shift",
    labelHindi: "शाम की शिफ्ट",
    timing: "05:00 PM - 10:00 PM",
    hours: "5 Hours",
    fee: 600,
    iconName: "Sunset",
    color: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30"
  },
  {
    type: "FullDay",
    label: "Full Day (Prime)",
    labelHindi: "पूरा दिन (प्राइम)",
    timing: "06:00 AM - 10:00 PM",
    hours: "16 Hours",
    fee: 900,
    iconName: "Clock",
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30"
  },
  {
    type: "Night",
    label: "Night Shift",
    labelHindi: "नाइट शिफ्ट (रात)",
    timing: "09:00 PM - 06:00 AM",
    hours: "9 Hours",
    fee: 700,
    iconName: "Moon",
    color: "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30"
  },
  {
    type: "Custom24x7",
    label: "24x7 All-Access Pass",
    labelHindi: "24x7 ऑल-एक्सेस पास",
    timing: "24 Hours / Any Time",
    hours: "Unlimited 24x7",
    fee: 1200,
    iconName: "ShieldCheck",
    color: "from-rose-500/20 to-purple-500/20 text-rose-400 border-rose-500/30"
  }
];

export const FEE_PLANS: FeePlan[] = [
  {
    id: "plan-morning",
    name: "Morning Shift Pass",
    nameHindi: "मॉर्निंग शिफ्ट पास",
    timing: "06:00 AM to 12:00 PM (6 hrs)",
    monthlyFee: 600,
    quarterlyFee: 1650,
    halfYearlyFee: 3100,
    yearlyFee: 5800,
    features: [
      "Reserved Desk in AC Cabin",
      "5G Superfast Wi-Fi",
      "Personal Charging Socket & Lamp",
      "Daily Newspapers & Magazines",
      "RO Mineral Cold/Hot Water"
    ]
  },
  {
    id: "plan-fullday",
    name: "Full Day Achiever Pass",
    nameHindi: "फुल डे अचीवर्स पास",
    timing: "06:00 AM to 10:00 PM (16 hrs)",
    monthlyFee: 900,
    quarterlyFee: 2400,
    halfYearlyFee: 4600,
    yearlyFee: 8600,
    popular: true,
    features: [
      "Dedicated Fixed Seat Allocation",
      "Free Personal Storage Locker",
      "100% Soundproof Silent Study Zone",
      "Ultra-Fast Unlimited 5G Wi-Fi",
      "Daily The Hindu / Dainik Jagran",
      "24x7 Heavy Inverter & Generator Backup",
      "Discussion & Cafeteria Access"
    ]
  },
  {
    id: "plan-evening",
    name: "Evening Shift Pass",
    nameHindi: "इवनिंग शिफ्ट पास",
    timing: "05:00 PM to 10:00 PM (5 hrs)",
    monthlyFee: 600,
    quarterlyFee: 1650,
    halfYearlyFee: 3100,
    yearlyFee: 5800,
    features: [
      "Air Conditioned Silent Hall",
      "High Speed Optical Fiber Wi-Fi",
      "Individual LED Reading Lamp",
      "RO Clean Drinking Water",
      "CCTV 24x7 Survelliance Security"
    ]
  },
  {
    id: "plan-247",
    name: "24x7 Unlimited Freedom",
    nameHindi: "24x7 अनलिमिटेड फ्रीडम",
    timing: "Round-the-clock 24/7 Access",
    monthlyFee: 1200,
    quarterlyFee: 3200,
    halfYearlyFee: 6000,
    yearlyFee: 11000,
    features: [
      "Access anytime, Day or Night",
      "Permanent Assigned Desk",
      "Permanent Heavy Steel Locker",
      "Biometric Access Pass",
      "All Amenities Included + Priority Desk"
    ]
  }
];

export const INITIAL_SEATS: LibrarySeat[] = Array.from({ length: 48 }, (_, i) => {
  const seatNum = i + 1;
  const seatId = `Desk-${seatNum < 10 ? '0' + seatNum : seatNum}`;
  const rowLetter = String.fromCharCode(65 + Math.floor(i / 12)); // A, B, C, D
  
  let zone: LibrarySeat['zone'] = 'AC Silent Zone';
  if (seatNum >= 1 && seatNum <= 12) zone = 'Cabin Deluxe';
  else if (seatNum >= 13 && seatNum <= 24) zone = 'AC Silent Zone';
  else if (seatNum >= 25 && seatNum <= 36) zone = 'Power Desk';
  else zone = 'Window View';

  // Some occupied
  let status: LibrarySeat['status'] = 'Available';
  let occupant = undefined;

  if (seatNum === 14) {
    status = 'Occupied';
    occupant = { name: "PRINCE KUMAR", formNo: "NDL-2026-0842", shift: "FullDay" as ShiftType };
  } else if (seatNum === 8) {
    status = 'Occupied';
    occupant = { name: "ANANYA SINGH", formNo: "NDL-2026-0843", shift: "Morning" as ShiftType };
  } else if (seatNum === 21) {
    status = 'Occupied';
    occupant = { name: "AMIT YADAV", formNo: "NDL-2026-0844", shift: "Evening" as ShiftType };
  } else if (seatNum === 4 || seatNum === 18 || seatNum === 29) {
    status = 'Reserved';
  }

  return {
    id: `seat-${seatNum}`,
    seatNumber: seatId,
    row: `Row ${rowLetter}`,
    zone,
    status,
    currentOccupant: occupant,
    hasSocket: true,
    hasDeskLamp: true
  };
});

export const INITIAL_NOTICES: LibraryNotice[] = [
  {
    id: "not-1",
    title: "New Batch Admissions Open for 2026 Competitive Exams",
    titleHindi: "2026 प्रतियोगी परीक्षाओं हेतु नए प्रवेश प्रारंभ",
    date: "2026-08-15",
    category: "General",
    content: "Special discount on 3-month and 6-month combo passes for UPSC, UPPSC, SSC, NEET and Railway aspirants. Secure your favorite cabin seat today!",
    urgent: true
  },
  {
    id: "not-2",
    title: "Fresh Current Affairs Magazines (August 2026 Edition) Available",
    titleHindi: "मासिक करंट अफेयर्स पत्रिकाएं (अगस्त 2026) उपलब्ध",
    date: "2026-08-14",
    category: "Facility",
    content: "Vision IAS Monthly, Chronicle, Pratiyogita Darpan, and Yojana magazines are placed in the reading section."
  },
  {
    id: "not-3",
    title: "Weekly Sunday Offline Mock Test Series",
    titleHindi: "साप्ताहिक रविवार टेस्ट सीरीज",
    date: "2026-08-12",
    category: "Exam",
    content: "Full length mock test every Sunday 10:00 AM - 12:00 PM for enrolled members in the discussion hall."
  }
];

export const FACILITIES_LIST = [
  {
    icon: "Wifi",
    title: "High-Speed 5G Wi-Fi",
    titleHindi: "हाई-स्पीड 5G वाई-फाई",
    description: "Multi-provider optical fiber connectivity with backup line for uninterrupted online lectures and downloading."
  },
  {
    icon: "AirVent",
    title: "100% Fully Air Conditioned",
    titleHindi: "पूर्णतः वातानुकूलित (AC हॉल)",
    description: "Optimal temperature controlled silent study hall for focused study in all weather conditions."
  },
  {
    icon: "Armchair",
    title: "Ergonomic Cabin Desks",
    titleHindi: "आरामदायक केबिन डेस्क",
    description: "Spacious individual study cabins with cushioned revolving chairs and privacy partitions."
  },
  {
    icon: "Zap",
    title: "Personal Charging & Lamp",
    titleHindi: "निजी चार्जिंग सॉकेट और लैंप",
    description: "Every desk is equipped with dedicated multi-pin plug socket and eye-friendly LED reading illumination."
  },
  {
    icon: "BatteryCharging",
    title: "24x7 Power Backup",
    titleHindi: "24 घंटे बिजली बैकअप",
    description: "Heavy commercial inverter and silent diesel generator backup for zero downtime during power cuts."
  },
  {
    icon: "Droplets",
    title: "RO Cold & Hot Mineral Water",
    titleHindi: "RO शुद्ध ठंडा एवं गर्म पानी",
    description: "Clean UV+RO filtered mineral drinking water dispenser with tea/coffee refreshment area."
  },
  {
    icon: "ShieldAlert",
    title: "CCTV Security & Biometrics",
    titleHindi: "सीसीटीवी और बायोमेट्रिक सुरक्षा",
    description: "High definition 24x7 camera surveillance throughout the premises for student safety and belongings."
  },
  {
    icon: "Newspaper",
    title: "Daily Newspapers & Magazines",
    titleHindi: "दैनिक समाचार पत्र एवं पत्रिकाएं",
    description: "The Hindu, Dainik Jagran (National), Pratiyogita Darpan, Chronicle, and monthly exam digests."
  },
  {
    icon: "Lock",
    title: "Personal Storage Lockers",
    titleHindi: "व्यक्तिगत स्टोरेज लॉकर",
    description: "Heavy duty individual keyed lockers to safely store your heavy books, notes, and study material."
  },
  {
    icon: "VolumeX",
    title: "Pin-Drop Silence Zone",
    titleHindi: "पिन-ड्रॉप साइलेंट स्टडी माहौल",
    description: "Strictly enforced quiet policy with acoustic soundproofing so you can achieve peak concentration."
  }
];
