import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/rental-hub/',
  plugins: [react(),tailwindcss()],
  server: {
    open: '/rental-hub/'
  }
})
