const { src, dest, watch } = require('gulp');
const pug = require('gulp-pug');
const createDevServer = require('./build/dev-server');
const createReloadServer = require('./build/reload-server');
const premailer = require('./build/premailer');
const config = require('./config');

function compilePugWrapper({ dev = false, broadcastReload } = {}) {
  return function compilePug() {
    const pipeline = src(config.entry)
      .pipe(pug({
        pretty: dev,
        locals: {
          nodeEnv: process.env.NODE_ENV,
          isProd: process.env.NODE_ENV === 'production',
        },
      }));

    if (dev) {
      if (typeof broadcastReload === 'function') {
        broadcastReload();
      }
      return pipeline.pipe(dest(config.build.outDir));
    }
    if (typeof config.premailer === 'object') {
      return pipeline
        .pipe(premailer(config.premailer))
        .pipe(dest(config.build.outDir));
    }
    return pipeline.pipe(dest(config.build.outDir));
  };
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

  task();
  watch(config.watch, task);
}

module.exports.dev = dev;
module.exports.build = compilePugWrapper();
