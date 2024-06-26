import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{ 
    host: true,
    port: 3000,
    proxy: {
      '/api/':{
        target:'http://localhost:8080',
      },
    },
    watch: {
    usePolling: true
}
  },
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
        input: {
            main: './index.html',
        },
    },
},
})
