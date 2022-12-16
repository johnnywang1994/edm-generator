const gls = require('gulp-live-server');
const config = require('../config');

const { devServer } = config;

function createDevServer() {
  const server = gls(
    [gls.script, devServer.serveDir, config.devServer.port],
    undefined,
    false, // disable default livereload
  );
  return server;
}

module.exports = createDevServer;
