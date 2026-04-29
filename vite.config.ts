import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vue ecosystem - separate chunk for framework and related packages
          if (id.includes('vue') || id.includes('@vue')) return 'vendor-vue'
          
          // Other node_modules dependencies
          if (id.includes('node_modules')) return 'vendor-lib'
        }
      }
    },
    // Enable code splitting cache and set warning threshold
    chunkSizeWarningLimit: 200,
  }
})
