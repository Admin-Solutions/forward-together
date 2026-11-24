import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    // vite 5's old default browser target (Safari 14 / Chrome 87), the same as nexus-ui's BUILD_TARGET;
    // vite 7's default (baseline-widely-available) would emit newer syntax
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
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
