import React, { useState } from 'react';
import { 
  LayoutGrid, 
  CheckCircle, 
  Clock, 
  Zap, 
  Lamp, 
  Lock, 
  User, 
  Info, 
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { LibrarySeat, ShiftType } from '../types';
import { SHIFTS_DATA, LIBRARY_CONFIG } from '../data/initialData';

interface SeatMatrixViewProps {
  seats: LibrarySeat[];
  onSelectSeatForAdmission: (seatNumber: string) => void;
  language: 'en' | 'hi';
}

export const SeatMatrixView: React.FC<SeatMatrixViewProps> = ({
  seats,
  onSelectSeatForAdmission,
  language
}) => {
  const isHindi = language === 'hi';
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [selectedShiftFilter, setSelectedShiftFilter] = useState<ShiftType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSeatDetail, setActiveSeatDetail] = useState<LibrarySeat | null>(null);

  const zones = ['All', 'Cabin Deluxe', 'AC Silent Zone', 'Power Desk', 'Window View'];

  const filteredSeats = seats.filter(seat => {
    const matchesZone = selectedZone === 'All' || seat.zone === selectedZone;
    const matchesSearch = seat.seatNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (seat.currentOccupant?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesZone && matchesSearch;
  });

  const availableCount = seats.filter(s => s.status === 'Available').length;
  const occupiedCount = seats.filter(s => s.status === 'Occupied').length;
  const reservedCount = seats.filter(s => s.status === 'Reserved').length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header & Stats Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            {LIBRARY_CONFIG.branding}
          </span>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-blue-400" />
            {isHindi ? "लाइब्रेरी सीट मैट्रिक्स एवं लाइव उपलब्धता" : "Library Seat Matrix & Live Desk Availability"}
          </h2>
          <p className="text-xs text-slate-400">
            {isHindi ? "अपनी पसंदीदा सीट चुनें और तुरंत ऑनलाइन बुक करें" : "Browse air-conditioned cabins, select your favorite desk, and register online."}
          </p>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3 text-xs">
          <div className="bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-2 rounded-xl text-center">
            <span className="text-emerald-400 font-black text-lg block">{availableCount}</span>
            <span className="text-emerald-300 font-medium">{isHindi ? 'खाली सीटें' : 'Available'}</span>
          </div>

          <div className="bg-rose-950/60 border border-rose-500/40 px-3.5 py-2 rounded-xl text-center">
            <span className="text-rose-400 font-black text-lg block">{occupiedCount}</span>
            <span className="text-rose-300 font-medium">{isHindi ? 'भरी हुई' : 'Occupied'}</span>
          </div>

          <div className="bg-amber-950/60 border border-amber-500/40 px-3.5 py-2 rounded-xl text-center">
            <span className="text-amber-400 font-black text-lg block">{reservedCount}</span>
            <span className="text-amber-300 font-medium">{isHindi ? 'आरक्षित' : 'Reserved'}</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3">
        
        {/* Zone Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Zone:
          </span>
          {zones.map(zone => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedZone === zone
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              id={`filter-zone-${zone.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {zone}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={isHindi ? "डेस्क या छात्र का नाम खोजें..." : "Search desk or student name..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
            id="search-seat-input"
          />
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Seat Matrix Floor Plan (2 Cols on Desktop) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span>Main Study Hall - Dudahi Branch (ग्राउंड फ्लोर)</span>
            </h3>
            <span className="text-xs text-slate-400">Total 48 Deluxe Cabins</span>
          </div>

          {/* Seat Grid Layout */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 pt-2">
            {filteredSeats.map((seat) => {
              const isOccupied = seat.status === 'Occupied';
              const isReserved = seat.status === 'Reserved';
              const isSelected = activeSeatDetail?.id === seat.id;

              let badgeColor = "bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:border-emerald-400";
              if (isOccupied) {
                badgeColor = "bg-rose-950/40 border-rose-500/40 text-rose-300";
              } else if (isReserved) {
                badgeColor = "bg-amber-950/40 border-amber-500/40 text-amber-300";
              }

              if (isSelected) {
                badgeColor = "bg-blue-600 border-white text-white ring-2 ring-blue-400";
              }

              return (
                <button
                  key={seat.id}
                  onClick={() => setActiveSeatDetail(seat)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-between text-center transition-all cursor-pointer transform hover:scale-105 active:scale-95 ${badgeColor}`}
                  id={`seat-cell-${seat.seatNumber.toLowerCase()}`}
                  title={`${seat.seatNumber} (${seat.zone}) - ${seat.status}`}
                >
                  <span className="text-[10px] font-mono font-bold">{seat.seatNumber}</span>
                  
                  <div className="my-1">
                    {isOccupied ? (
                      <User className="w-4 h-4 mx-auto text-rose-400" />
                    ) : isReserved ? (
                      <Lock className="w-4 h-4 mx-auto text-amber-400" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mx-auto text-emerald-400" />
                    )}
                  </div>

                  <span className="text-[9px] font-medium truncate w-full block">
                    {isOccupied ? (seat.currentOccupant?.name.split(' ')[0] || 'Occupied') : seat.status}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-slate-300">{isHindi ? 'खाली (उपलब्ध)' : 'Available'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="text-slate-300">{isHindi ? 'आवंटित (Occupied)' : 'Occupied'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-slate-300">{isHindi ? 'आरक्षित (Reserved)' : 'Reserved'}</span>
            </div>
          </div>
        </div>

        {/* Selected Seat Detail & Quick Book Panel */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Desk Specifications
              </span>
              <h3 className="text-lg font-extrabold text-white">
                {activeSeatDetail ? activeSeatDetail.seatNumber : "Select a Desk on the Matrix"}
              </h3>
            </div>

            {activeSeatDetail ? (
              <div className="space-y-4 pt-4 text-xs">
                <div className="p-3 bg-slate-800/80 rounded-xl space-y-2 border border-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Zone Type:</span>
                    <strong className="text-blue-300">{activeSeatDetail.zone}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className={`font-bold ${
                      activeSeatDetail.status === 'Available' ? 'text-emerald-400' :
                      activeSeatDetail.status === 'Occupied' ? 'text-rose-400' : 'text-amber-400'
                    }`}>
                      {activeSeatDetail.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-200">{activeSeatDetail.row} (Quiet Core)</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase">Desk Amenities:</h4>
                  <ul className="space-y-1.5 text-slate-300">
                    <li className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Dedicated Power Outlet for Laptop/Phone</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Lamp className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Individual Anti-Glare LED Reading Lamp</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Sound-Damping Acoustic Privacy Partition</span>
                    </li>
                  </ul>
                </div>

                {/* If Occupant */}
                {activeSeatDetail.currentOccupant && (
                  <div className="p-3 bg-rose-950/30 border border-rose-800/40 rounded-xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-rose-400">Current Member</span>
                    <p className="text-white font-bold text-sm">{activeSeatDetail.currentOccupant.name}</p>
                    <p className="text-slate-400 text-[11px]">
                      Shift: {activeSeatDetail.currentOccupant.shift} | Reg: {activeSeatDetail.currentOccupant.formNo}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 space-y-2 text-slate-400 text-xs">
                <Info className="w-8 h-8 mx-auto text-slate-600" />
                <p>Click on any seat from the grid to view its current occupant, amenities, and book online.</p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div>
            <button
              onClick={() => {
                if (activeSeatDetail) {
                  onSelectSeatForAdmission(activeSeatDetail.seatNumber);
                } else {
                  onSelectSeatForAdmission('Desk-14');
                }
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              id="book-selected-seat-btn"
            >
              <span>{isHindi ? "इस सीट के साथ प्रवेश लें" : "Book Desk & Register Now"}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
