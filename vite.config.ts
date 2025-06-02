export default {
  server: {
    proxy: {
      '/api': 'http://localhost:5050'   // mismo puerto que arriba
    }
  }
};
