import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, BookOpen, Target, Mail, Github, FileText } from 'lucide-react';

// ============================================================
// About Page
// ============================================================

export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center mx-auto shadow-lg">
          <Zap size={28} className="text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">About PhysicsEdge</h1>
        <p className="text-slate-400 leading-relaxed">
          A free, open-source EAPCET Physics practice platform built for students who demand
          exam-quality preparation without paywalls or accounts.
        </p>
      </div>

      {/* Mission */}
      <div className="card p-6 space-y-3">
        <h2 className="font-bold text-white text-lg">Our Mission</h2>
        <p className="text-slate-400 leading-relaxed">
          PhysicsEdge provides verified, chapter-wise MCQ practice for EAPCET Physics.
          Every question is extracted directly from teacher-provided source PDFs and
          cross-verified against the answer key. No fabricated content, no AI-generated
          distractors, no misleading explanations.
        </p>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="font-bold text-white text-lg">Platform Features</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { icon: <Target size={16} />, title: 'Verified Questions', desc: 'All MCQs sourced and verified from official practice PDFs.' },
            { icon: <BookOpen size={16} />, title: 'Timed Practice', desc: '60-second circular countdown per question with overall time limit.' },
            { icon: <FileText size={16} />, title: 'Detailed Explanations', desc: 'Step-by-step solutions for every question after submission.' },
            { icon: <Zap size={16} />, title: 'No Login Required', desc: 'Start practising immediately. Progress saved locally in your browser.' },
          ].map(f => (
            <div key={f.title} className="card p-4 flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-400 flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{f.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content integrity */}
      <div className="card p-6 space-y-3 border-amber-500/20 bg-amber-500/5">
        <h2 className="font-bold text-white text-lg">Content Integrity</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          This platform adheres to strict content standards:
        </p>
        <ul className="space-y-2 text-sm text-slate-400">
          {[
            'Questions are extracted verbatim from verified source PDFs.',
            'Answers are matched only to the official answer keys.',
            'Explanations are taken from the source solutions, not generated.',
            'Mathematical discrepancies in source PDFs are flagged for manual review.',
            'No question, option, or explanation is invented or guessed.',
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-amber-400 flex-shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Current content */}
      <div className="card p-6 space-y-3">
        <h2 className="font-bold text-white text-lg">Available Content</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Work, Energy and Power</span>
            <span className="badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">20 questions</span>
          </div>
          <div className="text-xs text-slate-500">Source: work-energy-power-mcq-practice.pdf</div>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          More chapters will be added as teacher-verified PDFs become available.
        </p>
      </div>

      {/* Source link */}
      <div className="text-center">
        <Link to="/courses" className="btn-primary inline-flex">
          Start Practising Now
        </Link>
      </div>
    </div>
  );
}
