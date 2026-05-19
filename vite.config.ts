import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env    = loadEnv(mode, '.', '');
  const isProd = mode === 'production';

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    plugins: [react(), tailwindcss()],

    resolve: {
      alias: { '@': path.resolve(__dirname, '.') },
    },

    // Elimina console.* y debugger del bundle de producción
    esbuild: {
      drop:          isProd ? ['console', 'debugger'] : [],
      legalComments: isProd ? 'none'                  : 'inline',
    },

    build: {
      target:    'es2022',
      minify:    'esbuild',
      cssMinify: true,
      sourcemap: false,
      chunkSizeWarningLimit: 600,

      rollupOptions: {
        output: {
          // Chunks separados → el navegador los cachea individualmente entre deploys
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return;
            if (id.includes('@supabase'))                                                        return 'supabase';
            if (id.includes('@tanstack'))                                                        return 'query';
            if (id.includes('@dnd-kit'))                                                         return 'dnd';
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('/zod/')) return 'forms';
            if (id.includes('react-router'))                                                     return 'router';
            if (id.includes('react-dom') || id.includes('/react/'))                             return 'react-vendor';
          },
        },
      },
    },
  };
});
