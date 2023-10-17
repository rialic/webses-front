import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'
import * as path from 'path'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  server: {
    host: true,
    port: 3000,
    https: {
      key: './.certs/webses-key.pem',
      cert: './.certs/webses.pem'
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    basicSsl(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['nprogress-container'].includes(tag)
        }
      }
    })
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({})
      ],
    }
  }
})