import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart2,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Clock,
  Trash2,
  ArrowRight,
  RotateCcw,
  Trophy,
  Target,
  Award,
  ChevronLeft,
} from 'lucide-react';
import {
  loadResultsList,
  clearAllResults,
  loadFullResult,
} from '../services/quizPersistence';
import { formatDuration } from '../services/quizScoring';
import { ResultsSummary } from '../components/ResultsSummary';
import type { QuizResult } from '../types/quiz';

// ============================================================
// Results & Practice History Page — PhysicsEdge
// ============================================================

export function ResultsPage() {
  const [results, setResults] = useState(() => loadResultsList());
  const [selectedResult, setSelectedResult] = useState<QuizResult | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClear = () => {
    clearAllResults();
    setResults([]);
    setSelectedResult(null);
    setConfirmClear(false);
  };

  const handleInspectAttempt = (sessionId: string) => {
    const full = loadFullResult(sessionId);
    if (full) {
      setSelectedResult(full);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // If viewing a past attempt's full review
  if (selectedResult) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
        <button
          onClick={() => setSelectedResult(null)}
          type="button"
          className="btn-secondary text-xs sm:text-sm py-2 px-3.5 gap-2"
        >
          <ChevronLeft size={16} />
          <span>Back to Performance History</span>
        </button>

        <ResultsSummary
          result={selectedResult}
          onRetry={() => {
            window.location.hash = '#/quiz?mode=practice';
          }}
          onBack={() => setSelectedResult(null)}
        />
      </div>
    );
  }

  // Empty State if no tests taken yet
  if (results.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-navy-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400 shadow-xl">
          <BarChart2 size={30} />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            No Exam History Yet
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Your quiz attempts, accuracy breakdowns, and answer logs will appear here automatically.
            All analytics are safely stored in your browser session.
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/courses/chapter/work-energy-power"
            className="btn-primary py-3 px-6 text-sm gap-2 inline-flex"
          >
            <span>Launch Your First Quiz</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  const bestAccuracy = Math.max(...results.map((r) => r.accuracyPercent));
  const avgAccuracy = Math.round(
    results.reduce((sum, r) => sum + r.accuracyPercent, 0) / results.length
  );
  const totalQuestionsPracticed = results.reduce(
    (sum, r) => sum + r.totalQuestions,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="micro-label">Performance Analytics</span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Quiz History & Progress
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Review previous attempts, inspect verified solutions, and track accuracy improvements.
          </p>
        </div>

        {/* Clear Data Action */}
        {!confirmClear ? (
          <button
            onClick={() => setConfirmClear(true)}
            type="button"
            className="btn-ghost text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 font-mono gap-1.5 self-start sm:self-auto"
          >
            <Trash2 size={13} />
            <span>Clear History</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-rose-300">Delete all logs?</span>
            <button
              onClick={handleClear}
              type="button"
              className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-500 transition-colors"
            >
              Confirm
            </button>
            <button
              onClick={() => setConfirmClear(false)}
              type="button"
              className="px-2 py-1 rounded-lg bg-navy-800 text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Aggregate Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 font-mono">
        <SummaryTile
          icon={<Target size={16} className="text-cyan-400" />}
          label="Total Attempts"
          value={results.length.toString()}
        />
        <SummaryTile
          icon={<Trophy size={16} className="text-emerald-400" />}
          label="Peak Accuracy"
          value={`${bestAccuracy}%`}
          highlight
        />
        <SummaryTile
          icon={<Award size={16} className="text-indigo-400" />}
          label="Average Accuracy"
          value={`${avgAccuracy}%`}
        />
        <SummaryTile
          icon={<BarChart2 size={16} className="text-amber-400" />}
          label="Questions Attempted"
          value={totalQuestionsPracticed.toString()}
        />
      </div>

      {/* Attempts List */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Completed Sessions ({results.length})</span>
          <span>Click any session to open full question review</span>
        </div>

        {results.map((r, i) => {
          const accuracyColor =
            r.accuracyPercent >= 75
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
              : r.accuracyPercent >= 50
              ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
              : 'bg-amber-500/15 text-amber-400 border-amber-500/30';

          return (
            <div
              key={r.id}
              className="card p-4 sm:p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono"
            >
              {/* Attempt index & Accuracy pill */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="text-slate-500 text-xs w-6 text-center select-none">
                  #{(results.length - i).toString().padStart(2, '0')}
                </span>

                <div
                  className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold text-sm border flex-shrink-0 ${accuracyColor}`}
                >
                  <span>{Math.round(r.accuracyPercent)}%</span>
                  <span className="text-[9px] uppercase tracking-wider font-normal">Score</span>
                </div>

                {/* Details */}
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-sans font-bold text-white tracking-tight truncate">
                      {r.chapter}
                    </p>
                    <span className="badge bg-navy-950 text-slate-400 border border-slate-800 text-[10px]">
                      {r.mode === 'exam' ? 'Exam Mode' : 'Practice Set'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 text-xs text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 size={13} /> {r.correct}
                    </span>
                    <span className="flex items-center gap-1 text-rose-400">
                      <XCircle size={13} /> {r.incorrect}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <MinusCircle size={13} /> {r.unanswered}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock size={13} className="text-cyan-400" />
                      {formatDuration(r.timeTakenMs)}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      {new Date(r.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
                <button
                  onClick={() => handleInspectAttempt(r.id)}
                  type="button"
                  className="btn-primary py-2 px-3.5 text-xs font-mono gap-1.5 w-full sm:w-auto justify-center"
                >
                  <span>Review Answers</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Retake CTA bottom */}
      <div className="pt-4 text-center">
        <Link
          to="/courses/chapter/work-energy-power"
          className="btn-secondary py-3 px-6 text-sm gap-2 inline-flex"
        >
          <RotateCcw size={15} />
          <span>Attempt Fresh Practice Quiz</span>
        </Link>
      </div>
    </div>
  );
}

function SummaryTile({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`card p-4 rounded-xl border ${
        highlight ? 'border-cyan-500/40 bg-navy-900/90' : 'border-slate-800 bg-navy-900/60'
      }`}
    >
      <div className="mb-1">{icon}</div>
      <p className={`text-xl sm:text-2xl font-bold font-mono ${highlight ? 'text-cyan-300' : 'text-white'}`}>
        {value}
      </p>
      <p className="text-[11px] text-slate-400 font-mono mt-0.5">{label}</p>
    </div>
  );
}
