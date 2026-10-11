import type { Question, QuestionBank } from '../types/quiz';
import rawData from '../data/work-energy-power-questions.json';

// ============================================================
// Question Bank Service
// ============================================================

const bankData = rawData as QuestionBank;

/** Validate the structure of the question bank at load time */
function validateQuestionBank(bank: QuestionBank): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const q of bank.questions) {
    // Check unique ID
    if (ids.has(q.id)) {
      errors.push(`Duplicate question ID: ${q.id}`);
    }
    ids.add(q.id);

    // Check exactly 4 options
    if (!q.options || q.options.length !== 4) {
      errors.push(`Question ${q.id} does not have exactly 4 options (found ${q.options?.length ?? 0})`);
    }

    // Check correct_option_id is one of the options
    const optionIds = q.options?.map(o => o.id) ?? [];
    if (!optionIds.includes(q.correct_option_id)) {
      errors.push(`Question ${q.id} correct_option_id "${q.correct_option_id}" not found in options`);
    }

    // Check required text fields
    if (!q.question_text?.trim()) {
      errors.push(`Question ${q.id} has empty question_text`);
    }
    if (!q.explanation?.trim()) {
      errors.push(`Question ${q.id} has empty explanation — flag for review`);
    }
  }

  return errors;
}

const _validationErrors = validateQuestionBank(bankData);

export function getValidationErrors(): string[] {
  return _validationErrors;
}

export function isQuestionBankValid(): boolean {
  return _validationErrors.length === 0;
}

export function getAllQuestions(): Question[] {
  return bankData.questions;
}

export function getQuestionCount(): number {
  return bankData.questions.length;
}

export function getQuestionBankMeta() {
  return {
    chapter: bankData.chapter,
    subject: bankData.subject,
    sourcePdf: bankData.source_pdf,
    totalQuestions: bankData.total_questions,
    verified: bankData.verified,
    verificationNotes: bankData.verification_notes,
    validationErrors: _validationErrors,
  };
}

/** Select questions for a quiz attempt.
 *  Returns shuffled subset if count < total, otherwise all shuffled.
 *  Guarantees no duplicates and count <= available.
 */
export function selectQuestions(count: number, shuffle: boolean): Question[] {
  const all = [...bankData.questions];

  if (shuffle) {
    // Fisher-Yates shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
  }

  return all.slice(0, Math.min(count, all.length));
}

/** Shuffle the options of a question, returning a new question with shuffled options.
 *  The correct_option_id still points to the same option text — only positions change.
 *  We do NOT change the option ids, only their order.
 */
export function shuffleQuestionOptions(question: Question): Question {
  const shuffled = [...question.options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return { ...question, options: shuffled };
}

export function getQuestionById(id: string): Question | undefined {
  return bankData.questions.find(q => q.id === id);
}

/** Check whether Exam Mode (25 questions) can be unlocked */
export function canStartExamMode(requiredCount = 25): boolean {
  return bankData.questions.length >= requiredCount;
}

export const EXAM_QUESTION_COUNT = 25;
export const PRACTICE_QUESTION_COUNT = 20;
export const PER_QUESTION_DURATION_MS = 60_000;
export const PRACTICE_TOTAL_DURATION_MS = 20 * 60_000;
export const EXAM_TOTAL_DURATION_MS = 25 * 60_000;
