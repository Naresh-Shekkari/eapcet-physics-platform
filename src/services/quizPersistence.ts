import type { QuizState, QuizResult, StoredResult } from '../types/quiz';

// ============================================================
// Quiz Persistence Service — localStorage only
// ============================================================

const ACTIVE_QUIZ_KEY = 'eapcet_active_quiz';
const RESULTS_KEY = 'eapcet_results';
const MAX_STORED_RESULTS = 20;

// ---- Active quiz state ----

export function saveActiveQuiz(state: QuizState): void {
  try {
    localStorage.setItem(ACTIVE_QUIZ_KEY, JSON.stringify(state));
  } catch {
    // localStorage full or unavailable — fail silently
  }
}

export function loadActiveQuiz(): QuizState | null {
  try {
    const raw = localStorage.getItem(ACTIVE_QUIZ_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw) as QuizState;
    // Basic sanity check
    if (!state.sessionId || !state.settings || !state.questions) return null;
    return state;
  } catch {
    return null;
  }
}

export function clearActiveQuiz(): void {
  try {
    localStorage.removeItem(ACTIVE_QUIZ_KEY);
  } catch {
    // ignore
  }
}

// ---- Results history ----

export function saveResult(result: QuizResult): void {
  try {
    const stored = loadResultsList();
    const summary: StoredResult = {
      id: result.sessionId,
      completedAt: result.completedAt,
      chapter: result.chapter,
      mode: result.mode,
      score: result.score,
      maxScore: result.maxScore,
      accuracyPercent: result.accuracyPercent,
      correct: result.correct,
      incorrect: result.incorrect,
      unanswered: result.unanswered,
      totalQuestions: result.totalQuestions,
      timeTakenMs: result.timeTakenMs,
    };
    // Prepend latest result, limit list size
    stored.unshift(summary);
    const trimmed = stored.slice(0, MAX_STORED_RESULTS);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(trimmed));

    // Also save full result for review (keyed by sessionId)
    localStorage.setItem(`eapcet_result_${result.sessionId}`, JSON.stringify(result));
  } catch {
    // ignore
  }
}

export function loadResultsList(): StoredResult[] {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredResult[];
  } catch {
    return [];
  }
}

export function loadFullResult(sessionId: string): QuizResult | null {
  try {
    const raw = localStorage.getItem(`eapcet_result_${sessionId}`);
    if (!raw) return null;
    return JSON.parse(raw) as QuizResult;
  } catch {
    return null;
  }
}

export function clearAllResults(): void {
  try {
    const stored = loadResultsList();
    for (const r of stored) {
      localStorage.removeItem(`eapcet_result_${r.id}`);
    }
    localStorage.removeItem(RESULTS_KEY);
  } catch {
    // ignore
  }
}
