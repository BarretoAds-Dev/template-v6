// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import viteCompression from 'vite-plugin-compression';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  outDir: './dist',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    },
    imageService: "cloudflare"
  }),
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },

  // Optimizaciones para reducir latencia crítica
  build: {
    inlineStylesheets: 'auto', // Inline CSS crítico
  },

  vite: {
    build: {
      // Optimizar chunks para reducir latencia
      rollupOptions: {
        output: {
          manualChunks: {
            // Separar vendor chunks
            vendor: ['astro'],
          },
        },
      },
      // Optimizar CSS
      cssCodeSplit: true,
      // Reducir tamaño de chunks
      chunkSizeWarningLimit: 1000,
    },
    
    // Tailwind CSS
    plugins: [
      tailwindcss(),
      // Compresión Brotli optimizada
      viteCompression({
        threshold: 10240,
        filter: /\.(js|mjs|json|css|html|svg|jsx|tsx|astro|txt|xml)$/,
        algorithm: 'brotliCompress',
        ext: '.br',
        verbose: true,
        compressionOptions: { level: 11 },
      }),
      // Compresión Gzip como fallback
      viteCompression({
        threshold: 10240,
        filter: /\.(js|mjs|json|css|html|svg|jsx|tsx|astro|txt|xml)$/,
        algorithm: 'gzip',
        ext: '.gz',
        verbose: true,
        compressionOptions: { level: 9 },
      }),
    ],
    
    // Optimizaciones de servidor de desarrollo
    server: {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  }
});