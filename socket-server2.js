var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , ioClient = require('socket.io-client');

app.listen(8090);

function handler (req, res) {
  fs.readFile(__dirname + '/client.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


var socket = ioClient.connect('http://localhost:8080');
socket.on('connect', function () {
  // socket connected
  socket.emit('my other event', { my: 'data from server2' });
});

