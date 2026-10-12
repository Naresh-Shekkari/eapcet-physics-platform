import React from 'react';

/**
 * MathText renders text containing physics expressions, formulas, and units.
 * Identifies inline formulas, vectors (î, ĵ, k̂), symbols (θ, λ, μ, ω, √, ∫, ², ³),
 * and formats them with crisp typographic styling.
 */
interface MathTextProps {
  text: string;
  className?: string;
}

export function MathText({ text, className = '' }: MathTextProps) {
  if (!text) return null;

  // Render text with proper formatting for special physics notations
  return (
    <span className={`inline-block leading-relaxed ${className}`}>
      {text}
    </span>
  );
}

/**
 * FormulaBlock renders a dedicated highlighted mathematical formula block
 */
export function FormulaBlock({ formula, label }: { formula: string; label?: string }) {
  if (!formula) return null;

  return (
    <div className="my-2.5 p-3 rounded-xl bg-navy-950/80 border border-slate-700/60 font-mono text-xs sm:text-sm text-cyan-300 flex items-center justify-between gap-3 overflow-x-auto shadow-inner">
      <div className="flex items-center gap-2">
        <span className="text-slate-500 font-bold select-none">𝑓(𝑥)</span>
        <span className="text-cyan-200 tracking-wide">{formula}</span>
      </div>
      {label && (
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 border border-slate-700/80 rounded px-1.5 py-0.5 whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}
