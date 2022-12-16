module.exports = {
  entry: './src/index.pug',
  watch: './src/**/*',
  devServer: {
    port: 8080,
    wsPort: 8000,
    reloadDelay: 1000,
    serveDir: ['dist', 'public'],
  },
  build: {
    outDir: 'dist',
    premailer: {
      removeClasses: true,
      removeIds: true,
      removeComments: true,
      preserveStyles: false,
    },
  },
};