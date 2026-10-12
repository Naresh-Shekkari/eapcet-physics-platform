import React from 'react';

// ============================================================
// Progress Bar Component — PhysicsEdge
// ============================================================

interface ProgressBarProps {
  current: number; // 1-based current question
  total: number;
  answered: number;
  className?: string;
}

export function ProgressBar({ current, total, answered, className = '' }: ProgressBarProps) {
  const answeredPercent = total > 0 ? Math.round((answered / total) * 100) : 0;
  const visitedPercent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex justify-between items-center text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-slate-400">
            Answered:{' '}
            <strong className="text-white font-semibold">
              {answered}/{total}
            </strong>
          </span>
          <span className="hidden sm:inline-block text-slate-500">·</span>
          <span className="hidden sm:inline-block text-slate-400">
            Viewing: Question <strong className="text-cyan-300">{current}</strong>
          </span>
        </div>
        <span className="text-cyan-400 font-semibold">{answeredPercent}% Complete</span>
      </div>

      <div
        className="h-2 bg-navy-950 rounded-full overflow-hidden border border-slate-800/80 relative"
        role="progressbar"
        aria-valuenow={answered}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${answered} of ${total} questions answered`}
      >
        {/* Visited position track (faint indicator) */}
        <div
          className="absolute inset-y-0 left-0 bg-blue-900/30 transition-all duration-300"
          style={{ width: `${visitedPercent}%` }}
        />
        {/* Answered progress track */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-300 shadow-sm shadow-cyan-500/20"
          style={{ width: `${answeredPercent}%` }}
        />
      </div>
    </div>
  );
}
