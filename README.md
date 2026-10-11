# PhysicsEdge — EAPCET Physics Platform

A premium, static, open-source practice platform for EAPCET Physics. Timed MCQ quizzes with circular countdown timers, detailed answer explanations, and a responsive UI. Built with React + TypeScript + Vite + Tailwind CSS.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org))
- npm 9+

### Install and run

```bash
# Clone the repository
git clone https://github.com/<your-username>/eapcet-physics-platform.git
cd eapcet-physics-platform

# Install dependencies
npm install

# Start the development server
npm run dev
# Open http://localhost:5505
```

---

## 📦 Build for Production

```bash
npm run build
# Output is in the dist/ directory
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deploy to GitHub Pages

### Option A — Automatic (Recommended)

1. Push the repository to GitHub.
2. Go to **Settings → Pages → Build and deployment**.
3. Set **Source** to **GitHub Actions**.
4. The included `.github/workflows/deploy.yml` will build and deploy automatically on every push to `main`.

Your site will be available at:
```
https://<your-username>.github.io/eapcet-physics-platform/
```

> **Note:** The app uses `HashRouter` so all routes work on GitHub Pages without a `404.html` workaround.

### Option B — Manual

```bash
npm run build
# Then upload the contents of the dist/ folder to any static host.
```

---

## 📁 Project Structure

```
eapcet-physics-platform/
├── public/
│   ├── mcqs/                                ← Dedicated folder for MCQ practice PDFs ONLY
│   │   ├── README.md
│   │   └── work-energy-power-mcq-practice.pdf
│   └── courses/                             ← Dedicated folder for Complete Course Materials & Theory
│       ├── README.md
│       └── work-energy-power/
│           └── work-energy-power-complete-guide.md
├── src/
│   ├── components/
│   │   ├── CircularTimer.tsx        ← SVG countdown ring
│   │   ├── Navbar.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── QuestionCard.tsx         ← Question + answer options
│   │   ├── QuestionNavigator.tsx    ← Question grid navigation
│   │   ├── QuizInstructions.tsx     ← Pre-quiz dialog
│   │   └── ResultsSummary.tsx       ← Detailed results + explanations
│   ├── data/
│   │   └── work-energy-power-questions.json  ← Verified question bank
│   ├── hooks/
│   │   └── useQuizEngine.ts         ← Core quiz state manager
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── CoursesPage.tsx
│   │   ├── ChapterPage.tsx
│   │   ├── QuizPage.tsx
│   │   ├── ResultsPage.tsx
│   │   └── AboutPage.tsx
│   ├── services/
│   │   ├── questionBank.ts          ← Question loading + validation
│   │   ├── quizScoring.ts           ← Score calculation
│   │   └── quizPersistence.ts       ← localStorage persistence
│   ├── types/
│   │   └── quiz.ts                  ← TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .github/workflows/deploy.yml
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 📚 Where to Keep Course Content Files

1. **Course Learning Materials (Theory, Formulas, Notes, Roadmaps)**:
   Keep them in:
   ```
   public/courses/<chapter-name>/
   ```
   Example:
   ```
   public/courses/work-energy-power/work-energy-power-theory-notes.pdf
   public/courses/work-energy-power/formula-sheet.pdf
   ```
   Any file placed here will automatically be available to users at:
   `https://<your-username>.github.io/eapcet-physics-platform/courses/<chapter-name>/<file>`

2. **MCQ Practice PDFs (Practice Questions, Test Papers, Answer Keys)**:
   Keep them in:
   ```
   public/mcqs/
   ```
   Example:
   ```
   public/mcqs/work-energy-power-mcq-practice.pdf
   ```

---

## ➕ Adding More Question Banks (Future Chapters)

To add a new chapter:

1. **Place the MCQ PDF** in `public/mcqs/`:
   ```
   public/mcqs/laws-of-motion-mcq-practice.pdf
   ```

2. **Place the Course Theory Notes** in `public/courses/`:
   ```
   public/courses/laws-of-motion/theory-notes.pdf
   ```

3. **Create a JSON question bank** at:
   ```
   src/data/laws-of-motion-questions.json
   ```
   Follow the same structure as `work-energy-power-questions.json`.  
   Every question must include: `id`, `question_text`, four `options`, `correct_option_id`, and `explanation`.

4. **Register the chapter** in:
   - `src/services/questionBank.ts` — import and expose the new bank
   - `src/pages/CoursesPage.tsx` — add the chapter card
   - `src/App.tsx` — add a route if a separate chapter page is needed

5. **Verify** the question bank loads correctly:
   - The validation service checks for duplicate IDs, missing options, and invalid correct answers.
   - Any validation errors are displayed on the chapter page.

---

## 📋 Quiz Modes

| Mode | Questions | Total Time | Per Question |
|------|-----------|------------|--------------|
| Full Practice Set | 20 (all available) | 20 minutes | 60 seconds |
| Exam Mode | 25 (requires 25+ questions) | 25 minutes | 60 seconds |

> **Exam Mode** is automatically unlocked once the verified question bank contains ≥ 25 distinct questions.

---

## 🔒 Content Policy

All questions are extracted verbatim from teacher-provided PDF source files. No questions, options, answers, or explanations are invented, generated by AI, or sourced from the internet. Questions flagged for manual review are marked with a ⚠️ badge.

---

## 🛠 Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** (build tool)
- **Tailwind CSS 3** (styling)
- **React Router v7** (client-side routing with HashRouter)
- **Lucide React** (icons)
- **localStorage** (quiz persistence — no backend required)

---

## 📄 License

MIT — free to use, modify, and distribute.
