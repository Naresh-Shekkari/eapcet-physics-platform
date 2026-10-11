// ============================================================
// Quiz Types — EAPCET Physics Platform
// ============================================================

export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface Question {
  id: string;
  chapter: string;
  topic: string;
  question_number: number;
  question_text: string;
  options: QuestionOption[];
  correct_option_id: string;
  explanation: string;
  formula?: string;
  source_pdf: string;
  source_page: number;
  diagram_ref?: string | null;
  manual_review?: boolean;
  review_note?: string;
}

export interface QuestionBank {
  chapter: string;
  subject: string;
  source_pdf: string;
  total_questions: number;
  verified: boolean;
  verification_notes: string[];
  questions: Question[];
}

export type QuizMode = 'practice' | 'exam';

export interface QuizSettings {
  mode: QuizMode;
  questionCount: number;
  totalDurationMs: number;      // overall quiz deadline in ms
  perQuestionDurationMs: number; // per-question timer in ms
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  scoringRules: {
    correct: number;
    incorrect: number;
    unanswered: number;
  };
}

export type AnswerStatus = 'unanswered' | 'answered' | 'marked';

export interface QuestionAttempt {
  questionId: string;
  selectedOptionId: string | null; // null = unanswered
  status: AnswerStatus;
  /** Remaining ms on per-question timer when user navigated away. null = not yet visited. */
  remainingTimeMs: number | null;
  /** Absolute timestamp (ms) when per-question timer started for this question */
  questionDeadlineMs: number | null;
}

export type QuizPhase = 'idle' | 'instructions' | 'active' | 'confirming-submit' | 'submitted';

export interface QuizState {
  phase: QuizPhase;
  sessionId: string;
  settings: QuizSettings;
  questions: Question[]; // selected & ordered questions
  attempts: Record<string, QuestionAttempt>; // keyed by question.id
  currentIndex: number;
  /** Absolute timestamp (ms) when overall quiz started */
  quizStartMs: number | null;
  /** Absolute timestamp (ms) when overall quiz must end */
  quizDeadlineMs: number | null;
  /** Absolute timestamp (ms) when current question timer started */
  currentQuestionStartMs: number | null;
  /** Whether current question has been auto-advanced (prevent duplicate advances) */
  currentQuestionAutoAdvanced: boolean;
}

export interface QuizResult {
  sessionId: string;
  chapter: string;
  mode: QuizMode;
  questions: Question[];
  attempts: Record<string, QuestionAttempt>;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  score: number;
  maxScore: number;
  accuracyPercent: number;
  timeTakenMs: number;
  completedAt: number; // timestamp
}

export interface StoredResult {
  id: string;
  completedAt: number;
  chapter: string;
  mode: QuizMode;
  score: number;
  maxScore: number;
  accuracyPercent: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  totalQuestions: number;
  timeTakenMs: number;
}
