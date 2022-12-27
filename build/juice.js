const juice = require('juice');
const declassify = require('declassify');
const through2 = require('through2');
const config = require('../config');

function gulpJuicePlugin() {
  return through2.obj(function gulpJuice(file, enc, cb) {
    const html = file.contents.toString();
    if (html) {
      juice.juiceResources(html, config.build.juice, (err, result) => {
        const compiled = declassify.process(result);
        file.contents = Buffer.from(compiled);
        cb(null, file);
      })
    }
  })
}

module.exports = gulpJuicePlugin;
