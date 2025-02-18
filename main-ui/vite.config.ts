import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
export const pathResolve = (dir: string) => resolve(process.cwd(), '.', dir);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5175,
    host: '0.0.0.0',
    proxy: {
      // 到网关
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },

      // 到用户服务
      // '/api/v1/users': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,
      //   // 截取掉 /api/v1
      //   rewrite: (path) => path.replace(/^\/api\/v1/, ''),
      // },
    },
  },
  build: {
    outDir: 'uno-admin',
  },
  resolve: {
    alias: {
      '@': pathResolve('src'),
    },
  },
});
