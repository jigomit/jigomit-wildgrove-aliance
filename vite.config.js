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
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        dead_code: true,
        unused: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        if_return: true,
        join_vars: true,
        collapse_vars: true,
        reduce_vars: true
      },
      mangle: {
        safari10: true,
        toplevel: true
      },
      format: {
        comments: false,
        ecma: 2020
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Keep Vue core minimal and separate
            if (id.includes('vue') && !id.includes('vue-router') && !id.includes('@vueuse')) {
              return 'vue-core'
            }
            if (id.includes('vue-router')) {
              return 'vue-router'
            }
            // GSAP is loaded lazily, keep it separate
            if (id.includes('gsap')) {
              return 'gsap'
            }
            // VueUse is loaded on demand
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
      polyfill: false,
      resolveDependencies: (filename, deps) => {
        // Only preload critical chunks for initial render
        return deps.filter(dep =>
          dep.includes('vue-core') ||
          dep.includes('vue-router') ||
          dep.includes('index') ||
          dep.includes('HomePage')
        )
      }
    },
    assetsInlineLimit: 8192,
    reportCompressedSize: false
  },
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['gsap', '@vueuse/core']
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
