import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path       from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  base: 'https://Pabloleiva00.github.io/web_T3/',
  optimizeDeps: {
    force: true,                
    exclude: ['vuetify'],      
  }
})