const { src, dest, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const createDevServer = require('./build/dev-server');
const createReloadServer = require('./build/reload-server');
const premailer = require('./build/premailer');
const juice = require('./build/juice');
const config = require('./config');

function compilePugWrapper({ dev = false, broadcastReload } = {}) {
  return function compilePug() {
    let pipeline = src(config.entry);

    if (config.entry.endsWith('.pug')) {
      pipeline.pipe(pug({
        pretty: dev,
        locals: {
          nodeEnv: process.env.NODE_ENV,
          isProd: process.env.NODE_ENV === 'production',
          CDN: config.build.assetsDir,
        },
      }));
    }

    if (dev) {
      if (typeof broadcastReload === 'function') {
        broadcastReload();
      }
      return pipeline.pipe(dest(config.build.outDir));
    }
    if (typeof config.build.premailer === 'object') {
      return pipeline
        .pipe(premailer(config.premailer))
        .pipe(dest(config.build.outDir));
    } else if (typeof config.build.juice === 'object') {
      return pipeline
        .pipe(juice())
        .pipe(dest(config.build.outDir));
    }
    return pipeline.pipe(dest(config.build.outDir));
  };
}

function buildStyles() {
  return src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest((file) => file.base));
}

function dev() {
  let broadcastReload;
  if (typeof config.devServer === 'object') {
    const server = createDevServer();
    ({ broadcastReload } = createReloadServer());

    server.start();
  }

  const task = compilePugWrapper({
    dev: true,
    broadcastReload
  });

  // watch scss file change to recompile scss
  buildStyles();
  watch('./src/**/*.scss', buildStyles);
  // watch pug & css file change to reload dev server
  task();
  watch(config.watch, task);
}

module.exports.dev = dev;
module.exports.build = compilePugWrapper();
