import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronRight, BookOpen, Target, Clock, TrendingUp, Award } from 'lucide-react';
import { getQuestionCount, getQuestionBankMeta } from '../services/questionBank';
import { loadResultsList } from '../services/quizPersistence';
import { formatDuration } from '../services/quizScoring';

// ============================================================
// Home Page
// ============================================================

export function HomePage() {
  const questionCount = getQuestionCount();
  const meta = getQuestionBankMeta();
  const recentResults = loadResultsList().slice(0, 3);

  return (
    <div className="min-h-screen space-y-16 pb-20">
      {/* Hero */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute -top-20 right-0 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6">
              <Zap size={14} />
              EAPCET Physics Preparation Platform
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Master Physics{' '}
              <span className="text-gradient">Chapter by Chapter</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-2xl">
              Practice verified MCQs from EAPCET syllabus with timed quizzes, instant feedback,
              and detailed explanations — built for serious exam preparation.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/courses/chapter/work-energy-power" className="btn-primary gap-2">
                Start Practice <ChevronRight size={16} />
              </Link>
              <Link to="/courses" className="btn-secondary">
                Browse Courses
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-slate-700/40">
              <StatItem icon={<BookOpen size={15} />} value={`${questionCount}`} label="Verified Questions" />
              <StatItem icon={<Target size={15} />} value="1" label="Chapter Available" />
              <StatItem icon={<Clock size={15} />} value="60s" label="Per Question Timer" />
              <StatItem icon={<Award size={15} />} value="Free" label="No Login Required" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Chapter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-heading">Featured Chapter</h2>
          <Link to="/courses" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            All courses <ChevronRight size={14} />
          </Link>
        </div>

        <div className="card-elevated p-6 rounded-2xl max-w-2xl group hover:border-indigo-500/40 transition-colors duration-300">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Zap size={24} className="text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Available</span>
                <span className="badge bg-navy-900 text-slate-400 border border-slate-600/30">Physics · Class 11</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Work, Energy and Power</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Master concepts of work done by constant and variable forces, kinetic and potential energy,
                conservation of energy, power, springs, and vector operations — all with {questionCount} verified EAPCET MCQs.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {['Dot Product', 'Work-Energy Theorem', 'Spring PE', 'Variable Force', 'Momentum-KE'].map(tag => (
                  <span key={tag} className="badge bg-navy-900 text-slate-400 border border-slate-600/30">{tag}</span>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <BookOpen size={13} className="text-indigo-400" /> {questionCount} questions
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-indigo-400" /> 20 min practice
                </span>
              </div>

              <Link
                to="/courses/chapter/work-energy-power"
                className="btn-primary inline-flex py-2.5 px-5 text-sm"
              >
                Start Practice <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="section-heading mb-8">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              step: '01',
              icon: <BookOpen size={20} />,
              title: 'Choose a Chapter',
              desc: 'Browse the course catalogue and open a chapter with verified MCQs.',
              color: 'from-indigo-600 to-indigo-700',
            },
            {
              step: '02',
              icon: <Clock size={20} />,
              title: 'Attempt Timed Quiz',
              desc: '60 seconds per question with a circular countdown. Auto-advances if time runs out.',
              color: 'from-violet-600 to-violet-700',
            },
            {
              step: '03',
              icon: <TrendingUp size={20} />,
              title: 'Review Detailed Report',
              desc: 'See correct answers, your choices, and full step-by-step explanations for every question.',
              color: 'from-cyan-600 to-teal-600',
            },
          ].map(item => (
            <div key={item.step} className="card p-5 space-y-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white`}>
                {item.icon}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 tracking-widest">STEP {item.step}</span>
                <h3 className="text-base font-semibold text-white mt-0.5">{item.title}</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent results */}
      {recentResults.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-heading">Recent Results</h2>
            <Link to="/results" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentResults.map(r => (
              <div key={r.id} className="card p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                  r.accuracyPercent >= 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {Math.round(r.accuracyPercent)}%
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{r.chapter}</p>
                  <p className="text-xs text-slate-400">
                    {r.correct}/{r.totalQuestions} correct · {formatDuration(r.timeTakenMs)} ·{' '}
                    {new Date(r.completedAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="badge bg-navy-800 text-slate-400 border border-slate-600/30">
                  {r.mode === 'exam' ? 'Exam' : 'Practice'}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* First-time onboarding if no results */}
      {recentResults.length === 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="card p-8 text-center space-y-4 border-dashed border-slate-600/40">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mx-auto">
              <Target size={28} className="text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white">No results yet</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Start your first practice set to track your progress. Your quiz history will appear here.
            </p>
            <Link to="/courses/chapter/work-energy-power" className="btn-primary inline-flex mx-auto">
              Start Your First Quiz
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

function StatItem({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-400">
      <span className="text-indigo-400">{icon}</span>
      <span className="text-white font-bold">{value}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
}
