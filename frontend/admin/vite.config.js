// frontend/admin/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // All requests starting with /api will be proxied to your backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // Optional: rewrite path (removes /api prefix if needed)
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
})