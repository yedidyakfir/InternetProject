const session = require('express-session');
const MongoDB = require('connect-mongo')(session);
passportSocketIo = require("passport.socketio");
let Blogs = require('./model/index')('Blogs');

module.exports = (server) => {

    const io = require('socket.io')(server);

    //this code is for connect the passport to socket
    io.use(passportSocketIo.authorize({
        secret: 'IHopeThisWorks',
        store: new MongoDB({ url: 'mongodb://localhost/BookShop'}),
        // success: function(data, accept){
        //     console.log('successful connection to socket.io');
        //     accept(null, true);
        //     accept(); },
        // fail:function(data, message, error, accept){
        //     // if(error)
        //     //     throw new Error(message);
        //     console.log('failed connection to socket.io:', message);
        //     accept(null, false);
        //     if(error)
        //         accept(new Error(message));}
    }));

    io.on('connection', function (socket) {
        if(!socket.request.user.logged_in)
            socket.disconnect();
        console.log("made a connection");
        console.log(socket.request.user);

        socket.on('join',async function (data) {
            if(await Blogs.IsUserInBlog(socket.request.user.email,data.room))
                socket.join(data.room);
        });

        socket.on('post', async function (data) {

            if(await Blogs.IsUserInBlog(socket.request.user.email,data.room)){
                Blogs.ADDPOST(data.msg,socket.request.user.email,data.room);
                io.to(data.room).emit('post',{msg:data.msg,user:socket.request.user.email});
            }
        });

        socket.on('like', async function (data) {
            if(await Blogs.IsUserInBlog(socket.request.user.email,data.room)){
                Blogs.LIKEBLOG(socket.request.user.email,data.room);
                io.to(data.room).emit('like');
            }
        });

        socket.on('unlike' , async function (data) {
            if(await Blogs.IsUserInBlog(socket.request.user.email,data.room)){
                Blogs.UNLIKEBLOG(socket.request.user.email,data.room);
                io.to(data.room).emit('unlike');
            }
        });
    });

    server.listen(3000, function () {
        console.log("listening on 3000 for chat");
    });
};