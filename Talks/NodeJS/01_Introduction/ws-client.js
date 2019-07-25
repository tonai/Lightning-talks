var WebSocket = require('ws');
const URL = 'ws://localhost:8080';

var ws = new WebSocket(URL);
ws.on('open', function() {
  ws.send('Request 1 from the client');
  setTimeout(function(){ws.send('Request 2 from the client');}, 1000);
});
ws.on('message', function(message) {
  console.log('received: %s', message);
});
