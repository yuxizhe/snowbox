import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
  plugins: [react()],
});
