import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    open: true,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
