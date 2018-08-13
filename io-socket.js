const app = require('app');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function () {
   console.log("made a connection");

});