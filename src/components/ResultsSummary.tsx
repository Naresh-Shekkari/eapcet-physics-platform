import React, { useState, useMemo } from 'react';
import type { QuizResult } from '../types/quiz';
import {
  CheckCircle2,
  XCircle,
  MinusCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  RotateCcw,
  Clock,
  Target,
  Sparkles,
} from 'lucide-react';
import { formatDuration } from '../services/quizScoring';
import { FormulaBlock } from './MathText';

// ============================================================
// Results Summary & In-Depth Review — PhysicsEdge
// ============================================================

interface ResultsSummaryProps {
  result: QuizResult;
  onRetry: () => void;
  onBack: () => void;
}

type FilterType = 'all' | 'incorrect' | 'correct' | 'unanswered';

export function ResultsSummary({ result, onRetry, onBack }: ResultsSummaryProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    // Default open first 3 questions for quick review
    const initial: Record<string, boolean> = {};
    result.questions.slice(0, 2).forEach((q) => {
      initial[q.id] = true;
    });
    return initial;
  });

  const timeTaken = formatDuration(result.timeTakenMs);
  const scorePercent = result.maxScore > 0
    ? Math.round((result.score / result.maxScore) * 100)
    : 0;

  const getEvaluation = (pct: number) => {
    if (pct >= 90) return { title: 'Outstanding Mastery!', desc: 'Exceptional conceptual accuracy across core mechanics.', color: 'text-emerald-400', badge: 'Tier 1 Rank Ready' };
    if (pct >= 75) return { title: 'Strong Performance', desc: 'Good command of concepts. Fine-tune calculation speed.', color: 'text-cyan-400', badge: 'High Percentile' };
    if (pct >= 60) return { title: 'Solid Foundation', desc: 'Consistent baseline. Focus on variable forces & vector drills.', color: 'text-blue-400', badge: 'Passing Grade' };
    if (pct >= 40) return { title: 'Needs Targeted Practice', desc: 'Review key formulas and step-by-step PDF solutions.', color: 'text-amber-400', badge: 'Revision Required' };
    return { title: 'Foundational Review Needed', desc: 'Read the Chapter Study Guide before attempting again.', color: 'text-rose-400', badge: 'High Revision' };
  };

  const evaluation = getEvaluation(scorePercent);

  // Topic breakdown calculation
  const topicStats = useMemo(() => {
    const map: Record<string, { total: number; correct: number }> = {};
    for (const q of result.questions) {
      if (!map[q.topic]) map[q.topic] = { total: 0, correct: 0 };
      map[q.topic].total += 1;
      const attempt = result.attempts[q.id];
      if (attempt?.selectedOptionId === q.correct_option_id) {
        map[q.topic].correct += 1;
      }
    }
    return Object.entries(map).map(([topic, stat]) => ({
      topic,
      total: stat.total,
      correct: stat.correct,
      pct: Math.round((stat.correct / stat.total) * 100),
    }));
  }, [result]);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return result.questions.filter((q) => {
      const attempt = result.attempts[q.id];
      const isAnswered = attempt?.selectedOptionId !== null && attempt?.selectedOptionId !== undefined;
      const isCorrect = isAnswered && attempt?.selectedOptionId === q.correct_option_id;

      if (filter === 'correct') return isCorrect;
      if (filter === 'incorrect') return isAnswered && !isCorrect;
      if (filter === 'unanswered') return !isAnswered;
      return true;
    });
  }, [result, filter]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    result.questions.forEach((q) => { all[q.id] = true; });
    setExpandedIds(all);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Performance Score Card */}
      <div className="card-elevated p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-slate-700/80 shadow-2xl">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-6">
          {/* Top category & mode bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="badge bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-mono text-xs">
                {result.mode === 'exam' ? 'Exam Mode Evaluation' : 'Practice Set Evaluation'}
              </span>
              <span className="text-slate-400 text-xs font-mono">
                {result.chapter}
              </span>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Session: {new Date(result.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {/* Central score layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Main Score display */}
            <div className="space-y-2 text-center md:text-left">
              <span className="micro-label">Final Verified Score</span>
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight">
                  {result.score}
                </span>
                <span className="text-2xl text-slate-500 font-mono">
                  / {result.maxScore}
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className={`text-base font-bold ${evaluation.color}`}>
                  {evaluation.title}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                {evaluation.desc}
              </p>
            </div>

            {/* Circular Gauge / Percentage Center */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-navy-950/60 border border-slate-800/80">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg width="112" height="112" className="-rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="8"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 46}
                    strokeDashoffset={2 * Math.PI * 46 * (1 - scorePercent / 100)}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                  <span className="text-2xl font-bold text-white">{scorePercent}%</span>
                  <span className="text-[10px] uppercase text-slate-400">Accuracy</span>
                </div>
              </div>
              <span className="badge bg-navy-900 border border-slate-800 text-cyan-300 font-mono text-[11px] mt-2">
                {evaluation.badge}
              </span>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
              <div className="p-3 rounded-xl bg-navy-950/70 border border-emerald-500/20">
                <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                  <CheckCircle2 size={14} />
                  <span>Correct</span>
                </div>
                <span className="text-xl font-bold text-white">{result.correct}</span>
                <span className="text-[10px] text-slate-500 block">+{result.correct} Marks</span>
              </div>

              <div className="p-3 rounded-xl bg-navy-950/70 border border-rose-500/20">
                <div className="flex items-center gap-1.5 text-rose-400 mb-1">
                  <XCircle size={14} />
                  <span>Incorrect</span>
                </div>
                <span className="text-xl font-bold text-white">{result.incorrect}</span>
                <span className="text-[10px] text-slate-500 block">0 Marks deducted</span>
              </div>

              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <MinusCircle size={14} />
                  <span>Unanswered</span>
                </div>
                <span className="text-xl font-bold text-white">{result.unanswered}</span>
                <span className="text-[10px] text-slate-500 block">Skipped/Timed out</span>
              </div>

              <div className="p-3 rounded-xl bg-navy-950/70 border border-cyan-500/20">
                <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                  <Clock size={14} />
                  <span>Time Taken</span>
                </div>
                <span className="text-xl font-bold text-white">{timeTaken}</span>
                <span className="text-[10px] text-slate-500 block">Total duration</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={onBack}
              type="button"
              className="btn-secondary w-full sm:w-auto px-6 py-2.5 text-sm"
            >
              Back to Chapter
            </button>
            <button
              onClick={onRetry}
              type="button"
              className="btn-primary w-full sm:w-auto px-6 py-2.5 text-sm gap-2"
            >
              <RotateCcw size={15} />
              <span>Retake Quiz (Fresh Attempt)</span>
            </button>
            <div className="sm:ml-auto text-xs text-slate-500 font-mono text-center sm:text-right">
              All results stored in browser localStorage
            </div>
          </div>
        </div>
      </div>

      {/* Topic-Level Breakdown */}
      {topicStats.length > 0 && (
        <div className="card p-6 rounded-2xl bg-navy-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Topic Mastery Breakdown
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {topicStats.length} Subtopics
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {topicStats.map((item) => (
              <div
                key={item.topic}
                className="p-3.5 rounded-xl bg-navy-950/70 border border-slate-800/80 space-y-2 font-mono"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs text-slate-200 font-medium truncate" title={item.topic}>
                    {item.topic}
                  </span>
                  <span className={`text-xs font-bold ${item.pct >= 75 ? 'text-emerald-400' : item.pct >= 50 ? 'text-cyan-400' : 'text-amber-400'}`}>
                    {item.pct}%
                  </span>
                </div>
                <div className="w-full bg-navy-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full ${item.pct >= 75 ? 'bg-emerald-500' : item.pct >= 50 ? 'bg-cyan-500' : 'bg-amber-500'}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500 flex justify-between">
                  <span>{item.correct} of {item.total} correct</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question-By-Question Detailed Review Section */}
      <div className="space-y-4">
        {/* Section title and filter control bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="micro-label">Step-by-Step Solutions</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Answer Review & Explanations
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-navy-950 border border-slate-800 font-mono text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'all' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
            >
              All ({result.totalQuestions})
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'incorrect' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'text-slate-400 hover:text-white'}`}
            >
              Wrong ({result.incorrect})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'correct' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'}`}
            >
              Correct ({result.correct})
            </button>
            <button
              onClick={() => setFilter('unanswered')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'unanswered' ? 'bg-slate-700/40 text-slate-300 border border-slate-600/40' : 'text-slate-400 hover:text-white'}`}
            >
              Skipped ({result.unanswered})
            </button>
          </div>
        </div>

        {/* Bulk toggle helper buttons */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
          <span>Showing {filteredQuestions.length} of {result.totalQuestions} questions</span>
          <div className="flex items-center gap-3">
            <button onClick={expandAll} className="hover:text-cyan-300 transition-colors">
              Expand All
            </button>
            <span>·</span>
            <button onClick={collapseAll} className="hover:text-cyan-300 transition-colors">
              Collapse All
            </button>
          </div>
        </div>

        {/* Question Cards List */}
        <div className="space-y-3.5">
          {filteredQuestions.map((q) => {
            const index = result.questions.findIndex((item) => item.id === q.id);
            const attempt = result.attempts[q.id];
            const isExpanded = Boolean(expandedIds[q.id]);
            const studentAnswer = attempt?.selectedOptionId ?? null;
            const isCorrect = studentAnswer === q.correct_option_id;
            const isUnanswered = studentAnswer === null;

            let statusIcon: React.ReactNode;
            let statusBadge: string;
            let borderStyle: string;

            if (isUnanswered) {
              statusIcon = <MinusCircle size={18} className="text-slate-400" />;
              statusBadge = 'bg-slate-800 text-slate-300 border-slate-700';
              borderStyle = 'border-slate-800 hover:border-slate-700';
            } else if (isCorrect) {
              statusIcon = <CheckCircle2 size={18} className="text-emerald-400" />;
              statusBadge = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
              borderStyle = 'border-emerald-500/30 hover:border-emerald-500/50';
            } else {
              statusIcon = <XCircle size={18} className="text-rose-400" />;
              statusBadge = 'bg-rose-500/15 text-rose-300 border-rose-500/30';
              borderStyle = 'border-rose-500/30 hover:border-rose-500/50';
            }

            return (
              <div
                key={q.id}
                className={`card rounded-2xl bg-navy-900/90 border transition-all duration-200 overflow-hidden ${borderStyle}`}
              >
                {/* Accordion header button */}
                <button
                  onClick={() => toggleExpand(q.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-start gap-3 sm:gap-4 hover:bg-navy-850/60 transition-colors"
                  aria-expanded={isExpanded}
                  aria-controls={`detail-${q.id}`}
                >
                  <div className="mt-0.5 flex-shrink-0">{statusIcon}</div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                      <span className="font-bold text-white">Q{(index + 1).toString().padStart(2, '0')}</span>
                      <span className={`badge border text-[11px] ${statusBadge}`}>
                        {isUnanswered ? 'Unanswered' : isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                      </span>
                      <span className="badge bg-navy-950 text-slate-400 border border-slate-800 text-[11px]">
                        {q.topic}
                      </span>
                    </div>

                    <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed line-clamp-2">
                      {q.question_text}
                    </p>
                  </div>

                  <div className="flex-shrink-0 mt-1 text-slate-400 hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {/* Expanded Question Solutions and Detailed Analysis */}
                {isExpanded && (
                  <div
                    id={`detail-${q.id}`}
                    className="px-4 sm:px-6 pb-6 pt-2 space-y-5 border-t border-slate-800/80 bg-navy-950/40"
                  >
                    {/* Full question text */}
                    <div className="p-4 rounded-xl bg-navy-900/80 border border-slate-800 space-y-2">
                      <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400">
                        Full Question Statement
                      </span>
                      <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
                        {q.question_text}
                      </p>
                      {q.formula && (
                        <FormulaBlock formula={q.formula} label="Given / Formula" />
                      )}
                    </div>

                    {/* All options with visual pick state */}
                    <div className="space-y-2">
                      <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400">
                        Answer Options Comparison
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt) => {
                          const isThisCorrect = opt.id === q.correct_option_id;
                          const isStudentPick = opt.id === studentAnswer;

                          let optStyles = 'p-3 rounded-xl border flex items-center gap-3 text-xs sm:text-sm font-mono ';

                          if (isThisCorrect && isStudentPick) {
                            optStyles += 'bg-emerald-500/15 border-emerald-500/60 text-emerald-100 font-semibold shadow-sm';
                          } else if (isThisCorrect) {
                            optStyles += 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200';
                          } else if (isStudentPick) {
                            optStyles += 'bg-rose-500/15 border-rose-500/50 text-rose-100 font-semibold';
                          } else {
                            optStyles += 'bg-navy-900 border-slate-800 text-slate-400';
                          }

                          return (
                            <div key={opt.id} className={optStyles}>
                              <span className={`w-6 h-6 rounded font-bold text-xs flex items-center justify-center flex-shrink-0 ${
                                isThisCorrect ? 'bg-emerald-500 text-white' : isStudentPick ? 'bg-rose-500 text-white' : 'bg-navy-950 text-slate-500 border border-slate-800'
                              }`}>
                                {opt.id}
                              </span>
                              <span className="flex-1">{opt.text}</span>
                              {isThisCorrect && (
                                <span className="text-[10px] uppercase font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10">
                                  Correct Key
                                </span>
                              )}
                              {isStudentPick && !isThisCorrect && (
                                <span className="text-[10px] uppercase font-bold text-rose-400 px-1.5 py-0.5 rounded bg-rose-500/10">
                                  Your Choice
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step-by-Step Verified Solution */}
                    <div className="p-4 sm:p-5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2 shadow-inner">
                      <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-cyan-400" />
                        <span className="font-mono text-xs uppercase tracking-wider text-cyan-300 font-semibold">
                          Step-by-Step Verified Explanation
                        </span>
                      </div>
                      <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-sans pt-1">
                        {q.explanation}
                      </p>
                    </div>

                    {/* Manual Review Note if any */}
                    {q.manual_review && (
                      <div className="flex gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                        <AlertCircle size={15} className="flex-shrink-0 mt-0.5 text-amber-400" />
                        <div>
                          <p className="font-mono font-semibold text-amber-300">Curriculum Review Note</p>
                          <p className="text-amber-200 mt-0.5">{q.review_note}</p>
                        </div>
                      </div>
                    )}

                    {/* Source PDF Citation */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                      <span>Source: {q.source_pdf} · Page {q.source_page} · Problem #{q.question_number}</span>
                      <span className="text-slate-400">EAPCET Physics Syllabus</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
