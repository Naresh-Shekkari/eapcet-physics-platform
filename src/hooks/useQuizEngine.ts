import { useReducer, useEffect, useRef, useCallback } from 'react';
import type { QuizState, QuizSettings, QuestionAttempt, Question, QuizResult } from '../types/quiz';
import { scoreQuiz } from '../services/quizScoring';
import { saveActiveQuiz, clearActiveQuiz, saveResult } from '../services/quizPersistence';

// ============================================================
// Quiz Engine Hook — Authoritative State Manager
// ============================================================

type Action =
  | { type: 'START_QUIZ'; questions: Question[]; settings: QuizSettings; now: number }
  | { type: 'SELECT_ANSWER'; questionId: string; optionId: string }
  | { type: 'TOGGLE_MARK'; questionId: string }
  | { type: 'NAVIGATE'; index: number; now: number }
  | { type: 'AUTO_ADVANCE'; now: number }
  | { type: 'REQUEST_SUBMIT' }
  | { type: 'CANCEL_SUBMIT' }
  | { type: 'CONFIRM_SUBMIT'; now: number }
  | { type: 'AUTO_SUBMIT'; now: number }
  | { type: 'RESET' };

function buildInitialAttempts(questions: Question[]): Record<string, QuestionAttempt> {
  const attempts: Record<string, QuestionAttempt> = {};
  for (const q of questions) {
    attempts[q.id] = {
      questionId: q.id,
      selectedOptionId: null,
      status: 'unanswered',
      remainingTimeMs: null,
      questionDeadlineMs: null,
    };
  }
  return attempts;
}

function startQuestionTimer(
  state: QuizState,
  index: number,
  now: number,
): QuizState {
  const q = state.questions[index];
  if (!q) return state;
  const attempt = state.attempts[q.id];
  const perQ = state.settings.perQuestionDurationMs;

  // If this question already has a deadline set, use remaining time to create new deadline
  let deadline: number;
  if (attempt.questionDeadlineMs !== null && attempt.remainingTimeMs !== null) {
    // Returning to question: use stored remaining time
    deadline = now + attempt.remainingTimeMs;
  } else {
    // First visit: full per-question duration
    deadline = now + perQ;
  }

  return {
    ...state,
    currentIndex: index,
    currentQuestionStartMs: now,
    currentQuestionAutoAdvanced: false,
    attempts: {
      ...state.attempts,
      [q.id]: {
        ...attempt,
        questionDeadlineMs: deadline,
        remainingTimeMs: deadline - now,
      },
    },
  };
}

function saveCurrentQuestionRemaining(state: QuizState, now: number): QuizState {
  const q = state.questions[state.currentIndex];
  if (!q) return state;
  const attempt = state.attempts[q.id];
  if (attempt.questionDeadlineMs === null) return state;

  const remaining = Math.max(0, attempt.questionDeadlineMs - now);
  return {
    ...state,
    attempts: {
      ...state.attempts,
      [q.id]: {
        ...attempt,
        remainingTimeMs: remaining,
      },
    },
  };
}

