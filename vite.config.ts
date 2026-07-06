import { fileURLToPath } from 'node:url'

const entry = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default {
  server: {
    proxy: {
      '/api': 'http://localhost:5050'   // mismo puerto que el server de dev
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: entry('./index.html'),
        privacidad: entry('./privacidad.html'),
        terminos: entry('./terminos.html'),
      }
    }
  }
};
