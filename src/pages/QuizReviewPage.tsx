import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  MinusCircle,
  BookOpen,
  Clock,
  Award,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  BarChart2,
  Filter,
  Check,
  FileText
} from 'lucide-react';
import { loadFullResult } from '../services/quizPersistence';
import { formatDuration } from '../services/quizScoring';
import { getConceptBreakdown } from '../services/conceptExplanations';
import type { QuizResult, Question } from '../types/quiz';

type QuestionFilter = 'all' | 'correct' | 'incorrect' | 'unanswered';

export function QuizReviewPage() {
  const { sessionId } = useParams<{ sessionId: string }>();

  // Load result from localStorage
  const result = useMemo<QuizResult | null>(() => {
    if (!sessionId) return null;
    return loadFullResult(sessionId);
  }, [sessionId]);

  // Active question filter
  const [activeFilter, setActiveFilter] = useState<QuestionFilter>('all');

  // Currently focused question index (0-based index in the result.questions array)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // Set of question IDs with "Learn More" expanded
  const [expandedLearnMore, setExpandedLearnMore] = useState<Record<string, boolean>>({});

  // Filter questions based on activeFilter
  const filteredQuestions = useMemo(() => {
    if (!result?.questions) return [];
    return result.questions.map((q, originalIndex) => {
      const attempt = result.attempts[q.id];
      const selected = attempt?.selectedOptionId;
      const status: QuestionFilter = !selected
        ? 'unanswered'
        : selected === q.correct_option_id
        ? 'correct'
        : 'incorrect';
      return {
        question: q,
        originalIndex,
        status,
      };
    }).filter(item => {
      if (activeFilter === 'all') return true;
      return item.status === activeFilter;
    });
  }, [result, activeFilter]);

  // If result is not found, attempt to find by matching ID in the summaries list
  // or show friendly empty state
  if (!result || !result.questions || result.questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
          <AlertTriangle size={32} />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Quiz Attempt Not Found</h1>
          <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
            This quiz attempt could not be loaded. It may have been cleared from browser history or the link is incomplete.
          </p>
        </div>
        <div className="flex gap-3 justify-center pt-2">
          <Link to="/results" className="btn-secondary">
            <ChevronLeft size={16} /> Back to Results
          </Link>
          <Link to="/courses/chapter/work-energy-power" className="btn-primary">
            Start a Practice Quiz
          </Link>
        </div>
      </div>
    );
  }

  // Calculation of grades and stats
  const timeTaken = formatDuration(result.timeTakenMs);
  const scorePercent = result.maxScore > 0
    ? Math.round((result.score / result.maxScore) * 100)
    : 0;

  const getGrade = (pct: number) => {
    if (pct >= 90) return { label: 'Excellent!', color: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    if (pct >= 75) return { label: 'Very Good', color: 'text-indigo-400', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' };
    if (pct >= 60) return { label: 'Good Effort', color: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' };
    if (pct >= 40) return { label: 'Needs Practice', color: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
    return { label: 'Keep Studying', color: 'text-red-400', badge: 'bg-red-500/20 text-red-300 border-red-500/40' };
  };

  const grade = getGrade(scorePercent);

  // Helper to determine question attempt status
  const getQuestionStatus = (q: Question) => {
    const attempt = result.attempts[q.id];
    const selected = attempt?.selectedOptionId;
    if (!selected) return 'unanswered';
    if (selected === q.correct_option_id) return 'correct';
    return 'incorrect';
  };

  // Toggle Learn More for a specific question
  const toggleLearnMore = (qId: string) => {
    setExpandedLearnMore(prev => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  // Scroll to question
  const scrollToQuestion = (originalIndex: number) => {
    setActiveQuestionIndex(originalIndex);
    const element = document.getElementById(`review-question-${originalIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/50 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link to="/results" className="hover:text-indigo-400 flex items-center gap-1 transition-colors">
              <ChevronLeft size={14} /> Results History
            </Link>
            <span>/</span>
            <span className="text-slate-300">Attempt Review</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {result.chapter}
            </h1>
            <span className="badge bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {result.mode === 'exam' ? 'Exam Mode' : 'Full Practice Set'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
            <span>Attempted: {new Date(result.completedAt).toLocaleString()}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-indigo-400" />
              Time Used: {timeTaken}
            </span>
          </div>
        </div>

        {/* Back and Action Buttons */}
        <div className="flex items-center gap-2">
          <Link to="/results" className="btn-secondary text-sm py-2 px-3">
            <BarChart2 size={15} /> All Results
          </Link>
          <Link to="/courses/chapter/work-energy-power" className="btn-primary text-sm py-2 px-4">
            <RotateCcw size={15} /> Take New Quiz
          </Link>
        </div>
      </div>

      {/* Score Summary & Filter Banner */}
      <div className="card-elevated p-6 rounded-2xl space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Final Score */}
          <div className="p-4 rounded-xl bg-navy-900 border border-slate-700/50 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Final Score</span>
            <div className="flex items-baseline gap-2">
              <p className={`text-3xl font-extrabold tracking-tight ${grade.color}`}>
                {result.score}/{result.maxScore}
              </p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${grade.badge}`}>
                {grade.label}
              </span>
            </div>
            <p className="text-xs text-slate-500">1 mark per correct answer</p>
          </div>

          {/* Accuracy */}
          <div className="p-4 rounded-xl bg-navy-900 border border-slate-700/50 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Accuracy</span>
            <p className="text-3xl font-extrabold text-white tracking-tight">
              {result.accuracyPercent}%
            </p>
            <p className="text-xs text-slate-500">
              {result.correct} of {result.totalQuestions} questions correct
            </p>
          </div>

          {/* Time Taken */}
          <div className="p-4 rounded-xl bg-navy-900 border border-slate-700/50 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Time Taken</span>
            <p className="text-3xl font-extrabold text-white tracking-tight font-mono">
              {timeTaken}
            </p>
            <p className="text-xs text-slate-500">
              Avg {result.totalQuestions > 0 ? Math.round((result.timeTakenMs / 1000) / result.totalQuestions) : 0}s per question
            </p>
          </div>

          {/* Breakdown Pills */}
          <div className="p-4 rounded-xl bg-navy-900 border border-slate-700/50 flex flex-col justify-center space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle size={13} /> {result.correct} Correct
              </span>
              <span className="flex items-center gap-1.5 text-red-400 font-semibold">
                <XCircle size={13} /> {result.incorrect} Incorrect
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-700/40">
              <span className="flex items-center gap-1.5 text-slate-400">
                <MinusCircle size={13} /> {result.unanswered} Unanswered
              </span>
              <span className="text-indigo-400 font-medium">
                {result.totalQuestions} Total
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="h-2.5 bg-navy-900 rounded-full overflow-hidden border border-slate-700/40 flex">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${(result.correct / result.totalQuestions) * 100}%` }}
              title={`Correct: ${result.correct}`}
            />
            <div
              className="h-full bg-red-500 transition-all duration-500"
              style={{ width: `${(result.incorrect / result.totalQuestions) * 100}%` }}
              title={`Incorrect: ${result.incorrect}`}
            />
            <div
              className="h-full bg-slate-600 transition-all duration-500"
              style={{ width: `${(result.unanswered / result.totalQuestions) * 100}%` }}
              title={`Unanswered: ${result.unanswered}`}
            />
          </div>
        </div>

        {/* Question Filter Buttons */}
        <div className="flex items-center justify-between gap-3 flex-wrap pt-2 border-t border-slate-700/40">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Filter size={13} /> Filter:
            </span>

            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                activeFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-navy-900 text-slate-400 hover:text-white border border-slate-700/40 hover:bg-navy-800'
              }`}
            >
              All Questions
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">{result.totalQuestions}</span>
            </button>

            <button
              onClick={() => setActiveFilter('correct')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                activeFilter === 'correct'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-navy-900 text-emerald-400/80 hover:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/10'
              }`}
            >
              <CheckCircle size={12} /> Correct
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/30">{result.correct}</span>
            </button>

            <button
              onClick={() => setActiveFilter('incorrect')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                activeFilter === 'incorrect'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'bg-navy-900 text-red-400/80 hover:text-red-300 border border-red-500/30 hover:bg-red-500/10'
              }`}
            >
              <XCircle size={12} /> Incorrect
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-500/30">{result.incorrect}</span>
            </button>

            <button
              onClick={() => setActiveFilter('unanswered')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                activeFilter === 'unanswered'
                  ? 'bg-slate-600 text-white shadow-md shadow-slate-600/30'
                  : 'bg-navy-900 text-slate-400 hover:text-slate-300 border border-slate-700/40 hover:bg-slate-700/20'
              }`}
            >
              <MinusCircle size={12} /> Unanswered
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-700/50">{result.unanswered}</span>
            </button>
          </div>

          <span className="text-xs text-slate-500">
            Showing {filteredQuestions.length} of {result.totalQuestions} questions
          </span>
        </div>
      </div>

      {/* Main Review Workspace with Sidebar Navigator */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Questions Stream */}
        <div className="flex-1 w-full space-y-6">
          {filteredQuestions.length === 0 ? (
            <div className="card p-12 text-center space-y-3 border-dashed border-slate-700/50">
              <CheckCircle size={32} className="text-emerald-400 mx-auto" />
              <h3 className="text-base font-semibold text-white">No questions matching filter</h3>
              <p className="text-sm text-slate-400">
                You have 0 questions in the &quot;{activeFilter}&quot; category for this attempt.
              </p>
              <button
                onClick={() => setActiveFilter('all')}
                className="btn-secondary text-xs py-2 px-4 mx-auto"
              >
                Reset to All Questions
              </button>
            </div>
          ) : (
            filteredQuestions.map(({ question: q, originalIndex, status }) => {
              const attempt = result.attempts[q.id];
              const studentAnswer = attempt?.selectedOptionId;
              const isCorrect = status === 'correct';
              const isUnanswered = status === 'unanswered';
              const breakdown = getConceptBreakdown(q.id);
              const isLearnMoreOpen = Boolean(expandedLearnMore[q.id]);

              return (
                <div
                  key={q.id}
                  id={`review-question-${originalIndex}`}
                  className="card-elevated rounded-2xl p-6 space-y-6 transition-all duration-200 border border-slate-700/50 hover:border-slate-600/60"
                >
                  {/* Question Header & Status */}
                  <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-slate-700/50">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="w-8 h-8 rounded-lg bg-navy-900 border border-slate-700/60 text-slate-300 font-bold text-sm flex items-center justify-center">
                        {originalIndex + 1}
                      </span>
                      <span className="badge bg-navy-900 text-slate-300 border border-slate-600/40 text-xs">
                        {q.topic}
                      </span>
                      {q.manual_review && (
                        <span className="badge bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs gap-1">
                          <AlertTriangle size={11} /> Source Discrepancy Flagged
                        </span>
                      )}
                    </div>

                    {/* Question Result Pill */}
                    <div>
                      {isCorrect && (
                        <div className="badge bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs py-1 px-3 gap-1.5 font-semibold">
                          <CheckCircle size={14} className="text-emerald-400" />
                          Correct (+1 Mark)
                        </div>
                      )}
                      {status === 'incorrect' && (
                        <div className="badge bg-red-500/20 text-red-300 border border-red-500/40 text-xs py-1 px-3 gap-1.5 font-semibold">
                          <XCircle size={14} className="text-red-400" />
                          Incorrect (0 Marks)
                        </div>
                      )}
                      {isUnanswered && (
                        <div className="badge bg-slate-700/30 text-slate-300 border border-slate-600/40 text-xs py-1 px-3 gap-1.5 font-semibold">
                          <MinusCircle size={14} className="text-slate-400" />
                          Unanswered (0 Marks)
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="space-y-3">
                    <p className="text-slate-100 text-base leading-relaxed font-medium">
                      {q.question_text}
                    </p>
                    {q.formula && (
                      <div className="font-mono text-sm text-indigo-300 bg-indigo-950/40 border border-indigo-500/30 rounded-xl px-4 py-2.5">
                        {q.formula}
                      </div>
                    )}
                  </div>

                  {/* 4 Options with Distinct Student Choice & Correct Answer Styling */}
                  <div className="space-y-2.5">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Answer Options</p>
                    {q.options.map(opt => {
                      const isCorrectOpt = opt.id === q.correct_option_id;
                      const isStudentPick = opt.id === studentAnswer;

                      let cardStyle = 'w-full text-left px-4 py-3.5 rounded-xl border flex items-start gap-3 transition-colors ';
                      let badgeStyle = 'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ';
                      let textStyle = 'flex-1 text-sm leading-relaxed pt-0.5 ';
                      let indicator: React.ReactNode = null;

                      if (isCorrectOpt && isStudentPick) {
                        // Student chose correctly
                        cardStyle += 'bg-emerald-500/15 border-emerald-500/60 shadow-lg shadow-emerald-500/10';
                        badgeStyle += 'bg-emerald-500 text-white';
                        textStyle += 'text-emerald-100 font-medium';
                        indicator = (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-2 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex-shrink-0">
                            <CheckCircle size={13} /> Your Answer (Correct)
                          </div>
                        );
                      } else if (isCorrectOpt && !isStudentPick) {
                        // Correct option student missed
                        cardStyle += 'bg-emerald-500/10 border-emerald-500/50';
                        badgeStyle += 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50';
                        textStyle += 'text-emerald-200 font-medium';
                        indicator = (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-2 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex-shrink-0">
                            <Check size={13} /> Correct Answer
                          </div>
                        );
                      } else if (isStudentPick && !isCorrectOpt) {
                        // Student chose wrong answer
                        cardStyle += 'bg-red-500/15 border-red-500/60';
                        badgeStyle += 'bg-red-500 text-white';
                        textStyle += 'text-red-100';
                        indicator = (
                          <div className="flex items-center gap-1.5 text-xs text-red-400 font-semibold px-2 py-1 rounded-md bg-red-500/20 border border-red-500/30 flex-shrink-0">
                            <XCircle size={13} /> Your Answer (Incorrect)
                          </div>
                        );
                      } else {
                        // Unselected neutral distractor
                        cardStyle += 'bg-navy-900 border-slate-700/30 opacity-70';
                        badgeStyle += 'bg-navy-800 text-slate-400 border border-slate-600/30';
                        textStyle += 'text-slate-400';
                      }

                      return (
                        <div key={opt.id} className={cardStyle.trim()}>
                          <div className={badgeStyle.trim()}>{opt.id}</div>
                          <span className={textStyle.trim()}>{opt.text}</span>
                          {indicator}
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary of Student Answer vs Correct Answer */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-navy-900 border border-slate-700/40 text-xs flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Your Answer:</span>
                      {studentAnswer ? (
                        <span className={`font-semibold ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                          ({studentAnswer}) {q.options.find(o => o.id === studentAnswer)?.text}
                        </span>
                      ) : (
                        <span className="font-semibold text-slate-400 italic">No option selected (Unanswered)</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Correct Answer:</span>
                      <span className="font-semibold text-emerald-400">
                        ({q.correct_option_id}) {q.options.find(o => o.id === q.correct_option_id)?.text}
                      </span>
                    </div>
                  </div>

                  {/* Primary Verified Solution & Explanation */}
                  <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-indigo-400">
                      <BookOpen size={16} />
                      <span className="label-sm text-indigo-300">Verified Solution</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {q.explanation || 'Detailed explanation is not available yet.'}
                    </p>
                  </div>

                  {/* Expandable "Learn More / Understand the Concept" Section */}
                  <div className="border border-violet-500/30 bg-violet-950/15 rounded-xl overflow-hidden transition-all duration-200">
                    <button
                      onClick={() => toggleLearnMore(q.id)}
                      className="w-full text-left p-4 flex items-center justify-between hover:bg-violet-900/20 transition-colors"
                      aria-expanded={isLearnMoreOpen}
                      aria-controls={`learn-more-${q.id}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-300">
                          <Lightbulb size={15} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-violet-200">
                            Understand the Concept & Exam Strategy
                          </p>
                          <p className="text-xs text-slate-400">
                            Deep dive into principles, derivations, and common exam traps
                          </p>
                        </div>
                      </div>
                      <div className="text-violet-300">
                        {isLearnMoreOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </button>

                    {isLearnMoreOpen && (
                      <div id={`learn-more-${q.id}`} className="px-5 pb-5 pt-2 space-y-4 border-t border-violet-500/20 text-xs sm:text-sm">
                        {breakdown ? (
                          <>
                            {/* Concept & Principle */}
                            <div className="space-y-1.5">
                              <span className="font-semibold text-violet-300 flex items-center gap-1.5">
                                <Sparkles size={13} className="text-violet-400" />
                                Physics Principle: {breakdown.concept}
                              </span>
                              <p className="text-slate-300 leading-relaxed text-xs">
                                {breakdown.principle}
                              </p>
                            </div>

                            {/* Governing Formula */}
                            <div className="p-3 rounded-lg bg-navy-950/80 border border-violet-500/20 space-y-1">
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-400">
                                Governing Formula
                              </span>
                              <p className="font-mono text-xs text-indigo-300">
                                {breakdown.formula}
                              </p>
                            </div>

                            {/* Step-by-Step Logic */}
                            <div className="space-y-1.5">
                              <span className="font-semibold text-slate-200">Step-by-Step Calculation:</span>
                              <ul className="space-y-1 pl-4 list-decimal text-slate-300 text-xs">
                                {breakdown.steps.map((st, sIdx) => (
                                  <li key={sIdx} className="leading-relaxed">{st}</li>
                                ))}
                              </ul>
                            </div>

                            {/* Distractor Analysis */}
                            <div className="p-3 rounded-lg bg-navy-900/60 border border-slate-700/40 space-y-1">
                              <span className="font-semibold text-amber-300 text-xs">
                                Why Other Options are Traps:
                              </span>
                              <p className="text-slate-400 text-xs leading-relaxed">
                                {breakdown.distractorNotes}
                              </p>
                            </div>

                            {/* EAPCET Exam Tip */}
                            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-2.5">
                              <Award size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                              <div className="space-y-0.5">
                                <span className="font-semibold text-emerald-300 text-xs">EAPCET Exam Strategy:</span>
                                <p className="text-emerald-200/90 text-xs leading-relaxed">
                                  {breakdown.examTip}
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="p-4 text-center text-slate-400 text-xs">
                            Detailed concept breakdown is currently being curated for this question.
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Source Reference Footer */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-700/30 flex-wrap gap-2">
                    <span className="flex items-center gap-1.5">
                      <FileText size={12} />
                      Source PDF: {q.source_pdf} · Page {q.source_page} · Problem #{q.question_number}
                    </span>
                    <a
                      href={`${import.meta.env.BASE_URL}${q.source_pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 underline"
                    >
                      View Original PDF
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sticky Desktop Question Navigator Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-24 space-y-4">
          <div className="card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="label-sm text-slate-300">Question Navigator</span>
              <span className="text-xs text-slate-500">{result.totalQuestions} Questions</span>
            </div>

            {/* Grid of question buttons */}
            <div className="grid grid-cols-5 gap-2">
              {result.questions.map((q, idx) => {
                const status = getQuestionStatus(q);
                let btnCls = 'w-9 h-9 rounded-lg text-xs font-bold transition-all duration-150 flex items-center justify-center ';

                if (status === 'correct') {
                  btnCls += 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30';
                } else if (status === 'incorrect') {
                  btnCls += 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30';
                } else {
                  btnCls += 'bg-navy-900 text-slate-400 border border-slate-700/50 hover:bg-navy-800 hover:text-slate-300';
                }

                if (activeQuestionIndex === idx) {
                  btnCls += ' ring-2 ring-indigo-400 ring-offset-2 ring-offset-navy-950 font-extrabold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => scrollToQuestion(idx)}
                    className={btnCls}
                    title={`Question ${idx + 1}: ${status.toUpperCase()}`}
                    aria-label={`Jump to question ${idx + 1}, status: ${status}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Navigator Legend */}
            <div className="pt-3 border-t border-slate-700/40 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/50 inline-block" />
                <span>Correct ({result.correct})</span>
              </div>
              <div className="flex items-center gap-2 text-red-400">
                <span className="w-3 h-3 rounded bg-red-500/30 border border-red-500/50 inline-block" />
                <span>Incorrect ({result.incorrect})</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="w-3 h-3 rounded bg-navy-900 border border-slate-700/50 inline-block" />
                <span>Unanswered ({result.unanswered})</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-slate-700/40 space-y-2">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-secondary w-full text-xs py-2 justify-center"
              >
                Back to Top
              </button>
              <Link
                to="/results"
                className="btn-secondary w-full text-xs py-2 justify-center"
              >
                <ChevronLeft size={13} /> Return to History
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
