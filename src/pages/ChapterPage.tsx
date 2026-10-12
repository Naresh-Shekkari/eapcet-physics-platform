import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  FileText,
  ExternalLink,
  ChevronLeft,
  Lock,
  AlertTriangle,
  Target,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  getQuestionCount,
  canStartExamMode,
  EXAM_QUESTION_COUNT,
  getValidationErrors,
} from '../services/questionBank';

// ============================================================
// Chapter Detail Page — Work, Energy and Power
// ============================================================

export function ChapterPage() {
  const navigate = useNavigate();
  const questionCount = getQuestionCount();
  const examAvailable = canStartExamMode(EXAM_QUESTION_COUNT);
  const validationErrors = getValidationErrors();
  const [showFormulaDrawer, setShowFormulaDrawer] = useState(false);

  const handleStartPractice = () => {
    navigate('/quiz?mode=practice');
  };

  const handleStartExam = () => {
    if (examAvailable) navigate('/quiz?mode=exam');
  };

  // Dedicated paths for MCQ PDFs and Course Learning Materials
  const mcqPdfUrl = `${import.meta.env.BASE_URL}mcqs/work-energy-power-mcq-practice.pdf`;
  const courseNotesUrl = `${import.meta.env.BASE_URL}courses/work-energy-power/work-energy-power-complete-guide.md`;

  const coreFormulas = [
    { name: 'Work Done by Constant Force', formula: 'W = F · s = F s cos θ' },
    { name: 'Work Done by Variable Force', formula: 'W = ∫ F · dx' },
    { name: 'Work-Energy Theorem', formula: 'W_net = ΔK = ½ m(v² − u²)' },
    { name: 'Spring Potential Energy', formula: 'U = ½ k x²' },
    { name: 'Kinetic Energy & Linear Momentum', formula: 'K = p² / (2m)  ⇔  p = √(2mK)' },
    { name: 'Instantaneous Power', formula: 'P = dW/dt = F · v' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400" aria-label="Breadcrumb">
        <Link to="/courses" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
          <ChevronLeft size={14} /> Physics Topics
        </Link>
        <span>/</span>
        <span className="text-slate-200">Work, Energy and Power</span>
      </nav>

      {/* Chapter Overview Header */}
      <div className="card-elevated p-6 sm:p-8 rounded-2xl border border-slate-700/80 space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-950/40">
            <Zap size={30} className="text-white" />
          </div>

          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="badge bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono text-xs">
                ✓ 20 Verified MCQs Ready
              </span>
              <span className="badge bg-navy-950 text-slate-300 border border-slate-700/80 font-mono text-xs">
                Physics · Class 11
              </span>
              <span className="badge bg-navy-950 text-slate-400 border border-slate-800 font-mono text-xs">
                EAPCET Syllabus
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Work, Energy and Power
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-1">
              Fundamental mechanics: work done by constant and variable forces, scalar dot product,
              work-energy theorem, conservation of mechanical energy, elastic spring potential energy,
              and instantaneous power under resistive force fields.
            </p>
          </div>
        </div>

        {/* Syllabus Tag Chips */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
          {[
            'Dot Product of Vectors',
            'Variable Force Integration',
            'Work-Energy Theorem',
            'Spring Potential Energy',
            'Conservation of Mechanical Energy',
            'Kinetic Energy & Linear Momentum',
            'Fluid Resistance Lifting',
            'Power & Efficiency',
          ].map((t) => (
            <span
              key={t}
              className="badge bg-navy-950 text-cyan-300 border border-slate-800 text-xs font-mono"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Chapter Specification Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
          <ChapterStat icon={<BookOpen size={15} className="text-cyan-400" />} label="Question Bank" value={`${questionCount} MCQs`} />
          <ChapterStat icon={<Clock size={15} className="text-indigo-400" />} label="Quiz Duration" value="20 Minutes" />
          <ChapterStat icon={<Clock size={15} className="text-blue-400" />} label="Timer Pace" value="60s / Question" />
          <ChapterStat icon={<Target size={15} className="text-emerald-400" />} label="Marking Scheme" value="+1 / 0 (No Neg)" />
        </div>
      </div>

      {/* Validation Warnings (if questions flagged for teacher check) */}
      {validationErrors.length > 0 && (
        <div className="card p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-400" />
            <p className="text-xs sm:text-sm font-semibold text-amber-300">
              Curriculum Review Notes from Original PDF
            </p>
          </div>
          <ul className="text-xs font-mono text-amber-200/90 space-y-1 pl-5 list-disc">
            {validationErrors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Practice Modes Chooser */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="micro-label">Test Configurations</span>
            <h2 className="section-heading mt-1">Available Quiz Modes</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Practice Set Card */}
          <div className="card-elevated p-6 rounded-2xl border border-slate-700/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Full Practice Quiz</h3>
                  <p className="text-xs font-mono text-slate-400">
                    All {questionCount} Verified Questions · 20 Mins
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Attempt all {questionCount} questions extracted from the teacher PDF paper.
                Ideal for thorough chapter mastery, formula application drills, and review.
              </p>

              <div className="space-y-2 text-xs font-mono text-slate-400 bg-navy-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{questionCount} Verified MCQs (Complete Bank)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>60 seconds per-question countdown</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Full step-by-step verified explanations in review</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartPractice}
              type="button"
              className="btn-primary w-full py-3 text-sm gap-2"
            >
              <span>Launch Full Practice Set</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Exam Simulation Mode Card */}
          <div
            className={`card-elevated p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-5 ${
              examAvailable
                ? 'border-slate-700/80 hover:border-violet-500/40'
                : 'border-slate-800/80 opacity-75'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    examAvailable ? 'bg-violet-500/15 text-violet-400 border border-violet-500/30' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {examAvailable ? <Target size={20} /> : <Lock size={18} />}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">EAPCET Exam Simulation</h3>
                  <p className="text-xs font-mono text-slate-400">
                    {EXAM_QUESTION_COUNT} Questions · 25 Mins
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Full-length mock exam condition simulating real test pressure with randomized question order and strict overall duration.
              </p>

              {examAvailable ? (
                <div className="space-y-2 text-xs font-mono text-slate-400 bg-navy-950/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{EXAM_QUESTION_COUNT} Random Questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>25 Minutes Overall Deadline</span>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-navy-950/80 border border-slate-800 text-xs font-mono space-y-1">
                  <p className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <Lock size={12} />
                    Exam Mode Requirement: {EXAM_QUESTION_COUNT} Questions
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    Currently {questionCount} questions are verified in this chapter.
                    Exam mode unlocks automatically as soon as {EXAM_QUESTION_COUNT - questionCount} more verified questions are parsed from the next teacher paper.
                  </p>
                </div>
              )}
            </div>

            {examAvailable ? (
              <button
                onClick={handleStartExam}
                type="button"
                className="btn-primary w-full py-3 text-sm bg-gradient-to-r from-violet-600 to-indigo-600"
              >
                <span>Start Exam Mode</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                disabled
                type="button"
                className="btn-secondary w-full py-3 text-xs font-mono cursor-not-allowed opacity-50 justify-center"
              >
                <Lock size={13} />
                <span>Locked · Need {EXAM_QUESTION_COUNT - questionCount} More Questions</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Core Formula Cheatsheet Drawer */}
      <div className="card p-6 rounded-2xl bg-navy-900/90 border border-slate-800 space-y-4">
        <button
          onClick={() => setShowFormulaDrawer(!showFormulaDrawer)}
          type="button"
          className="w-full flex items-center justify-between text-left"
          aria-expanded={showFormulaDrawer}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Zap size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Core Chapter Formulas & Equations
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Key mathematical expressions to review before starting
              </p>
            </div>
          </div>
          <div className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors">
            {showFormulaDrawer ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </button>

        {showFormulaDrawer && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800 animate-fade-in">
            {coreFormulas.map((item) => (
              <div key={item.name} className="p-3 rounded-xl bg-navy-950 border border-slate-800/80 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  {item.name}
                </span>
                <p className="font-mono text-sm text-cyan-300 font-medium">
                  {item.formula}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Study Materials & Document Links */}
      <div className="space-y-4">
        <div>
          <span className="micro-label">Reference Material</span>
          <h2 className="section-heading mt-1">Study Guides & Original Paper</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Complete Guide */}
          <div className="card p-5 rounded-2xl space-y-3 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2.5">
              <BookOpen size={18} className="text-cyan-400" />
              <h3 className="font-bold text-white text-sm">Chapter Theory & Formula Guide</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Read comprehensive chapter derivations, sign conventions for work done, and special cases before quiz attempts.
            </p>
            <div className="pt-2">
              <a
                href={courseNotesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center text-xs py-2 gap-1.5"
              >
                <span>Open Study Guide</span>
                <ExternalLink size={12} className="opacity-60" />
              </a>
            </div>
          </div>

          {/* Original MCQ Practice PDF */}
          <div className="card p-5 rounded-2xl space-y-3 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2.5">
              <FileText size={18} className="text-indigo-400" />
              <h3 className="font-bold text-white text-sm">Official MCQ Practice Paper</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The original 20-question practice paper in PDF format, complete with official answer keys and verified solution notes.
            </p>
            <div className="pt-2">
              <a
                href={mcqPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center text-xs py-2 gap-1.5"
              >
                <span>Open Source PDF</span>
                <ExternalLink size={12} className="opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800 flex items-center gap-2.5">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="text-[10px] uppercase text-slate-500 font-mono leading-none">{label}</p>
        <p className="text-xs sm:text-sm font-bold text-white font-mono mt-1 leading-none">{value}</p>
      </div>
    </div>
  );
}
