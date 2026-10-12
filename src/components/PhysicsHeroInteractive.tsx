import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle2, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

export function PhysicsHeroInteractive() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const sampleQuestion = {
    title: 'EAPCET Vector & Dot Product Test',
    text: 'Two vectors P = 5î + 2ĵ + 4k̂ and Q = 2î – 5ĵ + 0k̂. The angle between them is:',
    formula: 'P · Q = (Px·Qx) + (Py·Qy) + (Pz·Qz) = |P||Q| cos θ',
    options: [
      { id: 'A', text: '0°' },
      { id: 'B', text: '45°' },
      { id: 'C', text: '180°' },
      { id: 'D', text: '90°', correct: true },
    ],
    explanation: 'P · Q = (5)(2) + (2)(−5) + (4)(0) = 10 − 10 + 0 = 0. Since P · Q = 0, cos θ = 0 ⇒ θ = 90° (Perpendicular).',
  };

  const handleSelect = (id: string) => {
    setSelectedOption(id);
    setShowExplanation(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setShowExplanation(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto lg:mx-0 rounded-2xl bg-navy-900/90 border border-slate-700/70 shadow-2xl shadow-cyan-950/30 overflow-hidden backdrop-blur-md">
      {/* Chrome header with macOS/terminal style dots */}
      <div className="px-4 py-3 bg-navy-950/80 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[11px] text-slate-400 font-medium">
            interactive-quiz-sandbox · WEP-01
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider font-semibold">Live Demo</span>
        </div>
      </div>

      {/* Chrome body */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Question metadata badge bar */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="badge bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[11px]">
              Question 1 of 20
            </span>
            <span className="badge bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono text-[11px]">
              Vectors & Dot Product
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1">
            <Zap size={12} className="text-amber-400" />
            +1 Mark
          </span>
        </div>

        {/* Question Statement */}
        <div className="space-y-2">
          <p className="text-slate-100 text-sm sm:text-base font-medium leading-relaxed">
            {sampleQuestion.text}
          </p>
          <div className="px-3 py-1.5 rounded-lg bg-navy-950/90 border border-slate-800 font-mono text-[11px] sm:text-xs text-cyan-300/90 overflow-x-auto">
            {sampleQuestion.formula}
          </div>
        </div>

        {/* Clickable Options */}
        <div className="grid grid-cols-2 gap-2.5">
          {sampleQuestion.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrect = opt.correct;

            let cardStyles = 'border-slate-700/70 bg-navy-950/50 hover:bg-navy-800/80 hover:border-slate-600 text-slate-200';
            let pillStyles = 'bg-slate-800 text-slate-400 border border-slate-700';

            if (selectedOption) {
              if (isCorrect) {
                cardStyles = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-100 shadow-sm shadow-emerald-500/10';
                pillStyles = 'bg-emerald-500 text-white border-emerald-400';
              } else if (isSelected) {
                cardStyles = 'border-rose-500/60 bg-rose-500/10 text-rose-100';
                pillStyles = 'bg-rose-500 text-white border-rose-400';
              } else {
                cardStyles = 'opacity-40 border-slate-800 bg-navy-950/30 text-slate-400 cursor-not-allowed';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-150 flex items-center gap-2.5 ${cardStyles}`}
                aria-label={`Option ${opt.id}: ${opt.text}`}
              >
                <span className={`w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 ${pillStyles}`}>
                  {opt.id}
                </span>
                <span className="font-mono text-sm font-semibold">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback drawer */}
        {showExplanation && (
          <div className="p-3.5 rounded-xl bg-navy-950/90 border border-cyan-500/30 space-y-2 animate-fade-in">
            <div className="flex items-center justify-between text-xs">
              <span className={`font-mono font-semibold flex items-center gap-1.5 ${selectedOption === 'D' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {selectedOption === 'D' ? (
                  <>
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    Correct Answer! Option (D) 90°
                  </>
                ) : (
                  <>
                    <Sparkles size={14} className="text-amber-400" />
                    Correct Answer is (D) 90°
                  </>
                )}
              </span>
              <button
                onClick={handleReset}
                className="text-slate-400 hover:text-white flex items-center gap-1 font-mono text-[10px] transition-colors"
                title="Reset question"
              >
                <RotateCcw size={11} /> Reset
              </button>
            </div>
            <p className="font-mono text-xs text-slate-300 leading-relaxed bg-navy-900/80 p-2.5 rounded-lg border border-slate-800">
              {sampleQuestion.explanation}
            </p>
          </div>
        )}

        {/* Bottom CTA within preview */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
          <span className="text-slate-400 font-mono text-[11px]">
            {selectedOption ? 'Instant evaluation verified' : 'Click any option to test answer'}
          </span>
          <Link
            to="/quiz?mode=practice"
            className="text-cyan-400 hover:text-cyan-300 font-mono text-xs font-semibold flex items-center gap-1 group"
          >
            Start Real Quiz
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
