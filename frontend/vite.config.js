import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/pdf-utility/', // ← 👈 important!
  plugins: [react()],
  server: {
  proxy: {
    '/api': 'https://pdf-utility-qldt.onrender.com',
  },
}
});
