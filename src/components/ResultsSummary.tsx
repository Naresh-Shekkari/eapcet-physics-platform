import React, { useState } from 'react';
import type { QuizResult, Question, QuestionAttempt } from '../types/quiz';
import { CheckCircle, XCircle, MinusCircle, ChevronDown, ChevronUp, AlertTriangle, BookOpen } from 'lucide-react';
import { formatDuration } from '../services/quizScoring';

// ============================================================
// Results Summary Component
// ============================================================

interface ResultsSummaryProps {
  result: QuizResult;
  onRetry: () => void;
  onBack: () => void;
}

export function ResultsSummary({ result, onRetry, onBack }: ResultsSummaryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const timeTaken = formatDuration(result.timeTakenMs);
  const scorePercent = result.maxScore > 0
    ? Math.round((result.score / result.maxScore) * 100)
    : 0;

  const getGrade = (pct: number) => {
    if (pct >= 90) return { label: 'Excellent!', color: 'text-emerald-400' };
    if (pct >= 75) return { label: 'Very Good', color: 'text-indigo-400' };
    if (pct >= 60) return { label: 'Good', color: 'text-cyan-400' };
    if (pct >= 40) return { label: 'Needs Practice', color: 'text-amber-400' };
    return { label: 'Keep Studying', color: 'text-red-400' };
  };

  const grade = getGrade(scorePercent);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Score card */}
      <div className="card-elevated p-6 text-center space-y-3">
        <p className="label-sm">Your Result</p>
        <div className="space-y-1">
          <p className={`text-4xl font-extrabold tracking-tight ${grade.color}`}>
            {result.score}/{result.maxScore}
          </p>
          <p className="text-slate-400 text-sm">{result.chapter} · {result.mode === 'exam' ? 'Exam Mode' : 'Practice Set'}</p>
        </div>
        <p className={`text-xl font-bold ${grade.color}`}>{grade.label}</p>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-left">
          <StatCard
            icon={<CheckCircle size={16} className="text-emerald-400" />}
            label="Correct"
            value={result.correct}
            total={result.totalQuestions}
            color="emerald"
          />
          <StatCard
            icon={<XCircle size={16} className="text-red-400" />}
            label="Incorrect"
            value={result.incorrect}
            total={result.totalQuestions}
            color="red"
          />
          <StatCard
            icon={<MinusCircle size={16} className="text-slate-400" />}
            label="Unanswered"
            value={result.unanswered}
            total={result.totalQuestions}
            color="slate"
          />
          <StatCard
            icon={<BookOpen size={16} className="text-indigo-400" />}
            label="Accuracy"
            value={`${result.accuracyPercent}%`}
            color="indigo"
          />
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-3 bg-navy-900 rounded-full overflow-hidden border border-slate-700/40 flex">
            <div
              className="h-full bg-emerald-500 transition-all duration-1000"
              style={{ width: `${(result.correct / result.totalQuestions) * 100}%` }}
            />
            <div
              className="h-full bg-red-500 transition-all duration-1000"
              style={{ width: `${(result.incorrect / result.totalQuestions) * 100}%` }}
            />
            <div
              className="h-full bg-slate-600 transition-all duration-1000"
              style={{ width: `${(result.unanswered / result.totalQuestions) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>Time taken: {timeTaken}</span>
            <span>Score: {scorePercent}%</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button onClick={onBack} className="btn-secondary flex-1">
            Back to Chapter
          </button>
          <button onClick={onRetry} className="btn-primary flex-1">
            Try Again
          </button>
        </div>
      </div>

      {/* Question-by-question review */}
      <div className="space-y-3">
        <h2 className="section-heading">Answer Review</h2>
        {result.questions.map((q, i) => {
          const attempt = result.attempts[q.id];
          const isExpanded = expandedId === q.id;
          const studentAnswer = attempt?.selectedOptionId;
          const isCorrect = studentAnswer === q.correct_option_id;
          const isUnanswered = !studentAnswer;

          let statusIcon: React.ReactNode;
          let statusText: string;
          let headerBorder: string;

          if (isUnanswered) {
            statusIcon = <MinusCircle size={16} className="text-slate-400" />;
            statusText = 'Unanswered';
            headerBorder = 'border-slate-600/40';
          } else if (isCorrect) {
            statusIcon = <CheckCircle size={16} className="text-emerald-400" />;
            statusText = 'Correct';
            headerBorder = 'border-emerald-500/30';
          } else {
            statusIcon = <XCircle size={16} className="text-red-400" />;
            statusText = 'Incorrect';
            headerBorder = 'border-red-500/30';
          }

          return (
            <div key={q.id} className={`card rounded-2xl border ${headerBorder} overflow-hidden`}>
              {/* Header */}
              <button
                className="w-full text-left px-5 py-4 flex items-start gap-3 hover:bg-navy-800/50 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                aria-expanded={isExpanded}
                aria-controls={`review-${q.id}`}
              >
                <div className="mt-0.5 flex-shrink-0">{statusIcon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-slate-400">Q{i + 1}</span>
                    <span className="badge bg-navy-800 text-slate-500 border border-slate-600/30 text-xs">{q.topic}</span>
                    <span className={`text-xs font-semibold ml-auto mr-2 ${isUnanswered ? 'text-slate-400' : isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                      {statusText}
                    </span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed line-clamp-2">{q.question_text}</p>
                </div>
                <div className="flex-shrink-0 mt-1 text-slate-500">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {/* Expanded review */}
              {isExpanded && (
                <div id={`review-${q.id}`} className="px-5 pb-5 space-y-4 border-t border-slate-700/40">
                  {/* Options */}
                  <div className="space-y-2 pt-4">
                    {q.options.map(opt => {
                      const isThisCorrect = opt.id === q.correct_option_id;
                      const isStudentPick = opt.id === studentAnswer;
                      let cls = 'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm border ';
                      if (isThisCorrect && isStudentPick) {
                        cls += 'bg-emerald-500/15 border-emerald-500/50 text-emerald-100';
                      } else if (isThisCorrect) {
                        cls += 'bg-emerald-500/8 border-emerald-500/30 text-emerald-200';
                      } else if (isStudentPick) {
                        cls += 'bg-red-500/15 border-red-500/40 text-red-100';
                      } else {
                        cls += 'bg-navy-900 border-slate-700/30 text-slate-400';
                      }
                      return (
                        <div key={opt.id} className={cls}>
                          <span className="font-bold w-5 flex-shrink-0">{opt.id}</span>
                          <span className="flex-1">{opt.text}</span>
                          {isThisCorrect && (
                            <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" aria-label="Correct answer" />
                          )}
                          {isStudentPick && !isThisCorrect && (
                            <XCircle size={14} className="text-red-400 flex-shrink-0" aria-label="Your answer (wrong)" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Correct answer summary */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-400">Correct answer:</span>
                    <span className="font-semibold text-emerald-400">({q.correct_option_id})</span>
                    <span className="text-emerald-200">{q.options.find(o => o.id === q.correct_option_id)?.text}</span>
                  </div>

                  {/* Explanation */}
                  <div className="p-4 rounded-xl bg-indigo-900/20 border border-indigo-500/20 space-y-2">
                    <p className="label-sm text-indigo-400">Explanation</p>
                    <p className="text-sm text-slate-200 leading-relaxed">{q.explanation}</p>
                    {q.formula && (
                      <p className="font-mono text-xs text-indigo-300 bg-indigo-900/30 px-3 py-1.5 rounded-lg border border-indigo-500/20 mt-2">
                        {q.formula}
                      </p>
                    )}
                  </div>

                  {/* Manual review flag */}
                  {q.manual_review && (
                    <div className="flex gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                      <AlertTriangle size={14} className="flex-shrink-0 mt-0.5 text-amber-400" />
                      <div>
                        <p className="text-xs font-semibold text-amber-300">Manual Review Flagged</p>
                        <p className="text-xs text-amber-200 mt-0.5">{q.review_note}</p>
                      </div>
                    </div>
                  )}

                  {/* Source ref */}
                  <p className="text-xs text-slate-500">
                    Source: {q.source_pdf} · Page {q.source_page} · Q{q.question_number}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({
  icon, label, value, total, color
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  total?: number;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-500/10 border-emerald-500/20',
    red: 'bg-red-500/10 border-red-500/20',
    slate: 'bg-slate-500/10 border-slate-500/20',
    indigo: 'bg-indigo-500/10 border-indigo-500/20',
  };

  return (
    <div className={`rounded-xl p-3 border ${colorMap[color] ?? colorMap.slate}`}>
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
      {total !== undefined && (
        <p className="text-xs text-slate-500">of {total}</p>
      )}
    </div>
  );
}
