// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        src: resolve(__dirname, 'src/01-color-switcher.html'),
        task2: resolve(__dirname, 'src/02-timer.html'),
        task3: resolve(__dirname, 'src/03-promises.html'),
      },
    },
  },
  plugins: [Inspect()],
  base: '/goit-js-hw-09/',
});
