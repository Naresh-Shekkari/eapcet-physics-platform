import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  BookOpen,
  Clock,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
} from 'lucide-react';

// ============================================================
// About & Verification Standards Page — PhysicsEdge
// ============================================================

export function AboutPage() {
  const mcqPdfUrl = `${import.meta.env.BASE_URL}mcqs/work-energy-power-mcq-practice.pdf`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center mx-auto shadow-xl shadow-cyan-950/40">
          <Zap size={32} className="text-white" />
        </div>
        <div className="space-y-2">
          <span className="micro-label">Academic Standards & Architecture</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About PhysicsEdge
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            A free, open educational platform engineered for students preparing for AP & TS EAPCET Physics.
            Zero paywalls, zero accounts, and 100% verified question provenance.
          </p>
        </div>
      </div>

      {/* Core Mission */}
      <div className="card-elevated p-6 sm:p-8 rounded-2xl border border-slate-700/80 space-y-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck size={22} className="text-cyan-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Our Academic Mission
          </h2>
        </div>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          EAPCET Physics demands both rapid numerical calculation and solid conceptual intuition.
          Too many online platforms rely on AI-generated questions with distorted physical formulas,
          inaccurate keys, and misleading distractors. PhysicsEdge was created to offer an uncompromising,
          high-quality practice experience where every problem originates directly from verified teacher papers.
        </p>
      </div>

      {/* Verification Protocol & Content Integrity */}
      <div className="card p-6 sm:p-8 rounded-2xl bg-navy-900/90 border border-slate-800 space-y-5">
        <div className="space-y-1">
          <span className="micro-label">Verification Standards</span>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Strict Verification Protocol
          </h2>
        </div>

        <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-mono">
          {[
            'Questions are parsed verbatim from verified source PDF practice sheets.',
            'Every option and correct answer key is strictly corroborated with the official solution key.',
            'Step-by-step explanations are extracted from verified teacher solutions — never fabricated.',
            'Mathematical inconsistencies or notation discrepancies in source PDFs are explicitly flagged for teacher review.',
            'Zero AI-generated distractors or synthetic approximations are introduced.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-navy-950/70 border border-slate-800/80 leading-relaxed font-sans">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Platform Pillars Grid */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          Key Platform Capabilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: <Clock size={18} className="text-cyan-400" />,
              title: 'Precise 60s Timers',
              desc: 'Enforces real exam pacing with responsive circular countdowns and automated question advancement.',
            },
            {
              icon: <BookOpen size={18} className="text-indigo-400" />,
              title: 'Full Mathematical Explanations',
              desc: 'Deep step-by-step formula derivations with vector notation, integrals, and physical reasoning.',
            },
            {
              icon: <Lock size={18} className="text-emerald-400" />,
              title: 'Private Client-Side Storage',
              desc: 'All test scores and in-progress attempts are stored in your local browser. No data leaves your machine.',
            },
            {
              icon: <FileText size={18} className="text-amber-400" />,
              title: 'Original Source PDF Access',
              desc: 'Direct links to download and inspect the original source PDFs from which each question bank is constructed.',
            },
          ].map((col) => (
            <div key={col.title} className="card p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-center">
                {col.icon}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">{col.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{col.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Available Content Provenance */}
      <div className="card p-6 rounded-2xl bg-navy-900/90 border border-slate-800 space-y-3 font-mono text-xs">
        <span className="micro-label">Active Question Bank</span>
        <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-2 font-sans">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-sm">Work, Energy and Power</span>
            <span className="badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono">
              20 Verified MCQs
            </span>
          </div>
          <p className="text-slate-400 text-xs">
            Source Document: <code className="text-cyan-300 font-mono">public/mcqs/work-energy-power-mcq-practice.pdf</code>
          </p>
          <div className="pt-2">
            <a
              href={mcqPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 text-xs font-mono inline-flex items-center gap-1"
            >
              Inspect Source PDF Document →
            </a>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="pt-4 text-center">
        <Link
          to="/courses/chapter/work-energy-power"
          className="btn-primary py-3 px-6 text-sm gap-2 inline-flex"
        >
          <span>Start Practising Physics Now</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
