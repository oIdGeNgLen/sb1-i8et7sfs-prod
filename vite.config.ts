import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: mode === 'ssr' ? 'dist/server' : 'dist/client',
    ssr: mode === 'ssr' ? resolve(__dirname, 'src/entry-server.tsx') : false,
  },
  server: {
    historyApiFallback: true
  },
  preview: {
    port: 3000
  }
}));