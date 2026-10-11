import React from 'react';
import { Clock, FileText, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import type { QuizSettings } from '../types/quiz';
import { formatDuration } from '../services/quizScoring';

// ============================================================
// Quiz Instructions Dialog Component
// ============================================================

interface QuizInstructionsProps {
  chapterName: string;
  settings: QuizSettings;
  onStart: () => void;
  onCancel: () => void;
}

export function QuizInstructions({ chapterName, settings, onStart, onCancel }: QuizInstructionsProps) {
  const modeLabel = settings.mode === 'exam' ? 'Exam Mode' : 'Full Practice Set';
  const totalDuration = formatDuration(settings.totalDurationMs);
  const perQDuration = formatDuration(settings.perQuestionDurationMs);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/90 backdrop-blur-sm animate-fade-in">
      <div className="card-elevated max-w-lg w-full p-6 space-y-6 animate-slide-up">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`badge ${settings.mode === 'exam' ? 'bg-violet-500/20 text-violet-300 border-violet-500/30' : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'} border`}>
              {modeLabel}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">{chapterName}</h2>
          <p className="text-slate-400 text-sm">Read the instructions carefully before starting.</p>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3">
          <InfoTile icon={<FileText size={16} />} label="Questions" value={`${settings.questionCount}`} />
          <InfoTile icon={<Clock size={16} />} label="Total Time" value={totalDuration} />
          <InfoTile icon={<Clock size={16} />} label="Per Question" value={perQDuration} />
          <InfoTile
            icon={<Target size={16} />}
            label="Scoring"
            value={`+${settings.scoringRules.correct} / 0 / 0`}
            sub="correct / wrong / skip"
          />
        </div>

        {/* Rules */}
        <div className="space-y-2">
          <p className="label-sm">Rules</p>
          <ul className="space-y-1.5 text-sm text-slate-300">
            {[
              'Each question has a 60-second countdown. An unanswered question advances automatically at zero.',
              'The overall time limit is enforced independently — it overrides individual question timers.',
              'You may navigate between questions freely.',
              'Returning to a question does not reset its remaining time.',
              'You can change your answer any time before submission.',
              'Unanswered questions score zero but are not marked incorrect.',
              'Submit manually or wait for auto-submission at time expiry.',
            ].map((rule, i) => (
              <li key={i} className="flex gap-2">
                <CheckCircle size={13} className="mt-0.5 flex-shrink-0 text-indigo-400" />
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Warning */}
        <div className="flex gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
          <AlertTriangle size={16} className="flex-shrink-0 mt-0.5 text-amber-400" />
          <p className="text-sm text-amber-200">
            Page refresh during an active quiz may restore your attempt, but timers are based on the original start timestamp — no extra time is granted.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button onClick={onCancel} className="btn-secondary flex-1">
            Cancel
          </button>
          <button onClick={onStart} className="btn-primary flex-1">
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoTile({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-navy-900 border border-slate-700/40">
      <div className="mt-0.5 text-indigo-400">{icon}</div>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
        {sub && <p className="text-xs text-slate-500">{sub}</p>}
      </div>
    </div>
  );
}
