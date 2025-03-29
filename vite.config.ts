import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: 'jsdom',
  },
  build: {
    rollupOptions: {
      input: {
        background: 'src/background.ts'
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  },
})
