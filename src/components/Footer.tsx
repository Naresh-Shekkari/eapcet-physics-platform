import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, BookOpen, ShieldCheck, FileText, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const mcqPdfUrl = `${import.meta.env.BASE_URL}mcqs/work-energy-power-mcq-practice.pdf`;
  const courseNotesUrl = `${import.meta.env.BASE_URL}courses/work-energy-power/work-energy-power-complete-guide.md`;

  return (
    <footer className="border-t border-slate-800/80 bg-navy-950/80 text-slate-400 text-sm relative mt-auto">
      {/* Subtle top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand lockup & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-950/40 group-hover:scale-105 transition-transform duration-200">
                <Zap size={16} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-tight tracking-tight flex items-center gap-1.5">
                  PhysicsEdge
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                    EAPCET
                  </span>
                </span>
                <span className="text-xs text-slate-500 font-mono">Verified Practice Platform</span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Purpose-built learning system for AP & TS EAPCET Physics aspirants.
              Every question is extracted verbatim from verified teacher PDFs with step-by-step mathematical solutions.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Verified Question Bank
              </div>
              <div className="text-xs text-slate-500 font-mono">
                No paywall · No login
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">Curriculum</p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/courses/chapter/work-energy-power" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  Work, Energy & Power
                  <span className="text-[10px] px-1 rounded bg-emerald-500/10 text-emerald-400">Live</span>
                </Link>
              </li>
              <li className="text-slate-500 flex items-center gap-1.5">
                Laws of Motion
                <span className="text-[10px] text-slate-600 font-mono">Upcoming</span>
              </li>
              <li className="text-slate-500 flex items-center gap-1.5">
                Motion in a Plane
                <span className="text-[10px] text-slate-600 font-mono">Upcoming</span>
              </li>
              <li className="text-slate-500 flex items-center gap-1.5">
                Gravitation
                <span className="text-[10px] text-slate-600 font-mono">Upcoming</span>
              </li>
              <li className="pt-1">
                <Link to="/courses" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                  All Chapters →
                </Link>
              </li>
            </ul>
          </div>

          {/* Study Documents */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">Study Materials</p>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={courseNotesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                >
                  <FileText size={12} className="text-indigo-400" />
                  Chapter Study Guide
                  <ArrowUpRight size={11} className="opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={mcqPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                >
                  <BookOpen size={12} className="text-cyan-400" />
                  Official MCQ PDF
                  <ArrowUpRight size={11} className="opacity-60" />
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  Content Verification Policy
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-cyan-400 transition-colors">
                  My Performance History
                </Link>
              </li>
            </ul>
          </div>

          {/* EAPCET Exam Pattern */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">Exam Pattern</p>
            <div className="p-3 rounded-xl bg-navy-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Physics Section</span>
                <span className="font-mono text-cyan-300 font-semibold">40 Marks</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Total Questions</span>
                <span className="font-mono text-slate-200">160 MCQs</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Time Allowed</span>
                <span className="font-mono text-slate-200">180 Mins</span>
              </div>
              <div className="pt-1 border-t border-slate-800 text-[11px] text-slate-500">
                Recommended speed: 60s per Physics question.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© 2026 PhysicsEdge · Academic EAPCET Preparation Platform.</p>
          <div className="flex items-center gap-4">
            <span>Client-side Storage</span>
            <span>·</span>
            <span>Zero Tracking</span>
            <span>·</span>
            <span>GitHub Pages</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
