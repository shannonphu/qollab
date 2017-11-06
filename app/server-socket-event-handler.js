// Handles socket connections and event callbacks
module.exports = function(server) {
    const io = require('socket.io').listen(server);

    // TODO: map lecture to canvas
    let canvasHistory = [];

    io.sockets.on('connection', function (socket) {
    	console.log("A connection was made");

        // Fill canvas if new connection made midway through session
        if (canvasHistory.length > 0) {
            socket.emit('canvas:update', JSON.stringify(getCanvasJSON(canvasHistory)));
        }

        socket.on('disconnect', function(){
          console.log('A user disconnected');
        });

        // Add path to history and update all clients
        socket.on('path:drawn', function(pathJSON) {
            let path = JSON.parse(pathJSON);
            canvasHistory.push(path);
            socket.broadcast.emit('canvas:update', JSON.stringify(getCanvasJSON(canvasHistory)));
        });
    });

    var getCanvasJSON = function(pathHistory) {
        return {"objects": pathHistory};
    }
};