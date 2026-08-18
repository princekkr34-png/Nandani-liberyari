export type ShiftType = 'Morning' | 'Afternoon' | 'Evening' | 'FullDay' | 'Night' | 'Custom24x7';

export type PlanDuration = '1 Month' | '3 Months' | '6 Months' | '1 Year';

export type PaymentStatus = 'Paid' | 'Pending' | 'Partial';

export type PaymentMode = 'Cash' | 'UPI / QR' | 'Card' | 'NetBanking';

export interface RegistrationData {
  id: string;
  formNo: string;
  registrationDate: string;
  // Personal Info
  fullNameEnglish: string;
  fullNameHindi: string;
  motherNameEnglish: string;
  motherNameHindi: string;
  fatherNameEnglish: string;
  fatherNameHindi: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  aadhaarNo: string;
  // Contact Info
  mobileNumber: string;
  altMobileNumber?: string;
  email?: string;
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
  // Academic & Prep
  targetExam: string;
  qualification: string;
  collegeOrSchool?: string;
  // Library Preference
  shift: ShiftType;
  shiftTiming: string;
  seatNumber: string;
  planDuration: PlanDuration;
  amountPaid: number;
  paymentMode: PaymentMode;
  paymentStatus: PaymentStatus;
  validFrom: string;
  validUpto: string;
  lockerRequired: boolean;
  lockerNumber?: string;
  photoUrl: string;
  notes?: string;
  status: 'Active' | 'Pending Approval' | 'Expired';
  createdAt: string;
}

export interface LibrarySeat {
  id: string;
  seatNumber: string;
  row: string;
  zone: 'AC Silent Zone' | 'Cabin Deluxe' | 'Window View' | 'Power Desk';
  status: 'Available' | 'Occupied' | 'Reserved' | 'Under Maintenance';
  currentOccupant?: {
    name: string;
    formNo: string;
    shift: ShiftType;
  };
  hasSocket: boolean;
  hasDeskLamp: boolean;
}

export interface FeePlan {
  id: string;
  name: string;
  nameHindi: string;
  timing: string;
  monthlyFee: number;
  quarterlyFee: number;
  halfYearlyFee: number;
  yearlyFee: number;
  popular?: boolean;
  features: string[];
}

export interface LibraryNotice {
  id: string;
  title: string;
  titleHindi: string;
  date: string;
  category: 'General' | 'Exam' | 'Facility' | 'Holiday';
  content: string;
  urgent?: boolean;
}
