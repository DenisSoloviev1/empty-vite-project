import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

const env = loadEnv('development', process.cwd(), '');

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
    allowedHosts: [
      env.VITE_PUBLIC_URL || 'hub-server.front.bmd.su',
      'localhost',
      '127.0.0.1',
    ],
    cors: {
      origin: true, // Разрешить все origins в разработке
      credentials: true, // Разрешить куки
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
    allowedHosts: [
      env.VITE_PUBLIC_URL || 'hub-server.front.bmd.su',
      'localhost',
      '127.0.0.1',
    ],
  },
});
