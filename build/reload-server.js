const { WebSocketServer } = require('ws');
const WebSocket = require('ws');
const config = require('../config');

const { devServer } = config;

function createSocketServer() {
  const wss = new WebSocketServer({
    port: devServer.wsPort,
  });
  let delayTimer;

  function broadcastReload() {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(() => {
          // trigger client side reload page
          client.send('reload');
        }, devServer.delay);
      }
    });
  }

  return {
    broadcastReload
  };
}

module.exports = createSocketServer;
