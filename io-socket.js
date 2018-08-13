const app = require('app');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
   console.log("made a connection");
   socket.on('post',function (data) {
       console.log(data);
       io.sockets.emit('post',data);
   })
});