(() => {
  function connect() {
    const socket = new WebSocket('ws://localhost:8000');

    const onOpen = () => {
      console.log('reload websocket connected!');
    };

    const onMessage = () => {
      console.log('need reload!');
      window.location.reload();
    };

    socket.addEventListener('open', onOpen);
    socket.addEventListener('message', onMessage);

    window.addEventListener('beforeunload', function() {
      socket.removeEventListener('open', onOpen);
      socket.removeEventListener('message', onMessage);
      socket.close();
    });
  }

  window.addEventListener('load', connect);
})();
