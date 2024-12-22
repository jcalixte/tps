import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { comlink } from 'vite-plugin-comlink'

export default defineConfig({
  plugins: [comlink(), vue()],
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        'pull-system': 'pull-system.html',
        '5s': '5s.html'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'node-fetch': 'isomorphic-fetch'
    }
  },
  worker: {
    plugins: () => [comlink()]
  }
})
