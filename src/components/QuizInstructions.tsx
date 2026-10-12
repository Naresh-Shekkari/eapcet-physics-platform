import React from 'react';
import { Clock, FileText, Target, AlertTriangle, CheckCircle2, Zap, ArrowRight, X } from 'lucide-react';
import type { QuizSettings } from '../types/quiz';
import { formatDuration } from '../services/quizScoring';

// ============================================================
// Quiz Instructions Briefing Modal — PhysicsEdge
// ============================================================

interface QuizInstructionsProps {
  chapterName: string;
  settings: QuizSettings;
  onStart: () => void;
  onCancel: () => void;
}

export function QuizInstructions({
  chapterName,
  settings,
  onStart,
  onCancel,
}: QuizInstructionsProps) {
  const isExam = settings.mode === 'exam';
  const totalDuration = formatDuration(settings.totalDurationMs);
  const perQDuration = formatDuration(settings.perQuestionDurationMs);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-instruction-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-fade-in"
    >
      <div className="card-elevated max-w-xl w-full p-6 sm:p-7 space-y-6 animate-slide-up border border-slate-700/80 shadow-2xl relative">
        {/* Close button in top right */}
        <button
          onClick={onCancel}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-900 transition-colors"
          aria-label="Close instructions"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-6">
          <div className="flex items-center gap-2">
            <span
              className={`badge font-mono text-[11px] ${
                isExam
                  ? 'bg-violet-500/15 text-violet-300 border-violet-500/30'
                  : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
              } border`}
            >
              <Zap size={12} />
              {isExam ? 'Exam Simulation Mode' : 'Standard Practice Mode'}
            </span>
            <span className="text-xs text-slate-500 font-mono">EAPCET Physics</span>
          </div>
          <h2 id="quiz-instruction-title" className="text-2xl font-extrabold text-white tracking-tight">
            {chapterName}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Please review the examination parameters and timer protocols before beginning.
          </p>
        </div>

        {/* Exam Parameter Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <InfoTile icon={<FileText size={15} />} label="Questions" value={`${settings.questionCount}`} />
          <InfoTile icon={<Clock size={15} />} label="Total Time" value={totalDuration} />
          <InfoTile icon={<Clock size={15} />} label="Per Question" value={perQDuration} />
          <InfoTile
            icon={<Target size={15} />}
            label="Marking"
            value={`+${settings.scoringRules.correct} / 0`}
            sub="No negative"
          />
        </div>

        {/* Operating Rules */}
        <div className="space-y-2.5">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold">
            Test Protocols & Rules
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 bg-navy-900/60 p-4 rounded-xl border border-slate-800">
            {[
              'Each question has an individual 60-second countdown. When it hits zero, the question automatically advances.',
              'The overall session timer runs continuously and submits the quiz automatically at expiration.',
              'You can freely navigate between questions using the navigator or keyboard shortcuts [←] and [→].',
              'Returning to a question resumes with its remaining time — no timer reset exploit.',
              'Keyboard controls: Keys [1-4] or [A-D] select options, [M] marks question for review.',
              'Detailed step-by-step verified explanations are provided immediately upon submission.',
            ].map((rule, i) => (
              <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0 text-cyan-400" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Persistence Notice */}
        <div className="flex gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200">
          <AlertTriangle size={15} className="flex-shrink-0 mt-0.5 text-amber-400" />
          <p className="leading-relaxed">
            Your attempt state is persisted in your local browser session. Timer deadlines remain anchored to your initial start timestamp.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button onClick={onCancel} type="button" className="btn-secondary flex-1 py-2.5 text-sm">
            Cancel
          </button>
          <button onClick={onStart} type="button" className="btn-primary flex-1 py-2.5 text-sm gap-2">
            <span>Begin Quiz Now</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoTile({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="p-3 rounded-xl bg-navy-900 border border-slate-800/80 flex flex-col justify-between">
      <div className="text-cyan-400 mb-1">{icon}</div>
      <div>
        <p className="text-[11px] text-slate-400 font-mono leading-none">{label}</p>
        <p className="text-sm font-bold text-white font-mono mt-1 leading-none">{value}</p>
        {sub && <p className="text-[10px] text-slate-500 font-mono mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