const IDLE_STATE: QuizState = {
  phase: 'idle',
  sessionId: '',
  settings: {
    mode: 'practice',
    questionCount: 20,
    totalDurationMs: 20 * 60_000,
    perQuestionDurationMs: 60_000,
    shuffleQuestions: true,
    shuffleOptions: false,
    scoringRules: { correct: 1, incorrect: 0, unanswered: 0 },
  },
  questions: [],
  attempts: {},
  currentIndex: 0,
  quizStartMs: null,
  quizDeadlineMs: null,
  currentQuestionStartMs: null,
  currentQuestionAutoAdvanced: false,
};

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case 'START_QUIZ': {
      const attempts = buildInitialAttempts(action.questions);
      const quizDeadlineMs = action.now + action.settings.totalDurationMs;
      let next: QuizState = {
        phase: 'active',
        sessionId: crypto.randomUUID(),
        settings: action.settings,
        questions: action.questions,
        attempts,
        currentIndex: 0,
        quizStartMs: action.now,
        quizDeadlineMs,
        currentQuestionStartMs: action.now,
        currentQuestionAutoAdvanced: false,
      };
      next = startQuestionTimer(next, 0, action.now);
      return next;
    }

    case 'SELECT_ANSWER': {
      if (state.phase !== 'active') return state;
      const attempt = state.attempts[action.questionId];
      if (!attempt) return state;
      return {
        ...state,
        attempts: {
          ...state.attempts,
          [action.questionId]: {
            ...attempt,
            selectedOptionId: action.optionId,
            status: attempt.status === 'marked' ? 'marked' : 'answered',
          },
        },
      };
    }

    case 'TOGGLE_MARK': {
      if (state.phase !== 'active') return state;
      const attempt = state.attempts[action.questionId];
      if (!attempt) return state;
      const newStatus = attempt.status === 'marked'
        ? (attempt.selectedOptionId ? 'answered' : 'unanswered')
        : 'marked';
      return {
        ...state,
        attempts: {
          ...state.attempts,
          [action.questionId]: { ...attempt, status: newStatus },
        },
      };
    }

    case 'NAVIGATE': {
      if (state.phase !== 'active') return state;
      if (action.index === state.currentIndex) return state;
      if (action.index < 0 || action.index >= state.questions.length) return state;

      // Save remaining time for current question
      let next = saveCurrentQuestionRemaining(state, action.now);
      // Start timer for target question
      next = startQuestionTimer(next, action.index, action.now);
      return next;
    }

    case 'AUTO_ADVANCE': {
      if (state.phase !== 'active') return state;
      if (state.currentQuestionAutoAdvanced) return state; // prevent duplicate

      const currentQ = state.questions[state.currentIndex];
      if (!currentQ) return state;

      // Mark as unanswered if no answer selected
      const currentAttempt = state.attempts[currentQ.id];
      const updatedAttempts = currentAttempt.selectedOptionId === null
        ? {
          ...state.attempts,
          [currentQ.id]: { ...currentAttempt, status: 'unanswered' as const, remainingTimeMs: 0 },
        }
        : {
          ...state.attempts,
          [currentQ.id]: { ...currentAttempt, remainingTimeMs: 0 },
        };

      const nextIndex = state.currentIndex + 1;

      // If last question, auto-submit
      if (nextIndex >= state.questions.length) {
        return {
          ...state,
          attempts: updatedAttempts,
          currentQuestionAutoAdvanced: true,
          phase: 'submitted',
        };
      }

      let next: QuizState = {
        ...state,
        attempts: updatedAttempts,
        currentIndex: nextIndex,
        currentQuestionAutoAdvanced: true,
      };
      next = startQuestionTimer(next, nextIndex, action.now);
      return next;
    }

    case 'REQUEST_SUBMIT': {
      if (state.phase !== 'active') return state;
      return { ...state, phase: 'confirming-submit' };
    }

    case 'CANCEL_SUBMIT': {
      if (state.phase !== 'confirming-submit') return state;
      return { ...state, phase: 'active' };
    }

    case 'CONFIRM_SUBMIT':
    case 'AUTO_SUBMIT': {
      if (state.phase === 'submitted') return state;
      return { ...state, phase: 'submitted' };
    }

    case 'RESET':
      return { ...IDLE_STATE };

    default:
      return state;
  }
}

// ---- Hook ----

interface UseQuizEngineReturn {
  state: QuizState;
  result: QuizResult | null;
  startQuiz: (questions: Question[], settings: QuizSettings) => void;
  selectAnswer: (questionId: string, optionId: string) => void;
  toggleMark: (questionId: string) => void;
  navigate: (index: number) => void;
  requestSubmit: () => void;
  cancelSubmit: () => void;
  confirmSubmit: () => void;
  resetQuiz: () => void;
  /** Remaining ms on the overall quiz timer */
  overallRemainingMs: number;
  /** Remaining ms on the current per-question timer */
  questionRemainingMs: number;
  /** 0..1 fraction for circular timer */
  questionTimerFraction: number;
}

