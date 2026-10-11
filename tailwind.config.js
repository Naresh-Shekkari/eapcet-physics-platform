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
          950: '#040d21',
          900: '#0a1628',
          800: '#0f2040',
          700: '#162b55',
          600: '#1e3a6e',
        },
        indigo: {
          950: '#1e1b4b',
        },
        brand: {
          primary: '#6366f1',   // indigo-500
          secondary: '#8b5cf6', // violet-500
          accent: '#06b6d4',    // cyan-500
          teal: '#14b8a6',      // teal-500
          success: '#10b981',   // emerald-500
          warning: '#f59e0b',   // amber-500
          danger: '#ef4444',    // red-500
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
