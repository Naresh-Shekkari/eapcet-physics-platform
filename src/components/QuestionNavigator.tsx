import React from 'react';
import type { QuestionAttempt } from '../types/quiz';

// ============================================================
// Question Navigator Component
// ============================================================

interface QuestionNavigatorProps {
  total: number;
  currentIndex: number;
  attempts: Record<string, QuestionAttempt>;
  questionIds: string[];
  onNavigate: (index: number) => void;
}

export function QuestionNavigator({
  total,
  currentIndex,
  attempts,
  questionIds,
  onNavigate,
}: QuestionNavigatorProps) {
  return (
    <div className="space-y-3">
      <p className="label-sm">Question Navigator</p>
      <div className="grid grid-cols-5 gap-1.5">
        {questionIds.map((qId, i) => {
          const attempt = attempts[qId];
          const isCurrentQ = i === currentIndex;
          const isAnswered = attempt?.selectedOptionId !== null && attempt?.selectedOptionId !== undefined;
          const isMarked = attempt?.status === 'marked';

          let btnClass = 'w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-150 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-1 focus-visible:ring-offset-navy-900 ';

          if (isCurrentQ) {
            btnClass += 'bg-indigo-600 text-white ring-2 ring-indigo-400 ring-offset-1 ring-offset-navy-900';
          } else if (isMarked) {
            btnClass += 'bg-amber-500/20 text-amber-400 border border-amber-500/50 hover:bg-amber-500/30';
          } else if (isAnswered) {
            btnClass += 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30';
          } else {
            btnClass += 'bg-navy-800 text-slate-400 border border-slate-600/40 hover:bg-navy-700 hover:text-slate-300';
          }

          return (
            <button
              key={qId}
              onClick={() => onNavigate(i)}
              className={btnClass}
              aria-label={`Question ${i + 1}${isCurrentQ ? ' (current)' : ''}${isAnswered ? ', answered' : ', unanswered'}${isMarked ? ', marked for review' : ''}`}
              aria-current={isCurrentQ ? 'true' : undefined}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-700/50">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-3 h-3 rounded bg-indigo-600 inline-block" />
          Current
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/40 inline-block" />
          Answered
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/50 inline-block" />
          Marked
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-3 h-3 rounded bg-navy-800 border border-slate-600/40 inline-block" />
          Not visited
        </div>
      </div>
    </div>
  );
}
