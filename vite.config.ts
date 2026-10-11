import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Set base to './' for GitHub Pages compatibility with hash routing
export default defineConfig({
  plugins: [react()],
  base: './',
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
