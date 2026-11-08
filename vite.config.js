import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BASE_PATH lets the same build serve from a sub-path (e.g. GitHub Pages: BASE_PATH=/pixels-to-production/)
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  define: { __BUILD_TIME__: JSON.stringify(new Date().toISOString()) },
  build: { target: 'es2020', cssCodeSplit: false },
});
