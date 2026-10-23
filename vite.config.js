import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Forward payment API calls to the small Express server in /server
    proxy: {
      '/api': 'http://localhost:4242',
    },
  },
})
