import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { comlink } from 'vite-plugin-comlink'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [comlink(), vue(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        'pull-system': 'pull-system.html',
        'team-leader': 'team-leader.html',
        '5s': '5s.html',
        heijunka: 'heijunka.html'
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
