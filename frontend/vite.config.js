import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      // setup the plugin to run on save and include all .js and .jsx files in the src directory and subdirectories but exclude the node_modules directory and its subdirectories from linting checks
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: [],
    }),
  ],
  server: {
    // proxy requests prefixed '/api' and '/uploads' to the backend server running on http://localhost:5000 and http://localhost:5000 respectively during development mode only (when running npm run dev)
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
});