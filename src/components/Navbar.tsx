import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X, BookOpen, BarChart2, Home, Info, ArrowRight, Play } from 'lucide-react';
import { loadActiveQuiz } from '../services/quizPersistence';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Derive active quiz state
  const activeQuiz = loadActiveQuiz();
  const hasActiveQuiz = Boolean(activeQuiz && activeQuiz.phase === 'active');

  const navLinks = [
    { to: '/', label: 'Home', icon: <Home size={15} />, end: true },
    { to: '/courses', label: 'Physics Topics', icon: <BookOpen size={15} /> },
    { to: '/courses/chapter/work-energy-power', label: 'Practice Tests', icon: <Play size={15} /> },
    { to: '/results', label: 'My Progress', icon: <BarChart2 size={15} /> },
    { to: '/about', label: 'About', icon: <Info size={15} /> },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 ${
      isActive
        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-950/20'
        : 'text-slate-400 hover:text-slate-100 hover:bg-navy-900 border border-transparent'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/90 bg-navy-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo / Wordmark */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-950/40 group-hover:scale-105 transition-transform duration-200">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-white font-extrabold text-lg tracking-tight leading-none">
                  PhysicsEdge
                </span>
                <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                  EAPCET
                </span>
              </div>
              <span className="hidden sm:block text-[11px] text-slate-400 font-mono leading-none mt-0.5">
                Academic Practice Engine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {hasActiveQuiz && location.pathname !== '/quiz' && (
              <Link
                to="/quiz?mode=practice"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono animate-pulse"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Resume Quiz
              </Link>
            )}

            <Link
              to="/courses/chapter/work-energy-power"
              className="btn-primary text-xs sm:text-sm py-2 px-3.5 sm:px-4"
            >
              <span>Start Practising</span>
              <ArrowRight size={14} className="hidden sm:inline-block" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-900 border border-slate-800 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-navy-950/98 backdrop-blur-xl px-4 py-4 space-y-2 animate-slide-up shadow-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-navy-900'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                <ArrowRight size={13} className="opacity-40" />
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <Link
              to="/courses/chapter/work-energy-power"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full justify-center text-sm py-2.5"
            >
              Start Practising Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
