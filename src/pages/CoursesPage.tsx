import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ChevronRight,
  Lock,
  Zap,
  Clock,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import { getQuestionCount } from '../services/questionBank';

// ============================================================
// Courses & Topic Catalogue Page — PhysicsEdge
// ============================================================

export function CoursesPage() {
  const questionCount = getQuestionCount();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'available' | 'upcoming'>('all');

  const chapters = useMemo(() => [
    {
      id: 'work-energy-power',
      title: 'Work, Energy and Power',
      classLevel: 'Class 11',
      stream: 'Mechanics',
      description:
        'Dot product of vectors, work done by constant and variable forces, work-energy theorem, potential energy, spring elongation, power, and kinetic energy-momentum relations.',
      questions: questionCount,
      duration: '20 min',
      available: true,
      topics: [
        'Dot Product of Vectors',
        'Variable Force Integration',
        'Spring Potential Energy',
        'Work-Energy Theorem',
        'Momentum & Kinetic Energy',
        'Power & Resistive Forces',
      ],
      icon: <Zap size={22} className="text-white" />,
      gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    },
    {
      id: 'laws-of-motion',
      title: 'Laws of Motion',
      classLevel: 'Class 11',
      stream: 'Mechanics',
      description:
        'Newton\'s laws of motion, momentum conservation, free body diagrams, static and kinetic friction, banked tracks, and equilibrium of concurrent forces.',
      questions: 0,
      duration: 'Planned',
      available: false,
      topics: [
        'Newton\'s Three Laws',
        'Free Body Diagrams',
        'Friction on Incline',
        'Equilibrium of Forces',
      ],
      icon: <BookOpen size={22} className="text-slate-400" />,
      gradient: 'from-slate-700 to-slate-800',
    },
    {
      id: 'motion-in-plane',
      title: 'Motion in a Plane',
      classLevel: 'Class 11',
      stream: 'Kinematics',
      description:
        'Scalar and vector quantities, position and displacement vectors, projectile motion equations, trajectory range, and uniform circular motion kinematics.',
      questions: 0,
      duration: 'Planned',
      available: false,
      topics: [
        'Vectors in 2D',
        'Projectile Trajectory',
        'Range & Maximum Height',
        'Uniform Circular Motion',
      ],
      icon: <BookOpen size={22} className="text-slate-400" />,
      gradient: 'from-slate-700 to-slate-800',
    },
    {
      id: 'gravitation',
      title: 'Gravitation',
      classLevel: 'Class 11',
      stream: 'Mechanics',
      description:
        'Universal law of gravitation, variation of acceleration due to gravity with altitude and depth, gravitational potential energy, orbital velocity, and Kepler\'s laws.',
      questions: 0,
      duration: 'Planned',
      available: false,
      topics: [
        'Universal Gravitation',
        'Variation of g with Height',
        'Gravitational Potential',
        'Satellite Velocity & Orbits',
      ],
      icon: <BookOpen size={22} className="text-slate-400" />,
      gradient: 'from-slate-700 to-slate-800',
    },
  ], [questionCount]);

  // Search and filter logic
  const filteredChapters = useMemo(() => {
    return chapters.filter((ch) => {
      // Filter by availability
      if (filterType === 'available' && !ch.available) return false;
      if (filterType === 'upcoming' && ch.available) return false;

      // Filter by search text
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      const inTitle = ch.title.toLowerCase().includes(query);
      const inDesc = ch.description.toLowerCase().includes(query);
      const inTopics = ch.topics.some((t) => t.toLowerCase().includes(query));
      return inTitle || inDesc || inTopics;
    });
  }, [chapters, filterType, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 min-h-screen">
      {/* Header & Breadcrumb */}
      <div className="space-y-3">
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-400" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-200">Syllabus & Courses</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="micro-label">Curriculum Index</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Physics Topics & Question Banks
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              Official chapter-wise practice modules for EAPCET Physics. Questions are extracted verbatim
              from source practice papers with verified step-by-step solutions.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>Strict Verification Guarantee</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-navy-900/90 border border-slate-800 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chapters, concepts, or subtopics (e.g. Work, Vectors, Springs)..."
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-navy-950 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 font-mono text-xs overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              filterType === 'all'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold'
                : 'text-slate-400 hover:text-white bg-navy-950/60 border border-slate-800'
            }`}
          >
            All Chapters ({chapters.length})
          </button>
          <button
            onClick={() => setFilterType('available')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              filterType === 'available'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-white bg-navy-950/60 border border-slate-800'
            }`}
          >
            Available Now (1)
          </button>
          <button
            onClick={() => setFilterType('upcoming')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              filterType === 'upcoming'
                ? 'bg-slate-700/40 text-slate-300 border border-slate-600/40 font-semibold'
                : 'text-slate-400 hover:text-white bg-navy-950/60 border border-slate-800'
            }`}
          >
            Upcoming (3)
          </button>
        </div>
      </div>

      {/* Chapters Cards Grid */}
      {filteredChapters.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredChapters.map((ch) => (
            <div
              key={ch.id}
              className={`card-elevated rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                ch.available
                  ? 'border-slate-700/80 hover:border-cyan-500/40 hover:-translate-y-0.5 shadow-lg'
                  : 'border-slate-850 opacity-60'
              }`}
            >
              <div className="p-6 space-y-4">
                {/* Header row with icon, title, and status badges */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ch.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}
                  >
                    {ch.icon}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {ch.available ? (
                        <span className="badge bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono text-[11px]">
                          ✓ Live & Verified
                        </span>
                      ) : (
                        <span className="badge bg-slate-800 text-slate-400 border border-slate-700 font-mono text-[11px]">
                          <Lock size={10} /> Pending Teacher PDF
                        </span>
                      )}
                      <span className="badge bg-navy-950 text-slate-400 border border-slate-800 font-mono text-[11px]">
                        {ch.classLevel} · {ch.stream}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white tracking-tight">
                      {ch.title}
                    </h2>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {ch.description}
                </p>

                {/* Topics covered pill list */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-slate-500">
                    Syllabus Topics Covered
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {ch.topics.map((t) => (
                      <span
                        key={t}
                        className="badge bg-navy-950 text-slate-400 border border-slate-800 text-xs font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with stats and action button */}
              <div className="p-4 sm:px-6 bg-navy-950/60 border-t border-slate-800/80 flex items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-4 text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={13} className="text-cyan-400" />
                    {ch.available ? (
                      <strong className="text-white">{ch.questions} Questions</strong>
                    ) : (
                      '0 Questions'
                    )}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-indigo-400" />
                    {ch.duration}
                  </span>
                </div>

                {ch.available ? (
                  <Link
                    to={`/courses/chapter/${ch.id}`}
                    className="btn-primary py-2 px-4 text-xs font-mono gap-1.5"
                  >
                    <span>Open Chapter</span>
                    <ChevronRight size={13} />
                  </Link>
                ) : (
                  <span className="text-[11px] text-slate-500 italic">
                    PDF in verification
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="card p-12 text-center space-y-4 max-w-md mx-auto border-dashed border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-slate-800/60 flex items-center justify-center mx-auto text-slate-400">
            <Search size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">No topics match "{searchQuery}"</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try searching for "Work", "Energy", "Vectors", or reset your search query.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterType('all');
            }}
            className="btn-secondary text-xs py-2 px-4"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Curriculum Integrity Callout */}
      <div className="card p-5 sm:p-6 rounded-2xl bg-navy-900/60 border border-slate-800 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
          <ShieldCheck size={20} />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white">
            Teacher-Verified Question Ingestion Pipeline
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            New chapters are published only after questions and diagrams are parsed from original teacher-provided
            PDF question papers, with all answer keys and mathematical derivations independently verified.
          </p>
        </div>
      </div>
    </div>
  );
}
