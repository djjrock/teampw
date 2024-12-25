import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@headlessui/react', 'clsx', 'tailwind-merge', 'react-dropzone'],
    exclude: ['lucide-react']
  },
  resolve: {
    alias: {
      'react': 'react',
      'react-dom': 'react-dom',
    },
  },
});