export function useQuizEngine(): UseQuizEngineReturn {
  const [state, dispatch] = useReducer(reducer, IDLE_STATE);
  const resultRef = useRef<QuizResult | null>(null);

  // Ticker ref — we use setInterval + timestamp comparison for reliability
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Computed timer values (re-computed each render from timestamps)
  const now = Date.now();
  const overallRemainingMs = state.quizDeadlineMs
    ? Math.max(0, state.quizDeadlineMs - now)
    : 0;

  const currentQ = state.questions[state.currentIndex];
  const currentAttempt = currentQ ? state.attempts[currentQ.id] : null;
  const questionDeadline = currentAttempt?.questionDeadlineMs ?? null;
  const questionRemainingMs = questionDeadline
    ? Math.max(0, questionDeadline - now)
    : 0;
  const questionTimerFraction = questionDeadline
    ? questionRemainingMs / state.settings.perQuestionDurationMs
    : 1;

  // Compute and save result when phase becomes submitted
  useEffect(() => {
    if (state.phase === 'submitted' && !resultRef.current && state.questions.length > 0) {
      const result = scoreQuiz(state.questions, state.attempts, state.settings, state.quizStartMs);
      resultRef.current = result;
      saveResult(result);
      clearActiveQuiz();
    }
  }, [state.phase]);

  // Auto-advance and auto-submit timer
  useEffect(() => {
    if (state.phase !== 'active') {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const tick = () => {
      const n = Date.now();

      // Check overall quiz deadline
      if (state.quizDeadlineMs && n >= state.quizDeadlineMs) {
        dispatch({ type: 'AUTO_SUBMIT', now: n });
        return;
      }

      // Check per-question deadline
      const q = state.questions[state.currentIndex];
      if (!q) return;
      const attempt = state.attempts[q.id];
      if (attempt.questionDeadlineMs && n >= attempt.questionDeadlineMs && !state.currentQuestionAutoAdvanced) {
        dispatch({ type: 'AUTO_ADVANCE', now: n });
      }
    };

    intervalRef.current = setInterval(tick, 250); // check 4x/second
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.phase, state.currentIndex, state.quizDeadlineMs, state.currentQuestionAutoAdvanced,
    state.questions, state.attempts]);

  // Save state to localStorage whenever it changes (during active quiz)
  useEffect(() => {
    if (state.phase === 'active' || state.phase === 'confirming-submit') {
      saveActiveQuiz(state);
    }
  }, [state]);

  const startQuiz = useCallback((questions: Question[], settings: QuizSettings) => {
    resultRef.current = null;
    dispatch({ type: 'START_QUIZ', questions, settings, now: Date.now() });
  }, []);

  const selectAnswer = useCallback((questionId: string, optionId: string) => {
    dispatch({ type: 'SELECT_ANSWER', questionId, optionId });
  }, []);

  const toggleMark = useCallback((questionId: string) => {
    dispatch({ type: 'TOGGLE_MARK', questionId });
  }, []);

  const navigate = useCallback((index: number) => {
    dispatch({ type: 'NAVIGATE', index, now: Date.now() });
  }, []);

  const requestSubmit = useCallback(() => {
    dispatch({ type: 'REQUEST_SUBMIT' });
  }, []);

  const cancelSubmit = useCallback(() => {
    dispatch({ type: 'CANCEL_SUBMIT' });
  }, []);

  const confirmSubmit = useCallback(() => {
    dispatch({ type: 'CONFIRM_SUBMIT', now: Date.now() });
  }, []);

  const resetQuiz = useCallback(() => {
    resultRef.current = null;
    clearActiveQuiz();
    dispatch({ type: 'RESET' });
  }, []);

  return {
    state,
    result: resultRef.current,
    startQuiz,
    selectAnswer,
    toggleMark,
    navigate,
    requestSubmit,
    cancelSubmit,
    confirmSubmit,
    resetQuiz,
    overallRemainingMs,
    questionRemainingMs,
    questionTimerFraction,
  };
}
