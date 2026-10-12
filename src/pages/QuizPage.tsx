import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  AlertTriangle,
  Send,
  X,
  Menu,
  Clock,
} from 'lucide-react';

import { useQuizEngine } from '../hooks/useQuizEngine';
import {
  selectQuestions,
  shuffleQuestionOptions,
  PRACTICE_QUESTION_COUNT,
  EXAM_QUESTION_COUNT,
  PER_QUESTION_DURATION_MS,
  PRACTICE_TOTAL_DURATION_MS,
  EXAM_TOTAL_DURATION_MS,
  canStartExamMode,
  getQuestionCount,
} from '../services/questionBank';
import { QuizInstructions } from '../components/QuizInstructions';
import { QuestionCard } from '../components/QuestionCard';
import { CircularTimer } from '../components/CircularTimer';
import { QuestionNavigator } from '../components/QuestionNavigator';
import { ProgressBar } from '../components/ProgressBar';
import { ResultsSummary } from '../components/ResultsSummary';
import { formatTime } from '../services/quizScoring';
import type { QuizSettings, QuizMode } from '../types/quiz';

// ============================================================
// Quiz Testing Interface — PhysicsEdge
// ============================================================

export function QuizPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const modeParam = (searchParams.get('mode') ?? 'practice') as QuizMode;
  const [showMobileNav, setShowMobileNav] = useState(false);

  const {
    state,
    result,
    startQuiz,
    selectAnswer,
    toggleMark,
    navigate: navQuestion,
    requestSubmit,
    cancelSubmit,
    confirmSubmit,
    resetQuiz,
    overallRemainingMs,
    questionRemainingMs,
  } = useQuizEngine();

  // Determine mode & parameters
  const isExam = modeParam === 'exam' && canStartExamMode(EXAM_QUESTION_COUNT);
  const mode: QuizMode = isExam ? 'exam' : 'practice';
  const questionCount = mode === 'exam' ? EXAM_QUESTION_COUNT : PRACTICE_QUESTION_COUNT;
  const totalDuration = mode === 'exam' ? EXAM_TOTAL_DURATION_MS : PRACTICE_TOTAL_DURATION_MS;

  const settings: QuizSettings = useMemo(() => ({
    mode,
    questionCount,
    totalDurationMs: totalDuration,
    perQuestionDurationMs: PER_QUESTION_DURATION_MS,
    shuffleQuestions: true,
    shuffleOptions: false,
    scoringRules: { correct: 1, incorrect: 0, unanswered: 0 },
  }), [mode, questionCount, totalDuration]);

  // Derived state
  const currentQ = state.questions[state.currentIndex];
  const currentAttempt = currentQ ? state.attempts[currentQ.id] : null;
  const answeredCount = Object.values(state.attempts).filter(
    (a) => a.selectedOptionId !== null && a.selectedOptionId !== undefined
  ).length;
  const markedCount = Object.values(state.attempts).filter((a) => a.status === 'marked').length;
  const questionIds = state.questions.map((q) => q.id);

  // Show instructions when phase is idle or instructions
  const showInstructions = state.phase === 'idle' || state.phase === 'instructions';

  // Handle start quiz
  const handleStart = useCallback(() => {
    const questions = selectQuestions(settings.questionCount, settings.shuffleQuestions);
    const processed = settings.shuffleOptions
      ? questions.map(shuffleQuestionOptions)
      : questions;
    startQuiz(processed, settings);
  }, [settings, startQuiz]);

  // Force re-render interval to update timers smoothly
  const [, setTimerTick] = useState(0);
  useEffect(() => {
    if (state.phase !== 'active') return;
    const interval = setInterval(() => setTimerTick((t) => t + 1), 500);
    return () => clearInterval(interval);
  }, [state.phase]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    if (state.phase !== 'active' || !currentQ) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when focusing inputs or textareas
      if (['INPUT', 'TEXTAREA', 'BUTTON'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      // Keys 1, 2, 3, 4 -> options A, B, C, D
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optionIndex = parseInt(e.key, 10) - 1;
        const opt = currentQ.options[optionIndex];
        if (opt) {
          e.preventDefault();
          selectAnswer(currentQ.id, opt.id);
        }
      }

      // Keys A, B, C, D (case-insensitive)
      const upper = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(upper)) {
        const opt = currentQ.options.find((o) => o.id === upper);
        if (opt) {
          e.preventDefault();
          selectAnswer(currentQ.id, opt.id);
        }
      }

      // Arrow navigation
      if (e.key === 'ArrowRight' && state.currentIndex < state.questions.length - 1) {
        e.preventDefault();
        navQuestion(state.currentIndex + 1);
      }
      if (e.key === 'ArrowLeft' && state.currentIndex > 0) {
        e.preventDefault();
        navQuestion(state.currentIndex - 1);
      }

      // 'M' or 'm' -> Mark for review
      if (upper === 'M') {
        e.preventDefault();
        toggleMark(currentQ.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.phase, currentQ, state.currentIndex, state.questions.length, selectAnswer, navQuestion, toggleMark]);

  // Handle retry and back
  const handleRetry = useCallback(() => {
    resetQuiz();
  }, [resetQuiz]);

  const handleBack = useCallback(() => {
    resetQuiz();
    navigate('/courses/chapter/work-energy-power');
  }, [resetQuiz, navigate]);

  // If exam mode requested but unavailable
  if (modeParam === 'exam' && !canStartExamMode(EXAM_QUESTION_COUNT)) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
          <AlertTriangle size={28} />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Exam Simulation Unavailable</h1>
          <p className="text-slate-400 leading-relaxed text-sm">
            Exam Mode requires at least <strong className="text-white">{EXAM_QUESTION_COUNT}</strong> verified questions.
            Currently <strong className="text-white">{getQuestionCount()}</strong> questions are verified from the source PDF.
          </p>
        </div>
        <div className="flex gap-3 justify-center pt-2">
          <Link to="/courses/chapter/work-energy-power" className="btn-secondary text-sm">
            Back to Chapter
          </Link>
          <Link to="/quiz?mode=practice" className="btn-primary text-sm">
            Start Practice Set Instead
          </Link>
        </div>
      </div>
    );
  }

  // Submitted Results View
  if (state.phase === 'submitted' && result) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <ResultsSummary result={result} onRetry={handleRetry} onBack={handleBack} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Pre-quiz instructions modal */}
      {showInstructions && (
        <QuizInstructions
          chapterName="Work, Energy and Power"
          settings={settings}
          onStart={handleStart}
          onCancel={() => navigate('/courses/chapter/work-energy-power')}
        />
      )}

      {/* Submit Confirmation Modal */}
      {state.phase === 'confirming-submit' && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-submit-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-fade-in"
        >
          <div className="card-elevated max-w-md w-full p-6 sm:p-7 space-y-5 animate-slide-up border border-slate-700/80 shadow-2xl">
            <div className="space-y-1">
              <span className="micro-label">Final Confirmation</span>
              <h2 id="confirm-submit-title" className="text-xl font-bold text-white">
                Submit Quiz Attempt?
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review your answering summary below before finalizing your submission.
              </p>
            </div>

            {/* Answer breakdown tiles */}
            <div className="grid grid-cols-3 gap-2.5 font-mono text-center">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                <p className="text-2xl font-bold text-emerald-400">{answeredCount}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Answered</p>
              </div>
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25">
                <p className="text-2xl font-bold text-rose-400">
                  {state.questions.length - answeredCount}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Unanswered</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25">
                <p className="text-2xl font-bold text-amber-400">{markedCount}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Marked</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed bg-navy-950/60 p-3 rounded-xl border border-slate-800">
              Unanswered questions will receive 0 marks. Once submitted, your score and full step-by-step explanations will be generated immediately.
            </p>

            <div className="flex gap-3 pt-1">
              <button
                onClick={cancelSubmit}
                type="button"
                className="btn-secondary flex-1 py-2.5 text-xs sm:text-sm"
              >
                <X size={14} /> Keep Trying
              </button>
              <button
                onClick={confirmSubmit}
                type="button"
                className="btn-danger flex-1 py-2.5 text-xs sm:text-sm gap-2"
              >
                <Send size={14} /> Submit Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Quiz Workspace */}
      {(state.phase === 'active' || state.phase === 'confirming-submit') && currentQ && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5">
          {/* Top Bar with Timers, Chapter Info & Status */}
          <div className="p-4 rounded-2xl bg-navy-900/90 border border-slate-800/90 flex items-center justify-between gap-4 shadow-md">
            {/* Chapter title and mode */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-cyan-400 font-semibold">
                  {mode === 'exam' ? 'Exam Mode' : 'Practice Set'}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400 truncate">
                  Work, Energy and Power
                </span>
              </div>
              <p className="text-sm font-bold text-white tracking-tight truncate mt-0.5">
                Question {state.currentIndex + 1} of {state.questions.length}
              </p>
            </div>

            {/* Overall Remaining Countdown */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-950 border border-slate-800/80 font-mono text-xs">
              <Clock
                size={14}
                className={overallRemainingMs < 5 * 60_000 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}
              />
              <span className="hidden sm:inline-block text-slate-400">Total:</span>
              <span
                className={`font-bold tabular-nums ${
                  overallRemainingMs < 5 * 60_000
                    ? 'text-rose-400'
                    : overallRemainingMs < 10 * 60_000
                    ? 'text-amber-400'
                    : 'text-slate-200'
                }`}
              >
                {formatTime(overallRemainingMs)}
              </span>
            </div>

            {/* Circular Per-Question Timer */}
            <CircularTimer
              remainingMs={questionRemainingMs}
              totalMs={PER_QUESTION_DURATION_MS}
              size={64}
              strokeWidth={5}
            />

            {/* Mobile Question Navigator Drawer Toggle */}
            <button
              onClick={() => setShowMobileNav(!showMobileNav)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 border border-slate-800 transition-colors"
              aria-label="Toggle question navigator"
              aria-expanded={showMobileNav}
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Progress Bar */}
          <ProgressBar
            current={state.currentIndex + 1}
            total={state.questions.length}
            answered={answeredCount}
          />

          {/* Main Dual-Column Quiz Layout */}
          <div className="flex gap-6 items-start">
            {/* Primary Question Work Area */}
            <div className="flex-1 min-w-0 space-y-5">
              <QuestionCard
                question={currentQ}
                questionNumber={state.currentIndex + 1}
                totalQuestions={state.questions.length}
                selectedOptionId={currentAttempt?.selectedOptionId ?? null}
                isMarked={currentAttempt?.status === 'marked'}
                onSelect={(optId) => selectAnswer(currentQ.id, optId)}
                onToggleMark={() => toggleMark(currentQ.id)}
              />

              {/* Navigation Controls Bar */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800 flex-wrap">
                <button
                  onClick={() => navQuestion(state.currentIndex - 1)}
                  disabled={state.currentIndex === 0}
                  type="button"
                  className="btn-secondary text-xs sm:text-sm py-2.5 px-4"
                  aria-label="Previous question"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleMark(currentQ.id)}
                    type="button"
                    className={`btn-secondary text-xs sm:text-sm py-2.5 px-3.5 ${
                      currentAttempt?.status === 'marked'
                        ? 'border-amber-500/50 text-amber-300 bg-amber-500/10'
                        : ''
                    }`}
                    aria-label={currentAttempt?.status === 'marked' ? 'Remove bookmark' : 'Bookmark for review'}
                  >
                    <Bookmark size={14} className={currentAttempt?.status === 'marked' ? 'fill-amber-400 text-amber-400' : ''} />
                    <span className="hidden sm:inline-block">
                      {currentAttempt?.status === 'marked' ? 'Marked' : 'Mark'}
                    </span>
                  </button>

                  {state.currentIndex < state.questions.length - 1 ? (
                    <button
                      onClick={() => navQuestion(state.currentIndex + 1)}
                      type="button"
                      className="btn-primary text-xs sm:text-sm py-2.5 px-5 gap-1.5"
                      aria-label="Next question"
                    >
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={requestSubmit}
                      type="button"
                      className="btn-primary text-xs sm:text-sm py-2.5 px-5 bg-gradient-to-r from-emerald-600 to-teal-600 gap-1.5"
                      aria-label="Submit quiz"
                    >
                      <Send size={14} />
                      <span>Finish & Submit</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Early Submit Link Bar */}
              <div className="flex justify-between items-center text-xs font-mono text-slate-500 pt-2">
                <span>Tip: Press [1-4] or [A-D] to select quickly</span>
                <button
                  onClick={requestSubmit}
                  type="button"
                  className="text-rose-400/80 hover:text-rose-300 hover:underline transition-colors"
                >
                  Submit Quiz Early →
                </button>
              </div>
            </div>

            {/* Desktop Question Navigator Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="card p-5 sticky top-24 rounded-2xl bg-navy-900/90 border border-slate-800 shadow-xl space-y-4">
                <QuestionNavigator
                  total={state.questions.length}
                  currentIndex={state.currentIndex}
                  attempts={state.attempts}
                  questionIds={questionIds}
                  onNavigate={navQuestion}
                />
              </div>
            </div>
          </div>

          {/* Mobile Question Navigator Drawer */}
          {showMobileNav && (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-nav-title"
              className="lg:hidden fixed inset-y-0 right-0 z-50 w-72 bg-navy-950 border-l border-slate-800 p-5 overflow-y-auto animate-slide-up shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <p id="mobile-nav-title" className="font-mono text-sm font-bold text-white">
                  Question Grid
                </p>
                <button
                  onClick={() => setShowMobileNav(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                  aria-label="Close navigator"
                >
                  <X size={18} />
                </button>
              </div>

              <QuestionNavigator
                total={state.questions.length}
                currentIndex={state.currentIndex}
                attempts={state.attempts}
                questionIds={questionIds}
                onNavigate={(i) => {
                  navQuestion(i);
                  setShowMobileNav(false);
                }}
              />
            </div>
          )}

          {/* Mobile Navigator Backdrop */}
          {showMobileNav && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-navy-950/70 backdrop-blur-sm"
              onClick={() => setShowMobileNav(false)}
              aria-hidden="true"
            />
          )}
        </div>
      )}
    </div>
  );
}
