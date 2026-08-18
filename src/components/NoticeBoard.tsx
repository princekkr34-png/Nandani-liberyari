import React from 'react';
import { 
  Bell, 
  Calendar, 
  AlertCircle, 
  BookOpen, 
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';
import { INITIAL_NOTICES, LIBRARY_CONFIG } from '../data/initialData';

interface NoticeBoardProps {
  language: 'en' | 'hi';
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ language }) => {
  const isHindi = language === 'hi';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
            <Bell className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {isHindi ? "लाइब्रेरी सूचना पट्ट (Notice Board)" : "Library Notice Board & Exam Updates"}
            </h3>
            <span className="text-[11px] text-slate-400">Important circulars for Dudahi students</span>
          </div>
        </div>

        <span className="text-xs text-amber-400 font-semibold bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
          Live Updates
        </span>
      </div>

      <div className="space-y-3">
        {INITIAL_NOTICES.map((notice) => (
          <div
            key={notice.id}
            className={`p-4 rounded-xl border transition-all ${
              notice.urgent
                ? 'bg-blue-950/40 border-blue-600/50 hover:border-blue-500'
                : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'
            }`}
            id={`notice-item-${notice.id}`}
          >
            <div className="flex justify-between items-start gap-2 mb-1">
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                notice.category === 'Exam' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                notice.category === 'Facility' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {notice.category}
              </span>
              <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-500" />
                {notice.date}
              </span>
            </div>

            <h4 className="text-sm font-bold text-white mb-1">
              {isHindi ? notice.titleHindi : notice.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {notice.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
