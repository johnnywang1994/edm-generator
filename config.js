module.exports = {
  entry: './src/demo/index.pug',
  watch: ['./src/**/*.pug', './src/**/*.css'],
  devServer: {
    port: 8080,
    wsPort: 8000,
    reloadDelay: 1000,
    serveDir: ['dist', 'public'],
  },
  build: {
    outDir: 'dist',
    assetsDir: process.env.NODE_ENV === 'production'
      ? 'https://my-cdn/demo/'
      : './demo/',
    juice: {
      webResources: {
        images: false,
      },
    },
  },
};