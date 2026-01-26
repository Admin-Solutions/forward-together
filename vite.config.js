import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    // Extract CSS to separate file
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // IIFE format - works with regular <script> tag (no module required)
        format: 'iife',
        entryFileNames: 'assets/app.js',
        assetFileNames: 'assets/[name].[ext]',
        inlineDynamicImports: true
      }
    }
  }
})
