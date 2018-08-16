// const cookieSession = require("cookie-session");
// let sessionMiddleware = cookieSession({
//     name: 'BookShop',
//     keys: ["secret"],
//     maxAge: 24 * 60 * 60 * 1000
// });
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
        socket.on('post',function (data) {
            console.log(socket.request.user);
            console.log(data);
            io.sockets.emit('post',{msg:data,user:'yedidyakfir@gmail.com'});
        })
    });

    server.listen(3000, function () {
        console.log("listening on 3000 for chat");
    });
};