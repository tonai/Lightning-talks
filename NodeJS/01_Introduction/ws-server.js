var ws = require("nodejs-websocket");
const PORT = 8080;

var server = ws.createServer(function (connection) {
  connection.on("text", function (message) {
    console.log('received: %s', message);
    connection.sendText('It Works!');
  });
}).listen(PORT);
