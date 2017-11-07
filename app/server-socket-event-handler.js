// Handles socket connections and event callbacks
module.exports = function(server) {
    const io = require('socket.io').listen(server);

    // TODO: map lecture to canvas
    let canvasHistory = {};

    io.sockets.on('connection', function (socket) {
    	console.log("A connection was made");

        // Fill canvas if new connection made midway through session
        let joinCode = socket.handshake.query.lectureCode;
        if (canvasHistory[joinCode] && canvasHistory[joinCode].length > 0) {
            socket.emit('canvas:update', JSON.stringify(getCanvasJSON(joinCode, canvasHistory[joinCode])));
        }

        socket.on('disconnect', function(){
          console.log('A user disconnected');
        });

        // Add path to history and update all clients
        socket.on('path:drawn', function(pathJSON) {
            let path = JSON.parse(pathJSON);
            let joinCode = path['joinCode'];
            let pathData = path['data'];
            
            if (!(joinCode in canvasHistory)) {
                canvasHistory[joinCode] = [];
            }

            canvasHistory[joinCode].push(pathData);
            socket.broadcast.emit('canvas:update', JSON.stringify(getCanvasJSON(joinCode, canvasHistory[joinCode])));
        });
    });

    var getCanvasJSON = function(joinCode, pathHistory) {
        return {
            "joinCode": joinCode,
            "data": {"objects": pathHistory}
        };
    }
};