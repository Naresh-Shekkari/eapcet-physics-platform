import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Set base to './' for GitHub Pages compatibility with hash routing
export default defineConfig({
  plugins: [react()],
  // Repository path on GitHub Actions, relative locally for Live Server
  base: process.env.GITHUB_ACTIONS ? '/eapcet-physics-platform/' : './',
  server: {
    port: 5505,
  },
  preview: {
    port: 5505,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
