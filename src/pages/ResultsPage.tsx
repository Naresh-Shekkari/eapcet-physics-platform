import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, CheckCircle, XCircle, MinusCircle, Clock, ChevronRight, Trash2 } from 'lucide-react';
import { loadResultsList, clearAllResults } from '../services/quizPersistence';
import { formatDuration } from '../services/quizScoring';

// ============================================================
// Results History Page
// ============================================================

export function ResultsPage() {
  const [results, setResults] = React.useState(() => loadResultsList());

  const handleClear = () => {
    clearAllResults();
    setResults([]);
  };

  if (results.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-navy-800 border border-slate-700/40 flex items-center justify-center mx-auto">
          <BarChart2 size={28} className="text-slate-500" />
        </div>
        <h1 className="text-2xl font-bold text-white">No Results Yet</h1>
        <p className="text-slate-400">Complete a quiz to see your results history here.</p>
        <Link to="/courses/chapter/work-energy-power" className="btn-primary inline-flex mx-auto">
          Start a Quiz
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="label-sm text-indigo-400">History</p>
          <h1 className="text-2xl font-extrabold text-white">Quiz Results</h1>
        </div>
        <button
          onClick={handleClear}
          className="btn-secondary text-sm text-red-400 hover:text-red-300 border-red-500/30 hover:border-red-500/50"
        >
          <Trash2 size={14} /> Clear All
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SumStat label="Attempts" value={results.length} />
        <SumStat
          label="Best Score"
          value={`${Math.max(...results.map(r => r.accuracyPercent))}%`}
          highlight
        />
        <SumStat
          label="Avg Score"
          value={`${Math.round(results.reduce((s, r) => s + r.accuracyPercent, 0) / results.length)}%`}
        />
        <SumStat
          label="Total Questions"
          value={results.reduce((s, r) => s + r.totalQuestions, 0)}
        />
      </div>

      {/* Results list */}
      <div className="space-y-3">
        {results.map((r, i) => {
          const accuracyColor = r.accuracyPercent >= 70
            ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
            : r.accuracyPercent >= 50
              ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
              : 'text-red-400 bg-red-500/10 border-red-500/20';

          return (
            <div key={r.id} className="card p-4 flex items-center gap-4">
              <div className="text-xs text-slate-500 font-mono w-5 text-center">#{results.length - i}</div>

              {/* Accuracy badge */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold border flex-shrink-0 ${accuracyColor}`}>
                {Math.round(r.accuracyPercent)}%
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-white truncate">{r.chapter}</p>
                  <span className="badge bg-navy-800 text-slate-400 border border-slate-600/30 text-xs">
                    {r.mode === 'exam' ? 'Exam' : 'Practice'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle size={11} /> {r.correct}
                  </span>
                  <span className="flex items-center gap-1 text-red-400">
                    <XCircle size={11} /> {r.incorrect}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <MinusCircle size={11} /> {r.unanswered}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {formatDuration(r.timeTakenMs)}
                  </span>
                  <span>{new Date(r.completedAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Score */}
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-white">{r.score}/{r.maxScore}</p>
                <p className="text-xs text-slate-500">marks</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <Link to="/courses/chapter/work-energy-power" className="btn-primary inline-flex">
          Attempt Another Quiz
        </Link>
      </div>
    </div>
  );
}

function SumStat({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className={`card p-4 text-center rounded-xl ${highlight ? 'border-indigo-500/30' : ''}`}>
      <p className={`text-xl font-bold ${highlight ? 'text-gradient' : 'text-white'}`}>{value}</p>
      <p className="text-xs text-slate-400 mt-0.5">{label}</p>
    </div>
  );
}
