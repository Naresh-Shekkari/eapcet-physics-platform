import React from 'react';
import type { Question } from '../types/quiz';
import { CheckCircle2, XCircle, AlertCircle, Bookmark } from 'lucide-react';
import { FormulaBlock } from './MathText';

// ============================================================
// Answer Option Component
// ============================================================

interface AnswerOptionProps {
  option: { id: string; text: string };
  selected: boolean;
  disabled: boolean;
  showResult?: boolean;
  isCorrect?: boolean;
  isStudentChoice?: boolean;
  shortcutKey?: string;
  onSelect: (optionId: string) => void;
}

export function AnswerOption({
  option,
  selected,
  disabled,
  showResult = false,
  isCorrect = false,
  isStudentChoice = false,
  shortcutKey,
  onSelect,
}: AnswerOptionProps) {
  let containerClass = `
    group w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-150
    flex items-start gap-3.5 cursor-pointer relative
    focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950
  `;

  let labelClass = `
    flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
    font-mono text-sm font-bold transition-all duration-150
  `;

  let textClass = 'flex-1 text-sm sm:text-base leading-relaxed pt-0.5 select-text';
  let iconEl: React.ReactNode = null;

  if (showResult) {
    if (isCorrect && isStudentChoice) {
      // Student selected the correct answer
      containerClass += ' bg-emerald-500/10 border-emerald-500/60 shadow-sm shadow-emerald-500/10';
      labelClass += ' bg-emerald-500 text-white font-bold';
      textClass += ' text-emerald-100 font-medium';
      iconEl = <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" aria-label="Correct answer" />;
    } else if (isCorrect && !isStudentChoice) {
      // Correct answer, student didn't choose it
      containerClass += ' bg-emerald-500/5 border-emerald-500/40';
      labelClass += ' bg-emerald-500/20 text-emerald-400 border border-emerald-500/40';
      textClass += ' text-emerald-200';
      iconEl = <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" aria-label="Correct answer" />;
    } else if (!isCorrect && isStudentChoice) {
      // Student choice was wrong
      containerClass += ' bg-rose-500/10 border-rose-500/50 shadow-sm shadow-rose-500/10';
      labelClass += ' bg-rose-500 text-white font-bold';
      textClass += ' text-rose-100';
      iconEl = <XCircle size={18} className="text-rose-400 flex-shrink-0 mt-0.5" aria-label="Incorrect answer selected" />;
    } else {
      // Unselected other options
      containerClass += ' bg-navy-900/60 border-slate-800/80 opacity-50 cursor-default';
      labelClass += ' bg-navy-950 text-slate-500 border border-slate-800';
      textClass += ' text-slate-400';
    }
  } else if (selected) {
    containerClass += ' bg-cyan-950/40 border-cyan-400/80 shadow-lg shadow-cyan-950/40';
    labelClass += ' bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md shadow-cyan-500/20';
    textClass += ' text-white font-medium';
  } else if (disabled) {
    containerClass += ' bg-navy-900/40 border-slate-800/60 cursor-not-allowed opacity-50';
    labelClass += ' bg-navy-950 text-slate-500 border border-slate-800';
    textClass += ' text-slate-400';
  } else {
    containerClass += ' bg-navy-900/80 border-slate-800/90 hover:bg-navy-850 hover:border-slate-700 active:scale-[0.99]';
    labelClass += ' bg-navy-950 text-slate-400 border border-slate-800 group-hover:border-slate-700 group-hover:text-slate-200';
    textClass += ' text-slate-200';
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
      <div className={textClass.trim()}>{option.text}</div>

      {shortcutKey && !showResult && (
        <span className="hidden sm:inline-block font-mono text-[10px] text-slate-500 bg-navy-950/80 px-1.5 py-0.5 rounded border border-slate-800/80 self-center">
          {shortcutKey}
        </span>
      )}

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
  isMarked?: boolean;
  onSelect: (optionId: string) => void;
  onToggleMark?: () => void;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOptionId,
  disabled = false,
  showResult = false,
  isMarked = false,
  onSelect,
  onToggleMark,
}: QuestionCardProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Question metadata header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="badge bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono text-xs">
            Question {questionNumber.toString().padStart(2, '0')} / {totalQuestions.toString().padStart(2, '0')}
          </span>
          <span className="badge bg-navy-900 text-slate-300 border border-slate-800 font-mono text-xs">
            {question.topic}
          </span>
          {question.manual_review && (
            <span className="badge bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs">
              <AlertCircle size={12} />
              Verified Flag
            </span>
          )}
        </div>

        {onToggleMark && (
          <button
            onClick={onToggleMark}
            type="button"
            className={`btn-ghost text-xs py-1 px-2.5 rounded-lg border font-mono transition-colors ${
              isMarked
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                : 'text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            aria-label={isMarked ? 'Remove bookmark' : 'Bookmark question for review'}
            aria-pressed={isMarked}
          >
            <Bookmark size={13} className={isMarked ? 'fill-amber-400 text-amber-400' : ''} />
            <span>{isMarked ? 'Marked' : 'Mark for Review'}</span>
          </button>
        )}
      </div>

      {/* Question Prompt Card */}
      <div className="card p-5 sm:p-6 rounded-2xl bg-navy-900/90 border border-slate-800/90 space-y-3 shadow-lg">
        <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-medium">
          {question.question_text}
        </p>

        {question.formula && (
          <FormulaBlock formula={question.formula} label="Given / Formula" />
        )}
      </div>

      {/* Answer Options Radio Group */}
      <div
        role="radiogroup"
        aria-label="Multiple choice answer options"
        className="space-y-2.5"
      >
        {question.options.map((opt, idx) => (
          <AnswerOption
            key={opt.id}
            option={opt}
            selected={selectedOptionId === opt.id}
            disabled={disabled}
            showResult={showResult}
            isCorrect={opt.id === question.correct_option_id}
            isStudentChoice={opt.id === selectedOptionId}
            shortcutKey={`[${idx + 1}]`}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
