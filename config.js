module.exports = {
  base: './src/demo',
  entry: 'index.pug',
  devServer: {
    server: ['dist', 'public'],
    port: 8080,
    reloadDelay: 1000,
    open: false,
  },
  build: {
    outDir: 'dist',
    cdnBase: process.env.NODE_ENV === 'production'
      ? 'https://my-cdn/demo/'
      : './demo/',
    juice: {
      webResources: {
        images: false,
      },
    },
  },
};