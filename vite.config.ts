import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Adjust this base path if you are deploying to a subdirectory 
  // (e.g., '/my-repo-name/' for GitHub Pages)
  base: '/Sommelier-companion/',
  plugins: [react()],
})
