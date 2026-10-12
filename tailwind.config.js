/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060a14',
          900: '#0a1224',
          850: '#0f1a33',
          800: '#142242',
          700: '#1c2e56',
          600: '#273f73',
          500: '#3b5a9b',
        },
        slate: {
          850: '#151f33',
        },
        cyan: {
          450: '#14c3e8',
        },
        brand: {
          primary: '#3b82f6',   // blue-500
          indigo: '#6366f1',    // indigo-500
          violet: '#8b5cf6',    // violet-500
          accent: '#06b6d4',    // cyan-500
          electric: '#38bdf8',  // sky-400
          success: '#10b981',   // emerald-500
          warning: '#f59e0b',   // amber-500
          danger: '#ef4444',    // red-500
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
