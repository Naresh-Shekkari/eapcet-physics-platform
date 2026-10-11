import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Zap, Menu, X, BookOpen, BarChart2, Home, Info } from 'lucide-react';

// ============================================================
// Navigation Bar Component
// ============================================================

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home', icon: <Home size={15} />, end: true },
    { to: '/courses', label: 'Courses', icon: <BookOpen size={15} /> },
    { to: '/results', label: 'Results', icon: <BarChart2 size={15} /> },
    { to: '/about', label: 'About', icon: <Info size={15} /> },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
      isActive
        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
        : 'text-slate-400 hover:text-slate-200 hover:bg-navy-800'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-700/50 bg-navy-950/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">
              <Zap size={16} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-lg leading-none">PhysicsEdge</span>
              <span className="block text-xs text-slate-500 leading-none">EAPCET Prep</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-3">
            <Link to="/courses" className="hidden sm:flex btn-primary py-2 px-4 text-sm">
              Start Practice
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-700/50 bg-navy-950 px-4 py-3 space-y-1 animate-slide-up">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-colors ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300'
                    : 'text-slate-400 hover:text-white hover:bg-navy-800'
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
          <div className="pt-2">
            <Link
              to="/courses"
              className="btn-primary w-full justify-center"
              onClick={() => setMobileOpen(false)}
            >
              Start Practice
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
