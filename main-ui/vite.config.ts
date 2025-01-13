import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
export const pathResolve = (dir: string) => resolve(process.cwd(), '.', dir);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
  },
  resolve: {
    alias: {
      '@': pathResolve('src'),
    },
  },
});
