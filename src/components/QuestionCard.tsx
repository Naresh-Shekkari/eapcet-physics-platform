import React from 'react';
import type { Question } from '../types/quiz';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// ============================================================
// Answer Option Component
// ============================================================

interface AnswerOptionProps {
  option: { id: string; text: string };
  selected: boolean;
  disabled: boolean;
  /** For result review — show correctness */
  showResult?: boolean;
  isCorrect?: boolean;
  isStudentChoice?: boolean;
  onSelect: (optionId: string) => void;
}

export function AnswerOption({
  option,
  selected,
  disabled,
  showResult = false,
  isCorrect = false,
  isStudentChoice = false,
  onSelect,
}: AnswerOptionProps) {
  let containerClass = `
    group w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200
    flex items-start gap-3 cursor-pointer
    focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-1 focus-visible:ring-offset-navy-900
  `;

  let labelClass = `
    flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
    text-sm font-bold transition-colors duration-200
  `;

  let textClass = 'flex-1 text-sm leading-relaxed pt-0.5';
  let iconEl: React.ReactNode = null;

  if (showResult) {
    if (isCorrect && isStudentChoice) {
      // Student got it right
      containerClass += ' bg-emerald-500/10 border-emerald-500/60 cursor-default';
      labelClass += ' bg-emerald-500 text-white';
      textClass += ' text-emerald-100';
      iconEl = <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-emerald-400" aria-label="Correct answer selected" />;
    } else if (isCorrect && !isStudentChoice) {
      // Correct answer, student didn't pick it
      containerClass += ' bg-emerald-500/5 border-emerald-500/40 cursor-default';
      labelClass += ' bg-emerald-500/20 text-emerald-400 border border-emerald-500/40';
      textClass += ' text-emerald-200';
      iconEl = <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-emerald-400" aria-label="Correct answer" />;
    } else if (!isCorrect && isStudentChoice) {
      // Student picked wrong answer
      containerClass += ' bg-red-500/10 border-red-500/50 cursor-default';
      labelClass += ' bg-red-500 text-white';
      textClass += ' text-red-100';
      iconEl = <XCircle size={16} className="flex-shrink-0 mt-0.5 text-red-400" aria-label="Wrong answer selected" />;
    } else {
      containerClass += ' bg-navy-900 border-slate-700/30 cursor-default opacity-60';
      labelClass += ' bg-navy-800 text-slate-500 border border-slate-600/40';
      textClass += ' text-slate-400';
    }
  } else if (selected) {
    containerClass += ' bg-indigo-600/20 border-indigo-500/80 shadow-lg shadow-indigo-500/10';
    labelClass += ' bg-indigo-600 text-white';
    textClass += ' text-white';
  } else if (disabled) {
    containerClass += ' bg-navy-900 border-slate-700/30 cursor-not-allowed opacity-50';
    labelClass += ' bg-navy-800 text-slate-500 border border-slate-600/40';
    textClass += ' text-slate-400';
  } else {
    containerClass += ' bg-navy-900 border-slate-600/40 hover:bg-navy-800 hover:border-indigo-500/40';
    labelClass += ' bg-navy-800 text-slate-400 border border-slate-600/40 group-hover:bg-indigo-900/50 group-hover:text-slate-200';
    textClass += ' text-slate-300';
  }

  const handleClick = () => {
    if (!disabled && !showResult) onSelect(option.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled || showResult}
      tabIndex={disabled || showResult ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={containerClass.trim()}
    >
      <div className={labelClass.trim()}>{option.id}</div>
      <span className={textClass.trim()}>{option.text}</span>
      {iconEl}
    </div>
  );
}

// ============================================================
// Question Card Component
// ============================================================

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedOptionId: string | null;
  disabled?: boolean;
  showResult?: boolean;
  onSelect: (optionId: string) => void;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOptionId,
  disabled = false,
  showResult = false,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Question meta */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="badge bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          Q{questionNumber} of {totalQuestions}
        </span>
        <span className="badge bg-navy-800 text-slate-400 border border-slate-600/30">
          {question.topic}
        </span>
        {question.manual_review && (
          <span className="badge bg-amber-500/15 text-amber-400 border border-amber-500/30 gap-1">
            <AlertCircle size={11} />
            Manual review flagged
          </span>
        )}
      </div>

      {/* Question text */}
      <div className="card p-5 rounded-2xl">
        <p className="text-slate-100 text-base leading-relaxed font-medium">
          {question.question_text}
        </p>
        {question.formula && (
          <p className="mt-3 font-mono text-sm text-indigo-300 bg-indigo-900/20 border border-indigo-500/20 rounded-lg px-3 py-2">
            {question.formula}
          </p>
        )}
      </div>

      {/* Options */}
      <div role="radiogroup" aria-label="Answer options" className="space-y-2.5">
        {question.options.map((opt) => (
          <AnswerOption
            key={opt.id}
            option={opt}
            selected={selectedOptionId === opt.id}
            disabled={disabled}
            showResult={showResult}
            isCorrect={opt.id === question.correct_option_id}
            isStudentChoice={opt.id === selectedOptionId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
