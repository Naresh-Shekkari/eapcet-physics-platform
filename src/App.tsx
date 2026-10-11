import { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { ChapterPage } from './pages/ChapterPage';
import { QuizPage } from './pages/QuizPage';
import { ResultsPage } from './pages/ResultsPage';
import { QuizReviewPage } from './pages/QuizReviewPage';
import { AboutPage } from './pages/AboutPage';

// Loading fallback
function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    </div>
  );
}

// 404 page
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <p className="text-6xl font-black text-slate-700">404</p>
      <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
      <p className="text-slate-400">This page doesn't exist or has moved.</p>
      <a href="#/" className="btn-primary">Go Home</a>
    </div>
  );
}

export default function App() {
  return (
    // HashRouter for GitHub Pages compatibility (avoids 404 on direct navigation)
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/chapter/work-energy-power" element={<ChapterPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/results/review/:sessionId" element={<QuizReviewPage />} />
              <Route path="/review/:sessionId" element={<QuizReviewPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-700/50 py-6 text-center text-sm text-slate-500 px-4">
          <p>PhysicsEdge — EAPCET Physics Preparation Platform</p>
          <p className="text-xs mt-1">All questions verified from official source PDFs. No content is fabricated.</p>
        </footer>
      </div>
    </HashRouter>
  );
}
