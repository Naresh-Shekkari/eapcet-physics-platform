import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  ArrowRight,
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  BarChart2,
} from 'lucide-react';
import { getQuestionCount } from '../services/questionBank';
import { loadResultsList } from '../services/quizPersistence';
import { formatDuration } from '../services/quizScoring';
import { PhysicsHeroInteractive } from '../components/PhysicsHeroInteractive';

// ============================================================
// Home Page — PhysicsEdge Premium UI
// ============================================================

export function HomePage() {
  const questionCount = getQuestionCount();
  const recentResults = loadResultsList().slice(0, 3);

  const physicsTopicsPills = [
    'Dot Product of Vectors',
    'Work by Variable Force: W = ∫ F · dx',
    'Work-Energy Theorem: W = ΔK',
    'Spring Potential Energy: U = ½kx²',
    'Conservation of Mechanical Energy',
    'Kinetic Energy & Momentum: K = p²/2m',
    'Power & Resistive Forces: P = F · v',
    'Lifting in Viscous Fluids',
    'Angle between Vectors: cos θ = (A · B) / (|A||B|)',
  ];

  return (
    <div className="min-h-screen space-y-16 sm:space-y-24 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-20">
        {/* Ambient background glow and grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left: Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Micro-label pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-slate-700/80 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-300 font-semibold">
                  EAPCET Physics Preparation Platform
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Master Physics.{' '}
                <span className="text-gradient-cyan block mt-1">
                  Practice Smarter.
                </span>{' '}
                Aim Higher.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Build your EAPCET Physics confidence through focused chapter practice,
                rigorous 60-second timed questions, and authentic teacher-verified solutions.
                Zero simulated fluff — 100% curriculum aligned.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/courses/chapter/work-energy-power"
                  className="btn-primary text-sm sm:text-base py-3 px-6 gap-2.5 shadow-lg shadow-cyan-950/50"
                >
                  <Zap size={18} />
                  <span>Start Practising Now</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/courses"
                  className="btn-secondary text-sm sm:text-base py-3 px-5 gap-2"
                >
                  <BookOpen size={16} className="text-cyan-400" />
                  <span>Explore Physics Topics</span>
                </Link>
              </div>

              {/* Key Platform Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-800/80 font-mono text-left">
                <HeroStatItem
                  icon={<BookOpen size={16} className="text-cyan-400" />}
                  value={`${questionCount}`}
                  label="Verified MCQs"
                />
                <HeroStatItem
                  icon={<Clock size={16} className="text-indigo-400" />}
                  value="60s / Q"
                  label="Exam Timer"
                />
                <HeroStatItem
                  icon={<ShieldCheck size={16} className="text-emerald-400" />}
                  value="PDF Source"
                  label="Verified Solutions"
                />
                <HeroStatItem
                  icon={<Award size={16} className="text-amber-400" />}
                  value="100% Free"
                  label="No Account Needed"
                />
              </div>
            </div>

            {/* Right: Live Interactive Problem Chrome */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <PhysicsHeroInteractive />
            </div>
          </div>
        </div>
      </section>

      {/* Physics Topic Marquee / Running Ticker */}
      <section className="border-y border-slate-800/80 bg-navy-900/60 py-3.5 overflow-hidden select-none" aria-hidden="true">
        <div className="flex w-[200%] animate-marquee gap-8 whitespace-nowrap font-mono text-xs text-slate-400">
          {[...physicsTopicsPills, ...physicsTopicsPills].map((topic, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <span className="text-cyan-400 font-bold">$</span>
              <span className="text-slate-300 font-medium hover:text-white transition-colors">{topic}</span>
              <span className="text-slate-600 ml-4">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* Featured Learning Chapter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-6">
          <div>
            <span className="micro-label">Active Question Bank</span>
            <h2 className="section-heading mt-1">Featured Physics Chapter</h2>
          </div>
          <Link to="/courses" className="text-sm font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group">
            Browse All Chapters <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Featured Chapter Card */}
        <div className="card-elevated p-6 sm:p-8 rounded-2xl border border-slate-700/80 hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative">
            <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-950/40">
                <Zap size={28} className="text-white" />
              </div>

              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="badge bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono text-xs">
                    ✓ Verified Question Bank Active
                  </span>
                  <span className="badge bg-navy-950 text-slate-300 border border-slate-700/80 font-mono text-xs">
                    Class 11 Mechanics
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Work, Energy and Power
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Comprehensive mastery of dot product of vectors, constant and variable force integrals,
                  work-energy theorem, spring potential energy, power, and linear momentum relations with {questionCount} verified EAPCET MCQs.
                </p>

                {/* Topic tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Vectors & Dot Product', 'Variable Force', 'Work-Energy Theorem', 'Spring PE', 'Momentum-KE', 'Power'].map(tag => (
                    <span key={tag} className="badge bg-navy-950 text-slate-300 border border-slate-800 text-[11px] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick action block on right */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-800 pt-4 lg:pt-0 lg:pl-6">
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <BookOpen size={14} className="text-cyan-400" />
                  <span><strong className="text-white">{questionCount}</strong> MCQs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-indigo-400" />
                  <span>20 Mins Session</span>
                </div>
              </div>

              <Link
                to="/courses/chapter/work-energy-power"
                className="btn-primary py-3 px-6 text-sm text-center justify-center gap-2"
              >
                <span>Launch Quiz Set</span>
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Preparation Paths (Inspired by escbash Guided Paths) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div>
          <span className="micro-label">Guided Roadmaps</span>
          <h2 className="section-heading mt-1">Structured Practice Tracks</h2>
          <p className="text-slate-400 text-sm max-w-xl mt-1">
            Choose the mode that fits your current exam preparation phase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Path 1: Standard Practice */}
          <div className="card p-6 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <BookOpen size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Concept Practice Mode</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Work through the complete verified 20-question bank. Navigate freely, bookmark tricky questions, and study complete step-by-step solutions after submission.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">20 Questions · 20 min</span>
              <Link to="/quiz?mode=practice" className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1">
                Start Track →
              </Link>
            </div>
          </div>

          {/* Path 2: Exam Speed Simulation */}
          <div className="card p-6 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <Clock size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Timed Pace Training</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Enforces strict 60-second question pacing with a circular countdown. Trains instinctive question recognition under true EAPCET exam time limits.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">60s / Q · Auto-advance</span>
              <Link to="/courses/chapter/work-energy-power" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">
                View Details →
              </Link>
            </div>
          </div>

          {/* Path 3: Theory & PDF Papers */}
          <div className="card p-6 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <FileText size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Source Papers & Theory</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Direct access to the complete chapter theory guide, core formulas cheatsheet, and the original official PDF paper with teacher verification notes.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">PDF + Markdown Guide</span>
              <Link to="/courses/chapter/work-energy-power" className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
                Open Materials →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Physics Topic Explorer (Mini Grid like escbash ld-minis) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
          <div>
            <span className="micro-label">Syllabus Matrix</span>
            <h2 className="section-heading mt-1">Physics Topic Modules</h2>
          </div>
          <Link to="/courses" className="text-xs font-mono text-cyan-400 hover:text-cyan-300">
            View Syllabus Catalogue →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { name: 'Dot Product of Vectors', questions: 3, live: true, tag: 'High Yield' },
            { name: 'Work by Variable Force', questions: 3, live: true, tag: 'Calculus' },
            { name: 'Work-Energy Theorem', questions: 4, live: true, tag: 'Core Theory' },
            { name: 'Spring Potential Energy', questions: 3, live: true, tag: 'Conservation' },
            { name: 'Kinetic Energy & Momentum', questions: 3, live: true, tag: 'Relations' },
            { name: 'Power & Resistive Forces', questions: 2, live: true, tag: 'Applied' },
            { name: 'Fluid Lifting & Viscosity', questions: 2, live: true, tag: 'Special Case' },
            { name: 'Laws of Motion', questions: 0, live: false, tag: 'Syllabus Ch 2' },
            { name: 'Motion in a Plane', questions: 0, live: false, tag: 'Syllabus Ch 3' },
            { name: 'Gravitation & Orbits', questions: 0, live: false, tag: 'Syllabus Ch 4' },
            { name: 'Thermodynamics', questions: 0, live: false, tag: 'Syllabus Ch 5' },
            { name: 'Oscillations & Waves', questions: 0, live: false, tag: 'Syllabus Ch 6' },
          ].map((topic) => (
            <div
              key={topic.name}
              className={`p-4 rounded-xl border transition-all ${
                topic.live
                  ? 'bg-navy-900 border-slate-800 hover:border-slate-700 hover:bg-navy-850'
                  : 'bg-navy-950/40 border-slate-900 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                  topic.live
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                    : 'bg-slate-800 text-slate-500 border-slate-700'
                }`}>
                  {topic.tag}
                </span>
                {topic.live ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                ) : (
                  <span className="text-[10px] text-slate-600 font-mono">Planned</span>
                )}
              </div>
              <p className="text-sm font-semibold text-white truncate" title={topic.name}>
                {topic.name}
              </p>
              <p className="text-xs font-mono text-slate-400 mt-1">
                {topic.live ? `${topic.questions} MCQs Available` : 'Awaiting Teacher PDF'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Workflow (4-Step Visual Engine) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="card-elevated p-8 rounded-2xl border border-slate-800 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="micro-label">The Practice Engine</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How PhysicsEdge Prepares You
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              A systematic four-phase cycle engineered for score maximization on exam day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Review Concepts',
                desc: 'Study chapter guide notes and vector formulas before testing.',
                icon: <BookOpen size={18} className="text-cyan-400" />,
              },
              {
                step: '02',
                title: 'Timed Simulation',
                desc: '60s circular countdown per question with automated submission.',
                icon: <Clock size={18} className="text-indigo-400" />,
              },
              {
                step: '03',
                title: 'Detailed Solutions',
                desc: 'Inspect step-by-step mathematical solutions and official answer keys.',
                icon: <CheckCircle2 size={18} className="text-emerald-400" />,
              },
              {
                step: '04',
                title: 'Mastery & Retake',
                desc: 'Target incorrect problems and re-attempt to solidify intuition.',
                icon: <TrendingUp size={18} className="text-amber-400" />,
              },
            ].map((st) => (
              <div key={st.step} className="p-4 rounded-xl bg-navy-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500 font-bold">STEP {st.step}</span>
                  {st.icon}
                </div>
                <h4 className="text-sm font-bold text-white">{st.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Results History or First-Time Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        {recentResults.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="micro-label">Your Activity</span>
                <h2 className="text-xl font-bold text-white">Recent Quiz Attempts</h2>
              </div>
              <Link to="/results" className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                View Full History <ChevronRight size={13} />
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentResults.map((r) => (
                <div
                  key={r.id}
                  className="card p-4 rounded-xl flex items-center justify-between gap-4 font-mono text-xs hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        r.accuracyPercent >= 70
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {Math.round(r.accuracyPercent)}%
                    </div>
                    <div>
                      <p className="text-sm font-sans font-bold text-white">{r.chapter}</p>
                      <p className="text-slate-400 text-[11px]">
                        {r.correct}/{r.totalQuestions} Correct · {formatDuration(r.timeTakenMs)} duration ·{' '}
                        {new Date(r.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/results"
                    className="btn-secondary py-1.5 px-3 text-xs"
                  >
                    Review Attempt
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="card p-8 rounded-2xl border-dashed border-slate-800 text-center space-y-4 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-400">
              <BarChart2 size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">No attempts recorded yet</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Launch your first timed test to evaluate your accuracy and save your progress locally.
              </p>
            </div>
            <Link to="/courses/chapter/work-energy-power" className="btn-primary py-2.5 px-5 text-xs inline-flex">
              Begin Diagnostic Quiz
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

function HeroStatItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="p-3 rounded-xl bg-navy-900/60 border border-slate-800/80">
      <div className="mb-1">{icon}</div>
      <p className="text-base font-bold text-white leading-tight">{value}</p>
      <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{label}</p>
    </div>
  );
}
