import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: ['**/*.js', '**/*.jsx'], // Allow JSX in .js files
    }),
  ],
  esbuild: {
    loader: 'jsx', // Treat .js as JSX
  },
  server: {
    proxy: { '/api': 'http://localhost:4000' },
    hmr: { overlay: false }, // Disable error overlay if needed
  },
});