import type { QuizResult, Question, QuestionAttempt, QuizSettings } from '../types/quiz';

// ============================================================
// Quiz Scoring Service
// ============================================================

export function scoreQuiz(
  questions: Question[],
  attempts: Record<string, QuestionAttempt>,
  settings: QuizSettings,
  quizStartMs: number | null,
): QuizResult {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  for (const q of questions) {
    const attempt = attempts[q.id];
    if (!attempt || attempt.selectedOptionId === null) {
      unanswered++;
    } else if (attempt.selectedOptionId === q.correct_option_id) {
      correct++;
    } else {
      incorrect++;
    }
  }

  const score = correct * settings.scoringRules.correct
    + incorrect * settings.scoringRules.incorrect
    + unanswered * settings.scoringRules.unanswered;

  const maxScore = questions.length * settings.scoringRules.correct;
  const accuracyPercent = questions.length > 0
    ? Math.round((correct / questions.length) * 100 * 10) / 10
    : 0;

  const now = Date.now();
  const timeTakenMs = quizStartMs ? now - quizStartMs : 0;

  return {
    sessionId: crypto.randomUUID(),
    chapter: questions[0]?.chapter ?? 'Unknown',
    mode: settings.mode,
    questions,
    attempts,
    totalQuestions: questions.length,
    correct,
    incorrect,
    unanswered,
    score,
    maxScore,
    accuracyPercent,
    timeTakenMs,
    completedAt: now,
  };
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
}
