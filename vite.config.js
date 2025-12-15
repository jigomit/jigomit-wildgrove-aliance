import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router'],
          'gsap': ['gsap'],
          'vueuse': ['@vueuse/core']
        }
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 500
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'gsap', '@vueuse/core']
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173
  }
})
