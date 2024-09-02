import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@apis', replacement: '/src/apis' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@components', replacement: '/src/components' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@json', replacement: '/src/json' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@types', replacement: '/src/types' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@', replacement: '/src' },
    ],
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://openapi.koreainvestment.com:9443',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
