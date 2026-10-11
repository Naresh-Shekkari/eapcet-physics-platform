import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Clock, FileText, ExternalLink, ChevronLeft, Lock, AlertTriangle, Target } from 'lucide-react';
import {
  getQuestionCount,
  canStartExamMode,
  EXAM_QUESTION_COUNT,
  PRACTICE_QUESTION_COUNT,
  PER_QUESTION_DURATION_MS,
  PRACTICE_TOTAL_DURATION_MS,
  EXAM_TOTAL_DURATION_MS,
} from '../services/questionBank';
import { getValidationErrors } from '../services/questionBank';

// ============================================================
// Chapter Detail Page — Work, Energy and Power
// ============================================================

export function ChapterPage() {
  const navigate = useNavigate();
  const questionCount = getQuestionCount();
  const examAvailable = canStartExamMode(EXAM_QUESTION_COUNT);
  const validationErrors = getValidationErrors();

  const handleStartPractice = () => {
    navigate('/quiz?mode=practice');
  };

  const handleStartExam = () => {
    if (examAvailable) navigate('/quiz?mode=exam');
  };

  // Base URL-aware PDF path — works locally and on GitHub Pages
  const pdfUrl = `${import.meta.env.BASE_URL}work-energy-power-mcq-practice.pdf`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400" aria-label="Breadcrumb">
        <Link to="/courses" className="hover:text-indigo-400 flex items-center gap-1">
          <ChevronLeft size={14} /> Courses
        </Link>
        <span>/</span>
        <span className="text-slate-200">Work, Energy and Power</span>
      </nav>

      {/* Header */}
      <div className="card-elevated p-6 rounded-2xl space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-lg">
            <BookOpen size={28} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Available</span>
              <span className="badge bg-navy-900 text-slate-400 border border-slate-600/30">Physics</span>
              <span className="badge bg-navy-900 text-slate-400 border border-slate-600/30">Class 11</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">Work, Energy and Power</h1>
          </div>
        </div>

        <p className="text-slate-300 leading-relaxed">
          This chapter covers fundamental concepts of mechanical energy: work done by constant and
          variable forces, kinetic and potential energy, the work-energy theorem, conservation of
          energy, spring potential energy, power, and the relationship between kinetic energy and
          momentum. Vector operations (dot product) are used extensively.
        </p>

        {/* Topics covered */}
        <div className="flex flex-wrap gap-2">
          {[
            'Dot Product of Vectors',
            'Work by Variable Force',
            'Work-Energy Theorem',
            'Spring Potential Energy',
            'Conservation of Energy',
            'KE & Momentum',
            'Lifting in Fluids',
            'Power',
          ].map(t => (
            <span key={t} className="badge bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">{t}</span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-700/40">
          <ChapterStat icon={<BookOpen size={14} />} label="Questions" value={`${questionCount}`} />
          <ChapterStat icon={<Clock size={14} />} label="Practice Time" value="20 min" />
          <ChapterStat icon={<Clock size={14} />} label="Per Question" value="60 sec" />
          <ChapterStat icon={<Target size={14} />} label="Scoring" value="+1 / 0 / 0" />
        </div>
      </div>

      {/* Validation warnings */}
      {validationErrors.length > 0 && (
        <div className="card p-4 border-amber-500/30 bg-amber-500/10 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-400" />
            <p className="text-sm font-semibold text-amber-300">Question Bank Validation Issues</p>
          </div>
          <ul className="text-xs text-amber-200 space-y-1">
            {validationErrors.map((e, i) => <li key={i}>• {e}</li>)}
          </ul>
        </div>
      )}

      {/* Practice Modes */}
      <div className="space-y-4">
        <h2 className="section-heading">Practice Modes</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Full Practice Set */}
          <div className="card-elevated p-5 space-y-4 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <BookOpen size={18} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Full Practice Set</h3>
                <p className="text-xs text-slate-400">All {questionCount} questions · 20 minutes</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Attempt all {questionCount} verified questions from the source PDF.
              Ideal for chapter mastery and targeted practice.
            </p>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <span>✓ {questionCount} questions (all available)</span>
              <span>✓ 60 seconds per question</span>
              <span>✓ 20 minutes overall</span>
              <span>✓ Full explanations in results</span>
            </div>
            <button
              onClick={handleStartPractice}
              className="btn-primary w-full"
            >
              Start Full Practice Set
            </button>
          </div>

          {/* Exam Mode */}
          <div className={`card-elevated p-5 space-y-4 transition-colors ${examAvailable ? 'hover:border-violet-500/40' : 'opacity-70'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${examAvailable ? 'bg-violet-500/20' : 'bg-slate-500/15'}`}>
                {examAvailable
                  ? <Target size={18} className="text-violet-400" />
                  : <Lock size={18} className="text-slate-500" />
                }
              </div>
              <div>
                <h3 className="font-bold text-white">Exam Mode</h3>
                <p className="text-xs text-slate-400">{EXAM_QUESTION_COUNT} questions · 25 minutes</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Simulates EAPCET exam conditions with {EXAM_QUESTION_COUNT} questions and a 25-minute countdown.
            </p>

            {examAvailable ? (
              <>
                <div className="flex flex-col gap-2 text-xs text-slate-400">
                  <span>✓ {EXAM_QUESTION_COUNT} questions</span>
                  <span>✓ 60 seconds per question</span>
                  <span>✓ 25 minutes overall</span>
                  <span>✓ Randomized question order</span>
                </div>
                <button onClick={handleStartExam} className="w-full btn-primary bg-violet-600 hover:bg-violet-500 active:bg-violet-700">
                  Start Exam Mode
                </button>
              </>
            ) : (
              <>
                <div className="p-3 rounded-xl bg-slate-500/10 border border-slate-500/20">
                  <p className="text-sm text-slate-300 font-medium mb-1">Not available yet</p>
                  <p className="text-xs text-slate-400">
                    Exam Mode requires at least {EXAM_QUESTION_COUNT} distinct verified questions.
                    Currently {questionCount} questions are available from the source PDF.
                    Add more verified question banks from your teacher's PDFs to unlock this mode.
                  </p>
                </div>
                <button disabled className="btn-secondary w-full cursor-not-allowed opacity-50">
                  <Lock size={14} /> Locked — Need {EXAM_QUESTION_COUNT - questionCount} more questions
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Source PDF */}
      <div className="card p-5 space-y-3">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-indigo-400" />
          <h3 className="font-semibold text-white">Source Material</h3>
        </div>
        <p className="text-sm text-slate-400">
          All questions are extracted and verified from the following practice PDF.
          Open it to cross-reference explanations or report discrepancies.
        </p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex text-sm"
        >
          <FileText size={14} /> Open Practice PDF
          <ExternalLink size={12} className="ml-1 opacity-60" />
        </a>
      </div>
    </div>
  );
}

function ChapterStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-900 border border-slate-700/30">
      <span className="text-indigo-400">{icon}</span>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
