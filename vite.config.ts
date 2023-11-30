import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        entryFileNames: 'automator.js',
        assetFileNames: 'automator.css',
      }
    }
  },
  assetsInclude: ['**/*.ttf', '**/*.otf', '**/*.woff', '**/*.woff2', '**/*.eot', ],
});
