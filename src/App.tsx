import { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { ChapterPage } from './pages/ChapterPage';
import { QuizPage } from './pages/QuizPage';
import { ResultsPage } from './pages/ResultsPage';
import { AboutPage } from './pages/AboutPage';

// Loading fallback
function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-mono text-slate-400">Loading module...</p>
      </div>
    </div>
  );
}

// 404 page
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <p className="text-6xl font-black font-mono text-slate-700">404</p>
      <h1 className="text-2xl font-bold text-white">Module Not Found</h1>
      <p className="text-slate-400 text-sm">This page doesn't exist or has moved in the catalogue.</p>
      <a href="#/" className="btn-primary text-xs py-2.5 px-5">Return to Home</a>
    </div>
  );
}

export default function App() {
  return (
    // HashRouter for GitHub Pages compatibility (avoids 404 on direct navigation)
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-navy-950 text-slate-100">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/chapter/work-energy-power" element={<ChapterPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
