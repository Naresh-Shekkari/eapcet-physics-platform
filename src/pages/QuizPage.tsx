import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Bookmark, AlertTriangle, Send, X, Menu, Clock } from 'lucide-react';

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
// Quiz Page
// ============================================================

export function QuizPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const modeParam = (searchParams.get('mode') ?? 'practice') as QuizMode;
  const [showNav, setShowNav] = useState(false);

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
    questionTimerFraction,
  } = useQuizEngine();

  // Determine mode
  const mode: QuizMode = modeParam === 'exam' && canStartExamMode(EXAM_QUESTION_COUNT) ? 'exam' : 'practice';
  const questionCount = mode === 'exam' ? EXAM_QUESTION_COUNT : PRACTICE_QUESTION_COUNT;
  const totalDuration = mode === 'exam' ? EXAM_TOTAL_DURATION_MS : PRACTICE_TOTAL_DURATION_MS;

  const settings: QuizSettings = {
    mode,
    questionCount,
    totalDurationMs: totalDuration,
    perQuestionDurationMs: PER_QUESTION_DURATION_MS,
    shuffleQuestions: true,
    shuffleOptions: false,
    scoringRules: { correct: 1, incorrect: 0, unanswered: 0 },
  };

  // Derived state
  const currentQ = state.questions[state.currentIndex];
  const currentAttempt = currentQ ? state.attempts[currentQ.id] : null;
  const answeredCount = Object.values(state.attempts).filter(a => a.selectedOptionId !== null).length;
  const questionIds = state.questions.map(q => q.id);

  // Show instructions when phase is idle
  const showInstructions = state.phase === 'idle' || state.phase === 'instructions';

  // Handle start
  const handleStart = useCallback(() => {
    const questions = selectQuestions(questionCount, settings.shuffleQuestions);
    const processed = settings.shuffleOptions
      ? questions.map(shuffleQuestionOptions)
      : questions;
    startQuiz(processed, settings);
  }, [questionCount, settings.shuffleQuestions, settings.shuffleOptions]);

  // Navigate to results when submitted
  useEffect(() => {
    // Results are shown inline on this page
  }, [state.phase]);

  // Force a re-render every second to update timers
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (state.phase !== 'active') return;
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [state.phase]);

  // Handle retry
  const handleRetry = useCallback(() => {
    resetQuiz();
    // Will show instructions again
  }, [resetQuiz]);

  // Handle back
  const handleBack = useCallback(() => {
    resetQuiz();
    navigate('/courses/chapter/work-energy-power');
  }, [resetQuiz, navigate]);

  // If not enough questions for exam
  if (modeParam === 'exam' && !canStartExamMode(EXAM_QUESTION_COUNT)) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto">
          <AlertTriangle size={28} className="text-amber-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">Exam Mode Unavailable</h1>
        <p className="text-slate-400 leading-relaxed">
          Exam Mode requires at least <strong className="text-white">{EXAM_QUESTION_COUNT}</strong> distinct verified questions.
          Currently only <strong className="text-white">{getQuestionCount()}</strong> questions are available from the source PDF.
        </p>
        <p className="text-slate-400">
          Ask your teacher to provide additional verified question bank PDFs.
          Once {EXAM_QUESTION_COUNT - getQuestionCount()} more questions are added, Exam Mode will unlock automatically.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/courses/chapter/work-energy-power" className="btn-secondary">Back to Chapter</Link>
          <Link to="/quiz?mode=practice" className="btn-primary">Use Practice Mode Instead</Link>
        </div>
      </div>
    );
  }

  // Results view
  if (state.phase === 'submitted' && result) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <ResultsSummary result={result} onRetry={handleRetry} onBack={handleBack} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Instructions overlay */}
      {showInstructions && (
        <QuizInstructions
          chapterName="Work, Energy and Power"
          settings={settings}
          onStart={handleStart}
          onCancel={() => navigate('/courses/chapter/work-energy-power')}
        />
      )}

      {/* Submit confirmation dialog */}
      {state.phase === 'confirming-submit' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/90 backdrop-blur-sm animate-fade-in">
          <div className="card-elevated max-w-md w-full p-6 space-y-4 animate-slide-up">
            <h2 className="text-xl font-bold text-white">Submit Quiz?</h2>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-2xl font-bold text-emerald-400">{answeredCount}</p>
                <p className="text-xs text-slate-400 mt-1">Answered</p>
              </div>
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-2xl font-bold text-red-400">{state.questions.length - answeredCount}</p>
                <p className="text-xs text-slate-400 mt-1">Unanswered</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-2xl font-bold text-amber-400">
                  {Object.values(state.attempts).filter(a => a.status === 'marked').length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Marked</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Unanswered questions will score zero. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={cancelSubmit} className="btn-secondary flex-1">
                <X size={14} /> Keep Trying
              </button>
              <button onClick={confirmSubmit} className="btn-danger flex-1">
                <Send size={14} /> Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active quiz */}
      {(state.phase === 'active' || state.phase === 'confirming-submit') && currentQ && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* Top bar */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            {/* Mode label */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-400">Work, Energy and Power</p>
              <p className="text-sm font-semibold text-white">{mode === 'exam' ? 'Exam Mode' : 'Full Practice Set'}</p>
            </div>

            {/* Overall timer */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-900 border border-slate-700/40">
              <Clock size={14} className={overallRemainingMs < 5 * 60_000 ? 'text-red-400' : 'text-indigo-400'} />
              <span className={`font-mono text-sm font-semibold tabular-nums ${
                overallRemainingMs < 5 * 60_000 ? 'text-red-400' : overallRemainingMs < 10 * 60_000 ? 'text-amber-400' : 'text-slate-200'
              }`}>
                {formatTime(overallRemainingMs)}
              </span>
            </div>

            {/* Circular per-question timer */}
            <CircularTimer
              remainingMs={questionRemainingMs}
              totalMs={PER_QUESTION_DURATION_MS}
              size={60}
              strokeWidth={5}
            />

            {/* Mobile nav toggle */}
            <button
              onClick={() => setShowNav(!showNav)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
              aria-label="Toggle question navigator"
              aria-expanded={showNav}
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Progress bar */}
          <ProgressBar
            current={state.currentIndex + 1}
            total={state.questions.length}
            answered={answeredCount}
            className="mb-4 sm:mb-6"
          />

          {/* Main layout */}
          <div className="flex gap-6">
            {/* Question workspace */}
            <div className="flex-1 min-w-0 space-y-5">
              <QuestionCard
                question={currentQ}
                questionNumber={state.currentIndex + 1}
                totalQuestions={state.questions.length}
                selectedOptionId={currentAttempt?.selectedOptionId ?? null}
                onSelect={(optId) => selectAnswer(currentQ.id, optId)}
              />

              {/* Navigation controls */}
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => navQuestion(state.currentIndex - 1)}
                  disabled={state.currentIndex === 0}
                  className="btn-secondary text-sm py-2.5"
                  aria-label="Previous question"
                >
                  <ChevronLeft size={15} /> Previous
                </button>

                <button
                  onClick={() => toggleMark(currentQ.id)}
                  className={`btn-secondary text-sm py-2.5 ${
                    currentAttempt?.status === 'marked'
                      ? 'border-amber-500/60 text-amber-400 bg-amber-500/10'
                      : ''
                  }`}
                  aria-label={currentAttempt?.status === 'marked' ? 'Remove mark' : 'Mark for review'}
                  aria-pressed={currentAttempt?.status === 'marked'}
                >
                  <Bookmark size={14} className={currentAttempt?.status === 'marked' ? 'fill-amber-400' : ''} />
                  {currentAttempt?.status === 'marked' ? 'Marked' : 'Mark'}
                </button>

                <div className="flex-1" />

                {state.currentIndex < state.questions.length - 1 ? (
                  <button
                    onClick={() => navQuestion(state.currentIndex + 1)}
                    className="btn-primary text-sm py-2.5"
                    aria-label="Next question"
                  >
                    Next <ChevronRight size={15} />
                  </button>
                ) : (
                  <button
                    onClick={requestSubmit}
                    className="btn-primary text-sm py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700"
                    aria-label="Submit quiz"
                  >
                    <Send size={14} /> Submit Quiz
                  </button>
                )}
              </div>

              {/* Submit button always visible on last question too */}
              <div className="flex justify-end border-t border-slate-700/40 pt-4">
                <button
                  onClick={requestSubmit}
                  className="btn-danger text-sm py-2.5"
                  aria-label="Submit quiz early"
                >
                  <Send size={14} /> Submit Quiz
                </button>
              </div>
            </div>

            {/* Desktop navigator */}
            <div className="hidden lg:block w-56 flex-shrink-0">
              <div className="card p-4 sticky top-24">
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

          {/* Mobile navigator drawer */}
          {showNav && (
            <div className="lg:hidden fixed inset-y-0 right-0 z-40 w-64 bg-navy-900 border-l border-slate-700/50 p-4 overflow-y-auto animate-slide-up shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-white">Navigator</p>
                <button
                  onClick={() => setShowNav(false)}
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
                onNavigate={(i) => { navQuestion(i); setShowNav(false); }}
              />
            </div>
          )}
          {showNav && (
            <div
              className="lg:hidden fixed inset-0 z-30 bg-navy-950/60"
              onClick={() => setShowNav(false)}
              aria-hidden="true"
            />
          )}
        </div>
      )}
    </div>
  );
}
