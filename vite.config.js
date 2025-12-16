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
        drop_debugger: true,
        passes: 2,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue-router')) {
              return 'vendor'
            }
            if (id.includes('vue')) {
              return 'vendor'
            }
            if (id.includes('gsap')) {
              return 'gsap'
            }
            if (id.includes('@vueuse')) {
              return 'vueuse'
            }
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    modulePreload: {
      polyfill: true
    },
    assetsInlineLimit: 4096
  },
  optimizeDeps: {
    include: ['vue', 'vue-router']
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173
  },
  css: {
    devSourcemap: false
  }
})
