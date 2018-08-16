const session = require('express-session');
const MongoDB = require('connect-mongo')(session);
passportSocketIo = require("passport.socketio");
let Blogs = require('./model/index')('Blogs');

module.exports = (server) => {

    //const server = require('http').createServer(app);
    const io = require('socket.io')(server);

    //this code is for connect the passport to socket
    io.use(passportSocketIo.authorize({
        secret: 'IHopeThisWorks',
        store: new MongoDB({ url: 'mongodb://localhost/BookShop'}),
        success: function(data, accept){
            console.log('successful connection to socket.io');
            accept(null, true);
            accept(); },
        fail:function(data, message, error, accept){
            // if(error)
            //     throw new Error(message);
            console.log('failed connection to socket.io:', message);
            accept(null, false);
            if(error)
                accept(new Error(message));}
    }));

    io.on('connection', function (socket) {
        console.log("made a connection");
        console.log(socket.request.user);

        socket.on('join', function (data) {
           socket.join(data);
        });

        socket.on('post',function (data) {
            console.log(socket.request.user);
            Blogs.ADDPOST(data.msg,socket.request.user.email,data.room);
            io.to(data.room).emit('post',{msg:data.msg,user:socket.request.user.email});
        });

        socket.on('like', function (data) {
           Blogs.LIKEBLOG(socket.request.user.email,data.room);
           io.to(data.room).emit('like');
        });

        socket.on('unlike' , function (data) {
            Blogs.UNLIKEBLOG(socket.request.user.email,data.room);
            io.to(data.room).emit('unlike');
        });
    });

    server.listen(3000, function () {
        console.log("listening on 3000 for chat");
    });
};