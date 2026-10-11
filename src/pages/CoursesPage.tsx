import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Lock, Zap, Clock } from 'lucide-react';
import { getQuestionCount } from '../services/questionBank';

// ============================================================
// Courses Page
// ============================================================

export function CoursesPage() {
  const questionCount = getQuestionCount();

  const chapters = [
    {
      id: 'work-energy-power',
      title: 'Work, Energy and Power',
      description: 'Dot product of vectors, work by constant and variable forces, work-energy theorem, potential energy, springs, power, and momentum-KE relations.',
      questions: questionCount,
      available: true,
      topics: ['Work & Dot Product', 'Variable Force Integration', 'Spring PE', 'Work-Energy Theorem', 'KE & Momentum'],
      icon: <Zap size={20} />,
      color: 'from-indigo-600 to-violet-600',
    },
    {
      id: 'laws-of-motion',
      title: 'Laws of Motion',
      description: 'Newton\'s laws, free body diagrams, friction, equilibrium, and applications.',
      questions: 0,
      available: false,
      topics: ['Newton\'s Laws', 'Friction', 'Equilibrium'],
      icon: <BookOpen size={20} />,
      color: 'from-slate-600 to-slate-700',
    },
    {
      id: 'motion-in-plane',
      title: 'Motion in a Plane',
      description: 'Projectile motion, circular motion, relative velocity.',
      questions: 0,
      available: false,
      topics: ['Projectile Motion', 'Circular Motion'],
      icon: <BookOpen size={20} />,
      color: 'from-slate-600 to-slate-700',
    },
    {
      id: 'gravitation',
      title: 'Gravitation',
      description: 'Universal law of gravitation, gravitational potential, satellites, Kepler\'s laws.',
      questions: 0,
      available: false,
      topics: ['Gravity', 'Satellites', 'Kepler\'s Laws'],
      icon: <BookOpen size={20} />,
      color: 'from-slate-600 to-slate-700',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <p className="label-sm text-indigo-400">Courses</p>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Physics Courses</h1>
        <p className="text-slate-400 max-w-xl">
          EAPCET-aligned chapter-wise practice sets with verified MCQs and detailed solutions.
          New chapters will be added as verified question banks become available.
        </p>
      </div>

      {/* Chapters */}
      <div className="grid sm:grid-cols-2 gap-4">
        {chapters.map(ch => (
          <div
            key={ch.id}
            className={`card-elevated rounded-2xl overflow-hidden transition-all duration-200 ${
              ch.available ? 'hover:border-indigo-500/40 hover:-translate-y-0.5' : 'opacity-60'
            }`}
          >
            <div className="p-5 space-y-3">
              {/* Title row */}
              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${ch.color} flex items-center justify-center text-white flex-shrink-0`}>
                  {ch.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {ch.available ? (
                      <span className="badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Available</span>
                    ) : (
                      <span className="badge bg-slate-500/15 text-slate-400 border border-slate-500/20">
                        <Lock size={10} /> Coming Soon
                      </span>
                    )}
                  </div>
                  <h2 className="text-base font-bold text-white leading-tight">{ch.title}</h2>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed">{ch.description}</p>

              {/* Topics */}
              <div className="flex flex-wrap gap-1.5">
                {ch.topics.map(t => (
                  <span key={t} className="badge bg-navy-900 text-slate-500 border border-slate-600/20 text-xs">{t}</span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-700/40">
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={13} className="text-indigo-400" />
                    {ch.available ? `${ch.questions} questions` : 'No questions yet'}
                  </span>
                  {ch.available && (
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-indigo-400" />
                      20 min
                    </span>
                  )}
                </div>

                {ch.available ? (
                  <Link
                    to={`/courses/chapter/${ch.id}`}
                    className="btn-primary py-2 px-4 text-sm"
                  >
                    Open <ChevronRight size={13} />
                  </Link>
                ) : (
                  <span className="text-xs text-slate-500 italic">Not yet available</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info note */}
      <div className="card p-4 border-dashed border-slate-600/40 flex gap-3">
        <div className="text-indigo-400 mt-0.5 flex-shrink-0">
          <BookOpen size={16} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-300">Adding more chapters</p>
          <p className="text-sm text-slate-500 mt-0.5">
            New chapters become available when the teacher uploads verified PDF question banks.
            Each question is manually verified before publication to ensure accuracy.
          </p>
        </div>
      </div>
    </div>
  );
}
