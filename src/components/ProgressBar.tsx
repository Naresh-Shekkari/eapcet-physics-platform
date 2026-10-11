import React from 'react';

// ============================================================
// Progress Bar Component
// ============================================================

interface ProgressBarProps {
  current: number; // 1-based
  total: number;
  answered: number;
  className?: string;
}

export function ProgressBar({ current, total, answered, className = '' }: ProgressBarProps) {
  const progressPercent = total > 0 ? Math.round((answered / total) * 100) : 0;
  const visitedPercent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-400">
          Progress: <span className="text-slate-200 font-semibold">{answered}/{total}</span> answered
        </span>
        <span className="text-indigo-400 font-semibold">{progressPercent}%</span>
      </div>
      <div
        className="h-2 bg-navy-800 rounded-full overflow-hidden border border-slate-700/40"
        role="progressbar"
        aria-valuenow={answered}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${answered} of ${total} questions answered`}
      >
        {/* Visited (lighter) */}
        <div
          className="h-full bg-indigo-900/60 rounded-full transition-all duration-500"
          style={{ width: `${visitedPercent}%` }}
        />
        {/* Answered (bright) — overlaid */}
        <div
          className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full transition-all duration-500 -mt-2"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
