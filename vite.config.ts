import vue from '@vitejs/plugin-vue'
import path from 'path'

export default {
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        'feature-flow': 'feature-flow.html'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'node-fetch': 'isomorphic-fetch'
    }
  }
}
