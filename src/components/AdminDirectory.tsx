import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  CreditCard, 
  Printer, 
  Download, 
  CheckCircle, 
  Clock, 
  Phone, 
  MapPin, 
  FileText, 
  ShieldCheck,
  Plus,
  TrendingUp,
  Filter,
  Eye
} from 'lucide-react';
import { RegistrationData, ShiftType } from '../types';
import { LIBRARY_CONFIG } from '../data/initialData';

interface AdminDirectoryProps {
  registrations: RegistrationData[];
  onViewIdCard: (data: RegistrationData) => void;
  onAddNewAdmission: () => void;
  language: 'en' | 'hi';
}

export const AdminDirectory: React.FC<AdminDirectoryProps> = ({
  registrations,
  onViewIdCard,
  onAddNewAdmission,
  language
}) => {
  const isHindi = language === 'hi';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShift, setSelectedShift] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filtered = registrations.filter(item => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      item.fullNameEnglish.toLowerCase().includes(query) ||
      item.fullNameHindi.includes(query) ||
      item.formNo.toLowerCase().includes(query) ||
      item.mobileNumber.includes(query) ||
      item.targetExam.toLowerCase().includes(query) ||
      item.seatNumber.toLowerCase().includes(query);

    const matchesShift = selectedShift === 'All' || item.shift === selectedShift;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;

    return matchesSearch && matchesShift && matchesStatus;
  });

  const totalFeeCollected = registrations.reduce((sum, item) => sum + (item.amountPaid || 0), 0);
  const activeCount = registrations.filter(r => r.status === 'Active').length;

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["Form No", "Name", "Hindi Name", "Father Name", "Mother Name", "Mobile", "Seat", "Shift", "Exam", "Fee", "Valid Upto"];
    const rows = registrations.map(r => [
      r.formNo,
      `"${r.fullNameEnglish}"`,
      `"${r.fullNameHindi}"`,
      `"${r.fatherNameEnglish}"`,
      `"${r.motherNameEnglish}"`,
      r.mobileNumber,
      r.seatNumber,
      r.shift,
      `"${r.targetExam}"`,
      r.amountPaid,
      r.validUpto
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Nandini_Digital_Library_Members_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner & Analytics Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Enrolled Members</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-3xl font-black text-white mt-2">{registrations.length}</p>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
            <CheckCircle className="w-3 h-3" />
            <span>{activeCount} Active Library Passes</span>
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Revenue Collected</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-emerald-400 mt-2">₹{totalFeeCollected}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Includes Shift & Locker fees</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Library Branch</span>
            <MapPin className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-base font-bold text-white mt-2">Dudahi (Kushinagar)</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Help: {LIBRARY_CONFIG.phone1}</span>
        </div>

        <div className="bg-gradient-to-br from-blue-900/60 to-indigo-900/60 border border-blue-600/40 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider block">Quick Action</span>
            <p className="text-sm font-bold text-white mt-0.5">New Student Admission</p>
          </div>
          <button
            onClick={onAddNewAdmission}
            className="mt-3 w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            id="admin-new-admission-btn"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Fill Registration Form</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder={isHindi ? "नाम, फॉर्म नंबर, मोबाइल या परीक्षा से खोजें..." : "Search by student name, form no, phone, exam, seat..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            id="admin-search-input"
          />
        </div>

        {/* Filters & Export */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none"
            id="filter-shift-select"
          >
            <option value="All">All Shifts (सभी शिफ्ट)</option>
            <option value="Morning">Morning (06:00 AM - 12:00 PM)</option>
            <option value="Afternoon">Afternoon (12:00 PM - 05:00 PM)</option>
            <option value="Evening">Evening (05:00 PM - 10:00 PM)</option>
            <option value="FullDay">Full Day (06:00 AM - 10:00 PM)</option>
            <option value="Night">Night Shift</option>
            <option value="Custom24x7">24x7 Pass</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
            id="export-csv-btn"
            title="Download CSV database"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Member / Form No</th>
                <th className="py-3.5 px-4">Parents Name</th>
                <th className="py-3.5 px-4">Contact & Address</th>
                <th className="py-3.5 px-4">Seat & Shift</th>
                <th className="py-3.5 px-4">Target Exam</th>
                <th className="py-3.5 px-4">Fee / Validity</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* Member & Photo */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.photoUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80"}
                          alt={item.fullNameEnglish}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-700 bg-slate-800"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-bold text-white text-sm">{item.fullNameEnglish}</p>
                          <p className="text-slate-400 text-[11px] font-medium">{item.fullNameHindi}</p>
                          <span className="font-mono text-[10px] text-blue-400 block">{item.formNo}</span>
                        </div>
                      </div>
                    </td>

                    {/* Parents */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <p className="text-slate-200">
                          <span className="text-slate-500 text-[10px]">F: </span>{item.fatherNameEnglish || '-'}
                        </p>
                        <p className="text-slate-400 text-[11px]">
                          <span className="text-slate-500 text-[10px]">M: </span>{item.motherNameEnglish || '-'}
                        </p>
                      </div>
                    </td>

                    {/* Contact & City */}
                    <td className="py-3.5 px-4">
                      <div>
                        <a href={`tel:${item.mobileNumber}`} className="text-amber-400 font-mono font-bold hover:underline block">
                          {item.mobileNumber}
                        </a>
                        <span className="text-slate-400 text-[11px] block truncate max-w-[160px]">
                          {item.city || 'Dudahi, Kushinagar'}
                        </span>
                      </div>
                    </td>

                    {/* Seat & Shift */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-mono font-bold text-amber-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 inline-block mb-1">
                          {item.seatNumber}
                        </span>
                        <span className="text-slate-400 text-[11px] block">
                          {item.shift} Shift
                        </span>
                      </div>
                    </td>

                    {/* Target Exam */}
                    <td className="py-3.5 px-4">
                      <span className="bg-blue-950/80 text-blue-300 px-2 py-1 rounded-md border border-blue-800/40 text-[11px] font-semibold inline-block">
                        {item.targetExam}
                      </span>
                    </td>

                    {/* Fee & Validity */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-black text-emerald-400 block text-xs">
                          ₹{item.amountPaid} ({item.paymentStatus})
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Upto: {item.validUpto}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewIdCard(item)}
                          className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors cursor-pointer"
                          title="View Official ID Card & Pass"
                          id={`btn-view-card-${item.id}`}
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-sm">
                    No student registrations found matching your query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
