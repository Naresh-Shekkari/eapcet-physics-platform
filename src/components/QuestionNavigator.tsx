import React from 'react';
import type { QuestionAttempt } from '../types/quiz';

// ============================================================
// Question Navigator Component — PhysicsEdge
// ============================================================

interface QuestionNavigatorProps {
  total?: number;
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
  const answeredCount = Object.values(attempts).filter(
    (a) => a.selectedOptionId !== null && a.selectedOptionId !== undefined
  ).length;

  const markedCount = Object.values(attempts).filter((a) => a.status === 'marked').length;
  const totalCount = total ?? questionIds.length;
  const unansweredCount = totalCount - answeredCount;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
          Navigator ({totalCount})
        </span>
        <span className="font-mono text-[11px] text-cyan-400 font-medium">
          {answeredCount}/{totalCount} Done
        </span>
      </div>

      {/* Grid of question buttons */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {questionIds.map((qId, i) => {
          const attempt = attempts[qId];
          const isCurrent = i === currentIndex;
          const isAnswered = attempt?.selectedOptionId !== null && attempt?.selectedOptionId !== undefined;
          const isMarked = attempt?.status === 'marked';

          let btnClass = `
            w-full aspect-square rounded-xl font-mono text-xs font-semibold
            transition-all duration-150 flex items-center justify-center
            focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-navy-950
          `;

          if (isCurrent) {
            btnClass += ' bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-950/40 ring-2 ring-cyan-400 ring-offset-2 ring-offset-navy-950 scale-105 z-10';
          } else if (isMarked) {
            btnClass += ' bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30';
          } else if (isAnswered) {
            btnClass += ' bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/25';
          } else {
            btnClass += ' bg-navy-900/90 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200 hover:bg-navy-850';
          }

          return (
            <button
              key={qId}
              type="button"
              onClick={() => onNavigate(i)}
              className={btnClass.trim()}
              aria-label={`Question ${i + 1}${isCurrent ? ' (currently viewing)' : ''}${isAnswered ? ', answered' : ', unanswered'}${isMarked ? ', flagged for review' : ''}`}
              aria-current={isCurrent ? 'true' : undefined}
            >
              {(i + 1).toString().padStart(2, '0')}
            </button>
          );
        })}
      </div>

      {/* Status counts & legend */}
      <div className="space-y-2 pt-3 border-t border-slate-800 text-xs font-mono">
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500/50 inline-block" />
            <span>Answered: <strong className="text-emerald-400">{answeredCount}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded bg-amber-500/20 border border-amber-500/50 inline-block" />
            <span>Marked: <strong className="text-amber-400">{markedCount}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded bg-cyan-500 inline-block" />
            <span>Current: <strong className="text-cyan-300">{currentIndex + 1}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded bg-navy-900 border border-slate-800 inline-block" />
            <span>Pending: <strong className="text-slate-300">{unansweredCount}</strong></span>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 pt-1 text-center">
          Shortcuts: [←] Prev · [→] Next · [1-4] Option
        </div>
      </div>
    </div>
  );
}
