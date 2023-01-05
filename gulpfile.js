const path = require('path');
const { src, dest, watch, series, parallel } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
const tailwindcss = require('tailwindcss');
const premailer = require('./build/premailer');
const juice = require('./build/juice');
const config = require('./config');

const isProd = process.env.NODE_ENV === 'production';

const entryPath = path.resolve(config.base, config.entry);

try {
  config.build.pugLocals = require(path.resolve(config.base, 'locals.js'));
} catch {
  config.build.pugLocals = {};
}

function getPugOptions() {
  return {
    pretty: !isProd,
    locals: config.build.pugLocals,
  };
}

//Load Previews on Browser on dev
function livePreview(done) {
  browserSync.init(config.devServer);
  done();
}

// Triggers Browser reload
function previewReload(done) {
  console.log("Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}

function devHTML() {
  let pipeline = src(entryPath);

  if (config.entry.endsWith('.pug')) {
    pipeline = pipeline.pipe(pug(getPugOptions()));
  }

  if (isProd) {
    if (typeof config.build.premailer === 'object') {
      pipeline = pipeline.pipe(premailer());
    } else if (typeof config.build.juice === 'object') {
      pipeline = pipeline.pipe(juice());
    }
  }

  return pipeline.pipe(dest(config.build.outDir));
}

function devStyles() {
  return src(`${config.base}/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([tailwindcss(`${config.base}/tailwind.config.js`)]))
    .pipe(dest((file) => file.base));
}

function watchFiles() {
  const ext = path.extname(entryPath);
  watch(
    ['src/module/**/*.pug', `${config.base}/**/*${ext}`],
    // devStyles must before devHTML to let tailwind jit detect first
    series(devStyles, devHTML, previewReload)
  );
  watch(
    [`${config.base}/tailwind.config.js`, `${config.base}/**/*.scss`],
    series(devStyles, previewReload)
  );
  console.log("Watching for Changes..\n");
}

function buildFinish(done) {
  console.log(
    `Production build is complete. Files are located at ${config.build.outDir}\n`
  );
  done();
}

function dev() {
  return series(
    parallel(devHTML, devStyles),
    livePreview,
    watchFiles,
  );
}

function build() {
  return series(
    parallel(devHTML, devStyles),
    buildFinish,
  )
}

module.exports.dev = dev();
module.exports.build = build();
