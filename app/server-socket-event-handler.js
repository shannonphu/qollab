// Handles socket connections and event callbacks
module.exports = function(server) {
    const io = require('socket.io').listen(server);

    io.sockets.on('connection', function (socket) {
    	console.log("A connection was made");

        socket.on('disconnect', function(){
          console.log('A user disconnected');
        });

        socket.on('path:drawn', function(pathJSON) {
            socket.broadcast.emit('canvas:update', pathJSON);
        });
    });
};